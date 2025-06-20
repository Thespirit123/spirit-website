import Button from "@/components/custom-ui/button";
import { FormField } from "@/components/custom-ui/form-field";
import {
  Disco,
  ElectricityCustomerInfo,
  ElectricityFormData,
} from "@/types";
import { Search } from "lucide-react";
import React, { useMemo, useState } from "react";
import { toast } from "react-hot-toast";

interface OrderStepProps {
  discos: Disco[];
  walletBalance: number;
  onSuccess: (data: ElectricityFormData) => void;
}

const selectStyles =
  "flex h-12 w-full items-center justify-between rounded-md border border-neutral-200 bg-transparent px-3 py-2 text-base shadow-sm ring-offset-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm";

export const OrderStep: React.FC<OrderStepProps> = ({
  discos,
  walletBalance,
  onSuccess,
}) => {
  const [selectedDiscoId, setSelectedDiscoId] = useState<string>("");
  const [meterType, setMeterType] = useState<"prepaid" | "postpaid">(
    "prepaid"
  );
  const [meterNumber, setMeterNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [customerInfo, setCustomerInfo] =
    useState<ElectricityCustomerInfo | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const selectedDisco = useMemo(
    () => discos.find((d) => d.meter_id.toString() === selectedDiscoId),
    [discos, selectedDiscoId]
  );

  const handleVerifyMeter = async () => {
    if (!meterNumber || !selectedDisco) {
      toast.error("Please select a provider and enter a meter number.");
      return;
    }
    setIsVerifying(true);
    setCustomerInfo(null);
    try {
      const response = await fetch("/api/utilities/electricity/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          meterId: selectedDisco.meter_id,
          meterType,
          meterNumber,
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);

      setCustomerInfo({ name: result.name, address: result.address });
      toast.success("Meter verified successfully");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to verify meter number."
      );
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericAmount = parseInt(amount, 10);

    if (!selectedDisco || !customerInfo || !amount) {
      toast.error("Please complete all fields and verify your meter.");
      return;
    }
    if (numericAmount < 1000) {
      toast.error("Minimum purchase amount is ₦1,000.");
      return;
    }
    if (numericAmount > walletBalance) {
      toast.error("Insufficient wallet balance.");
      return;
    }

    onSuccess({
      disco: selectedDisco,
      meterNumber,
      meterType,
      amount: numericAmount,
      customerInfo,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="disco-select"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Distribution Company
          </label>
          <select
            id="disco-select"
            value={selectedDiscoId}
            onChange={(e) => setSelectedDiscoId(e.target.value)}
            className={selectStyles}
          >
            <option value="" disabled>
              Select a provider
            </option>
            {discos.map((disco) => (
              <option key={disco.meter_id} value={disco.meter_id}>
                {disco.meter_company}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="meter-type-select"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Meter Type
          </label>
          <select
            id="meter-type-select"
            value={meterType}
            onChange={(e) =>
              setMeterType(e.target.value as "prepaid" | "postpaid")
            }
            className={selectStyles}
          >
            <option value="prepaid">Prepaid</option>
            <option value="postpaid">Postpaid</option>
          </select>
        </div>
      </div>

      <div className="flex items-end gap-3">
        <div className="flex-grow">
          <FormField
            label="Meter Number"
            value={meterNumber}
            onChange={(e) => setMeterNumber(e.target.value)}
            placeholder="Enter meter number"
          />
        </div>
        <Button
          type="button"
          variant="secondary"
          onClick={handleVerifyMeter}
          isLoading={isVerifying}
          disabled={isVerifying || !meterNumber || !selectedDiscoId}
        >
          <Search size={16} className="mr-2" />
          Verify
        </Button>
      </div>

      {customerInfo && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-800">
          <p className="font-semibold">{customerInfo.name}</p>
          <p className="text-sm">{customerInfo.address}</p>
        </div>
      )}

      <FormField
        label="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount (e.g., 2000)"
        disabled={!customerInfo}
        min="1000"
      />

      <Button type="submit" fullWidth disabled={!customerInfo || !amount}>
        Continue
      </Button>
    </form>
  );
};