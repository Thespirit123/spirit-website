import ReferImg from "@/assets/images/refer-and-stream.png";
import TimelineImg from "@/assets/images/timeline.png";
import Button from "@/components/custom-ui/button";
import Image from "next/image";

const WhatsappReferSection = () => {
  return (
    <section className="flex bg-[#F8F8F8] items-center">
      <div className="hidden lg:block w-1/2">
        <Image src={ReferImg} alt="Refer and Stream" />
      </div>
      <div className="w-full lg:w-1/2 p-10 text-center lg:text-right lg:pr-16 flex flex-col gap-6 lg:gap-10 items-center lg:items-end">
        <h3 className="text-4xl font-semibold" data-aos="fade-up" data-aos-delay="100">
          Turn Connections into Revenue
        </h3>
        <p className="text-lg font-light" data-aos="fade-up" data-aos-delay="100">
          Earn a generous 10% commission on every successful referral! Join our
          growing network of partners who are earning passive income by sharing
          our innovative monitoring solutions.
        </p>
        <div className="flex gap-4">
          <div className="flex flex-col justify-between gap-2 lg:gap-4">
            <p className="text-xl font-medium" data-aos="fade-up" data-aos-delay="100">Get Unique Referral Code</p>
            <p className="text-xl font-medium" data-aos="fade-up" data-aos-delay="100">Share with Friends</p>
            <p className="text-xl font-medium" data-aos="fade-up" data-aos-delay="100">Earn Commissions</p>
          </div>
          <Image src={TimelineImg} alt="Timeline" />
        </div>
        <Button
          variant="primary"
          className="w-max"
          glow
          asLink
          href="/auth/sign-up"
          data-aos="fade-up" data-aos-delay="100"
        >
          Get My Referral Link
        </Button>
      </div>
    </section>
  );
};

export default WhatsappReferSection;
