import { useAuth } from "@/hooks/useAuth";
import { useCallback, useRef } from "react";

interface VerificationResult {
    success: boolean;
    processed: number;
    message: string;
}

export const useTransactionVerification = () => {
    const { user } = useAuth();
    const isVerifyingRef = useRef<boolean>(false);

    const verifyPendingTransactions = useCallback(async (): Promise<VerificationResult> => {
        if (!user?.uid || isVerifyingRef.current) {
            return { success: false, processed: 0, message: "Already verifying" };
        }

        isVerifyingRef.current = true;

        try {
            const token = await user.getIdToken();
            const response = await fetch("/api/utilities/data/verify-pending", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Verification failed: ${response.status}`);
            }

            const result = await response.json();

            return {
                success: true,
                processed: result.processed || 0,
                message: result.message || "Verification completed"
            };
        } catch (error) {
            return {
                success: false,
                processed: 0,
                message: error instanceof Error ? error.message : "Verification failed"
            };
        } finally {
            isVerifyingRef.current = false;
        }
    }, [user]);

    return { verifyPendingTransactions };
};