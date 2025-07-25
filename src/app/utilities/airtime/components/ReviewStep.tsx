import Button from "@/components/custom-ui/button";
import { AirtimeFormData } from "@/types";
import { ArrowLeft, ShieldAlert } from "lucide-react";
import Image from "next/image";
import React, { memo } from "react";

interface ReviewStepProps {
    formData: AirtimeFormData;
    walletBalance: number;
    onConfirm: () => void;
    onBack: () => void;
    isProcessing: boolean;
}

const ReviewStepComponent: React.FC<ReviewStepProps> = ({
    formData,
    walletBalance,
    onConfirm,
    onBack,
    isProcessing,
}) => {
    const discount = Math.floor(formData.amount * 0.01);
    const finalAmount = formData.amount - discount;
    const hasSufficientBalance = walletBalance >= finalAmount;

    return (
        <>
            <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-800">
                    Review Your Order
                </h3>
            </div>
            <div>
                <div className="space-y-4 border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-500">Phone Number</span>
                        <span className="font-medium text-gray-800">
                            {formData.phoneNumber}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-500">Network</span>
                        <div className="flex items-center gap-2">
                            <Image
                                src={formData.network.logo}
                                alt={formData.network.name}
                                width={20}
                                height={20}
                            />
                            <span className="font-medium text-gray-800">
                                {formData.network.name}
                            </span>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-500">Original Amount</span>
                        <span className="font-medium text-gray-800">
                            ₦{formData.amount.toLocaleString()}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-500">Discount (1%)</span>
                        <span className="text-green-600 font-medium">- ₦{discount.toLocaleString()}</span>
                    </div>
                    <div className="border-t border-gray-200 my-2" />
                    <div className="flex justify-between items-center">
                        <span className="text-gray-500 font-semibold">Total</span>
                        <span className="font-bold text-xl text-blue-600">
                            ₦{finalAmount.toLocaleString()}
                        </span>
                    </div>
                </div>

                {!hasSufficientBalance && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                        <ShieldAlert className="text-red-500" />
                        <div>
                            <p className="text-sm font-semibold text-red-700">
                                Insufficient Wallet Balance
                            </p>
                            <p className="text-xs text-red-600">
                                Please fund your wallet to complete this purchase.
                            </p>
                        </div>
                    </div>
                )}

                <div className="flex items-center justify-between mt-8">
                    <Button variant="outline" onClick={onBack} disabled={isProcessing}>
                        <ArrowLeft size={16} className="mr-2" />
                        Back
                    </Button>
                    <Button
                        variant="primary"
                        onClick={onConfirm}
                        disabled={!hasSufficientBalance || isProcessing}
                        isLoading={isProcessing}
                    >
                        Pay with Wallet
                    </Button>
                </div>
            </div>
        </>
    );
};

export const ReviewStep = memo(ReviewStepComponent);