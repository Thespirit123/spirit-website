"use client";
import RevalidateModal from "@/components/RevalidateModal";
import { Card, CardContent } from "@/components/ui/card";
import ProgressSteps from "@/components/ui/ProgressSteps";
import { useAuth } from "@/hooks/useAuth";
import { getWalletData } from "@/lib/wallet";
import {
  Disco,
  ElectricityFormData,
  ElectricityTransactionResult,
} from "@/types";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { ElectricitySkeleton } from "./components/ElectricitySkeleton";
import { OrderStep } from "./components/OrderStep";
import { ReviewStep } from "./components/ReviewStep";
import { SummaryStep } from "./components/SummaryStep";

const ElectricityPurchasePage: React.FC = () => {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [walletBalance, setWalletBalance] = useState<number>(0);
  const [discos, setDiscos] = useState<Disco[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState<ElectricityFormData | null>(null);
  const [transactionResult, setTransactionResult] =
    useState<ElectricityTransactionResult | null>(null);
  const [showRevalidateModal, setShowRevalidateModal] = useState(false);

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

  const handleOrderSuccess = (data: ElectricityFormData) => {
    setFormData(data);
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
    setFormData(null);
    setTransactionResult(null);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <OrderStep
            discos={discos}
            walletBalance={walletBalance}
            onSuccess={handleOrderSuccess}
          />
        );
      case 2:
        return (
          formData && (
            <ReviewStep
              formData={formData}
              onConfirm={() => setShowRevalidateModal(true)}
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
          <h2 className="text-3xl font-bold text-gray-800">
            Buy Electricity
          </h2>
          <p className="text-gray-500">
            Pay your electricity bills and get your token instantly.
          </p>
        </div>
        {isLoading ? (
          <ElectricitySkeleton />
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
      {showRevalidateModal && user && (
        <RevalidateModal
          user={user}
          onClose={() => setShowRevalidateModal(false)}
          onSuccess={handlePayment}
        />
      )}
    </div>
  );
};

export default ElectricityPurchasePage;