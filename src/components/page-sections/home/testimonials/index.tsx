"use client";

import UserOneImg from "@/assets/images/user1.jpg";
import UserTwoImg from "@/assets/images/user2.jpg";
import UserThreeImg from "@/assets/images/user3.jpg";
import UserFourImg from "@/assets/images/user4.jpg";
import { Text } from "@/components/custom-ui/text";
import ReviewCard from "@/components/review-card";
import Slider from "react-slick";

import styles from "./testimonials.module.css";

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
    name: "Oluwaseun Adebayo",
    image: UserOneImg,
    rating: 5,
    text: "The movie portal is superb! I can finally watch all my favorite Nollywood and Hollywood movies without stress.",
  },
  {
    name: "Abdullahi Ibrahim",
    image: UserThreeImg,
    rating: 4,
    text: "This WhatsApp tool is exactly what I needed for my business. Customer support responded very fast too.",
  },
  {
    name: "Chidinma Okonkwo",
    image: UserTwoImg,
    rating: 5,
    text: "The movie streaming quality is excellent! I love how easy it is to find new releases. The app is very stable and user-friendly.",
  },
  {
    name: "Bukola Adeleke",
    image: UserFourImg,
    rating: 5,
    text: "Transactions are safe and reliable. I've been using their services for 6 months now, no issues at all!",
  },
];

export function TestimonialsSection() {
  const CustomPrevArrow = ({ onClick }: SlickArrowProps) => (
    <div className={styles.arrow} onClick={onClick} aria-label="Previous slide">
      <FaChevronLeft className="text-arrow-primary" />
    </div>
  );

  const CustomNextArrow = ({ onClick }: SlickArrowProps) => (
    <div className={styles.arrow} onClick={onClick} aria-label="Next slide">
      <FaChevronRight className="text-arrow-primary" />
    </div>
  );

  const sliderRef = useRef<Slider>(null);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    rtl: false,
    arrows: true,
    focusOnSelect: true,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    pauseOnFocus: true,
    cssEase: "linear",
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
      <div className={styles.controls}>
        <CustomPrevArrow onClick={() => sliderRef.current?.slickPrev()} />
        {dots}
        <CustomNextArrow onClick={() => sliderRef.current?.slickNext()} />
      </div>
    ),
  };

  return (
    <section className="bg-[#f1f1f1cf] py-20">
      <div className="w-11/12 max-w-7xl mx-auto relative">
        <div className="mb-12" style={{ textAlign: "center" }}>
          <Text variant="h2" className="text-brand-primary-dark font-semibold" >
            Our Customer Feedback
          </Text>
          <h4 className="text-brand-primary-dark mt-2">
            Don&apos;t take our word for it. Trust our customers.
          </h4>
        </div>

        {/* <div className="absolute top-0 right-0">
          <Image src={DotsImg} alt="Dots" width={200} height={200} />
        </div> */}

        <Slider
          ref={sliderRef}
          {...sliderSettings}
          className={styles["testimonials-slider"]}
        >
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
