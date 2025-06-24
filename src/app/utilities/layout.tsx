"use client";

import LogoImg from "@/assets/images/logo.png";
import ChatButton from "@/components/custom-ui/chat-button";
import {
    ChevronLeft,
    LayoutDashboard,
    Menu,
    MessageSquare,
    Phone,
    Receipt,
    Tv,
    Wifi,
    Zap,
} from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

type SidebarOption =
    | "overview"
    | "airtime"
    | "data"
    | "electricity"
    | "cable"
    | "transactions"
    | "contact";

const SIDEBAR_OPTIONS: {
    key: SidebarOption;
    label: string;
    href: string;
    icon: React.ReactNode;
}[] = [
        {
            key: "overview",
            label: "Overview",
            href: "/utilities",
            icon: <LayoutDashboard size={20} />,
        },
        {
            key: "airtime",
            label: "Airtime",
            href: "/utilities/airtime",
            icon: <Phone size={20} />,
        },
        {
            key: "data",
            label: "Data",
            href: "/utilities/data",
            icon: <Wifi size={20} />,
        },
        {
            key: "electricity",
            label: "Electricity",
            href: "/utilities/electricity",
            icon: <Zap size={20} />,
        },
        {
            key: "cable",
            label: "Cable TV",
            href: "/utilities/cable",
            icon: <Tv size={20} />,
        },
        {
            key: "transactions",
            label: "Transactions",
            href: "/utilities/transactions",
            icon: <Receipt size={20} />,
        },
        {
            key: "contact",
            label: "Contact",
            href: "https://chat.whatsapp.com/IZ9kgz1qkJW4wpDZl36KwR",
            icon: <MessageSquare size={20} />,
        },
    ];

interface UtilitiesLayoutProps {
    children: React.ReactNode;
}

const Sidebar: React.FC<{
    open: boolean;
    onClose: () => void;
    activeKey: SidebarOption;
}> = ({ open, onClose, activeKey }) => (
    <>
        <div
            className={`fixed inset-0 z-40 !bg-black/70 transition-opacity lg:hidden ${open ? "opacity-50 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
            onClick={onClose}
            aria-hidden={!open}
        />
        <aside
            className={`
        transition-transform duration-300
        bg-white border-r border-neutral-200
        h-full z-50
        w-64
        fixed top-0 left-0
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:block lg:shadow-none
        shadow-lg
      `}
            aria-label="Sidebar"
        >
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 lg:hidden">
                <Image src={LogoImg} alt="Spirit Media Logo" width={90} height={40} priority />
                <button
                    onClick={onClose}
                    className="p-2 rounded hover:bg-gray-100"
                    aria-label="Close sidebar"
                >
                    <ChevronLeft size={24} />
                </button>
            </div>
            <nav className="flex flex-col gap-1 px-2 py-6">
                {SIDEBAR_OPTIONS.map((opt) => (
                    <a
                        key={opt.key}
                        href={opt.href}
                        target={opt.key === "contact" ? "_blank" : undefined}
                        rel={opt.key === "contact" ? "noopener noreferrer" : undefined}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors
              ${activeKey === opt.key
                                ? "bg-[#008EA8] text-white"
                                : "text-[#394B59] hover:bg-[#F5F7F9]"
                            }
            `}
                        tabIndex={0}
                        aria-current={activeKey === opt.key ? "page" : undefined}
                    >
                        {opt.icon}
                        <span>{opt.label}</span>
                    </a>
                ))}
            </nav>
        </aside>
    </>
);

const UtilitiesLayout: React.FC<UtilitiesLayoutProps> = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();
    const [activeKey, setActiveKey] = useState<SidebarOption>("overview");

    useEffect(() => {
        if (pathname) {
            if (pathname.includes("/airtime")) setActiveKey("airtime");
            else if (pathname.includes("/data")) setActiveKey("data");
            else if (pathname.includes("/electricity")) setActiveKey("electricity");
            else if (pathname.includes("/cable")) setActiveKey("cable");
            else if (pathname.includes("/transactions")) setActiveKey("transactions");
            else if (pathname.includes("/contact")) setActiveKey("contact");
            else setActiveKey("overview");
        }
    }, [pathname]);

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <div className="hidden lg:block lg:fixed lg:inset-y-0 lg:left-0 lg:w-64">
                <Sidebar open={true} onClose={() => { }} activeKey={activeKey} />
            </div>
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} activeKey={activeKey} />
            <div className="flex-1 flex flex-col lg:ml-64 relative">
                <div className="lg:hidden flex items-center px-4 py-3 border-b border-neutral-200 bg-white sticky top-0 z-30">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-2 rounded-md text-black hover:bg-[#F5F7F9] focus:outline-none"
                        aria-label="Open sidebar"
                    >
                        <Menu size={28} color="black" />
                    </button>
                    <Image src={LogoImg} alt="Spirit Media Logo" width={90} height={40} priority className="ml-4" />
                </div>
                <main className="p-4 pt-6 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">{children}</main>
                <ChatButton />
            </div>
        </div>
    );
};

export default UtilitiesLayout;