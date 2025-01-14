import HeroBgImg from "@/assets/images/home-hero-bg.png";
import HeroImg from "@/assets/images/movies-hero.png";
import Button from "@/components/custom-ui/button";
import { Text } from "@/components/custom-ui/text";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="min-h-screen -mt-[120px] relative flex">
      <Image
        src={HeroBgImg}
        alt="Hero Image"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 z-0"
        priority
      />
      <div className="absolute inset-0 bg-black/50 z-10" />
      <div className="relative z-20 w-11/12 max-w-7xl mx-auto flex flex-col xl:flex-row items-center justify-center min-h-screen pt-[140px] pb-10">
        <div className="relative w-[280px] h-[280px] md:w-[400px] md:h-[400px] lg:w-[550px] lg:h-[550px] mx-auto">
          <div className="absolute inset-0 rounded-full overflow-hidden cd-spin hover:pause-animation">
            <Image
              src={HeroImg}
              alt="Hero Image"
              priority
              className="w-full h-full object-cover"
            />
          </div>

          {/* CD Center Overlay */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] h-[30%] rounded-full bg-black/30 backdrop-blur-sm">
            {/* Inner Circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] rounded-full bg-white/10" />
          </div>

          {/* CD Shine Effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent via-white/5 to-transparent pointer-events-none" />
        </div>

        <div className="w-full xl:w-1/2 order-1 xl:order-2 text-center xl:text-left">
          <Text
            variant="h1"
            className="text-white font-medium text-3xl md:text-4xl xl:text-5xl mt-4"
          >
            Your Ultimate Movie Streaming Companion
          </Text>

          <h3 className="text-white mt-2 font-light text-lg md:text-xl">
            Cinema at your fingertips, anytime, anywhere.
          </h3>

          <Button
            variant="primary"
            className="mt-6 xl:mt-10 mx-auto xl:mx-0"
            onClick={() => console.log("Clicked")}
          >
            Get Instant Access
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
