import Button from "@/components/custom-ui/button";
import { cn } from "@/lib/utils";
import { TransactionResult } from "@/types";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { memo } from "react";

interface SummaryStepProps {
    result: TransactionResult | null;
}

const SummaryStepComponent: React.FC<SummaryStepProps> = ({ result }) => {
    const router = useRouter();

    if (!result) return null;

    const isSuccess = result.status === "success";

    const { details } = result;

    const originalAmount = details.originalAmount ?? details.amount ?? 0;
    const discount = Math.floor(originalAmount * 0.01);
    const chargedAmount = originalAmount - discount;

    return (
        <div className="text-center">
            {isSuccess ? (
                <CheckCircle size={48} className="mx-auto text-green-500 mb-4" />
            ) : (
                <XCircle size={48} className="mx-auto text-red-500 mb-4" />
            )}
            <h3
                className={cn(
                    "text-xl font-bold mb-2",
                    isSuccess ? "text-gray-800" : "text-red-700"
                )}
            >
                {isSuccess ? "Purchase Successful" : "Purchase Failed"}
            </h3>
            <p className="text-gray-500 mb-6">{result.message}</p>

            <div className="space-y-3 text-left border border-gray-200 rounded-lg p-4 mb-8">
                <div className="flex justify-between items-center">
                    <span className="text-gray-500">Transaction ID</span>
                    <span className="font-mono text-xs text-gray-700">
                        {details.transactionId}
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-500">Date</span>
                    <span className="font-medium text-gray-700">
                        {new Date(details.date).toLocaleString()}
                    </span>
                </div>
                {details.network && (
                    <div className="flex justify-between items-center">
                        <span className="text-gray-500">Network</span>
                        <span className="font-medium text-gray-700">
                            {details.network.name}
                        </span>
                    </div>
                )}
                {details.phoneNumber && (
                    <div className="flex justify-between items-center">
                        <span className="text-gray-500">Recipient</span>
                        <span className="font-medium text-gray-700">
                            {details.phoneNumber}
                        </span>
                    </div>
                )}
                <div className="flex justify-between items-center">
                    <span className="text-gray-500">Original Amount</span>
                    <span className="text-gray-700">
                        ₦{originalAmount.toLocaleString()}
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-500">Discount (1%)</span>
                    <span className="text-green-600">- ₦{discount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center font-semibold border-t border-gray-200 pt-2">
                    <span className="text-gray-700">Amount</span>
                    <span className="text-blue-600 font-bold">
                        ₦{chargedAmount.toLocaleString()}
                    </span>
                </div>
            </div>

            <div className="flex items-center justify-center gap-4">
                <Button variant="outline" onClick={() => window.location.reload()}>
                    Buy Again
                </Button>
                <Button variant="primary" onClick={() => router.push("/utilities")}>
                    Go to Dashboard
                </Button>
            </div>
        </div>
    );
};

export const SummaryStep = memo(SummaryStepComponent);
