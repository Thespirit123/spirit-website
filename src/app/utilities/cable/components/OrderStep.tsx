import Button from "@/components/custom-ui/button";
import { FormField } from "@/components/custom-ui/form-field";
import { CableCompany, CableFormData, CablePlan, CustomerInfo } from "@/types/cable";
import React, { useCallback, useMemo, useState } from "react";
import { toast } from "react-hot-toast";

interface OrderStepProps {
    companies: CableCompany[];
    allPlans: CablePlan[];
    walletBalance: number;
    onSuccess: (data: CableFormData) => void;
}

const selectStyles = "flex h-12 w-full items-center justify-between rounded-md border border-neutral-200 bg-transparent px-3 py-2 text-base shadow-sm ring-offset-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm";

const parsePrice = (price: string): number => {
    return parseFloat(price.replace(/[^0-9.]/g, ""));
};

export const OrderStep: React.FC<OrderStepProps> = ({ companies, allPlans, walletBalance, onSuccess }) => {
    const [selectedCompanyId, setSelectedCompanyId] = useState<string>("");
    const [selectedPlanId, setSelectedPlanId] = useState<string>("");
    const [cableNumber, setCableNumber] = useState("");
    const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);
    const [isValidating, setIsValidating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const selectedCompany = useMemo(() => companies.find(c => c.apiId === selectedCompanyId), [companies, selectedCompanyId]);
    const filteredPlans = useMemo(() => allPlans.filter(p => p.cable_company === selectedCompany?.id), [allPlans, selectedCompany]);
    const selectedPlan = useMemo(() => filteredPlans.find(p => p.cable_id.toString() === selectedPlanId), [filteredPlans, selectedPlanId]);

    const handleValidation = useCallback(async () => {
        if (!selectedCompany || !cableNumber) {
            setError("Please select a company and enter a card number.");
            return;
        }
        setIsValidating(true);
        setError(null);
        setCustomerInfo(null);
        try {
            const response = await fetch(`/api/utilities/cable/validate?companyApiId=${selectedCompany.apiId}&cableNumber=${cableNumber}`);
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            setCustomerInfo(data);
            toast.success("Card number validated successfully!");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Validation failed.");
            toast.error(err instanceof Error ? err.message : "Validation failed.");
        } finally {
            setIsValidating(false);
        }
    }, [selectedCompany, cableNumber]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!selectedCompany || !selectedPlan || !cableNumber || !customerInfo) {
            setError("Please complete all fields and validate your card number.");
            return;
        }

        const planPrice = parsePrice(selectedPlan.price);
        if (planPrice > walletBalance) {
            setError("Insufficient wallet balance.");
            return;
        }

        onSuccess({
            company: selectedCompany,
            plan: selectedPlan,
            cableNumber,
            customerInfo,
            amount: planPrice,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="company-select" className="block text-sm font-medium text-gray-700 mb-1">Provider</label>
                    <select id="company-select" value={selectedCompanyId} onChange={e => { setSelectedCompanyId(e.target.value); setSelectedPlanId(""); setCustomerInfo(null); }} className={selectStyles}>
                        <option value="" disabled>Select Provider</option>
                        {companies.map(c => <option key={c.id} value={c.apiId}>{c.name}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="plan-select" className="block text-sm font-medium text-gray-700 mb-1">Plan</label>
                    <select id="plan-select" value={selectedPlanId} onChange={e => setSelectedPlanId(e.target.value)} disabled={!selectedCompanyId} className={selectStyles}>
                        <option value="" disabled>Select Plan</option>
                        {filteredPlans.map(p => <option key={p.cable_id} value={p.cable_id}>{`${p.cable_plan_name} - ${p.price}`}</option>)}
                    </select>
                </div>
            </div>
            <div className="flex items-end gap-2">
                <FormField label="Smartcard / IUC Number" type="tel" required placeholder="Enter your card number" value={cableNumber} onChange={e => { setCableNumber(e.target.value); setCustomerInfo(null); }} className="flex-grow" />
                <Button type="button" className="h-10" variant="outline" onClick={handleValidation} disabled={isValidating || !cableNumber || !selectedCompanyId} isLoading={isValidating}>
                    Validate
                </Button>
            </div>
            {customerInfo && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-md text-center">
                    <p className="text-sm text-green-800 font-medium">{customerInfo.customer_name}</p>
                </div>
            )}
            {selectedPlan && (
                <div className="p-4 bg-gray-50 rounded-md text-center">
                    <p className="text-gray-600">Price</p>
                    <p className="text-2xl font-bold text-gray-800">{selectedPlan.price}</p>
                </div>
            )}
            {error && <p className="text-sm text-red-600 text-center">{error}</p>}
            <Button type="submit" fullWidth disabled={!customerInfo || !selectedPlan}>Continue</Button>
        </form>
    );
};