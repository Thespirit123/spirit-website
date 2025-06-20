import Button from "@/components/custom-ui/button";
import { DataFormData } from "@/types/wallet";
import Image from "next/image";
import React from "react";

interface ReviewStepProps {
    formData: DataFormData;
    onConfirm: () => void;
    onBack: () => void;
    isProcessing: boolean;
}

export const ReviewStep: React.FC<ReviewStepProps> = ({
    formData,
    onConfirm,
    onBack,
    isProcessing,
}) => {
    const { network, plan, phoneNumber } = formData;

    return (
        <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-center mb-6">
                Review Your Order
            </h3>
            <div className="space-y-4 border-y border-gray-200 py-6">
                <div className="flex justify-between items-center">
                    <span className="text-gray-600">Network</span>
                    <div className="flex items-center font-medium">
                        <Image
                            src={network.logo}
                            alt={`${network.name} logo`}
                            width={24}
                            height={24}
                            className="mr-2"
                        />
                        {network.name}
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-600">Phone Number</span>
                    <span className="font-medium">{phoneNumber}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-600">Data Plan</span>
                    <span className="font-medium text-right">{`${plan.plan_size} (${plan.validity})`}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-600">Price</span>
                    <span className="font-medium">{plan.plan_price}</span>
                </div>
            </div>
            <div className="mt-6 flex items-center justify-between gap-4">
                <Button variant="outline" onClick={onBack} fullWidth>
                    Back
                </Button>
                <Button onClick={onConfirm} isLoading={isProcessing} fullWidth>
                    Confirm & Pay
                </Button>
            </div>
        </div>
    );
};