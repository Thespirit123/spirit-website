"use client";
import { useAuth } from "@/hooks/useAuth";
import { SelectedPlatform, setSelectedPlatform } from "@/lib/platform-storage";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
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
        transition: { delay: i * 0.05, type: "spring", stiffness: 300, damping: 20 },
    }),
};

const MobileMenu: React.FC<MobileMenuProps> = ({
    isMenuOpen,
    toggleMenu,
    handleUtilityClick,
}) => {
    const { user, logout } = useAuth();
    const router = useRouter();

    const handleLogout = useCallback(async () => {
        try {
            await logout();
            setSelectedPlatform(null);
            toggleMenu();
            router.push('/auth/login');
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }, [logout, router, toggleMenu]);

    const handlePlatformNavigation = useCallback((platform: SelectedPlatform, path: string) => {
        setSelectedPlatform(platform);
        toggleMenu();
        router.push(path);
    }, [router, toggleMenu]);

    const navItems = [
        {
            href: "/international-numbers",
            text: "Foreign Numbers",
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
    ];


    return (
        <AnimatePresence>
            {isMenuOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-20 lg:hidden"
                        onClick={toggleMenu}
                    />

                    <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                        className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-xl rounded-b-lg overflow-hidden z-30"
                    >
                        <button
                            onClick={toggleMenu}
                            className="absolute top-0 right-4 text-gray-500 hover:text-gray-700 z-40"
                            aria-label="Close menu"
                        >
                            <X size={30} />
                        </button>
                        <div className="p-5 pt-12">
                            <motion.ul
                                className="flex flex-col gap-1"
                                variants={{
                                    open: {
                                        transition: { staggerChildren: 0.05, delayChildren: 0.1 },
                                    },
                                    closed: {
                                        transition: { staggerChildren: 0.05, staggerDirection: -1 }
                                    }
                                }}
                            >
                                {navItems.map((item, i) => (
                                    <motion.li
                                        key={item.href}
                                        custom={i}
                                        variants={menuItemVariants}
                                    >
                                        <NavLink
                                            href={item.href}
                                            text={item.text}
                                            onClick={(e) => {
                                                item.onClick?.(e);
                                                if (!item.onClick) {
                                                    toggleMenu();
                                                }
                                            }}
                                            className="block px-3 py-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                                        />
                                    </motion.li>
                                ))}
                            </motion.ul>

                            <motion.div
                                className="mt-5 pt-5 border-t border-gray-200"
                                custom={navItems.length}
                                variants={menuItemVariants}
                            >
                                {user ? (
                                    <div className="space-y-3">
                                        <Button
                                            variant="outline"
                                            size="lg"
                                            fullWidth
                                            onClick={() => handlePlatformNavigation('affiliate', '/dashboard')}
                                            className="justify-start text-gray-700"
                                        >
                                            Affiliate Dashboard
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="lg"
                                            fullWidth
                                            onClick={() => handlePlatformNavigation('utilities', '/utilities-dashboard')}
                                            className="justify-start text-gray-700"
                                        >
                                            Utilities Dashboard
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="lg"
                                            fullWidth
                                            onClick={handleLogout}
                                            className="justify-start"
                                        >
                                            Logout
                                        </Button>
                                    </div>
                                ) : (
                                    <Button
                                        variant="primary"
                                        size="lg"
                                        fullWidth
                                        onClick={() => {
                                            toggleMenu();
                                            router.push('/auth/login');
                                        }}
                                    >
                                        Log In / Sign Up
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