"use client";
import { FAQSection } from "@/components/page-sections/home/faq";
import   EmailSubscription   from "@/components/page-sections/home/formSubscription";
import FeaturedProducts from "@/components/page-sections/home/FeaturedProducts";
import { HeroSection } from "@/components/page-sections/home/hero";
import { ServicesSection } from "@/components/page-sections/home/services";
import { TestimonialsSection } from "@/components/page-sections/home/testimonials";
import { useRef } from "react";

export default function Home() {
  const servicesRef = useRef<HTMLElement>(null);

  const scrollToServices = () => {
    servicesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <HeroSection onExplore={scrollToServices} />
      <FeaturedProducts/>
      <ServicesSection ref={servicesRef} />
      <TestimonialsSection />
      <FAQSection />
      <EmailSubscription/>
    </>
  );
}
