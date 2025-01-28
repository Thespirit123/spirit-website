import { PaymentModal } from "@/components/payment-modal";
import { SuccessModal } from "@/components/success-modal";
import { APP_DOWNLOADS } from "@/lib/constants";
import { createPurchaseRecord } from "@/lib/purchases";
import { DownloadAppType, PaymentError, PaymentPlan } from "@/types";
import { FlutterWaveResponse } from "flutterwave-react-v3/dist/types";
import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  referralCode?: string;
}

interface PaymentContextType {
  showPaymentModal: boolean;
  setShowPaymentModal: (show: boolean) => void;
  showSuccessModal: boolean;
  setShowSuccessModal: (show: boolean) => void;
  customerEmail: string;
  setCustomerEmail: (email: string) => void;
  appType: DownloadAppType | null;
  setAppType: (type: DownloadAppType | null) => void;
  customerInfo: CustomerInfo;
  setCustomerInfo: (info: CustomerInfo) => void;
  handleOpenPayment: (planId?: string) => void;
}

const PaymentContext = createContext<PaymentContextType | null>(null);

interface PaymentProviderProps {
  children: React.ReactNode;
  productType?: "movie-portal" | "whatsapp-tool";
}

export const PaymentProvider = ({
  children,
  productType = "movie-portal",
}: PaymentProviderProps) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [customerEmail, setCustomerEmail] = useState("");
  const [initialPlan, setInitialPlan] = useState<string>();
  const [appType, setAppType] = useState<DownloadAppType | null>(null);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: "",
    email: "",
    phone: "",
    referralCode: "",
  });

  const handleOpenPayment = (planId?: string) => {
    if (planId) {
      setInitialPlan(planId);
    }
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = async (
    response: FlutterWaveResponse,
    planDetails: PaymentPlan
  ) => {
    try {
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

      console.log("👥 Referral Info:", {
        hasReferralCode: !!customerInfo.referralCode,
        referralCode: customerInfo.referralCode,
      });
      const purchaseId = await createPurchaseRecord(response, {
        id: planDetails.id,
        name: planDetails.name,
        platform: planDetails.platform,
        price: planDetails.price,
        appType: downloadType,
        referralCode: customerInfo.referralCode,
      });
      console.log("💾 Purchase Record Created:", { purchaseId });

      const appConfig = APP_DOWNLOADS[downloadType];
      const emailResponse = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerEmail: response.customer.email,
          appName: planDetails.name,
          downloadUrl: appConfig?.downloadUrl,
          downloadUrls: appConfig?.downloadUrls,
          instructions: appConfig?.instructions,
        }),
      });
      if (!emailResponse.ok) {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      console.error("❌ Payment Success Handler Error:", {
        error,
        stack: error instanceof Error ? error.stack : undefined,
        step: "final",
      });
    }
  };

  const handlePaymentError = (error: PaymentError) => {
    console.log("❌ Payment Error:", error);
    toast.error("Payment failed. Please try again.");
  };

  const handleCloseSuccess = () => setShowSuccessModal(false);

  const value = {
    showPaymentModal,
    setShowPaymentModal,
    showSuccessModal,
    setShowSuccessModal,
    customerEmail,
    setCustomerEmail,
    appType,
    setAppType,
    customerInfo,
    setCustomerInfo,
    handleOpenPayment,
  };

  return (
    <PaymentContext.Provider value={value}>
      {children}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => {
          setShowPaymentModal(false);
          setInitialPlan(undefined);
          setCustomerInfo({
            name: "",
            email: "",
            phone: "",
            referralCode: "",
          });
        }}
        initialPlan={initialPlan}
        productType={productType}
        onPaymentSuccess={handlePaymentSuccess}
        onPaymentError={handlePaymentError}
        customerInfo={customerInfo}
        setCustomerInfo={setCustomerInfo}
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
