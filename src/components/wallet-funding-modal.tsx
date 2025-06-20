import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
import { FlutterWaveResponse } from "flutterwave-react-v3/dist/types";
import { useState } from "react";
import Button from "./custom-ui/button";
import { FormField } from "./custom-ui/form-field";
import { Modal, ModalBody, ModalHeader } from "./ui/modal";

interface WalletFundingModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (response: FlutterWaveResponse, amount: number) => void;
    onError: (error: { code: string; message: string }) => void;
    customerInfo: {
        name: string;
        email: string;
        phone: string;
    };
}

export const WalletFundingModal = ({
    isOpen,
    onClose,
    onSuccess,
    onError,
    customerInfo,
}: WalletFundingModalProps) => {
    const [amount, setAmount] = useState<string>("");
    const [paymentStatus, setPaymentStatus] = useState<"idle" | "success" | "failed">("idle");

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^0-9]/g, "");
        setAmount(value);
    };

    const numericAmount = parseInt(amount, 10) || 0;

    const handleClose = () => {
        setAmount("");
        setPaymentStatus("idle");
        onClose();
    };

    const config = {
        public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY!,
        tx_ref: Date.now().toString(),
        amount: numericAmount,
        currency: "NGN",
        payment_options: "card,mobilemoney,banktransfer",
        customer: {
            email: customerInfo.email,
            phone_number: customerInfo.phone,
            name: customerInfo.name,
        },
        customizations: {
            title: "Spirit Media - Wallet Funding",
            description: `Add ₦${numericAmount.toLocaleString()} to your wallet`,
            logo: "https://46gozvqrkdqidcjl.public.blob.vercel-storage.com/Logo%202%20(Black%20bg)-oa6kh1QmsSpldy6txxtPw20bMPjGHw.jpg",
        },
        text: "Fund Wallet",
    };

    const fwConfig = {
        ...config,
        text: "Fund Wallet",
        callback: (response: FlutterWaveResponse) => {
            if (response.status === "completed") {
                const safeResponse = {
                    ...response,
                    // @ts-expect-error
                    processor_response: response.processor_response || "No response",
                    flw_ref: response.flw_ref || "",
                    transaction_id: response.transaction_id || Date.now().toString(),
                    charged_amount: response.charged_amount || numericAmount,
                    currency: response.currency || "NGN",
                    customer: {
                        email: response.customer?.email || customerInfo.email,
                        name: response.customer?.name || customerInfo.name,
                        phone_number: response.customer?.phone_number || customerInfo.phone
                    },
                    // @ts-expect-error
                    payment_type: response.payment_type || "Unknown"
                };

                setPaymentStatus("success");
                // @ts-expect-error
                onSuccess(safeResponse, numericAmount);
                closePaymentModal();
                handleClose();
            } else {
                setPaymentStatus("failed");
                onError({
                    code: "PAYMENT_FAILED",
                    message: "Payment was not successful",
                });
            }
        },
        onClose: () => {
            if (paymentStatus !== "success") {
                onError({
                    code: "PAYMENT_INCOMPLETE",
                    message: "Payment was not completed",
                });
            }
            closePaymentModal();
            handleClose();
        },
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} className="sm:max-w-[500px]">
            <ModalHeader>
                <h2 className="text-xl md:text-2xl font-semibold">Fund Your Wallet</h2>
            </ModalHeader>

            <ModalBody>
                <div className="py-4 md:py-6">
                    <div className="space-y-6 max-w-md mx-auto">
                        <FormField
                            label="Amount to Fund"
                            type="text"
                            required
                            placeholder="Enter amount"
                            value={amount ? `₦${parseInt(amount).toLocaleString()}` : ""}
                            onChange={handleAmountChange}
                        />

                        <div className="grid grid-cols-3 gap-2">
                            {[1000, 2000, 5000, 10000, 20000, 50000].map((preset) => (
                                <Button
                                    key={preset}
                                    variant="outline"
                                    onClick={() => setAmount(preset.toString())}
                                    className="py-2"
                                >
                                    ₦{preset.toLocaleString()}
                                </Button>
                            ))}
                        </div>

                        <div className="mt-6">
                            <FlutterWaveButton
                                {...fwConfig}
                                className="w-full py-3 px-6 rounded-lg font-semibold bg-[#008EA8] text-white hover:bg-[#007A91] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#008EA8]/50 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={numericAmount < 100}
                            />
                            {numericAmount < 100 && (
                                <p className="mt-2 text-sm text-red-500">
                                    Minimum funding amount is ₦100
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </ModalBody>
        </Modal>
    );
};