import Button from "@/components/custom-ui/button";
import { FormField } from "@/components/custom-ui/form-field";
import { DataFormData, DataPlan, Network } from "@/types/wallet";
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

const selectStyles =
    "flex h-12 w-full items-center justify-between rounded-md border border-neutral-200 bg-transparent px-3 py-2 text-base shadow-sm ring-offset-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm";

export const OrderStep: React.FC<OrderStepProps> = ({
    onSuccess,
    walletBalance,
    networks,
    allPlans,
}) => {
    const [selectedNetworkId, setSelectedNetworkId] = useState<string>("");
    const [selectedPlanId, setSelectedPlanId] = useState<string>("");
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
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label
                        htmlFor="network-select"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Network
                    </label>
                    <select
                        id="network-select"
                        value={selectedNetworkId}
                        onChange={(e) => {
                            setSelectedNetworkId(e.target.value);
                            setSelectedPlanId("");
                        }}
                        className={selectStyles}
                    >
                        <option value="" disabled>
                            Select a network
                        </option>
                        {networks.map((network) => (
                            <option key={network.id} value={network.id}>
                                {network.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label
                        htmlFor="plan-select"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Data Plan
                    </label>
                    <select
                        id="plan-select"
                        value={selectedPlanId}
                        onChange={(e) => setSelectedPlanId(e.target.value)}
                        disabled={!selectedNetworkId}
                        className={selectStyles}
                    >
                        <option value="" disabled>
                            Select a data plan
                        </option>
                        {filteredPlans.map((plan) => (
                            <option key={plan.plan_id} value={plan.plan_id.toString()}>
                                {`${plan.plan_size} (${plan.validity}) - ${plan.plan_price}`}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <FormField
                label="Phone Number"
                type="tel"
                required
                placeholder="08012345678"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                maxLength={11}
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

            <Button type="submit" fullWidth disabled={!selectedPlan || !phoneNumber}>
                Continue
            </Button>
        </form>
    );
};