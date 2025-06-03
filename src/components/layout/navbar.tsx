"use client";
import React, { useCallback, useState, useEffect } from "react";
import PhoneIcon from "@/assets/icons/phone";
import LogoImg from "@/assets/images/logo.png";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { toast } from "react-hot-toast";
import Button from "../custom-ui/button";
import MobileMenu from "./mobile-menu";
import NavLink from "./navlink";
import "./footer.css"
// import SocialLinks from "./social-links";
import UserMenuContent from "./user-menu-content";

const SOCIAL_LINKS = {
  WHATSAPP: `https://wa.me/2349035745258?text=${encodeURIComponent(
    "Hi, I'd like to know more about your streaming service"
  )}`,
  PHONE_NUMBER: "2349035745258",
};

type ComingSoonFeature = "utility" | "international";

const COMING_SOON_MESSAGES: Record<ComingSoonFeature, string> = {
  utility: "Utility payments coming soon!",
  international: "Foreign numbers coming soon!",
};

const Navbar = () => {

  const [isFixed, setIsFixed] = useState(false);
  const { user, loading } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard") || pathname?.startsWith("/admin");

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? "hidden" : "unset";
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsFixed(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const generateWhatsAppUrl = (phone: string, message: string) =>
    `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  const handleUtilityClick = (
    e: React.MouseEvent,
    feature: ComingSoonFeature
  ) => {
    e.preventDefault();
    toast(COMING_SOON_MESSAGES[feature], {
      icon: "🚧",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
      duration: 3000,
    });
  };

  if (loading)
    return <div className="w-8 h-8 rounded-full animate-pulse bg-gray-200" />;

  
  return (
    <nav
      className={`navbar ${isFixed ? 'fixed' : ''} ${isDashboard ? "w-full mt-0" : "w-full mt-0"
       } mx-auto relative  `} 
    >
      {/* <div className="flex justify-between items-center px-6 py-2">
        <div className="flex items-center gap-4">
          <PhoneIcon />
          <a
            href={generateWhatsAppUrl(
              SOCIAL_LINKS.PHONE_NUMBER,
              "Hi, I'd like to know more about your streaming service"
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="text-base hover:text-brand-primary transition-colors cursor-pointer"
            aria-label="Chat with us on WhatsApp"
          >
            +234 903 574 5258
          </a>
        </div>

        <SocialLinks />
      </div> */}

      <div className="border-b border-black/10" />

      <div className="flex items-center justify-between gap-8 w-full px-6 py-2">
        <Link href="/">
          <Image
            src={LogoImg}
            height={100}
            width={100}
            alt="The Spirit Media"
            className="object-cover"
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex gap-8">
          <li>
            <NavLink href="/movie-portal" text="Foreign Numbers" />
          </li>
          <li>
            <NavLink href="/utility-payment" text="Airtime & Data " />
          </li>
          <li>
            <NavLink href="/movie-portal" text="Movie Portal" />
          </li>
          <li>
            <NavLink href="/whatsapp-tool" text="WhatsApp Spy App" />
          </li>
          <li>
            <NavLink
              href="/utility-payment"
              text="Cracked App"
              onClick={(e) => handleUtilityClick(e, "utility")}
            />
          </li>

          <li>
            <NavLink href="/freebies" text="Freebies" />
          </li>
          {/* <li>
            <NavLink href="/feedback" text="Support" />
          </li> */}
          {/* <li>
            <NavLink href="/feedback" text="Feedback" />
          </li> */}
          {/* <li>
            <NavLink
              href="/utility-payment"
              text="Utility Payment"
              onClick={(e) => handleUtilityClick(e, "utility")}
            />
          </li> */}
          {/* <li>
            <NavLink
              href="/international-numbers"
              text="Foreign Numbers"
              onClick={(e) => handleUtilityClick(e, "international")}
            />
          </li> */}
        </ul>

        {/* Desktop Auth Button/Menu */}
        <div className="hidden lg:block llk "  style={{display:"flex",justifyContent:"center",alignItems:"center",gap:"20px"}}>

          <div className="flex items-center gap-4">
            <PhoneIcon /> 
            <a
              href={generateWhatsAppUrl(
                SOCIAL_LINKS.PHONE_NUMBER,
                "Hi, I'd like to know more about your streaming service"
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base hover:text-brand-primary transition-colors cursor-pointer"
              aria-label="Chat with us on WhatsApp"
            >
              1-800-SPIRIT
            </a>
          </div>

          {user ? (
            <UserMenuContent />
          ) : (
            <Button variant="primary" size="sm" asLink href="/auth/login">
              Log In
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="lg:hidden p-2"
          aria-expanded={isMenuOpen}
          aria-label="Toggle menu"
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span
              className={`h-0.5 w-full bg-gray-800 transition-all duration-300 ${
                isMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`h-0.5 w-full bg-gray-800 transition-all duration-300 ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-full bg-gray-800 transition-all duration-300 ${
                isMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </div>
        </button>
      </div>

      <MobileMenu
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        handleUtilityClick={handleUtilityClick}
      />
    </nav>
  );
};

export default React.memo(Navbar);
