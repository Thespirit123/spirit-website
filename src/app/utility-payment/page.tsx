"use client";
import nineMobileLogo from '@/assets/images/9mobile-logo.png';
import aedcLogo from '@/assets/images/aedc.png';
import airtelLogo from '@/assets/images/airtel-logo.png';
import eedcLogo from '@/assets/images/eedc.png';
import ekedcLogo from '@/assets/images/ekedc.png';
import gloLogo from '@/assets/images/globacom-logo.png';
import ibedcLogo from '@/assets/images/ibedc.png';
import ieLogo from '@/assets/images/ie.png';
import josLogo from '@/assets/images/jos.png';
import kadunaLogo from '@/assets/images/kaduna.png';
import kedcoLogo from '@/assets/images/kedco.png';
import mtnLogo from '@/assets/images/mtn-logo.jpeg';
import phedcLogo from '@/assets/images/phedc.png';
import Button from "@/components/custom-ui/button";
import { Text } from "@/components/custom-ui/text";
import { useAuth } from "@/hooks/useAuth";
import {
  Clock,
  DollarSign,
  LucideIcon,
  MessageCircle,
  Network,
  ShoppingBag,
  ShoppingCart,
  Smartphone,
  Twitter,
} from 'lucide-react';
import Image, { StaticImageData } from 'next/image';
import { useRouter } from "next/navigation";
import { useState } from "react";
import DataPlanCard from "./components/DataPlanCard";


interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface Provider {
  logo: StaticImageData;
  alt: string;
  href?: string;
}

interface DataPlan {
  data: string;
  price: string;
  days: string;
}

interface NetworkDataPlans {
  name: string;
  logo: StaticImageData;
  color: string;
  textColor: string;
  plans: DataPlan[];
}

const featuresData: Feature[] = [
  {
    icon: ShoppingCart,
    title: "Instant Purchase",
    description: "Buy airtime and data instantly. Credits reflect in your account within seconds.",
  },
  {
    icon: Network,
    title: "All Networks Supported",
    description: "Purchase airtime and data for MTN, Airtel, Glo, and 9Mobile networks.",
  },
  {
    icon: DollarSign,
    title: "Competitive Prices",
    description: "Get the best rates for data bundles and enjoy affordable pricing across all networks.",
  },
  {
    icon: Smartphone,
    title: "Multiple Payment Options",
    description: "Pay with bank transfer, USSD, cards, or digital wallets for maximum convenience.",
  },
  {
    icon: Clock,
    title: "24/7 Service",
    description: "Purchase airtime and data anytime, anywhere. Our platform never sleeps.",
  },
  {
    icon: ShoppingBag,
    title: "Bulk Purchase",
    description: "Buy airtime and data in bulk for your business needs with special discount rates.",
  },
];

const serviceProvidersData: Provider[] = [
  { logo: mtnLogo, alt: "MTN" },
  { logo: airtelLogo, alt: "Airtel" },
  { logo: gloLogo, alt: "Glo" },
  { logo: nineMobileLogo, alt: "9Mobile" },
  { logo: aedcLogo, alt: "AEDC" },
  { logo: eedcLogo, alt: "EEDC" },
  { logo: ekedcLogo, alt: "EKEDC" },
  { logo: ibedcLogo, alt: "IBEDC" },
  { logo: ieLogo, alt: "Ikeja Electric" },
  { logo: josLogo, alt: "Jos Electric" },
  { logo: kadunaLogo, alt: "Kaduna Electric" },
  { logo: kedcoLogo, alt: "KEDCO" },
  { logo: phedcLogo, alt: "PHEDC" },
];

