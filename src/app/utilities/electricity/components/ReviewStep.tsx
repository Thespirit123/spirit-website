import Button from "@/components/custom-ui/button";
import { ElectricityFormData } from "@/types";
import { ArrowLeft } from "lucide-react";
import React from "react";

interface ReviewStepProps {
  formData: ElectricityFormData;
  onConfirm: () => void;
  onBack: () => void;
  isProcessing: boolean;
}

const DetailRow: React.FC<{ label: string; value: React.ReactNode }> = ({
  label,
  value,
}) => (
  <div className="flex justify-between items-center">
    <span className="text-gray-600">{label}</span>
    <div className="font-medium text-gray-800 text-right">{value}</div>
  </div>
);

export const ReviewStep: React.FC<ReviewStepProps> = ({
  formData,
  onConfirm,
  onBack,
  isProcessing,
}) => {
  const { disco, meterNumber, amount, customerInfo, meterType } = formData;

  return (
    <div>
      <h3 className="text-lg font-semibold text-center mb-6">
        Review Your Purchase
      </h3>
      <div className="space-y-4 border border-gray-200 rounded-lg p-4">
        <DetailRow label="Provider" value={disco.meter_company} />
        <DetailRow label="Meter Number" value={meterNumber} />
        <DetailRow label="Customer Name" value={customerInfo.name} />
        <DetailRow
          label="Meter Type"
          value={<span className="capitalize">{meterType}</span>}
        />
        <div className="border-t border-gray-200 my-2" />
        <DetailRow
          label="Total Price"
          value={
            <span className="font-bold text-xl text-blue-600">
              ₦{amount.toLocaleString()}
            </span>
          }
        />
      </div>
      <div className="mt-8 flex items-center justify-between gap-4">
        <Button variant="outline" onClick={onBack} disabled={isProcessing}>
          <ArrowLeft size={16} className="mr-2" />
          Back
        </Button>
        <Button onClick={onConfirm} isLoading={isProcessing} variant="primary">
          Confirm & Pay
        </Button>
      </div>
    </div>
  );
};