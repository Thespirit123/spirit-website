import Button from "@/components/custom-ui/button";
import { FormField } from "@/components/custom-ui/form-field";
import { cn } from "@/lib/utils";
import { AirtimeFormData, Network } from "@/types";
import { Phone, Wallet } from "lucide-react";
import Image from "next/image";
import React, { memo, useMemo, useState } from "react";

interface OrderStepProps {
    onSuccess: (data: AirtimeFormData) => void;
    walletBalance: number;
    networks: Network[];
}

const OrderStepComponent: React.FC<OrderStepProps> = ({
    onSuccess,
    walletBalance,
    networks,
}) => {
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [amount, setAmount] = useState<string>("");
    const [selectedNetwork, setSelectedNetwork] = useState<Network | null>(null);

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^0-9]/g, "");
        setAmount(value);
    };

    const numericAmount = parseInt(amount, 10) || 0;

    const isFormValid = useMemo(
        () => phoneNumber.length >= 11 && numericAmount >= 100 && selectedNetwork,
        [phoneNumber, numericAmount, selectedNetwork]
    );

    const handleSubmit = () => {
        if (isFormValid && selectedNetwork) {
            onSuccess({
                phoneNumber,
                amount: numericAmount,
                network: selectedNetwork,
            });
        }
    };

    return (
        <>
            <div className="flex items-center mb-6">
                <div className="p-2 bg-blue-50 rounded-full mr-3 text-blue-600">
                    <Phone size={20} />
                </div>
                <h3 className="text-lg font-bold text-gray-800">Purchase Details</h3>
            </div>

            <div className="space-y-6">
                <FormField
                    label="Phone Number"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter phone number"
                    maxLength={11}
                />

                <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                        Select Network Provider
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {networks.map((network) => (
                            <button
                                key={network.id}
                                className={cn(
                                    "flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all duration-200",
                                    selectedNetwork?.id === network.id
                                        ? "border-blue-500 bg-blue-50"
                                        : "border-gray-200 hover:border-gray-300"
                                )}
                                onClick={() => setSelectedNetwork(network)}
                            >
                                <Image
                                    src={network.logo}
                                    alt={network.name}
                                    width={48}
                                    height={48}
                                    className="rounded-md mb-2"
                                />
                                <span
                                    className={cn(
                                        "text-sm",
                                        selectedNetwork?.id === network.id
                                            ? "text-blue-600 font-semibold"
                                            : "text-gray-500"
                                    )}
                                >
                                    {network.name}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <FormField
                        label="Amount"
                        type="text"
                        value={amount ? `₦${numericAmount.toLocaleString()}` : ""}
                        onChange={handleAmountChange}
                        placeholder="Enter amount"
                    />
                    <p className="mt-1 text-xs text-gray-500">Minimum amount: ₦100</p>
                </div>
            </div>

            <div className="flex items-center justify-between mt-8">
                <div className="flex items-center">
                    <Wallet size={18} className="text-blue-600 mr-2" />
                    <span className="text-sm text-gray-600">
                        Wallet Balance:{" "}
                        <strong className="text-gray-800">
                            ₦{walletBalance.toLocaleString()}
                        </strong>
                    </span>
                </div>
                <Button
                    variant="primary"
                    onClick={handleSubmit}
                    disabled={!isFormValid}
                >
                    Continue
                </Button>
            </div>
        </>
    );
};

export const OrderStep = memo(OrderStepComponent);