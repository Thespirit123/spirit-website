"use client";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import React from "react";

// interface NavLinkProps {
//     href: string;
//     text: string;
//     onClick?: (e: React.MouseEvent<HTMLElement>) => void;
//     className?: string;
//     reloadOnClick?: boolean;
// }

// const NavLink: React.FC<NavLinkProps> = ({
//     href,
//     text,
//     reloadOnClick = false,
//     onClick,
//     className = "",
// }) => {
//     const pathname = usePathname();
//     const router = useRouter()

//     const handleClick = (e: React.MouseEvent) => {
//         if (onClick) {
//             onClick(); // Close menu
//           }

//         if (reloadOnClick) {
//             e.preventDefault();
//             window.location.href = href; // Full reload
//         }
//     };

//     const isActive =
//         (href === "/" && pathname === "/") ||
//         (href !== "/" && pathname === href) ||
//         (href !== "/" && pathname.startsWith(`${href}/`));

//     return (
//         <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//             <Link
//                 href={href}
//                 className={`
//           ${isActive ? "text-brand-primary" : "text-gray-800"}
//           hover:text-brand-primary
//           transition-colors
//           duration-200
//           ${className}
//         `}
//                 onClick={handleClick}
//             >
//                 <p
//                     className={`${isActive ? "font-semibold" : "font-normal"
//                         } text-base`}
//                 >
//                     {text}
//                 </p>
//             </Link>
//         </motion.div>
//     );
// };

// export default React.memo(NavLink);
// components/navlink.tsx
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
    href: string;
    text: string;
    reloadOnClick?: boolean;
    onClick?: () => void;
};

const NavLink = ({ href, text, reloadOnClick = false, onClick }: Props) => {
    const router = useRouter();

    const handleClick = (e: React.MouseEvent) => {
        if (onClick) {
            onClick(); // Close menu
        }

        if (reloadOnClick) {
            e.preventDefault(); // Prevent default anchor behavior
            router.push(href);  // Navigate programmatically
        }
    };

    return (
        <Link href={href} onClick={handleClick} className="hover:text-brand-primary">
            {text}
        </Link>
    );
};

export default NavLink;

