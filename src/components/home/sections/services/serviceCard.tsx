import Button from "@/components/custom-ui/button";
import Image, { StaticImageData } from "next/image";

interface ServiceCardProps {
  image: StaticImageData;
  number: string;
  title: { highlighted: string; normal: string };
  description: string;
  isReversed?: boolean;
}

export const ServiceCard = ({
  image,
  number,
  title,
  description,
  isReversed,
}: ServiceCardProps) => (
  <div
    className={`flex justify-center gap-20 mt-20 ${
      isReversed ? "flex-row-reverse" : ""
    }`}
  >
    <div>
      <Image src={image} alt="Movie Portal" width={450} height={350} />
    </div>
    <div className="flex flex-col items-start w-[52%]">
      <span className="text-[#009BC4] font-medium text-xl mb-4">
        / {number}
      </span>
      <div className="flex items-center gap-2">
        <div className="bg-brand-primary w-max mx-auto px-1">
          <p className="text-2xl text-white font-[550]">{title.highlighted}</p>
        </div>
        <p className="text-2xl text-brand-primary font-[550]">{title.normal}</p>
      </div>
      <p className="text-black mt-2 font-[350] text-lg">{description}</p>
      <Button variant="primary" className="mt-6 block">
        Learn More
      </Button>
    </div>
  </div>
);
