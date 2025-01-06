import DotsImg from "@/assets/images/dots.png";
import UserOneImg from "@/assets/images/user1.jpg";
import UserTwoImg from "@/assets/images/user2.jpg";
import UserThreeImg from "@/assets/images/user3.jpg";
import UserFourImg from "@/assets/images/user4.jpg";
import { Text } from "@/components/custom-ui/text";
import ReviewCard from "@/components/review-card";
import Image from "next/image";
import Slider from "react-slick";

import { MouseEventHandler, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

interface SlickArrowProps {
  onClick?: MouseEventHandler<HTMLDivElement>;
  currentSlide?: number;
  slideCount?: number;
}

const reviews = [
  {
    name: "John Doe",
    image: UserOneImg,
    rating: 5,
    text: "Amazing service! The movie portal has transformed how I watch content.",
  },
  {
    name: "Jane Doe",
    image: UserTwoImg,
    rating: 4.5,
    text: "The utility payment service is a lifesaver. I can recharge my phone in seconds.",
  },
  {
    name: "Alice Doe",
    image: UserThreeImg,
    rating: 4,
    text: "The WhatsApp monitoring tool is a game-changer. I can track my messages with ease.",
  },
  {
    name: "Bob Doe",
    image: UserFourImg,
    rating: 5,
    text: "The customer service is top-notch. I highly recommend their services.",
  },
];

export function TestimonialsSection() {
  const CustomPrevArrow = ({ onClick }: SlickArrowProps) => (
    <div className="custom-arrow" onClick={onClick} aria-label="Previous slide">
      <FaChevronLeft className="text-arrow-primary" />
    </div>
  );

  const CustomNextArrow = ({ onClick }: SlickArrowProps) => (
    <div className="custom-arrow" onClick={onClick} aria-label="Next slide">
      <FaChevronRight className="text-arrow-primary" />
    </div>
  );

  const sliderRef = useRef<Slider>(null);

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2.5,
    slidesToScroll: 1,
    rtl: false,
    arrows: false,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    appendDots: (dots: React.ReactNode) => (
      <div className="custom-slider-controls">
        <CustomPrevArrow onClick={() => sliderRef.current?.slickPrev()} />
        {dots}
        <CustomNextArrow onClick={() => sliderRef.current?.slickNext()} />
      </div>
    ),
  };

  return (
    <section className="bg-[#EEFAFC] py-20">
      <div className="w-11/12 max-w-7xl mx-auto relative">
        <div className="mb-12">
          <Text variant="h2" className="text-brand-primary-dark font-semibold">
            Our Customer Feedback
          </Text>
          <h4 className="text-brand-primary-dark mt-2">
            Don&apos;t take our word for it. Trust our customers.
          </h4>
        </div>

        <div className="absolute top-0 right-0">
          <Image src={DotsImg} alt="Dots" width={200} height={200} />
        </div>

        <Slider ref={sliderRef} {...sliderSettings} className="custom-slider">
          {reviews.map((review, index) => (
            <ReviewCard
              key={index}
              name={review.name}
              image={review.image}
              rating={review.rating}
              text={review.text}
            />
          ))}
        </Slider>
      </div>
    </section>
  );
}
