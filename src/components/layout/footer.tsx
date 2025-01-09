import FooterImg from "@/assets/images/footer.png";
import LogoImg from "@/assets/images/logo.png";
import Image from "next/image";
import { SocialLinks } from "./social-links";

const footerLinks = {
  services: [
    { label: "Home", href: "/" },
    { label: "Movie Portal", href: "/movie-portal" },
    { label: "Utility Payment", href: "/utility-payment" },
    { label: "WhatsApp Monitoring Tool", href: "/whatsapp-tool" },
    { label: "Affiliate Hub", href: "/affiliate-hub" },
  ],
};

const Footer = () => {
  return (
    <footer className="py-16 relative">
      <div className="w-11/12 max-w-7xl mx-auto mb-10">
        <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-12">
          {/* Logo Section */}
          <div className="flex-shrink-0 md:w-1/3">
            <Image src={LogoImg} alt="Spirit Media" width={120} height={40} />
            <p className="mb-6 max-w-sm font-light text-sm sm:text-base">
              Your plug for all things entertainment.
            </p>
            <SocialLinks className="mb-6" />
            <p className="mb-6 max-w-sm font-light text-sm sm:text-base">
              © 2025 Spirit HQ. All Rights Reserved
            </p>
          </div>

          {/* Links Section */}
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 md:w-2/3 md:justify-end">
            {/* Services Links */}
            <div className="min-w-[140px]">
              <ul className="space-y-3">
                {footerLinks.services.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="hover:text-primary font-light text-sm sm:text-base whitespace-nowrap"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="min-w-[200px]">
              <ul className="space-y-3">
                <li className="font-light text-sm sm:text-base">
                  Email: theespiritmedia@gmail.com
                </li>
                <li className="font-light text-sm sm:text-base">
                  Phone: +234 903 574 5258‬
                </li>
                <li className="font-light text-sm sm:text-base">
                  Support Hours: Mon-Fri, 9am-5pm
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Image */}
      <div className="absolute bottom-0 left-0 w-[65%] h-28 hidden lg:block">
        <Image
          src={FooterImg}
          alt="Footer"
          layout="fill"
          className="object-cover object-top"
        />
      </div>
    </footer>
  );
};

export default Footer;
