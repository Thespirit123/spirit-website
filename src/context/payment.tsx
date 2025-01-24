import { PaymentModal } from "@/components/payment-modal";
import { SuccessModal } from "@/components/success-modal";
import { APP_DOWNLOADS } from "@/lib/constants";
import { createPurchaseRecord } from "@/lib/purchases";
import { DownloadAppType, PaymentError, PaymentPlan } from "@/types";
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
  appType?: DownloadAppType;
}

const PaymentContext = createContext<PaymentContextType | null>(null);

export const PaymentProvider = ({
  children,
  productType = "movie-portal",
}: {
  children: React.ReactNode;
  productType?: "movie-portal" | "whatsapp-tool";
}) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [customerEmail, setCustomerEmail] = useState("");
  const [initialPlan, setInitialPlan] = useState<string>();
  const [appType, setAppType] = useState<DownloadAppType>();

  const handleOpenPayment = (planId?: string) => {
    setInitialPlan(planId);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = async (
    response: FlutterWaveResponse,
    planDetails: PaymentPlan
  ) => {
    const downloadType: DownloadAppType = planDetails.name
      .toLowerCase()
      .includes("whatsapp")
      ? "android-whatsapp"
      : planDetails.name.toLowerCase().includes("anime")
      ? "android-anime"
      : planDetails.platform === "ios"
      ? "ios-movies"
      : "android-movies";

    setCustomerEmail(response.customer.email);
    setAppType(downloadType);
    setShowPaymentModal(false);
    setShowSuccessModal(true);

    try {
      await createPurchaseRecord(response, {
        id: planDetails.id,
        name: planDetails.name,
        platform: planDetails.platform,
        price: planDetails.price,
        appType: downloadType,
      });

      const appConfig = APP_DOWNLOADS[downloadType];

      const emailResponse = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerEmail: response.customer.email,
          appName: planDetails.name,
          downloadUrl: appConfig?.downloadUrl,
          instructions: appConfig?.instructions,
        }),
      });

      if (!emailResponse.ok) {
        throw new Error("Failed to send email");
      }

      toast.success("Download instructions sent to your email!");
    } catch (error) {
      console.error("❌ Payment Success Handler Error:", error);
      toast.error(
        "Purchase recorded but email failed to send. Contact support if needed."
      );
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
        appType,
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
        productType={productType}
        onPaymentSuccess={handlePaymentSuccess}
        onPaymentError={handlePaymentError}
      />
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseSuccess}
        email={customerEmail}
        appConfig={appType ? APP_DOWNLOADS[appType] : undefined}
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
