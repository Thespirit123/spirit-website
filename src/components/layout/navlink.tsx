"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface NavLinkProps {
    href: string;
    text: string;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
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

export default React.memo(NavLink);