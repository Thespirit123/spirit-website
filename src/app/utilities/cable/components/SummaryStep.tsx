import Button from "@/components/custom-ui/button";
import { cn } from "@/lib/utils";
import { CableTransactionResult } from "@/types/cable";
import { CheckCircle, XCircle } from "lucide-react";
import React from "react";

interface SummaryStepProps {
    result: CableTransactionResult | null;
    onReset: () => void;
}

const DetailRow: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
    <div className="flex justify-between items-start gap-4 py-2">
        <span className="text-gray-500 whitespace-nowrap">{label}</span>
        <div className="font-medium text-gray-700 text-right break-all">{value}</div>
    </div>
);

export const SummaryStep: React.FC<SummaryStepProps> = ({ result, onReset }) => {
    if (!result) {
        return <div className="text-center p-8"><p>Processing your transaction...</p></div>;
    }

    const isSuccess = result.status === "success";
    const { details } = result;

    return (
        <div className="text-center">
            {isSuccess ? <CheckCircle size={48} className="mx-auto text-green-500 mb-4" /> : <XCircle size={48} className="mx-auto text-red-500 mb-4" />}
            <h2 className={cn("text-2xl font-bold mb-2", isSuccess ? "text-gray-800" : "text-red-700")}>
                {isSuccess ? "Subscription Successful" : "Subscription Failed"}
            </h2>
            <p className="text-gray-600 mb-6">{result.message}</p>

            {details && (
                <div className="text-left bg-gray-50 p-4 rounded-lg space-y-2 mb-8 divide-y divide-gray-200">
                    <DetailRow label="Transaction ID:" value={details.transactionId} />
                    <DetailRow label="Card Number:" value={details.cableNumber} />
                    <DetailRow label="Customer:" value={details.customerInfo.customer_name} />
                    <DetailRow label="Plan:" value={details.plan.cable_plan_name} />
                    <DetailRow label="Amount Paid:" value={<span className="font-bold">₦{details.amount.toLocaleString()}</span>} />
                </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="primary" onClick={onReset} fullWidth>Buy Again</Button>
                <Button asLink href="/utilities" variant="outline" fullWidth>Go to Dashboard</Button>
            </div>
        </div>
    );
};