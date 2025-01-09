import InstagramIcon from "@/assets/icons/instagram";
import TelegramIcon from "@/assets/icons/telegram";
import TikTokIcon from "@/assets/icons/tiktok";
import WhatsappIcon from "@/assets/icons/whatsapp";

export const SOCIAL_LINKS = {
  WHATSAPP: `https://wa.me/2349035745258?text=${encodeURIComponent(
    "Hi, I'd like to know more about your streaming service"
  )}`,
  TELEGRAM: "https://t.me/TheSpiritMediaEnt",
  INSTAGRAM: "https://www.instagram.com/theespiritmedia/",
  TIKTOK: "https://www.tiktok.com/@theespiritmedia",
} as const;

interface SocialLinksProps {
  className?: string;
  iconClassName?: string;
}

export const SocialLinks = ({
  className = "",
  iconClassName = "",
}: SocialLinksProps) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <a
      href={SOCIAL_LINKS.WHATSAPP}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className={`hover:opacity-80 transition-opacity ${iconClassName}`}
    >
      <WhatsappIcon />
    </a>
    <a
      href={SOCIAL_LINKS.TELEGRAM}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Join our Telegram channel"
      className={`hover:opacity-80 transition-opacity ${iconClassName}`}
    >
      <TelegramIcon />
    </a>
    <a
      href={SOCIAL_LINKS.INSTAGRAM}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Follow us on Instagram"
      className={`hover:opacity-80 transition-opacity ${iconClassName}`}
    >
      <InstagramIcon />
    </a>
    <a
      href={SOCIAL_LINKS.TIKTOK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Follow us on TikTok"
      className={`hover:opacity-80 transition-opacity ${iconClassName}`}
    >
      <TikTokIcon />
    </a>
  </div>
);
