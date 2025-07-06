// import MoviePortalImg from "@/assets/images/service-movies.png";
// import UtilityImg from "@/assets/images/service-utility.png";
// import WhatsAppImg from "@/assets/images/service-whatsapp.png";
// import { forwardRef } from "react";
// // import { ServiceCard } from "./serviceCard";
// import Sec from "./servicesSection"

// export const services = [
//   {
//     image: MoviePortalImg,
//     number: "01",
//     title: {
//       highlighted: "Movies",
//       normal: "Portal",
//     },
//     description:
//       "Unlock unlimited entertainment with our comprehensive movie streaming platform. Access a vast library of films across genres, enjoy high-quality streaming, and discover new cinematic experiences anytime, anywhere.",
//     href: "/movie-portal",
//   },
//   {
//     image: WhatsAppImg,
//     number: "02",
//     title: {
//       highlighted: "WhatsApp",
//       normal: "Monitoring Tool",
//     },
//     description:
//       "Advanced communication tracking designed for personal and professional insights. Monitor messages, calls, and digital interactions with discretion and precision.",
//     href: "/whatsapp-tool",
//   },
//   {
//     image: UtilityImg,
//     number: "03",
//     title: {
//       highlighted: "Utility",
//       normal: "Payments",
//     },
//     description:
//       "Instant mobile credit solutions at your fingertips. Quickly recharge your phone, support multiple networks, and stay connected with our seamless and secure airtime top-up service.",
//     href: "/utility-payment",
//     isUtility: true,
//   },
// ];

// export const ServicesSection = forwardRef<HTMLElement>(() => (
//   // <section ref={ref} className="pt-20 pb-10">
//   //   <div className="bg-brand-primary-light text-center w-max mx-auto px-4 py-2 rounded-full">
//   //     <h3 className="text-brand-primary font-semibold text-2xl">
//   //       Our Services
//   //     </h3>
//   //   </div>
//   //   <section className="w-[90%] mx-auto mt-10">
//   //     {services.map((service, index) => (
//   //       <ServiceCard
//   //         key={service.title.highlighted}
//   //         {...service}
//   //         isReversed={index % 2 !== 0}
//   //       />
//   //     ))}
//   //   </section>
//   // </section>
//   <div>
//     <Sec/>

//   </div>
// ));

// ServicesSection.displayName = "ServicesSection";
import CrackedImg from "@/assets/images/serviceID.png";
import FreebiesImg from "@/assets/images/freebies.png";
import ForeignNumbersImg from "@/assets/images/ForeignNumbers.png";

import MoviePortalImg from "@/assets/images/service-movies.png";
import UtilityImg from "@/assets/images/service-utility.png";
import WhatsAppImg from "@/assets/images/service-whatsapp.png";
import { forwardRef } from "react";
import { ServiceCard } from "./serviceCard";

export const services = [
  {
    image: ForeignNumbersImg,
    number: "01",
    title: {
      highlighted: "Foreign",
      normal: "Numbers",
    },
    description:
      "The Fastest & Most Affordable Online SMS Verification. Keep your personal number private and stay secure online. Our one- time - use, non - VoIP phone numbers work with most apps and services.Choose from a wide range of countries and verify hassle - free—fast, safe, and affordable.",
    href: "/movie-portal",
  },
  {
    image: UtilityImg,
    number: "02",
    title: {
      highlighted: "Airtime",
      normal: "and Data",
    },
    description:
      "Get the best deals on data plans, airtime, and utility bill payments—all at unbeatable prices and lightning-fast speed.",
    href: "/utility-payment",
  },
  {
    image: MoviePortalImg,
    number: "03",
    title: {
      highlighted: "Movies",
      normal: "Portal",
    },
    description:
      "Unlock unlimited entertainment with our comprehensive movie streaming Apps. Access a vast library of films across genres, enjoy high-quality streaming, and discover new cinematic experiences anytime, anywhere.",
    href: "/movie-portal",
  },
  {
    image: WhatsAppImg,
    number: "04",
    title: {
      highlighted: "WhatsApp",
      normal: "Spy App",
    },
    description:
      "Our Whatsapp Spy App guarantees that you can now check on all the chats of your family and friends without getting caught. Now there's no need to bother about trust when you can easily access their Whatsapp and see people for who they are.",
    href: "/whatsapp-tool",
  },
  {
    image: CrackedImg,
    number: "05",
    title: {
      highlighted: "Cracked",
      normal: "App",
    },
    description:
      "Tired of paying for monthly subscriptions on your applications well we have you covered. With our cracked apps say no to monthly subscription and you'll get the best app with value for your money.",
    href: "/cracked",
  },
  {
    image: FreebiesImg,
    number: "06",
    title: {
      highlighted: "Freebies",
      normal: "Portal",
    },
    description:
      "We are a huge fan of giving so from time to time we'll try to drop some free stuffs here. Personally the main things we think are important in life is wealth, health, mindset and sex so a lot of things free things we drop will go along that lines.",
    href: "/freebies",
    // isUtility: true,
  },
];

export const ServicesSection = forwardRef<HTMLElement>((props, ref) => (
  <section ref={ref} className="pt-20 pb-10">
    <div className="bg-brand-primary-light text-center w-max mx-auto px-4 py-2 rounded-full">
      <h3 className="text-brand-primary font-semibold text-2xl" data-aos="fade-up" data-aos-delay="200">
        Our Services
      </h3>
    </div>
    <section className="w-[90%] mx-auto mt-10">
      {services.map((service, index) => (
        <ServiceCard
          key={service.title.highlighted}
          {...service}
          isReversed={index % 2 !== 0}

        />
      ))}
    </section>
  </section>
));

ServicesSection.displayName = "ServicesSection";

