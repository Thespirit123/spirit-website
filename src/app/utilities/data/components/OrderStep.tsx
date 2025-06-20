import Button from "@/components/custom-ui/button";
import { FormField } from "@/components/custom-ui/form-field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DataFormData, DataPlan, Network } from "@/types/wallet";
import Image from "next/image";
import React, { useMemo, useState } from "react";

interface OrderStepProps {
    onSuccess: (data: DataFormData) => void;
    walletBalance: number;
    networks: Network[];
    allPlans: DataPlan[];
}

const parsePrice = (price: string): number => {
    return parseFloat(price.replace("NGN ", "").replace(",", ""));
};

export const OrderStep: React.FC<OrderStepProps> = ({
    onSuccess,
    walletBalance,
    networks,
    allPlans,
}) => {
    const [selectedNetworkId, setSelectedNetworkId] = useState<string | null>(null);
    const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [error, setError] = useState<string | null>(null);

    const selectedNetwork = useMemo(
        () => networks.find((n) => n.id === selectedNetworkId),
        [selectedNetworkId, networks]
    );

    const filteredPlans = useMemo(
        () => allPlans.filter((plan) => plan.network === selectedNetworkId),
        [selectedNetworkId, allPlans]
    );

    const selectedPlan = useMemo(
        () => filteredPlans.find((p) => p.plan_id.toString() === selectedPlanId),
        [selectedPlanId, filteredPlans]
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!selectedNetwork || !selectedPlan || !phoneNumber) {
            setError("Please fill in all fields.");
            return;
        }

        if (!/^\d{11}$/.test(phoneNumber)) {
            setError("Please enter a valid 11-digit phone number.");
            return;
        }

        const planPrice = parsePrice(selectedPlan.plan_price);
        if (planPrice > walletBalance) {
            setError("Insufficient wallet balance for this plan.");
            return;
        }

        onSuccess({
            network: selectedNetwork,
            plan: selectedPlan,
            phoneNumber,
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-lg shadow-md space-y-6"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Network
                    </label>
                    <Select
                        onValueChange={(value) => {
                            setSelectedNetworkId(value);
                            setSelectedPlanId(null);
                        }}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select a network" />
                        </SelectTrigger>
                        <SelectContent>
                            {networks.map((network) => (
                                <SelectItem key={network.id} value={network.id}>
                                    <div className="flex items-center">
                                        <Image
                                            src={network.logo}
                                            alt={`${network.name} logo`}
                                            width={20}
                                            height={20}
                                            className="mr-2"
                                        />
                                        {network.name}
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Data Plan
                    </label>
                    <Select
                        onValueChange={setSelectedPlanId}
                        disabled={!selectedNetworkId}
                        value={selectedPlanId ?? ""}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select a data plan" />
                        </SelectTrigger>
                        <SelectContent>
                            {filteredPlans.map((plan) => (
                                <SelectItem key={plan.plan_id} value={plan.plan_id.toString()}>
                                    {`${plan.plan_size} (${plan.validity}) - ${plan.plan_price}`}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <FormField
                label="Phone Number"
                type="tel"
                required
                placeholder="08012345678"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
            />

            {selectedPlan && (
                <div className="p-4 bg-gray-50 rounded-md text-center">
                    <p className="text-gray-600">Price</p>
                    <p className="text-2xl font-bold text-gray-800">
                        {selectedPlan.plan_price}
                    </p>
                </div>
            )}

            {error && <p className="text-sm text-red-600 text-center">{error}</p>}

            <Button type="submit" fullWidth>
                Continue
            </Button>
        </form>
    );
};