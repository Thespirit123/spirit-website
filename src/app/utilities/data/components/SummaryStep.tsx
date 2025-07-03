import Button from "@/components/custom-ui/button";
import { useTransactionVerification } from "@/hooks/useTransactionVerification";
import { cn } from "@/lib/utils";
import { TransactionResult } from "@/types/wallet";
import { CheckCircle, RefreshCw, XCircle } from "lucide-react";
import React, { useEffect, useState } from "react";

interface SummaryStepProps {
    result: TransactionResult | null;
    onReset: () => void;
}

type VerificationState = 'idle' | 'checking' | 'verified' | 'failed';

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
    const { verifyPendingTransactions } = useTransactionVerification();
    const [verificationState, setVerificationState] = useState<VerificationState>('idle');
    const [verificationMessage, setVerificationMessage] = useState<string>('');

    useEffect(() => {
        if (result?.status === "failed" && result.details?.transactionId) {
            setVerificationState('checking');
            setVerificationMessage('We\'re checking if your data was delivered successfully...');

            const performVerification = async () => {
                await new Promise(resolve => setTimeout(resolve, 3000));

                const verificationResult = await verifyPendingTransactions();

                if (verificationResult.success && verificationResult.processed > 0) {
                    setVerificationState('verified');
                    setVerificationMessage('Great news! Your transaction was successful and your wallet has been updated.');
                    setTimeout(() => {
                        window.location.reload();
                    }, 3000);
                } else {
                    setVerificationState('failed');
                    setVerificationMessage('Transaction failed. For further assistance, please contact support.');
                }
            };

            performVerification();
        }
    }, [result, verifyPendingTransactions]);

    if (!result) {
        return (
            <div className="text-center p-8">
                <RefreshCw size={48} className="mx-auto text-blue-500 mb-4 animate-spin" />
                <p>Processing your transaction...</p>
            </div>
        );
    }

    const isSuccess = result.status === "success" || verificationState === 'verified';
    const isVerifying = verificationState === 'checking';

    return (
        <div className="text-center">
            {isSuccess ? (
                <CheckCircle size={48} className="mx-auto text-green-500 mb-4" />
            ) : isVerifying ? (
                <RefreshCw size={48} className="mx-auto text-blue-500 mb-4 animate-spin" />
            ) : (
                <XCircle size={48} className="mx-auto text-red-500 mb-4" />
            )}

            <h2
                className={cn(
                    "text-2xl font-bold mb-2",
                    isSuccess
                        ? "text-gray-800"
                        : isVerifying
                            ? "text-blue-600"
                            : "text-red-700"
                )}
            >
                {isSuccess
                    ? "Transaction Successful"
                    : isVerifying
                        ? "Verifying Transaction..."
                        : "Transaction Failed"}
            </h2>

            <p className="text-gray-600 mb-6">
                {verificationState !== 'idle' ? verificationMessage : result.message}
            </p>

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

            {isVerifying && (
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                        Please wait while we verify if your data was delivered. This usually takes just a few seconds.
                    </p>
                </div>
            )}

            {verificationState === 'verified' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800">
                        Transaction verified! Your wallet will be updated and this page will refresh automatically.
                    </p>
                </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                    variant="primary"
                    onClick={onReset}
                    fullWidth
                    disabled={isVerifying}
                >
                    {isVerifying ? 'Verifying...' : 'Buy Again'}
                </Button>
                <Button asLink href="/utilities" variant="outline" fullWidth>
                    Go to Dashboard
                </Button>
            </div>
        </div>
    );
};