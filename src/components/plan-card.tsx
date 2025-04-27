import { cn } from "@/lib/utils";
import { PaymentPlan } from "@/types";
import { Check } from "lucide-react";
import { RadioGroupItem } from "./ui/radio-group";

interface PlanCardProps {
  plan: PaymentPlan;
  isSelected: boolean;
  onSelect: () => void;
}

export const PlanCard = ({ plan, isSelected, onSelect }: PlanCardProps) => {
  return (
    <div
      onClick={onSelect}
      className={cn(
        "relative flex flex-col p-4 md:p-6 rounded-xl border-2 cursor-pointer",
        "hover:border-brand-primary/50 transition-colors",
        "focus-within:ring-2 focus-within:ring-brand-primary focus-within:ring-offset-2",
        isSelected ? "border-brand-primary" : "border-gray-200"
      )}
    >
      <RadioGroupItem
        value={plan.id}
        id={plan.id}
        className={cn(
          "absolute right-4 top-4",
          "border-2 data-[state=checked]:border-brand-primary data-[state=checked]:bg-brand-primary",
          "data-[state=checked]:text-white"
        )}
        checked={isSelected}
        onClick={(e) => e.stopPropagation()} // Prevent double trigger
      />

      <div className="mb-4">
        <h3 className="font-semibold text-lg">{plan.name}</h3>
        <div className="flex items-baseline gap-2">
          <p className="text-2xl font-bold">₦{plan.price.toLocaleString()}</p>
          {plan.originalPrice && (
            <p className="text-sm text-gray-500 line-through">
              ₦{plan.originalPrice.toLocaleString()}
            </p>
          )}
        </div>
        <p className="text-sm text-gray-500">{plan.duration}</p>
        <div className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-brand-primary">
          <span>For {plan.platform === "ios" ? "iOS" : "Android"}</span>
        </div>
      </div>

      <ul className="space-y-2">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <Check className="w-5 h-5 text-green-500" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
};
