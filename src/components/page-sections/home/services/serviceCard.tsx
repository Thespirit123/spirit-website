import Button from "@/components/custom-ui/button";
import Image, { StaticImageData } from "next/image";
import { toast } from "react-hot-toast";

interface ServiceCardProps {
  image: StaticImageData;
  number: string;
  title: { highlighted: string; normal: string };
  description: string;
  isReversed?: boolean;
  href: string;
  isUtility?: boolean;
}

export const ServiceCard = ({
  image,
  number,
  title,
  description,
  isReversed,
  href,
  isUtility,
}: ServiceCardProps) => {
  const handleClick = (e: React.MouseEvent) => {
    if (isUtility) {
      e.preventDefault();
      toast("Utility payments coming soon!", {
        icon: "🚧",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
        duration: 3000,
      });
    }
  };

  return (
    <div
      className={`flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12 lg:gap-20 mt-10 md:mt-20 ${
        isReversed ? "md:flex-row-reverse" : ""
      }`}
    >
      <div className="w-full md:w-[450px] lg:w-[500px]">
        <Image
          src={image}
          alt="Movie Portal"
          width={650}
          height={450}
          className="w-full h-auto object-contain"
          priority
        />
      </div>
      <div className="flex flex-col items-center md:items-start w-full md:w-[60%] lg:w-[52%] px-4 md:px-0">
        <span className="text-[#009BC4] font-medium text-xl mb-4">
          / {number}
        </span>
        <div className="flex items-center gap-2">
          <div className="bg-brand-primary w-max mx-auto px-1">
            <p className="text-2xl text-white font-[550]">
              {title.highlighted}
            </p>
          </div>
          <p className="text-2xl text-brand-primary font-[550]">
            {title.normal}
          </p>
        </div>
        <p className="text-black mt-2 font-[350] text-lg text-center md:text-left leading-[2]">
          {description}
        </p>
        <Button
          variant="primary"
          className="mt-6 block"
          asLink
          href={href}
          onClick={handleClick}
        >
          {isUtility ? "Coming Soon" : "Learn More"}
        </Button>
      </div>
    </div>
  );
};
