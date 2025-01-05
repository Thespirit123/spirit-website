"use client";
import DotsImg from "@/assets/images/dots.png";
import HeroImg from "@/assets/images/home-hero-bg.png";
import HeroScreens from "@/assets/images/home-hero-screens.png";
import MoviePortalImg from "@/assets/images/service-movies.png";
import UtilityImg from "@/assets/images/service-utility.png";
import WhatsAppImg from "@/assets/images/service-whatsapp.png";
import UserOneImg from "@/assets/images/user1.jpg";
import UserTwoImg from "@/assets/images/user2.jpg";
import UserThreeImg from "@/assets/images/user3.jpg";
import UserFourImg from "@/assets/images/user4.jpg";
import Button from "@/components/custom-ui/button";
import { Text } from "@/components/custom-ui/text";
import ReviewCard from "@/components/review-card";
import Image from "next/image";
import { MouseEventHandler, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Slider from "react-slick";
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

export default function Home() {
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
    <>
      <section className="min-h-[480px] h-[calc(100vh-120px)] flex">
        <Image src={HeroImg} alt="Hero Image" layout="fill" objectFit="cover" />
        <div className="w-11/12 max-w-7xl mx-auto z-10 mt-20 relative">
          <Text variant="h1" className="text-white text-center font-medium">
            Innovative Digital Solutions <br /> at Your
            <span className="text-brand-primary"> Fingertips</span>
          </Text>
          <Text
            variant="h3"
            className="text-white text-center mt-2 font-normal"
          >
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

      <section className="pt-20 pb-10">
        <div className="bg-brand-primary-light text-center w-max mx-auto px-4 py-2 rounded-full">
          <h3 className="text-brand-primary font-semibold text-2xl">
            Our Services
          </h3>
        </div>

        <section className="w-[90%] mx-auto mt-10">
          {/* Service 1 - Movie Portal */}
          <div className="flex justify-center gap-20 mt-20">
            <div>
              <Image
                src={MoviePortalImg}
                alt="Movie Portal"
                width={450}
                height={350}
              />
            </div>
            <div className="flex flex-col items-start w-[52%]">
              <span className="text-[#009BC4] font-medium text-xl mb-4">
                / 01
              </span>
              <div className="flex items-center gap-2">
                <div className="bg-brand-primary w-max mx-auto px-1">
                  <p className="text-2xl text-white font-[550]">Movies</p>
                </div>
                <p className="text-2xl text-brand-primary font-[550]">Portal</p>
              </div>
              <p className="text-black mt-2 font-[350] text-lg">
                Unlock unlimited entertainment with our comprehensive movie
                streaming platform. Access a vast library of films across
                genres, enjoy high-quality streaming, and discover new cinematic
                experiences anytime, anywhere.
              </p>
              <Button variant="primary" className="mt-6 block">
                Learn More
              </Button>
            </div>
          </div>

          {/* Service 2 - Utility Payment (Reversed) */}
          <div className="flex justify-center gap-20 mt-20">
            <div className="flex flex-col items-start w-[52%]">
              <span className="text-[#009BC4] font-medium text-xl mb-4">
                / 02
              </span>
              <div className="flex items-center gap-2">
                <div className="bg-brand-primary w-max mx-auto px-1">
                  <p className="text-2xl text-white font-[550]">Utility</p>
                </div>
                <p className="text-2xl text-brand-primary font-[550]">
                  Payments
                </p>
              </div>
              <p className="text-black mt-2 font-[350] text-lg">
                Instant mobile credit solutions at your fingertips. Quickly
                recharge your phone, support multiple networks, and stay
                connected with our seamless and secure airtime top-up service.
              </p>
              <Button variant="primary" className="mt-6 block">
                Learn More
              </Button>
            </div>
            <div>
              <Image
                src={UtilityImg}
                alt="Utility Payment"
                width={450}
                height={350}
              />
            </div>
          </div>

          {/* Service 3 - WhatsApp Tool */}
          <div className="flex justify-center gap-20 mt-20">
            <div>
              <Image
                src={WhatsAppImg}
                alt="WhatsApp Tool"
                width={450}
                height={350}
              />
            </div>
            <div className="flex flex-col items-start w-[52%]">
              <span className="text-[#009BC4] font-medium text-xl mb-4">
                / 03
              </span>
              <div className="flex items-center gap-2">
                <div className="bg-brand-primary w-max mx-auto px-1">
                  <p className="text-2xl text-white font-[550]">WhatsApp</p>
                </div>
                <p className="text-2xl text-brand-primary font-[550]">
                  {" "}
                  Monitoring Tool
                </p>
              </div>
              <p className="text-black mt-2 font-[350] text-lg">
                Advanced communication tracking designed for personal and
                professional insights. Monitor messages, calls, and digital
                interactions with discretion and precision.
              </p>
              <Button variant="primary" className="mt-6 block">
                Learn More
              </Button>
            </div>
          </div>
        </section>
      </section>

      <section className="bg-[#EEFAFC] py-20">
        <div className="w-11/12 max-w-7xl mx-auto relative">
          <div className="mb-12">
            <Text
              variant="h2"
              className="text-brand-primary-dark font-semibold"
            >
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
    </>
  );
}
