"use client";

import nineMobileLogo from "@/assets/images/9mobile-logo.png";
import airtelLogo from "@/assets/images/airtel-logo.png";
import gloLogo from "@/assets/images/globacom-logo.png";
import mtnLogo from "@/assets/images/mtn-logo.png";
import ProgressSteps from "@/components/ui/ProgressSteps";
import { useAuth } from "@/hooks/useAuth";
import { getWalletData } from "@/lib/wallet";
import { AirtimeFormData, Network, Step, TransactionResult } from "@/types";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { OrderStep } from "./components/OrderStep";
import { ReviewStep } from "./components/ReviewStep";
import { SummaryStep } from "./components/SummaryStep";

const NETWORKS: Network[] = [
    { id: "mtn", name: "MTN", logo: mtnLogo, apiId: "1" },
    { id: "glo", name: "GLO", logo: gloLogo, apiId: "3" },
    { id: "airtel", name: "Airtel", logo: airtelLogo, apiId: "2" },
    { id: "9mobile", name: "9Mobile", logo: nineMobileLogo, apiId: "4" },
];

const AirtimePurchasePage: React.FC = () => {
    const { user } = useAuth();
    const [currentStep, setCurrentStep] = useState<Step>(1);
    const [formData, setFormData] = useState<AirtimeFormData | null>(null);
    const [walletBalance, setWalletBalance] = useState<number>(0);
    const [isFetchingBalance, setIsFetchingBalance] = useState<boolean>(true);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [transactionResult, setTransactionResult] =
        useState<TransactionResult | null>(null);

    const fetchWalletBalance = useCallback(async () => {
        if (!user?.uid) return;
        setIsFetchingBalance(true);
        try {
            const { balance } = await getWalletData(user.uid);
            setWalletBalance(balance);
        } catch (error) {
            toast.error("Could not fetch wallet balance.");
        } finally {
            setIsFetchingBalance(false);
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            fetchWalletBalance();
        }
    }, [user, fetchWalletBalance]);

    const handleOrderSuccess = (data: AirtimeFormData) => {
        setFormData(data);
        setCurrentStep(2);
    };

    const handlePayment = async () => {
        if (!formData || !user) return;

        setIsProcessing(true);
        try {
            const token = await user.getIdToken();
            const response = await fetch("/api/utilities/airtime", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    networkApiId: formData.network.apiId,
                    phoneNumber: formData.phoneNumber,
                    amount: formData.amount,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "An unknown error occurred.");
            }

            setTransactionResult({
                status: "success",
                message: result.message,
                details: {
                    ...formData,
                    transactionId: result.transactionId,
                    date: new Date().toISOString(),
                },
            });

            setWalletBalance((prev) => prev - formData.amount);
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : "An unknown error occurred.";
            setTransactionResult({
                status: "failed",
                message: `Your transaction could not be completed. ${errorMessage}`,
                details: {
                    ...formData,
                    transactionId: `failed_${Date.now()}`,
                    date: new Date().toISOString(),
                },
            });
            toast.error(errorMessage);
        } finally {
            setIsProcessing(false);
            setCurrentStep(3);
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <OrderStep
                        onSuccess={handleOrderSuccess}
                        walletBalance={walletBalance}
                        networks={NETWORKS}
                    />
                );
            case 2:
                return (
                    formData && (
                        <ReviewStep
                            formData={formData}
                            walletBalance={walletBalance}
                            onConfirm={handlePayment}
                            onBack={() => setCurrentStep(1)}
                            isProcessing={isProcessing}
                        />
                    )
                );
            case 3:
                return <SummaryStep result={transactionResult} />;
            default:
                return null;
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen py-10">
            <div className="container mx-auto px-4 py-6">
                <div className="max-w-3xl mx-auto">
                    <div className="mb-8 text-center">
                        <h2 className="text-3xl font-bold text-gray-800">Buy Airtime</h2>
                        <p className="text-gray-500">
                            Instantly top up any mobile number in Nigeria.
                        </p>
                    </div>
                    <div className="mb-8">
                        <ProgressSteps
                            steps={["Details", "Review", "Complete"]}
                            currentStep={currentStep - 1}
                        />
                    </div>
                    {isFetchingBalance ? (
                        <div className="text-center p-10">
                            <p>Loading your wallet...</p>
                        </div>
                    ) : (
                        renderStep()
                    )}
                </div>
            </div>
        </div>
    );
};

export default AirtimePurchasePage;