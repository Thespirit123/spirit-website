"use client";

import { motion } from "framer-motion";
// import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface NavLinkProps {
    href: string;
    text: string;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
    className?: string;
    reloadOnClick?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({
    href,
    text,
    reloadOnClick = false,
    onClick,
    className = "",
}) => {
    const pathname = usePathname();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (onClick) onClick(e); // This is now correctly typed

        if (reloadOnClick) {
            e.preventDefault();
            window.location.href = href;
        }
    };

    const isActive =
        (href === "/" && pathname === "/") ||
        (href !== "/" && pathname === href) ||
        (href !== "/" && pathname.startsWith(`${href}/`));

    return (
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            {/* <Link href={href} passHref> */}
                <a
                href={href}
                    onClick={handleClick}
                    className={`hover:text-brand-primary transition-colors duration-200 ${isActive ? "text-brand-primary" : "text-gray-800"} ${className}`}
                >
                    <p className={`${isActive ? "font-semibold" : "font-normal"} text-base`}>
                        {text}
                    </p>
                </a>
            {/* </Link> */}
        </motion.div>
    );
};

export default React.memo(NavLink);
