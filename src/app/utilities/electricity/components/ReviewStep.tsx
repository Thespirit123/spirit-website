import Button from "@/components/custom-ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ElectricityFormData } from "@/types";
import React from "react";

interface ReviewStepProps {
    formData: ElectricityFormData;
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
    const { disco, meterNumber, amount, customerInfo, meterType } = formData;

    return (
        <Card>
            <CardHeader>
                <h3 className="text-lg font-medium text-[#394B59]">Review Purchase</h3>
            </CardHeader>
            <CardContent>
                <div className="space-y-4 border-y border-gray-200 py-6">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-500">Provider</span>
                        <span className="font-medium text-[#394B59]">
                            {disco.meter_company}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-500">Meter Number</span>
                        <span className="font-medium text-[#394B59]">{meterNumber}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-500">Customer Name</span>
                        <span className="font-medium text-[#394B59]">
                            {customerInfo.name}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-500">Meter Type</span>
                        <span className="font-medium text-[#394B59] capitalize">
                            {meterType}
                        </span>
                    </div>
                    <div className="flex justify-between items-center text-xl">
                        <span className="text-gray-500">Amount</span>
                        <span className="font-bold text-[#394B59]">
                            ₦{amount.toLocaleString()}
                        </span>
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-between gap-4">
                    <Button variant="secondary" onClick={onBack} fullWidth>
                        Back
                    </Button>
                    <Button onClick={onConfirm} isLoading={isProcessing} fullWidth>
                        Confirm & Pay
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};