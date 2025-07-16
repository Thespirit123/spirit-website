"use client";

import SpiritLogo from "@/assets/images/logo.png";
import Button from "@/components/custom-ui/button";
import { Text } from "@/components/custom-ui/text";
import { useAuth } from "@/hooks/useAuth";
import { getSelectedPlatform, SelectedPlatform, setSelectedPlatform } from "@/lib/platform-storage";
import { LayoutDashboard, LogOut, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

const SelectPlatformPage = () => {
    const router = useRouter();
    const { user, loading, logout } = useAuth();
    const isLoggingOut = useRef(false);

    useEffect(() => {
        if (!loading && !isLoggingOut.current) {
            if (!user) {
                router.replace("/auth/login");
                return;
            }
            const currentPlatform = getSelectedPlatform();
            if (currentPlatform) {
                if (currentPlatform === 'affiliate') {
                    router.replace("/dashboard");
                } else if (currentPlatform === 'utilities') {
                    router.replace("/utilities");
                }
            }
        }
    }, [user, loading, router]);

    const handlePlatformSelect = (platform: 'affiliate' | 'utilities') => {
        setSelectedPlatform(platform as SelectedPlatform);
        if (platform === 'affiliate') {
            router.replace("/dashboard");
        } else if (platform === 'utilities') {
            router.replace("/utilities");
        }
    };

    const handleLogout = useCallback(async () => {
        isLoggingOut.current = true;
        setSelectedPlatform(null);
        router.replace("/");
        await logout();
    }, [logout, router]);

    if (loading || (!user && !isLoggingOut.current)) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <Text>Loading...</Text>
            </div>
        );
    }

    return (
        <section className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
            <div className="text-center max-w-md w-full">
                <Image
                    src={SpiritLogo}
                    alt="Spirit Logo"
                    width={140}
                    height={45}
                    className="mx-auto mb-8"
                />
                <Text variant="h2" className="text-2xl font-semibold mb-3 text-gray-800">
                    Choose Your Destination
                </Text>
                <Text className="text-gray-600 mb-10">
                    Select the service you&apos;d like to access.
                </Text>

                <div className="space-y-4">
                    <Button
                        onClick={() => handlePlatformSelect('affiliate')}
                        className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white py-3 text-base flex items-center justify-center gap-2"
                        size="lg"
                    >
                        <LayoutDashboard className="w-5 h-5" />
                        Affiliate Dashboard
                    </Button>
                    <Button
                        onClick={() => handlePlatformSelect('utilities')}
                        variant="outline"
                        className="w-full border-brand-secondary text-brand-secondary hover:bg-brand-secondary/10 py-3 text-base flex items-center justify-center gap-2"
                        size="lg"
                    >
                        <ShoppingCart className="w-5 h-5" />
                        Data/airtime Purchase
                    </Button>
                    <button
                        onClick={handleLogout}
                        className="w-full text-red-700 hover:text-red-800 py-3 text-base flex items-center justify-center gap-2"
                    >
                        <LogOut className="w-5 h-5 text-red-800 font-semibold" />
                        <p className="text-lg font-semibold">Exit</p>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default SelectPlatformPage;