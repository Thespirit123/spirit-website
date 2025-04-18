import TelegramIcon from "@/assets/icons/telegram";
import FacebookIcon from "@/assets/icons/facebook";
// import InstagramIcon from "@/assets/icons/instagram";

export const SOCIAL_LINKS = {
  WHATSAPP: `https://chat.whatsapp.com/IZ9kgz1qkJW4wpDZl36KwR`,
  TELEGRAM: "https://t.me/Thespiritupdates",
} as const;

interface SocialLinksProps {
  className?: string;
  iconClassName?: string;
}

const SocialLinks = ({
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
      <FacebookIcon />
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
  </div>
);

export default SocialLinks;