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
        <div className="flex flex-col md:flex-row justify-between gap-12">
          <div className="flex-shrink-0 md:w-1/3">
            <Image src={LogoImg} alt="Spirit Media" width={120} height={40} />
            <p className="mb-6 max-w-sm font-light">
              Your plug for all things entertainment.
            </p>
            <SocialLinks className="mb-6" />
            <p className="mb-6 max-w-sm font-light">
              © 2025 Spirit HQ. All Rights Reserved
            </p>
          </div>

          <div className="flex sm:flex-row gap-16 md:w-2/3 justify-end">
            <div>
              <ul className="space-y-3">
                {footerLinks.services.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="hover:text-primary font-light"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <ul className="space-y-3">
                <li className="font-light">Email: theespiritmedia@gmail.com</li>
                <li className="font-light">Phone: +234 903 574 5258‬</li>
                <li className="font-light">Support Hours: Mon-Fri, 9am-5pm</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

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
