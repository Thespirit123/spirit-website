"use client";
import FacebookIcon from "@/assets/icons/facebook";
import InstagramIcon from "@/assets/icons/instagram";
import PhoneIcon from "@/assets/icons/phone";
import TelegramIcon from "@/assets/icons/telegram";
import TikTokIcon from "@/assets/icons/tiktok";
import WhatsappIcon from "@/assets/icons/whatsapp";
import LogoImg from "@/assets/images/logo.png";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Button from "../custom-ui/button";

const menuVariants = {
  closed: {
    x: "100%",
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
  open: {
    x: 0,
    transition: { type: "spring", stiffness: 300, damping: 30 },
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? "hidden" : "unset";
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
    document.body.style.overflow = "unset";
  }, [pathname]);

  return (
    <nav className="w-11/12 bg-white mx-auto relative z-50 rounded-md mt-4 shadow-[0_0_7px_0_rgba(0,0,0,0.1)]">
      <div className="flex justify-between items-center px-6 py-2">
        <div className="flex items-center gap-4">
          <PhoneIcon />
          <p className="text-base">+234 903 574 5258</p>
        </div>

        <div className="flex items-center gap-2">
          <WhatsappIcon />
          <TelegramIcon />
          <FacebookIcon />
          <InstagramIcon />
          <TikTokIcon />
        </div>
      </div>

      <div className="border-b border-black/10" />

      <div className="flex items-center justify-between gap-8 w-full px-6 py-0">
        <Link href="/">
          <Image
            src={LogoImg}
            height={100}
            width={100}
            alt="Gather"
            className="object-cover"
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex gap-8">
          <li>
            <NavLink href="/movie-portal" text="Movie Portal" />
          </li>
          <li>
            <NavLink href="/utility-payment" text="Utility Payment" />
          </li>
          <li>
            <NavLink href="/whatsapp-tool" text="Whatsapp Monitoring Tool" />
          </li>
          <li>
            <NavLink href="/feedback" text="Feedback" />
          </li>
        </ul>

        <div className="hidden lg:block">
          <Button variant="primary" size="sm" isLink href="/auth/login">
            Log In
          </Button>
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
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="lg:hidden fixed inset-0 bg-white z-50"
          >
            <div className="flex flex-col h-full p-6">
              <div className="flex justify-between items-center mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Link href="/" onClick={() => setIsMenuOpen(false)}>
                    <Image
                      src={LogoImg}
                      height={80}
                      width={80}
                      alt="Gather"
                      className="object-cover"
                    />
                  </Link>
                </motion.div>
                <button
                  onClick={toggleMenu}
                  className="p-2"
                  aria-label="Close menu"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <motion.ul
                className="flex flex-col gap-6"
                variants={{
                  open: {
                    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
                  },
                }}
              >
                {[
                  { href: "/movie-portal", text: "Movie Portal" },
                  { href: "/utility-payment", text: "Utility Payment" },
                  { href: "/whatsapp-tool", text: "Whatsapp Monitoring Tool" },
                  { href: "/feedback", text: "Feedback" },
                ].map((item, i) => (
                  <motion.li
                    key={item.href}
                    custom={i}
                    variants={menuItemVariants}
                  >
                    <NavLink
                      href={item.href}
                      text={item.text}
                      onClick={toggleMenu}
                    />
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div
                className="mt-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Button
                  variant="primary"
                  size="sm"
                  fullWidth
                  isLink
                  href="/auth/login"
                >
                  Log In
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

interface NavLinkProps {
  href: string;
  text: string;
  onClick?: () => void;
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
