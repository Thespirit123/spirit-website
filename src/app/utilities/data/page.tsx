"use client";

import nineMobileLogo from "@/assets/images/9mobile-logo.png";
import airtelLogo from "@/assets/images/airtel-logo.png";
import gloLogo from "@/assets/images/globacom-logo.png";
import mtnLogo from "@/assets/images/mtn-logo.jpeg";
import { Card, CardContent } from "@/components/ui/card";
import ProgressSteps from "@/components/ui/ProgressSteps";
import { useAuth } from "@/hooks/useAuth";
import { getWalletData } from "@/lib/wallet";
import { Step } from "@/types";
import {
    DataFormData,
    DataPlan,
    Network,
    TransactionResult,
} from "@/types/wallet";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { DataSkeleton } from "./components/DataSkeleton";
import { OrderStep } from "./components/OrderStep";
import { ReviewStep } from "./components/ReviewStep";
import { SummaryStep } from "./components/SummaryStep";

const NETWORKS: Network[] = [
    { id: "MTN", name: "MTN", logo: mtnLogo, apiId: "1" },
    { id: "GLO", name: "GLO", logo: gloLogo, apiId: "3" },
    { id: "Airtel", name: "Airtel", logo: airtelLogo, apiId: "2" },
    { id: "9MOBILE", name: "9Mobile", logo: nineMobileLogo, apiId: "4" },
];

const parsePrice = (price: string): number => {
    return parseFloat(price.replace("NGN ", "").replace(",", ""));
};

type DataNetworkType = string;

interface DataPlansApiResponse {
    available_network_types: string;
    data_list: DataPlan[];
}

const DataPurchasePage: React.FC = () => {
    const { user } = useAuth();
    const [currentStep, setCurrentStep] = useState<Step>(1);
    const [formData, setFormData] = useState<DataFormData | null>(null);
    const [walletBalance, setWalletBalance] = useState<number>(0);
    const [allPlans, setAllPlans] = useState<DataPlan[]>([]);
    const [networkTypes, setNetworkTypes] = useState<DataNetworkType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);
    const [transactionResult, setTransactionResult] =
        useState<TransactionResult | null>(null);

    const fetchInitialData = useCallback(async () => {
        if (!user?.uid) return;
        setIsLoading(true);
        try {
            const [walletData, plansResponse] = await Promise.all([
                getWalletData(user.uid),
                fetch("/api/utilities/data/plans"),
            ]);

            setWalletBalance(walletData.balance);

            if (!plansResponse.ok) {
                throw new Error("Failed to fetch data plans");
            }
            const plansApi: DataPlansApiResponse = await plansResponse.json();
            setAllPlans(plansApi.data_list);

            const types = plansApi.available_network_types
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean);
            setNetworkTypes(types);
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : "Could not load page data."
            );
        } finally {
            setIsLoading(false);
        }
    }, [user]);

    useEffect(() => {
        fetchInitialData();
    }, [fetchInitialData]);

    const handleOrderSuccess = (data: DataFormData) => {
        setFormData(data);
        setCurrentStep(2);
    };

    const handleReset = () => {
        setCurrentStep(1);
        setFormData(null);
        setTransactionResult(null);
        setIsProcessing(false);
    };

    const handlePayment = async () => {
        if (!formData || !user) return;

        setIsProcessing(true);
        try {
            const token = await user.getIdToken();
            const response = await fetch("/api/utilities/data", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    networkId: formData.network.apiId,
                    planId: formData.plan.plan_id,
                    phoneNumber: formData.phoneNumber,
                    amount: parsePrice(formData.plan.plan_price),
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

            setWalletBalance((prev) => prev - parsePrice(formData.plan.plan_price));
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
                        allPlans={allPlans}
                        networkTypes={networkTypes}
                    />
                );
            case 2:
                return (
                    formData && (
                        <ReviewStep
                            formData={formData}
                            onConfirm={handlePayment}
                            onBack={() => setCurrentStep(1)}
                            isProcessing={isProcessing}
                        />
                    )
                );
            case 3:
                return <SummaryStep result={transactionResult} onReset={handleReset} />;
            default:
                return null;
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen pt-32 pb-10">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">Buy Data</h2>
                    <p className="text-gray-500">
                        Instantly top up any mobile number in Nigeria.
                    </p>
                </div>
                {isLoading ? (
                    <DataSkeleton />
                ) : (
                    <Card>
                        <CardContent className="pt-6">
                            <div className="mb-8 px-4 sm:px-8">
                                <ProgressSteps
                                    steps={["Details", "Review", "Complete"]}
                                    currentStep={currentStep - 1}
                                />
                            </div>
                            {renderStep()}
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default DataPurchasePage;