import Button from "@/components/custom-ui/button";
import { TransactionResult } from "@/types/wallet";
import { CheckCircle, XCircle } from "lucide-react";
import React from "react";

interface SummaryStepProps {
    result: TransactionResult | null;
    onReset: () => void;
}

export const SummaryStep: React.FC<SummaryStepProps> = ({ result, onReset }) => {
    if (!result) {
        return (
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <p>Processing your transaction...</p>
            </div>
        );
    }

    const isSuccess = result.status === "success";

    return (
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="flex justify-center mb-4">
                {isSuccess ? (
                    <CheckCircle className="w-16 h-16 text-green-500" />
                ) : (
                    <XCircle className="w-16 h-16 text-red-500" />
                )}
            </div>
            <h2 className="text-2xl font-bold mb-2">
                {isSuccess ? "Transaction Successful" : "Transaction Failed"}
            </h2>
            <p className="text-gray-600 mb-6">{result.message}</p>

            {result.details && (
                <div className="text-left bg-gray-50 p-4 rounded-md space-y-2 mb-6">
                    <div className="flex justify-between">
                        <span className="text-gray-500">Recipient:</span>
                        <span className="font-medium">{result.details.phoneNumber}</span>
                    </div>
                    {result.details.plan && (
                        <div className="flex justify-between">
                            <span className="text-gray-500">Plan:</span>
                            <span className="font-medium">{`${result.details.plan.plan_size} (${result.details.plan.validity})`}</span>
                        </div>
                    )}
                    <div className="flex justify-between">
                        <span className="text-gray-500">Transaction ID:</span>
                        <span className="font-medium break-all text-right">
                            {result.details.transactionId}
                        </span>
                    </div>
                </div>
            )}

            <div className="flex gap-4">
                <Button asLink href="/utilities" variant="outline" fullWidth>
                    Go to Dashboard
                </Button>
                <Button onClick={onReset} fullWidth>
                    Buy Again
                </Button>
            </div>
        </div>
    );
};