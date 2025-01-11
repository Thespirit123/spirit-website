import CTASection from "@/components/page-sections/whatsapp-monitoring/cta";
import { WhatsappFAQSection } from "@/components/page-sections/whatsapp-monitoring/faq";
import MainFeatures from "@/components/page-sections/whatsapp-monitoring/features";
import WhatsappHero from "@/components/page-sections/whatsapp-monitoring/hero";
import WhatsappReferSection from "@/components/page-sections/whatsapp-monitoring/refer";

const WhatsappToolPage = () => {
  return (
    <>
      <WhatsappHero />
      <MainFeatures />
      <WhatsappFAQSection />
      <WhatsappReferSection />
      <CTASection />
    </>
  );
};

export default WhatsappToolPage;
