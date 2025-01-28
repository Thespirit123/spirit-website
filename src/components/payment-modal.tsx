import { MOVIE_PORTAL_PLANS, WHATSAPP_TOOL_PLANS } from "@/lib/pricing";
import { cn } from "@/lib/utils";
import {
  CustomerInfo,
  FlutterwaveConfig,
  PaymentModalProps,
  PaymentPlan,
} from "@/types";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
import { FlutterWaveResponse } from "flutterwave-react-v3/dist/types";
import { useEffect, useState } from "react";
import { FormField } from "./custom-ui/form-field";
import { PlanCard } from "./plan-card";
import { Modal, ModalBody, ModalHeader } from "./ui/modal";
import { RadioGroup } from "./ui/radio-group";

type Step = 1 | 2;

const StepOne = ({
  plans,
  selectedPlan,
  onPlanSelect,
  onNext,
}: {
  plans: PaymentPlan[];
  selectedPlan?: string;
  onPlanSelect: (id: string) => void;
  onNext: () => void;
}) => (
  <div className="py-4 md:py-6">
    <RadioGroup
      onValueChange={onPlanSelect}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      {plans.map((plan) => (
        <PlanCard
          key={plan.id}
          plan={plan}
          isSelected={selectedPlan === plan.id}
          onSelect={() => onPlanSelect(plan.id)}
        />
      ))}
    </RadioGroup>
    <div className="mt-6 max-w-md mx-auto">
      <button
        onClick={onNext}
        disabled={!selectedPlan}
        className={cn(
          "w-full py-3 rounded-lg font-semibold transition-colors",
          selectedPlan
            ? "bg-brand-primary text-white hover:bg-brand-primary/90"
            : "bg-gray-100 text-gray-400 cursor-not-allowed"
        )}
      >
        Continue
      </button>
    </div>
  </div>
);

interface StepTwoProps {
  selectedPlanDetails: PaymentPlan;
  customerInfo: CustomerInfo;
  setCustomerInfo: (info: CustomerInfo) => void;
  onBack: () => void;
  fwConfig: FlutterwaveConfig;
}

