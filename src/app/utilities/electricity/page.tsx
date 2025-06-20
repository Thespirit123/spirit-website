"use client";

import Button from "@/components/custom-ui/button";
import { FormField } from "@/components/custom-ui/form-field";
import ProgressSteps from "@/components/ui/ProgressSteps";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import { getWalletData } from "@/lib/wallet";
import {
    Disco,
    ElectricityCustomerInfo,
    ElectricityFormData,
    ElectricityTransactionResult,
} from "@/types";
import { Search, Wallet, Zap } from "lucide-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { ReviewStep } from "./components/ReviewStep";
import { SummaryStep } from "./components/SummaryStep";

const ElectricityPurchasePage: React.FC = () => {
    const { user } = useAuth();
    const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
    const [walletBalance, setWalletBalance] = useState<number>(0);
    const [discos, setDiscos] = useState<Disco[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isVerifying, setIsVerifying] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const [selectedDiscoId, setSelectedDiscoId] = useState<string>("");
    const [meterType, setMeterType] = useState<"prepaid" | "postpaid">("prepaid");
    const [meterNumber, setMeterNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [customerInfo, setCustomerInfo] =
        useState<ElectricityCustomerInfo | null>(null);
    const [transactionResult, setTransactionResult] =
        useState<ElectricityTransactionResult | null>(null);

    const selectedDisco = useMemo(
        () => discos.find((d) => d.meter_id.toString() === selectedDiscoId),
        [discos, selectedDiscoId]
    );

    const formData = useMemo((): ElectricityFormData | null => {
        if (!selectedDisco || !customerInfo || !amount) return null;
        return {
            disco: selectedDisco,
            meterNumber,
            meterType,
            amount: parseInt(amount, 10),
            customerInfo,
        };
    }, [selectedDisco, meterNumber, meterType, amount, customerInfo]);

    const fetchInitialData = useCallback(async () => {
        if (!user?.uid) return;
        setIsLoading(true);
        try {
            const [walletData, providersResponse] = await Promise.all([
                getWalletData(user.uid),
                fetch("/api/utilities/electricity/providers"),
            ]);

            setWalletBalance(walletData.balance);

            if (!providersResponse.ok) throw new Error("Failed to fetch providers");
            const providers = await providersResponse.json();
            setDiscos(providers);
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

    const handleVerifyMeter = async () => {
        if (!meterNumber || !selectedDisco) return;
        setIsVerifying(true);
        setCustomerInfo(null);
        try {
            const response = await fetch("/api/utilities/electricity/validate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    meterId: selectedDisco.meter_id,
                    meterType,
                    meterNumber,
                }),
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.message);

            setCustomerInfo({ name: result.name, address: result.address });
            toast.success("Meter verified successfully");
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to verify meter number."
            );
        } finally {
            setIsVerifying(false);
        }
    };

    const handleContinue = () => {
        if (!formData) {
            toast.error("Please complete all fields and verify meter.");
            return;
        }
        if (formData.amount < 1000) {
            toast.error("Minimum purchase amount is ₦1,000.");
            return;
        }
        if (formData.amount > walletBalance) {
            toast.error("Insufficient wallet balance.");
            return;
        }
        setCurrentStep(2);
    };

    const handlePayment = async () => {
        if (!formData || !user) return;
        setIsProcessing(true);
        try {
            const token = await user.getIdToken();
            const response = await fetch("/api/utilities/electricity/purchase", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    discoApiId: formData.disco.meter_id,
                    meterNumber: formData.meterNumber,
                    meterType: formData.meterType,
                    amount: formData.amount,
                }),
            });

            const result = await response.json();
            if (!response.ok) throw new Error(result.message);

            setTransactionResult({
                status: "success",
                message: result.message,
                details: {
                    ...formData,
                    transactionId: result.transactionId,
                    date: new Date().toISOString(),
                    token: result.token,
                },
            });
            setWalletBalance((prev) => prev - formData.amount);
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : "An unknown error occurred.";
            setTransactionResult({
                status: "failed",
                message: `Transaction failed: ${errorMessage}`,
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

    const handleReset = () => {
        setCurrentStep(1);
        setTransactionResult(null);
        setCustomerInfo(null);
        setMeterNumber("");
        setAmount("");
        setSelectedDiscoId("");
    };

    const renderOrderStep = () => (
        <Card>
            <CardHeader>
                <div className="flex items-center">
                    <div className="p-2 bg-[#F5F7F9] rounded-full mr-3 text-[#008EA8]">
                        <Zap size={20} />
                    </div>
                    <h3 className="text-lg font-medium text-[#394B59]">
                        Purchase Details
                    </h3>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField label="Distribution Company">
                        <Select onValueChange={setSelectedDiscoId} value={selectedDiscoId}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a provider" />
                            </SelectTrigger>
                            <SelectContent>
                                {discos.map((disco) => (
                                    <SelectItem
                                        key={disco.meter_id}
                                        value={disco.meter_id.toString()}
                                    >
                                        {disco.meter_company}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </FormField>
                    <FormField label="Meter Type">
                        <Select
                            onValueChange={(v) => setMeterType(v as "prepaid" | "postpaid")}
                            defaultValue="prepaid"
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="prepaid">Prepaid</SelectItem>
                                <SelectItem value="postpaid">Postpaid</SelectItem>
                            </SelectContent>
                        </Select>
                    </FormField>
                </div>
                <div className="flex items-end gap-3">
                    <div className="flex-grow">
                        <FormField
                            label="Meter Number"
                            value={meterNumber}
                            onChange={(e) => setMeterNumber(e.target.value)}
                            placeholder="Enter meter number"
                        />
                    </div>
                    <Button
                        variant="secondary"
                        onClick={handleVerifyMeter}
                        disabled={!meterNumber || !selectedDisco || isVerifying}
                        isLoading={isVerifying}
                    >
                        <Search size={18} className={isVerifying ? "hidden" : "mr-2"} />{" "}
                        Verify
                    </Button>
                </div>
                {customerInfo && (
                    <div className="bg-[#F5F7F9] p-4 rounded-lg animate-in fade-in-50">
                        <h4 className="font-medium text-[#394B59] mb-2">
                            Customer Information
                        </h4>
                        <div className="space-y-2 text-sm">
                            <p>
                                <span className="text-gray-500">Name: </span>
                                <strong className="text-[#394B59]">{customerInfo.name}</strong>
                            </p>
                            <p>
                                <span className="text-gray-500">Address: </span>
                                <strong className="text-[#394B59]">
                                    {customerInfo.address}
                                </strong>
                            </p>
                        </div>
                    </div>
                )}
                <div>
                    <FormField
                        label="Amount"
                        value={amount ? `₦${parseInt(amount).toLocaleString()}` : ""}
                        onChange={(e) => setAmount(e.target.value.replace(/[^0-9]/g, ""))}
                        placeholder="Enter amount"
                        disabled={!customerInfo}
                    />
                    <p className="mt-1 text-xs text-gray-500">Minimum amount: ₦1,000</p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center text-sm">
                        <Wallet size={18} className="text-[#008EA8] mr-2" />
                        <span>Wallet Balance:</span>
                        {isLoading ? (
                            <div className="animate-pulse h-5 w-20 bg-gray-200 rounded ml-2"></div>
                        ) : (
                            <strong className="ml-1">
                                ₦{walletBalance.toLocaleString()}
                            </strong>
                        )}
                    </div>
                    <Button
                        variant="primary"
                        disabled={!formData || isProcessing}
                        onClick={handleContinue}
                    >
                        Continue
                    </Button>
                </div>
            </CardContent>
        </Card>
    );

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return renderOrderStep();
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
                return renderOrderStep();
        }
    };

    return (
        <div className="bg-[#F5F7F9] min-h-screen py-10">
            <div className="container mx-auto px-4 py-6">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-[#394B59]">
                        Pay Electricity Bill
                    </h2>
                    <p className="text-[#8E9BAA]">
                        Purchase electricity units for prepaid and postpaid meters
                    </p>
                </div>
                <div className="mb-8">
                    <ProgressSteps
                        steps={["Details", "Review", "Complete"]}
                        currentStep={currentStep - 1}
                    />
                </div>
                <div className="max-w-3xl mx-auto">{renderStep()}</div>
            </div>
        </div>
    );
};

export default ElectricityPurchasePage;