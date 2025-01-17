"use client";
import CTASection from "@/components/page-sections/whatsapp-monitoring/cta";
import { WhatsappFAQSection } from "@/components/page-sections/whatsapp-monitoring/faq";
import MainFeatures from "@/components/page-sections/whatsapp-monitoring/features";
import WhatsappHero from "@/components/page-sections/whatsapp-monitoring/hero";
import WhatsappReferSection from "@/components/page-sections/whatsapp-monitoring/refer";
import { PaymentProvider } from "@/context/payment";

const WhatsappToolPage = () => {
  return (
    <PaymentProvider productType="whatsapp-tool">
      <WhatsappHero />
      <MainFeatures />
      <WhatsappFAQSection />
      <WhatsappReferSection />
      <CTASection />
    </PaymentProvider>
  );
};

export default WhatsappToolPage;
