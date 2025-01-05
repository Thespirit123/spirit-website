"use client";
import { FAQSection } from "@/components/home/sections/faq";
import { HeroSection } from "@/components/home/sections/hero";
import { ServicesSection } from "@/components/home/sections/services";
import { TestimonialsSection } from "@/components/home/testimonials";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <TestimonialsSection />
      <FAQSection />
    </>
  );
}
