import Button from "@/components/custom-ui/button";
import { cn } from "@/lib/utils";
import { TransactionResult } from "@/types/wallet";
import { CheckCircle, XCircle } from "lucide-react";
import React from "react";

interface SummaryStepProps {
    result: TransactionResult | null;
    onReset: () => void;
}

const DetailRow: React.FC<{ label: string; value: React.ReactNode }> = ({
    label,
    value,
}) => (
    <div className="flex justify-between items-start gap-4">
        <span className="text-gray-500 whitespace-nowrap">{label}</span>
        <div className="font-medium text-gray-700 text-right break-all">
            {value}
        </div>
    </div>
);

export const SummaryStep: React.FC<SummaryStepProps> = ({
    result,
    onReset,
}) => {
    if (!result) {
        return (
            <div className="text-center p-8">
                <p>Processing your transaction...</p>
            </div>
        );
    }

    const isSuccess = result.status === "success";

    return (
        <div className="text-center">
            {isSuccess ? (
                <CheckCircle size={48} className="mx-auto text-green-500 mb-4" />
            ) : (
                <XCircle size={48} className="mx-auto text-red-500 mb-4" />
            )}
            <h2
                className={cn(
                    "text-2xl font-bold mb-2",
                    isSuccess ? "text-gray-800" : "text-red-700"
                )}
            >
                {isSuccess ? "Transaction Successful" : "Transaction Failed"}
            </h2>
            <p className="text-gray-600 mb-6">{result.message}</p>

            {result.details && (
                <div className="text-left bg-gray-50 p-4 rounded-lg space-y-3 mb-8">
                    <DetailRow
                        label="Transaction ID:"
                        value={result.details.transactionId}
                    />
                    {result.details.phoneNumber && (
                        <DetailRow label="Recipient:" value={result.details.phoneNumber} />
                    )}
                    {result.details.plan && (
                        <DetailRow
                            label="Plan:"
                            value={`${result.details.plan.plan_size} (${result.details.plan.validity})`}
                        />
                    )}
                    {result.details.plan && (
                        <DetailRow label="Price:" value={result.details.plan.plan_price} />
                    )}
                </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="primary" onClick={onReset} fullWidth>
                    Buy Again
                </Button>
                <Button asLink href="/utilities" variant="outline" fullWidth>
                    Go to Dashboard
                </Button>
            </div>
        </div>
    );
};