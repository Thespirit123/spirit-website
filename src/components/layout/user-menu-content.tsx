"use client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import React, { useCallback } from "react";

const UserMenuContent = () => {
    const { user, logout, profile } = useAuth();

    const handleLogout = useCallback(async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }, [logout]);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 hover:text-brand-primary transition-colors">
                    <div className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center">
                        {profile?.firstName?.[0]?.toUpperCase() ||
                            user?.email?.[0].toUpperCase()}
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 z-5">
                <DropdownMenuItem asChild>
                    <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default React.memo(UserMenuContent);