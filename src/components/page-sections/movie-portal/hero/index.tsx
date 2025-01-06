import MoviesLogo from "@/assets/icons/movie-reel";
import HeroBgImg from "@/assets/images/home-hero-bg.png";
import HeroImg from "@/assets/images/movies-hero.png";
import Button from "@/components/custom-ui/button";
import { Text } from "@/components/custom-ui/text";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="min-h-[480px] h-[calc(100vh-120px)] flex">
      <Image src={HeroBgImg} alt="Hero Image" layout="fill" objectFit="cover" />
      <div className="flex w-full max-w-7xl mx-auto z-10 relative items-center">
        <div className="w-1/2">
          <div className="w-[550px] h-[550px] rounded-full overflow-hidden m-auto">
            <Image src={HeroImg} alt="Hero Image" priority />
          </div>
        </div>
        <div className="w-1/2">
          <p className="text-white font-medium text-2xl">
            <MoviesLogo className="inline-block mr-2" />
            Netmirror App
          </p>

          <Text variant="h1" className="text-white font-medium">
            Your Ultimate Movie Streaming Companion
          </Text>
          <h3 className="text-white mt-2 font-light text-xl">
            Cinema at your fingertips, anytime, anywhere.
          </h3>
          <Button
            variant="primary"
            className="mt-10 block"
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
