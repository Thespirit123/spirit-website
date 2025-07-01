import Button from "@/components/custom-ui/button";
import { CableFormData } from "@/types/cable";
import { ArrowLeft } from "lucide-react";
import React from "react";

interface ReviewStepProps {
    formData: CableFormData;
    onConfirm: () => void;
    onBack: () => void;
    isProcessing: boolean;
}

const DetailRow: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
    <div className="flex justify-between items-center py-3">
        <span className="text-gray-600">{label}</span>
        <div className="font-medium text-gray-800 text-right">{value}</div>
    </div>
);

export const ReviewStep: React.FC<ReviewStepProps> = ({ formData, onConfirm, onBack, isProcessing }) => {
    const { company, plan, cableNumber, customerInfo, amount } = formData;

    return (
        <div>
            <h3 className="text-lg font-semibold text-center mb-6">Review Your Subscription</h3>
            <div className="space-y-2 border border-gray-200 rounded-lg p-4 divide-y divide-gray-100">
                <DetailRow label="Provider" value={
                    <div className="flex items-center gap-2">
                        <span>{company.name}</span>
                    </div>
                } />
                <DetailRow label="Card Number" value={cableNumber} />
                <DetailRow label="Customer Name" value={customerInfo.customer_name} />
                <DetailRow label="Plan" value={plan.cable_plan_name} />
                <DetailRow label="Total Price" value={<span className="font-bold text-xl text-blue-600">₦{amount.toLocaleString()}</span>} />
            </div>
            <div className="mt-8 flex items-center justify-between gap-4">
                <Button variant="outline" onClick={onBack} disabled={isProcessing}>
                    <ArrowLeft size={16} className="mr-2" />
                    Back
                </Button>
                <Button onClick={onConfirm} isLoading={isProcessing} variant="primary">
                    Confirm & Pay
                </Button>
            </div>
        </div>
    );
};