const StepTwo = ({
  selectedPlanDetails,
  customerInfo,
  setCustomerInfo,
  onBack,
  fwConfig,
}: StepTwoProps) => {
  const isWhatsAppTool = selectedPlanDetails.name
    .toLowerCase()
    .includes("whatsapp");
  return (
    <div className="py-4 md:py-6">
      <div className="relative mb-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-transparent" />
        <div className="relative p-6 border border-brand-primary/20 rounded-xl">
          {!isWhatsAppTool && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-sm mb-3">
              <span>
                {selectedPlanDetails.platform === "ios" ? "iOS" : "Android"}
              </span>
            </div>
          )}

          <div className="space-y-1">
            <h3 className="text-xl font-semibold text-gray-900">
              {selectedPlanDetails.name}
            </h3>
            <p className="text-sm text-gray-600">
              {selectedPlanDetails.duration}
            </p>
          </div>

          <div className="mt-4 flex items-baseline gap-2">
            <p className="text-3xl font-bold text-gray-900">
              ₦{selectedPlanDetails.price.toLocaleString()}
            </p>
            {selectedPlanDetails.originalPrice && (
              <p className="text-base text-gray-500 line-through">
                ₦{selectedPlanDetails.originalPrice.toLocaleString()}
              </p>
            )}
          </div>

          <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
            <span>✓ Instant Access</span>
            <span>•</span>
            <span>✓ Lifetime Updates</span>
            <span>•</span>
            <span>✓ 24/7 Support</span>
          </div>
        </div>
      </div>

      <div className="space-y-4 max-w-md mx-auto">
        <FormField
          label="Full Name"
          type="text"
          required
          placeholder="Enter your full name"
          value={customerInfo.name}
          onChange={(e) =>
            setCustomerInfo({ ...customerInfo, name: e.target.value })
          }
        />
        <FormField
          label="Email Address"
          type="email"
          required
          placeholder="Enter your email address"
          value={customerInfo.email}
          onChange={(e) =>
            setCustomerInfo({ ...customerInfo, email: e.target.value })
          }
        />
        <FormField
          label="Phone Number"
          type="tel"
          required
          placeholder="Enter your phone number"
          value={customerInfo.phone}
          onChange={(e) =>
            setCustomerInfo({ ...customerInfo, phone: e.target.value })
          }
        />
        <FormField
          label="Referral Code (Optional)"
          type="text"
          placeholder="Have a referral code?"
          value={customerInfo.referralCode || ""}
          onChange={(e) =>
            setCustomerInfo({
              ...customerInfo,
              referralCode: e.target.value.trim(),
            })
          }
        />
      </div>

      <div className="mt-8 flex items-center justify-between gap-6 max-w-md mx-auto">
        <button
          onClick={onBack}
          className={cn(
            "flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-200",
            "text-gray-600 bg-gray-100 hover:bg-gray-200",
            "focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
          aria-label="Go back to plan selection"
        >
          ← Back
        </button>

        <FlutterWaveButton
          {...fwConfig}
          className={cn(
            "flex-[2] py-3 px-6 rounded-lg font-semibold transition-all duration-200",
            "bg-brand-primary text-white hover:bg-brand-primary/90",
            "focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
          disabled={
            !customerInfo.name || !customerInfo.email || !customerInfo.phone
          }
        />
      </div>
    </div>
  );
};

export const PaymentModal = ({
  isOpen,
  onClose,
  productType,
  onPaymentSuccess,
  onPaymentError,
  initialPlan,
  customerInfo,
  setCustomerInfo,
}: PaymentModalProps) => {
  const [step, setStep] = useState<Step>(() => {
    const initialStep = productType === "whatsapp-tool" || initialPlan ? 2 : 1;
    return initialStep;
  });

  const [selectedPlan, setSelectedPlan] = useState<string>(() => {
    const initialSelectedPlan =
      productType === "whatsapp-tool"
        ? WHATSAPP_TOOL_PLANS[0].id
        : initialPlan || "";
    return initialSelectedPlan;
  });

  const plans =
    productType === "movie-portal" ? MOVIE_PORTAL_PLANS : WHATSAPP_TOOL_PLANS;
  const selectedPlanDetails = plans.find((plan) => plan.id === selectedPlan);

  const [paymentStatus, setPaymentStatus] = useState<
    "idle" | "success" | "failed"
  >("idle");

  useEffect(() => {
    if (initialPlan) {
      setStep(2);
      setSelectedPlan(initialPlan);
    }
  }, [initialPlan]);

  const handleClose = () => {
    if (productType === "whatsapp-tool") {
      setPaymentStatus("idle");
    } else {
      setStep(1);
      setSelectedPlan("");
      setPaymentStatus("idle");
    }

    onClose();
  };

  useEffect(() => {
    if (isOpen && productType === "whatsapp-tool") {
      setStep(2);
      setSelectedPlan(WHATSAPP_TOOL_PLANS[0].id);
    }
  }, [isOpen, productType]);

  const handleBack = () => {
    if (productType === "whatsapp-tool" || initialPlan) {
      handleClose();
    } else {
      setStep(1);
    }
  };

  const config = {
    public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY!,
    tx_ref: Date.now().toString(),
    amount: selectedPlanDetails?.price ?? 0,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: customerInfo.email,
      phone_number: customerInfo.phone,
      name: customerInfo.name,
    },
    customizations: {
      title: `Spirit Media - ${selectedPlanDetails?.name}`,
      description: `Payment for ${selectedPlanDetails?.duration}`,
      logo: "https://46gozvqrkdqidcjl.public.blob.vercel-storage.com/Logo%202%20(Black%20bg)-oa6kh1QmsSpldy6txxtPw20bMPjGHw.jpg",
    },
    text: "Pay Now",
  };

  const fwConfig = {
    ...config,
    text: "Pay Now",
    callback: (response: FlutterWaveResponse) => {
      if (response.status === "completed" && selectedPlanDetails) {
        setPaymentStatus("success");
        onPaymentSuccess(response, selectedPlanDetails);
        closePaymentModal();
        handleClose();
      } else {
        setPaymentStatus("failed");
        onPaymentError({
          code: "PAYMENT_FAILED",
          message: "Payment was not successful",
        });
      }
    },
    onClose: () => {
      if (paymentStatus !== "success") {
        onPaymentError({
          code: "PAYMENT_INCOMPLETE",
          message: "Payment was not completed",
        });
      }
      closePaymentModal();
      handleClose();
    },
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} className="sm:max-w-[900px]">
      <ModalHeader>
        <h2 className="text-xl md:text-2xl font-semibold">
          {productType === "whatsapp-tool"
            ? "WhatsApp Tool License"
            : step === 1
            ? "Choose Your App"
            : "Complete Your Purchase"}
        </h2>
      </ModalHeader>

      <ModalBody>
        {productType === "movie-portal" && step === 1 ? (
          <StepOne
            plans={plans}
            selectedPlan={selectedPlan}
            onPlanSelect={setSelectedPlan}
            onNext={() => setStep(2)}
          />
        ) : selectedPlanDetails ? (
          <StepTwo
            selectedPlanDetails={selectedPlanDetails}
            customerInfo={customerInfo}
            setCustomerInfo={setCustomerInfo}
            onBack={handleBack}
            fwConfig={fwConfig}
          />
        ) : null}
      </ModalBody>
    </Modal>
  );
};
