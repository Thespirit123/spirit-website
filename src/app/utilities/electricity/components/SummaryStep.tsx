import Button from "@/components/custom-ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ElectricityTransactionResult } from "@/types";
import { CheckCircle, Copy, XCircle } from "lucide-react";
import React from "react";
import { toast } from "react-hot-toast";

interface SummaryStepProps {
    result: ElectricityTransactionResult | null;
    onReset: () => void;
}

export const SummaryStep: React.FC<SummaryStepProps> = ({
    result,
    onReset,
}) => {
    if (!result) {
        return (
            <Card>
                <CardContent className="p-8 text-center">
                    <p>Processing your transaction...</p>
                </CardContent>
            </Card>
        );
    }

    const isSuccess = result.status === "success";

    const handleCopyToken = () => {
        if (result.details.token) {
            navigator.clipboard.writeText(result.details.token);
            toast.success("Token copied to clipboard!");
        }
    };

    return (
        <Card>
            <CardContent className="p-8 text-center">
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

                {isSuccess && result.details.token && (
                    <div className="bg-[#F5F7F9] p-4 rounded-lg mb-6">
                        <p className="text-sm text-gray-500 mb-2">Your electricity token:</p>
                        <div className="flex items-center justify-between bg-white p-3 rounded-md border">
                            <span className="text-lg font-bold text-[#008EA8] tracking-wider">
                                {result.details.token}
                            </span>
                            <Button size="sm" variant="secondary" onClick={handleCopyToken}>
                                <Copy size={16} />
                            </Button>
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
            </CardContent>
        </Card>
    );
};