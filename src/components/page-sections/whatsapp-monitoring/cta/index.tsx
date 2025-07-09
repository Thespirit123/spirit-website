import CTABg from "@/assets/images/whatsapp-cta.jpg";
import Button from "@/components/custom-ui/button";
import { Text } from "@/components/custom-ui/text";
import { usePayment } from "@/context/payment";
import Image from "next/image";

const CTASection = () => {
  const { handleOpenPayment } = usePayment();
  return (
    <section className="w-full py-20">
      <div className="w-11/12 max-w-7xl mx-auto">
        <div className="relative w-full rounded-2xl overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={CTABg}
              alt="WhatsApp Monitoring"
              className="object-cover w-full h-full"
              fill
              priority
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>

          <div className="relative flex flex-col items-center text-center px-6 py-16 md:py-20">
            <Text
              variant="h2"
              className="text-white font-semibold text-3xl md:text-4xl"
              data-aos="fade-up" data-aos-delay="100"
            >
              Start Monitoring Now
            </Text>
            <p className="text-white/90 mt-4 font-light text-lg md:text-xl max-w-2xl" data-aos="fade-up" data-aos-delay="100">
              Get instant access to comprehensive WhatsApp monitoring. Setup
              takes less than 5 minutes.
            </p>
            <Button
              variant="primary"
              size="lg"
              className="mt-8"
              glow
              onClick={() => handleOpenPayment()}
            >
              Get Started Today
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
