"use client";

import { FAQSection } from "@/components/page-sections/home/faq";
import   EmailSubscription   from "@/components/page-sections/home/formSubscription";
import FeaturedProducts from "@/components/page-sections/home/FeaturedProducts";
import  HeroSection  from "@/components/page-sections/home/carousel";
import { ServicesSection } from "@/components/page-sections/home/services";
import Image from "next/image";
import { TestimonialsSection } from "@/components/page-sections/home/testimonials";
import HeroImg from "@/assets/images/thelogo1.jpeg";


import { useRef } from "react";

export default function Home() {
  const servicesRef = useRef<HTMLElement>(null);

  const scrollToServices = () => {
    servicesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
    <div style={{overflowX : "hidden"}}>
      <HeroSection onExplore={scrollToServices}/>
      <FeaturedProducts/>
      <ServicesSection ref={servicesRef} />
      <TestimonialsSection />
      <FAQSection />
      <EmailSubscription/>
      <div style={{position:"fixed", bottom:"10%", zIndex:"500",right:"20px",border:"2px solid #008ea8 ",borderRadius:"50%"}} className="LMKIM">
        <a href="/community">
        
     <Image
        src={HeroImg}
        alt="Hero Image"
        width="40"
        height="40"
        className=""
       style={{borderRadius:"50%"}}
      />

        </a>
      </div>
      </div>
    </>
  );
}
