import HeroImg from "@/assets/images/whatsapp-hero.png";
import Button from "@/components/custom-ui/button";
import { Text } from "@/components/custom-ui/text";
import Image from "next/image";

const WhatsappHero = () => {
  return (
    <section className="relative min-h-[calc(100vh-0px)] flex flex-col lg:flex-row -mt-[120px] pt-[120px]">
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 lg:px-16 py-10 lg:py-0">
        <Text
          variant="h1"
          className="font-medium text-2xl md:text-3xl lg:text-4xl mt-4 text-center lg:text-left"
        >
          Discreet.{" "}
          <span className="text-brand-primary">
            Powerful.
            <br />
          </span>{" "}
          Informative.
        </Text>
        <h3 className="mt-2 sm:mt-4 font-light text-base sm:text-lg lg:text-xl text-center lg:text-left">
          Unleash Advanced Digital Insights with Comprehensive Communication
          Tracking.
        </h3>
        <Button variant="primary" className="w-max mt-6 mx-auto lg:mx-0">
          Get Instant Access
        </Button>
      </div>
      <div className="hidden lg:block absolute top-0 right-0 bottom-0 w-1/2">
        <Image
          src={HeroImg}
          alt="whatsapp-hero"
          className="w-full h-full object-cover"
          fill
          priority
        />
      </div>

      <div className="lg:hidden relative h-[50vh] w-full">
        <Image
          src={HeroImg}
          alt="whatsapp-hero"
          className="w-full h-full object-cover"
          fill
          priority
        />
      </div>
    </section>
  );
};

export default WhatsappHero;
