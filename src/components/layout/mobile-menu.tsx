"use client";
import { useAuth } from "@/hooks/useAuth";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import Button from "../custom-ui/button";
import NavLink from "./navlink";

interface MobileMenuProps {
    isMenuOpen: boolean;
    toggleMenu: () => void;
    handleUtilityClick: (
        e: React.MouseEvent<HTMLAnchorElement>,
        feature: "utility" | "international"
    ) => void;
}

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

const MobileMenu: React.FC<MobileMenuProps> = ({
    isMenuOpen,
    toggleMenu,
    handleUtilityClick,
}) => {
    const { user, logout } = useAuth();

    return (
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
                                    // { href: "/international-numbers", text: "Foreign Numbers" },
                                    // { href: "/utility-payment", text: "Airtime & Data" },
                                    {
                                        href: "/international-numbers",
                                        text: "Foreign Numbers",
                                        onClick: (e: React.MouseEvent<HTMLElement>) =>
                                            handleUtilityClick(e as React.MouseEvent<HTMLAnchorElement>, "international"),
                                    },
                                    {
                                        href: "/utility-payment",
                                        text: "Airtime & Data",
                                        onClick: (e: React.MouseEvent<HTMLElement>) =>
                                            handleUtilityClick(e as React.MouseEvent<HTMLAnchorElement>, "utility"),
                                    },
                                    { href: "/movie-portal", text: "Movie Portal" },
                                    {
                                        href: "/whatsapp-tool",
                                        text: "Whatsapp Spy App",
                                    },
                                    { href: "/cracked", text: "Cracked Apps" },
                                    { href: "/freebies", text: "Freebies" },
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
                                            onClick={item.onClick}
                                        />
                                    </motion.li>
                                ))}
                            </motion.ul>

                            <motion.div className="mt-6" variants={menuItemVariants} custom={4}>
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
                                            onClick={async () => {
                                                try {
                                                    await logout();
                                                } catch (error) {
                                                    console.error("Logout failed:", error);
                                                }
                                            }}
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
    );
};

export default React.memo(MobileMenu);