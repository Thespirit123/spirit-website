import Image, { StaticImageData } from "next/image";
import { FC, memo } from "react";
import { FaStar, FaStarHalf } from "react-icons/fa";

interface ReviewCardProps {
  name: string;
  image: StaticImageData;
  rating: number;
  text: string;
}

const ReviewCard: FC<ReviewCardProps> = memo(
  ({ name, image, rating, text }) => {
    const renderStars = () => {
      const stars = [];
      const fullStars = Math.floor(rating);
      const hasHalfStar = rating % 1 !== 0;

      for (let i = 0; i < fullStars; i++) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      }
      if (hasHalfStar) {
        stars.push(<FaStarHalf key="half" className="text-yellow-400" />);
      }
      return stars;
    };

    return (
      <div className="bg-white rounded-md p-6 mr-8 shadow-md min-h-[270px]">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-[60px] h-[60px] overflow-hidden flex-shrink-0">
            <Image
              src={image}
              alt={name}
              width={60}
              height={60}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <div className="flex gap-1">{renderStars()}</div>
        </div>
        <div>
          <h4 className="font-medium text-lg">{name}</h4>
          <p className="text-gray-600">{text}</p>
        </div>
      </div>
    );
  }
);

ReviewCard.displayName = "ReviewCard";
export default ReviewCard;
