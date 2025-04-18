import MoviePortalImg from "@/assets/images/service-movies.png";
import UtilityImg from "@/assets/images/service-utility.png";
import WhatsAppImg from "@/assets/images/service-whatsapp.png";
import { forwardRef } from "react";
// import { ServiceCard } from "./serviceCard";
import Sec from "./servicesSection"

export const services = [
  {
    image: MoviePortalImg,
    number: "01",
    title: {
      highlighted: "Movies",
      normal: "Portal",
    },
    description:
      "Unlock unlimited entertainment with our comprehensive movie streaming platform. Access a vast library of films across genres, enjoy high-quality streaming, and discover new cinematic experiences anytime, anywhere.",
    href: "/movie-portal",
  },
  {
    image: WhatsAppImg,
    number: "02",
    title: {
      highlighted: "WhatsApp",
      normal: "Monitoring Tool",
    },
    description:
      "Advanced communication tracking designed for personal and professional insights. Monitor messages, calls, and digital interactions with discretion and precision.",
    href: "/whatsapp-tool",
  },
  {
    image: UtilityImg,
    number: "03",
    title: {
      highlighted: "Utility",
      normal: "Payments",
    },
    description:
      "Instant mobile credit solutions at your fingertips. Quickly recharge your phone, support multiple networks, and stay connected with our seamless and secure airtime top-up service.",
    href: "/utility-payment",
    isUtility: true,
  },
];

export const ServicesSection = forwardRef<HTMLElement>(() => (
  // <section ref={ref} className="pt-20 pb-10">
  //   <div className="bg-brand-primary-light text-center w-max mx-auto px-4 py-2 rounded-full">
  //     <h3 className="text-brand-primary font-semibold text-2xl">
  //       Our Services
  //     </h3>
  //   </div>
  //   <section className="w-[90%] mx-auto mt-10">
  //     {services.map((service, index) => (
  //       <ServiceCard
  //         key={service.title.highlighted}
  //         {...service}
  //         isReversed={index % 2 !== 0}
  //       />
  //     ))}
  //   </section>
  // </section>
  <div>
    <Sec/>

  </div>
));

ServicesSection.displayName = "ServicesSection";
