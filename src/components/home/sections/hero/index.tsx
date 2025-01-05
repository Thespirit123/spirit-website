import HeroImg from "@/assets/images/home-hero-bg.png";
import HeroScreens from "@/assets/images/home-hero-screens.png";
import Button from "@/components/custom-ui/button";
import { Text } from "@/components/custom-ui/text";
import Image from "next/image";

export const HeroSection = () => (
  <section className="min-h-[480px] h-[calc(100vh-120px)] flex">
    <Image src={HeroImg} alt="Hero Image" layout="fill" objectFit="cover" />
    <div className="w-11/12 max-w-7xl mx-auto z-10 mt-20 relative">
      <Text variant="h1" className="text-white text-center font-medium">
        Innovative Digital Solutions <br /> at Your
        <span className="text-brand-primary"> Fingertips</span>
      </Text>
      <Text variant="h3" className="text-white text-center mt-2 font-normal">
        Cutting-Edge Mobile Apps & Services
      </Text>
      <Button
        variant="primary"
        className="mt-6 mx-auto block"
        onClick={() => console.log("Clicked")}
      >
        Explore Our Products
      </Button>

      <div className="mx-auto mt-[7rem] absolute bottom-0 left-0 right-0">
        <Image
          src={HeroScreens}
          alt="Hero Screens"
          width={1200}
          height={800}
          className="w-3/5 h-auto mx-auto"
          priority
        />
      </div>
    </div>
  </section>
);
