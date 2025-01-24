"use client";
import PhoneIcon from "@/assets/icons/phone";
import LogoImg from "@/assets/images/logo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Button from "../custom-ui/button";
import { SocialLinks } from "./social-links";

const SOCIAL_LINKS = {
  WHATSAPP: `https://wa.me/2349035745258?text=${encodeURIComponent(
    "Hi, I'd like to know more about your streaming service"
  )}`,
  TELEGRAM: "https://t.me/TheSpiritMediaEnt",
  INSTAGRAM: "https://www.instagram.com/theespiritmedia/",
  TIKTOK: "https://www.tiktok.com/@theespiritmedia",
  PHONE_NUMBER: "2349035745258",
};

type ComingSoonFeature = "utility" | "international";

const COMING_SOON_MESSAGES: Record<ComingSoonFeature, string> = {
  utility: "Utility payments coming soon!",
  international: "International numbers coming soon!",
};

const menuVariants = {
  closed: {
    y: -20,
    opacity: 0,
    transition: { duration: 0.2 },
  },
  open: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.2 },
  },
};

const menuItemVariants = {
  closed: { x: 20, opacity: 0 },
  open: (i: number) => ({
    x: 0,
    opacity: 1,
    transition: { delay: i * 0.1 },
  }),
};

const Navbar = () => {
  const { user, logout, profile, loading } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? "hidden" : "unset";
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
    document.body.style.overflow = "unset";
  }, [pathname]);

  const generateWhatsAppUrl = (phone: string, message: string) =>
    `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  const handleLogout = useCallback(async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }, [logout]);

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

  const UserMenuContent = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 hover:text-brand-primary transition-colors">
          <div className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center">
            {profile?.firstName?.[0]?.toUpperCase() ||
              user?.email?.[0].toUpperCase()}
          </div>
          <span className="hidden lg:block text-sm">
            {profile?.username || user?.email}
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 z-5">
        <DropdownMenuItem asChild>
          <Link href="/dashboard">Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="text-red-600">
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <nav
      className={`${
        isDashboard ? "w-full mt-0" : "w-11/12 mt-4"
      } bg-white mx-auto relative z-10 rounded-md shadow-[0_0_7px_0_rgba(0,0,0,0.1)]`}
    >
      <div className="flex justify-between items-center px-6 py-2">
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
      </div>

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
            <NavLink href="/movie-portal" text="Movie Portal" />
          </li>

          <li>
            <NavLink href="/whatsapp-tool" text="Whatsapp Monitoring Tool" />
          </li>
          <li>
            <NavLink href="/feedback" text="Feedback" />
          </li>
          <li>
            <NavLink
              href="/utility-payment"
              text="Utility Payment"
              onClick={(e) => handleUtilityClick(e, "utility")}
            />
          </li>
          <li>
            <NavLink
              href="/international-numbers"
              text="International Numbers"
              onClick={(e) => handleUtilityClick(e, "international")}
            />
          </li>
        </ul>

        {/* Desktop Auth Button/Menu */}
        <div className="hidden lg:block">
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

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 z-2 lg:hidden"
              onClick={toggleMenu}
            />

            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-md overflow-hidden z-3"
            >
              <div className="p-6">
                <motion.ul
                  className="flex flex-col gap-6"
                  variants={{
                    open: {
                      transition: { staggerChildren: 0.1 },
                    },
                  }}
                >
                  {[
                    { href: "/movie-portal", text: "Movie Portal" },
                    {
                      href: "/whatsapp-tool",
                      text: "Whatsapp Monitoring Tool",
                    },
                    { href: "/feedback", text: "Feedback" },
                    {
                      href: "/utility-payment",
                      text: "Utility Payment",
                      onClick: (e: React.MouseEvent) =>
                        handleUtilityClick(e, "utility"),
                    },
                    {
                      href: "/international-numbers",
                      text: "International Numbers",
                      onClick: (e: React.MouseEvent) =>
                        handleUtilityClick(e, "international"),
                    },
                  ].map((item, i) => (
                    <motion.li
                      key={item.href}
                      custom={i}
                      variants={menuItemVariants}
                    >
                      <NavLink
                        href={item.href}
                        text={item.text}
                        onClick={item.onClick}
                      />
                    </motion.li>
                  ))}
                </motion.ul>

                <motion.div
                  className="mt-6"
                  variants={menuItemVariants}
                  custom={4}
                >
                  {user ? (
                    <div className="space-y-2">
                      <Link href="/dashboard">
                        <Button variant="outline" size="sm" fullWidth>
                          Dashboard
                        </Button>
                      </Link>
                      <Button
                        variant="primary"
                        size="sm"
                        fullWidth
                        onClick={handleLogout}
                      >
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="primary"
                      size="sm"
                      fullWidth
                      asLink
                      href="/auth/login"
                    >
                      Log In
                    </Button>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

interface NavLinkProps {
  href: string;
  text: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
}

function NavLink({ href, text, onClick, className = "" }: NavLinkProps) {
  const pathname = usePathname();
  const isActive =
    (href === "/" && pathname === "/") ||
    (href !== "/" && pathname === href) ||
    (href !== "/" && pathname.startsWith(`${href}/`));

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Link
        href={href}
        className={`
          ${isActive ? "text-brand-primary" : "text-gray-800"}
          hover:text-brand-primary
          transition-colors
          duration-200
          ${className}
        `}
        onClick={onClick}
      >
        <p
          className={`${isActive ? "font-semibold" : "font-normal"} text-base`}
        >
          {text}
        </p>
      </Link>
    </motion.div>
  );
}
