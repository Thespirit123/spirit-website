import { Copy } from "lucide-react";
import { useState } from "react";
import Button from "./custom-ui/button";
import { Modal, ModalBody, ModalHeader } from "./ui/modal";

export interface VirtualWalletData {
    account_number: string;
    account_name: string;
    account_reference: string;
    bank_name: string;
    is_existing: boolean;
}

interface WalletFundingModalProps {
    isOpen: boolean;
    onClose: () => void;
    walletData: VirtualWalletData | null;
}

export const WalletFundingModal = ({
    isOpen,
    onClose,
    walletData,
}: WalletFundingModalProps) => {
    const [copiedField, setCopiedField] = useState<"bank" | "account" | null>(null);

    const handleCopy = (value: string, field: "bank" | "account") => {
        navigator.clipboard.writeText(value);
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 1200);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="sm:max-w-[500px]">
            <ModalHeader>
                <h2 className="text-xl md:text-2xl font-semibold">Fund Your Wallet</h2>
            </ModalHeader>
            <ModalBody>
                <div className="py-4 md:py-6">
                    {walletData ? (
                        <div className="space-y-6 max-w-md mx-auto">
                            <div className="bg-[#F5F7F9] rounded-lg p-6 flex flex-col items-center">
                                <div className="mb-4 text-center w-full">
                                    <p className="text-lg font-semibold text-[#394B59]">Bank Name</p>
                                    <div className="flex items-center justify-center gap-2">
                                        <p className="text-xl font-bold text-[#008EA8]">{walletData.bank_name}</p>
                                        <button
                                            type="button"
                                            onClick={() => handleCopy(walletData.bank_name, "bank")}
                                            aria-label="Copy bank name"
                                            className="p-1 rounded hover:bg-gray-200"
                                        >
                                            {copiedField === "bank" ? (
                                                <span className="text-xs text-green-600">Copied</span>
                                            ) : (
                                                <Copy size={18} className="text-gray-500" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                                <div className="mb-4 text-center w-full">
                                    <p className="text-lg font-semibold text-[#394B59]">Account Number</p>
                                    <div className="flex items-center justify-center gap-2">
                                        <p className="text-xl font-bold text-[#008EA8]">{walletData.account_number}</p>
                                        <button
                                            type="button"
                                            onClick={() => handleCopy(walletData.account_number, "account")}
                                            aria-label="Copy account number"
                                            className="p-1 rounded hover:bg-gray-200"
                                        >
                                            {copiedField === "account" ? (
                                                <span className="text-xs text-green-600">Copied</span>
                                            ) : (
                                                <Copy size={18} className="text-gray-500" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                                <div className="mb-4 text-center">
                                    <p className="text-lg font-semibold text-[#394B59]">Account Name</p>
                                    <p className="text-xl font-bold text-[#008EA8]">{walletData.account_name}</p>
                                </div>
                                <div className="mt-6 text-center">
                                    <p className="text-sm text-[#8E9BAA]">
                                        Transfer any amount to this account. Your wallet will be funded automatically.
                                    </p>
                                </div>
                            </div>
                            <Button variant="primary" fullWidth onClick={onClose}>
                                Close
                            </Button>
                        </div>
                    ) : (
                        <div className="text-center py-8">No account details available.</div>
                    )}
                </div>
            </ModalBody>
        </Modal>
    );
};