const dataPlansByNetwork: Record<string, NetworkDataPlans> = {
  mtn: {
    name: "MTN DATA",
    logo: mtnLogo,
    color: "bg-[#F6C603]",
    textColor: "text-black",
    plans: [
      { data: '75.04MB', price: '₦100', days: '1 day' },
      { data: '150.34MB', price: '₦200', days: '1 day' },
      { data: '350.16MB', price: '₦300', days: '7 days' },
      { data: '1.35GB', price: '₦500', days: '30 days' },
      { data: '2.5GB', price: '₦1200', days: '1 day' },
      { data: '6GB', price: '₦1500', days: '30 days' },
      { data: '12GB', price: '₦3000', days: '30 days' },
      { data: '22GB', price: '₦5000', days: '30 days' },
      { data: '40GB', price: '₦10000', days: '30 days' },
      { data: '75GB', price: '₦15000', days: '30 days' },
      { data: '110GB', price: '₦20000', days: '30 days' }
    ]
  },
  airtel: {
    name: "AIRTEL DATA",
    logo: airtelLogo,
    color: "bg-[#E20010]",
    textColor: "text-white",
    plans: [
      { data: '100.00MB', price: '₦100', days: '1 day' },
      { data: '200.00MB', price: '₦200', days: '3 days' },
      { data: '350.00MB', price: '₦300', days: '7 days' },
      { data: '750.00MB', price: '₦500', days: '14 days' },
      { data: '1.5GB', price: '₦1200', days: '30 days' },
      { data: '4.5GB', price: '₦2000', days: '30 days' },
      { data: '10GB', price: '₦3000', days: '30 days' },
      { data: '20GB', price: '₦5000', days: '30 days' },
      { data: '40GB', price: '₦8000', days: '30 days' },
      { data: '75GB', price: '₦15000', days: '30 days' },
      { data: '120GB', price: '₦20000', days: '30 days' }
    ]
  },
  glo: {
    name: "GLO DATA",
    logo: gloLogo,
    color: "bg-[#53AB47]",
    textColor: "text-white",
    plans: [
      { data: '200.00MB', price: '₦200', days: '14 days' },
      { data: '500.00MB', price: '₦500', days: '30 days' },
      { data: '1.6GB', price: '₦1000', days: '30 days' },
      { data: '3.2GB', price: '₦1500', days: '30 days' },
      { data: '7.7GB', price: '₦2500', days: '30 days' },
      { data: '10GB', price: '₦3000', days: '30 days' },
      { data: '13.25GB', price: '₦4000', days: '30 days' },
      { data: '18.25GB', price: '₦5000', days: '30 days' },
      { data: '29.5GB', price: '₦8000', days: '30 days' },
      { data: '50GB', price: '₦10000', days: '30 days' },
      { data: '93GB', price: '₦15000', days: '30 days' },
      { data: '119GB', price: '₦18000', days: '30 days' }
    ]
  },
  '9mobile': {
    name: "9MOBILE DATA",
    logo: nineMobileLogo,
    color: "bg-[#006E53]",
    textColor: "text-white",
    plans: [
      { data: '200.00MB', price: '₦200', days: '30 days' },
      { data: '1.5GB', price: '₦1000', days: '30 days' },
      { data: '2GB', price: '₦1200', days: '30 days' },
      { data: '3GB', price: '₦1500', days: '30 days' },
      { data: '4.5GB', price: '₦2000', days: '30 days' },
      { data: '11GB', price: '₦4000', days: '30 days' },
      { data: '15GB', price: '₦5000', days: '30 days' },
      { data: '27.5GB', price: '₦8000', days: '30 days' },
      { data: '50GB', price: '₦10000', days: '30 days' },
      { data: '100GB', price: '₦15000', days: '30 days' },
      { data: '165GB', price: '₦20000', days: '30 days' }
    ]
  }
};


const UtilitiesPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const handleNavigation = () => {
    if (user) {
      router.push('/utilities');
    } else {
      router.push('/auth/login');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <section
        className="relative bg-cover bg-center flex items-center h-[70vh] md:h-[500px]"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80')"
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-xl text-left">
            <h1 className="text-white text-3xl md:text-4xl font-bold mb-4 leading-tight">
              Top up your phone in seconds with the best rates
            </h1>
            <p className="text-gray-200 text-base md:text-lg mb-6 opacity-90">
              Most convenient way to purchase airtime, data bundles, and pay utilities
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              <button className="bg-white text-gray-800 px-4 py-2 rounded font-medium border-l-4 border-[#F6C603]">
                MTN
              </button>
              <button className="bg-white text-gray-800 px-4 py-2 rounded font-medium border-l-4 border-[#E20010]">
                Airtel
              </button>
              <button className="bg-white text-gray-800 px-4 py-2 rounded font-medium border-l-4 border-[#55B048]">
                Glo
              </button>
              <button className="bg-white text-gray-800 px-4 py-2 rounded font-medium border-l-4 border-[#006E53]">
                9Mobile
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Enter your phone number to begin"
                className="flex-1 px-4 py-3 rounded border-0 text-gray-800"
              />
              <Button onClick={handleNavigation} size="md">
                Buy airtime / data
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F9FAFB] py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-semibold text-gray-800 mb-12">
            Affordable Data Plans And Prices
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.values(dataPlansByNetwork).map((network) => (
              <DataPlanCard
                key={network.name}
                networkName={network.name}
                networkLogo={network.logo}
                cardColor={network.color}
                textColor={network.textColor}
                plans={network.plans}
                data-aos="fade-up" data-aos-delay="200"
              />
            ))}
          </div>
        </div>
      </section>

      <div className="bg-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-3xl font-bold text-gray-800 mb-12"  data-aos="fade-up" data-aos-delay="200">
            Why choose Spirit Media?
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuresData.map((feature, index) => (
              <div key={index} className="text-left bg-gray-50 p-6 md:p-8 rounded-lg shadow-sm transition-shadow hover:shadow-md" data-aos="fade-up" data-aos-delay="200">
                <div className="w-14 h-14 bg-[#E6F7FA] rounded-full flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-[#008EA8]" />
                </div>
                <p className="text-xl font-bold text-[#0F172A] mb-3">
                  {feature.title}
                </p>
                <p className="text-[#4B5563] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#F7D358] py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-3xl font-bold text-gray-800 mb-4" data-aos="fade-down" data-aos-delay="200">
            What our users are saying about us
          </p>
          <p className="text-center text-gray-700 mb-12 text-lg" data-aos="fade-up" data-aos-delay="200">
            See what our customers are saying about their experience
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" >
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow" data-aos="fade-up" data-aos-delay="200">
              <Text className="text-gray-700 mb-4 leading-relaxed">
                &quot;When I started using Spirit Media to recharge my phone, I have never had issue when my unit dropped completely so I can recharge anytime, anywhere.&quot;
              </Text>
              <div className="flex items-center justify-between">
                <Text className="font-semibold text-gray-800">@adtrinitro</Text>
                <Twitter className="w-5 h-5 text-[#008EA8]" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow" data-aos="fade-up" data-aos-delay="200">
              <Text className="text-gray-700 mb-4 leading-relaxed">
                &quot;I&apos;ve been using the Spirit Media app and it&apos;s superb. They have the cheapest for all my family data.&quot;
              </Text>
              <div className="flex items-center justify-between">
                <Text className="font-semibold text-gray-800">@adaora</Text>
                <Twitter className="w-5 h-5 text-[#008EA8]" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow" data-aos="fade-up" data-aos-delay="200">
              <Text className="text-gray-700 mb-4 leading-relaxed">
                &quot;It&apos;s been more easy Spirit Media to purchase data.&quot;
              </Text>
              <div className="flex items-center justify-between">
                <Text className="font-semibold text-gray-800">@tomnipsy</Text>
                <MessageCircle className="w-5 h-5 text-[#008EA8]" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow" data-aos="fade-up" data-aos-delay="200">
              <Text className="text-gray-700 mb-4 leading-relaxed">
                &quot;Made my life very easy. Before now if my units finish, I will have to find the nearest office the next day of which long queues are usually met, but now thanks to Spirit Media.&quot;
              </Text>
              <div className="flex items-center justify-between">
                <Text className="font-semibold text-gray-800">@donosnever</Text>
                <Twitter className="w-5 h-5 text-[#008EA8]" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow" data-aos="fade-up" data-aos-delay="200">
              <Text className="text-gray-700 mb-4 leading-relaxed">
                &quot;It&apos;s convenient for my family and I buy units without the stress of going out to buy more.&quot;
              </Text>
              <div className="flex items-center justify-between">
                <Text className="font-semibold text-gray-800">@mrraynjm</Text>
                <Twitter className="w-5 h-5 text-[#008EA8]" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow" data-aos="fade-up" data-aos-delay="200">
              <Text className="text-gray-700 mb-4 leading-relaxed">
                &quot;It&apos;s been very easy and effective&quot;
              </Text>
              <div className="flex items-center justify-between">
                <Text className="font-semibold text-gray-800">@moresky</Text>
                <Twitter className="w-5 h-5 text-[#008EA8]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-12 md:py-16 bg-[#F3F4F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-3xl font-bold text-gray-800 mb-12" data-aos="fade-up" data-aos-delay="200">
            Our Service Providers
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-8 items-center">
            {serviceProvidersData.map((provider) => (
              <div key={provider.alt} className="bg-white p-4 flex justify-center hover:scale-105 transition-transform rounded-lg shadow-sm"  data-aos="fade-up" data-aos-delay="200">
                <Image
                  src={provider.logo}
                  alt={provider.alt}
                  className="h-12 object-contain"
                  width={120}
                  height={48}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#008EA8] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-white text-2xl font-bold mb-2" data-aos="fade-right" data-aos-delay="200">
                Buy Airtime/Data instantly with Spirit Media
              </p>
              <p className="text-white opacity-90" data-aos="fade-right" data-aos-delay="200">
                Enter your phone number to get started
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-80 px-4 py-3 rounded border-0 text-gray-800"
              />
              <Button
                onClick={handleNavigation}
                size="md"
                className="bg-white hover:bg-gray-100 transition-colors text-[#008EA8] whitespace-nowrap"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UtilitiesPage;