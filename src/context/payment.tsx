import { PaymentModal } from "@/components/payment-modal";
import { SuccessModal } from "@/components/success-modal";
import { createPurchaseRecord } from "@/lib/purchases";
import { PaymentError, PaymentPlan } from "@/types";
import { FlutterWaveResponse } from "flutterwave-react-v3/dist/types";
import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

interface PaymentContextType {
  showPaymentModal: boolean;
  showSuccessModal: boolean;
  customerEmail: string;
  handleOpenPayment: (planId?: string) => void;
  handlePaymentSuccess: (
    response: FlutterWaveResponse,
    planDetails: PaymentPlan
  ) => Promise<void>;
  handlePaymentError: (error: PaymentError) => void;
  handleCloseSuccess: () => void;
}

const PaymentContext = createContext<PaymentContextType | null>(null);

export const PaymentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [customerEmail, setCustomerEmail] = useState("");
  const [initialPlan, setInitialPlan] = useState<string>();

  const handleOpenPayment = (planId?: string) => {
    setInitialPlan(planId);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = async (
    response: FlutterWaveResponse,
    planDetails: PaymentPlan
  ) => {
    setCustomerEmail(response.customer.email);
    setShowPaymentModal(false);
    setShowSuccessModal(true);

    try {
      await createPurchaseRecord(response, {
        id: planDetails.id,
        name: planDetails.name,
        platform: planDetails.platform,
        price: planDetails.price,
      });
    } catch (error) {
      console.error("Failed to record purchase (non-critical):", error);
    }
  };

  const handlePaymentError = (error: PaymentError) => {
    console.log("Payment error from handler:", error);
    toast.error("Payment failed. Please try again.");
  };

  const handleCloseSuccess = () => setShowSuccessModal(false);

  return (
    <PaymentContext.Provider
      value={{
        showPaymentModal,
        showSuccessModal,
        customerEmail,
        handleOpenPayment,
        handlePaymentSuccess,
        handlePaymentError,
        handleCloseSuccess,
      }}
    >
      {children}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => {
          setShowPaymentModal(false);
          setInitialPlan(undefined);
        }}
        initialPlan={initialPlan}
        productType="movie-portal"
        onPaymentSuccess={handlePaymentSuccess}
        onPaymentError={handlePaymentError}
      />
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseSuccess}
        email={customerEmail}
      />
    </PaymentContext.Provider>
  );
};

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error("usePayment must be used within PaymentProvider");
  }
  return context;
};
