"use client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { SelectedPlatform, setSelectedPlatform } from "@/lib/platform-storage";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";

const UserMenuContent = () => {
    const { user, logout, profile } = useAuth();
    const router = useRouter();

    const handleLogout = useCallback(async () => {
        try {
            await logout();
            setSelectedPlatform(null);
            router.push("/auth/login");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }, [logout, router]);

    const handlePlatformNavigation = (platform: SelectedPlatform, path: string) => {
        setSelectedPlatform(platform);
        router.push(path);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 hover:text-brand-primary transition-colors">
                    <div className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center text-sm font-medium">
                        {profile?.firstName?.[0]?.toUpperCase() ||
                            user?.email?.[0].toUpperCase()}
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 z-50 text-[#008EA8]">
                <DropdownMenuItem onClick={() => handlePlatformNavigation('affiliate', '/dashboard')}>
                    Affiliate Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handlePlatformNavigation('utilities', '/utilities-dashboard')}>
                    Utilities Dashboard
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-700 focus:bg-red-50 cursor-pointer">
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default React.memo(UserMenuContent);