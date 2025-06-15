"use client";

import { withAuth } from "@/components/auth/protected-route";
import Button from "@/components/custom-ui/button";
import { Text } from "@/components/custom-ui/text";
import { useAuth } from "@/hooks/useAuth";
import { setSelectedPlatform } from "@/lib/platform-storage";
import { useRouter } from "next/navigation";
import React from "react";

const UtilitiesDashboardPage: React.FC = () => {
    const { logout, user } = useAuth();
    const router = useRouter();

    const handleSwitchPlatform = () => {
        setSelectedPlatform(null);
        router.push('/select-platform');
    };

    const handleLogout = async () => {
        try {
            await logout();
            setSelectedPlatform(null);
            router.push('/auth/login');
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <section className="p-4 sm:p-6 lg:p-10 min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-lg shadow-md">
                <div className="mb-8 text-center">
                    <Text variant="h1" className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-2">
                        Utilities Dashboard
                    </Text>
                    <Text className="text-gray-600">
                        Welcome, {user?.displayName || user?.email}! This section is currently under construction.
                    </Text>
                </div>

                <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-md mb-8" role="alert">
                    <Text className="font-bold">Coming Soon!</Text>
                    <Text className="text-sm">Exciting features for utility payments will be available here shortly.</Text>
                </div>

                <div className="mt-10 flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                    <Button onClick={handleSwitchPlatform} variant="outline" className="w-full sm:w-auto">
                        Switch Platform
                    </Button>
                    <Button onClick={handleLogout} variant="destructive" className="w-full sm:w-auto">
                        Logout
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default withAuth(UtilitiesDashboardPage);