import HeroImg from "@/assets/images/home-hero-bg.png";
import HeroScreensMobile from "@/assets/images/home-hero-screens-mobile.png";
import HeroScreens from "@/assets/images/home-hero-screens.png";
import Button from "@/components/custom-ui/button";
import { useRealHeight } from "@/hooks/useRealHeight";
import Image from "next/image";

interface HeroSectionProps {
  onExplore: () => void;
}

export const HeroSection = ({ onExplore }: HeroSectionProps) => {
  const height = useRealHeight();

  return (
    <section
      className="min-h-[480px] flex overflow-hidden"
      style={{ height: height ? `${height - 120}px` : "calc(100vh - 120px)" }}
    >
      <Image
        src={HeroImg}
        alt="Hero Image"
        fill
        className="object-cover"
        priority
      />
      <div className="w-11/12 max-w-7xl mx-auto z-2 mt-20 relative">
        <h1 className="text-white text-center font-medium text-3xl sm:text-4xl md:text-4xl lg:text-5xl leading-tight">
          Your Plug for Movies, Bill Payments, <br />
          Foreign Numbers & <span className="text-brand-primary">More!</span>
        </h1>
        <h3 className="text-white text-center mt-2 sm:mt-4 font-normal text-lg sm:text-xl md:text-xl lg:text-2xl">
          Get everything you need in one place.
        </h3>
        <Button
          variant="primary"
          className="mt-6 mx-auto block"
          onClick={onExplore}
        >
          Explore Our Products
        </Button>

        <div className="w-full mt-[7rem] absolute bottom-0 left-0 right-0">
          <div className="hidden lg:block">
            <Image
              src={HeroScreens}
              alt="Hero Screens"
              width={1200}
              height={800}
              className="w-[95%] sm:w-[85%] md:w-3/4 lg:w-3/5 h-auto mx-auto"
              priority
            />
          </div>
          <div className="block lg:hidden -mb-24 sm:-mb-56">
            <Image
              src={HeroScreensMobile}
              alt="Hero Screens"
              width={800}
              height={600}
              className="w-full h-auto mx-auto"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};