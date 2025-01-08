import { Slide } from "@/types";
import { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { VideoSlide } from "./videoSlide";

const slides: Slide[] = [
  {
    appType: {
      name: "Netmirror for Android",
      platform: "android",
    },
    price: "₦2,500 only",
    features: [
      "Unlimited HD streaming",
      "Download for offline viewing",
      "Multiple device support",
      "Smart recommendations",
    ],
    videoSrc: "pzjzumt57cdeouededdm",
  },
  {
    appType: {
      name: "Netmirror for iOS",
      platform: "ios",
    },
    price: "₦2,500 only",
    features: [
      "Stream unlimited movies",
      "Crystal clear 4K quality",
      "Smart recommendations",
      "Seamless iOS integration",
    ],
    videoSrc: "tidwn5xewbdtleaf3l7a",
  },
  {
    appType: {
      name: "Netmirror Anime for Android",
      platform: "android",
    },
    price: "₦2,000 only",
    features: [
      "Extensive anime library",
      "Download for offline viewing",
      "HD quality streaming",
      "Seasonal updates",
    ],
    videoSrc: "tidwn5xewbdtleaf3l7a",
  },
];

const CarouselSection = () => {
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: false,
    fade: true,
    className: "movie-portal-slider",
    dotsClass: "slick-dots custom-dots",
  };

  return (
    <section className="relative bg-brand-primary-dark-bg min-h-screen py-10">
      <Slider ref={sliderRef} {...settings}>
        {slides.map((slide, index) => (
          <VideoSlide key={index} {...slide} />
        ))}
      </Slider>
    </section>
  );
};

export default CarouselSection;
