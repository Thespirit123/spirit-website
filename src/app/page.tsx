"use client";
import { FAQSection } from "@/components/page-sections/home/faq";
import { HeroSection } from "@/components/page-sections/home/hero";
import { ServicesSection } from "@/components/page-sections/home/services";
import { TestimonialsSection } from "@/components/page-sections/home/testimonials";

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
