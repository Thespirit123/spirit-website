"use client";
import CarouselSection from "@/components/page-sections/movie-portal/carousel-section";
import FeaturesSection from "@/components/page-sections/movie-portal/features";
import HeroSection from "@/components/page-sections/movie-portal/hero";
import ReferSection from "@/components/page-sections/movie-portal/refer-section";
import { PaymentProvider } from "@/context/payment";

const MoviePortalPage = () => {
  return (
    <PaymentProvider>
      <HeroSection />
      <FeaturesSection />
      <CarouselSection />
      <ReferSection />
    </PaymentProvider>
  );
};

export default MoviePortalPage;
