"use client";

import Button from "@/components/custom-ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WalletFundingModal } from "@/components/wallet-funding-modal";
import { useAuth } from "@/hooks/useAuth";
import { db } from "@/lib/firebase";
import { getWalletData, processWalletFunding } from "@/lib/wallet";
import { CustomerInfo, Transaction } from "@/types/wallet";
import { doc, getDoc } from "firebase/firestore";
import { FlutterWaveResponse } from "flutterwave-react-v3/dist/types";
import {
    ArrowDownRight,
    ArrowRight,
    ArrowUpRight,
    Clock,
    Phone,
    Tv,
    Wallet,
    Wifi,
    Zap
} from "lucide-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";

const getTransactionIcon = (type: Transaction["type"]): React.ReactNode => {
    switch (type) {
        case "electricity":
            return <Zap size={16} />;
        case "wallet":
            return <Wallet size={16} />;
        case "airtime":
            return <Phone size={16} />;
        case "data":
            return <Wifi size={16} />;
        case "cable":
            return <Tv size={16} />;
        default:
            return <Clock size={16} />;
    }
};

const UtilitiesDashboardPage: React.FC = () => {
    const { user } = useAuth();
    const [walletBalance, setWalletBalance] = useState<number>(0);
    const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showFundingModal, setShowFundingModal] = useState(false);
    const [userProfile, setUserProfile] = useState<{
        name: string;
        email: string;
        phone: string;
        uid: string;
    } | null>(null);

    useEffect(() => {
        if (!user?.uid) return;
        const fetchProfile = async () => {
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists()) {
                const data = userDoc.data();
                setUserProfile({
                    name: data.firstName && data.lastName ? `${data.firstName} ${data.lastName}` : data.username || "User",
                    email: data.email,
                    phone: data.phone,
                    uid: user.uid,
                });
            }
        };
        fetchProfile();
    }, [user]);

    useEffect(() => {
        if (!userProfile) return;
        const ensureVirtualWallet = async () => {
            try {
                const res = await fetch("/api/create-virtual-wallet", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        uid: userProfile.uid,
                        email: userProfile.email,
                        name: userProfile.name,
                        phone: userProfile.phone,
                    }),
                });
                await res.json();
            } catch (err) { }
        };
        ensureVirtualWallet();
    }, [userProfile]);

    const fetchWalletData = useCallback(async () => {
        if (!user?.uid) return;
        try {
            setIsLoading(true);
            const { balance, transactions } = await getWalletData(user.uid);
            setWalletBalance(balance);
            setRecentTransactions(transactions);
        } catch (error) {
            toast.error("Failed to load wallet data");
        } finally {
            setIsLoading(false);
        }
    }, [user]);

    useEffect(() => {
        if (user?.uid) {
            fetchWalletData();
        }
    }, [user, fetchWalletData]);

    const customerInfo = useMemo(
        (): CustomerInfo => ({
            name: userProfile?.name || "User",
            email: userProfile?.email || "",
            phone: userProfile?.phone || "",
        }),
        [userProfile]
    );

    const handleFundingSuccess = async (
        response: FlutterWaveResponse,
        amount: number
    ) => {
        if (!user?.uid) {
            toast.error("User not authenticated");
            return;
        }
        try {
            const { newTransactionForState } = await processWalletFunding(
                user.uid,
                response,
                amount
            );
            setWalletBalance((prev) => prev + amount);
            setRecentTransactions((prev) =>
                [newTransactionForState, ...prev].slice(0, 10)
            );
            toast.success(
                `Successfully added ₦${amount.toLocaleString()} to your wallet`
            );
        } catch (error) {
            toast.error("Failed to update wallet balance");
        }
    };

    const handleFundingError = (error: { code: string; message: string }) => {
        toast.error(error.message);
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-[#394B59]">
                    Hello, {customerInfo.name}!
                </h2>
                <p className="text-[#8E9BAA]">What would you like to do today?</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-lg font-bold text-[#394B59]">
                                Wallet Balance
                            </CardTitle>
                            <Wallet size={24} />
                        </div>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <div className="animate-pulse h-8 bg-gray-200 rounded mb-4"></div>
                        ) : (
                            <div className="text-3xl font-bold mb-4">
                                ₦{walletBalance.toLocaleString()}
                            </div>
                        )}
                        <div className="mt-auto">
                            <Button
                                variant="primary"
                                fullWidth
                                onClick={() => setShowFundingModal(true)}
                                disabled={isLoading}
                            >
                                Fund Wallet
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="lg:col-span-2">
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <CardTitle className="text-lg font-bold text-[#394B59]">
                                Recent Transactions
                            </CardTitle>
                            <a
                                href="/utilities/transactions"
                                className="text-[#008EA8] flex items-center hover:underline text-sm"
                            >
                                View All <ArrowRight size={16} className="ml-1" />
                            </a>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <div className="space-y-3">
                                {[1, 2, 3].map((i) => (
                                    <div
                                        key={i}
                                        className="animate-pulse flex items-center justify-between py-2 border-b border-[#F5F7F9] last:border-b-0"
                                    >
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 bg-gray-200 rounded-full mr-3"></div>
                                            <div>
                                                <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                                                <div className="h-3 bg-gray-200 rounded w-16"></div>
                                            </div>
                                        </div>
                                        <div className="h-4 bg-gray-200 rounded w-16"></div>
                                    </div>
                                ))}
                            </div>
                        ) : recentTransactions.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                No transactions yet
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {recentTransactions.slice(0, 3).map((transaction) => (
                                    <div
                                        key={transaction.id}
                                        className="flex items-center justify-between py-2 border-b border-[#F5F7F9] last:border-b-0"
                                    >
                                        <div className="flex items-center">
                                            <div
                                                className={`p-2 rounded-full mr-3 ${transaction.type === "electricity"
                                                    ? "bg-[#F5F7F9] text-[#F59E0B]"
                                                    : transaction.type === "wallet"
                                                        ? "bg-[#F5F7F9] text-[#10B981]"
                                                        : "bg-[#F5F7F9] text-[#008EA8]"
                                                    }`}
                                            >
                                                {getTransactionIcon(transaction.type)}
                                            </div>
                                            <div>
                                                <p className="text-[#394B59] font-medium">
                                                    {transaction.description}
                                                </p>
                                                <p className="text-xs text-[#8E9BAA]">
                                                    {transaction.date}
                                                </p>
                                            </div>
                                        </div>
                                        <div
                                            className={`flex items-center ${transaction.isCredit
                                                ? "text-[#10B981]"
                                                : "text-[#394B59]"
                                                }`}
                                        >
                                            <span className="font-medium">
                                                {transaction.isCredit ? "+ " : "- "}₦
                                                {transaction.amount.toLocaleString()}
                                            </span>
                                            {transaction.isCredit ? (
                                                <ArrowDownRight
                                                    size={16}
                                                    className="ml-1 text-[#10B981]"
                                                />
                                            ) : (
                                                <ArrowUpRight
                                                    size={16}
                                                    className="ml-1 text-[#394B59]"
                                                />
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            <h3 className="text-xl font-bold text-[#394B59] mb-4">Pay Bills</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <a href="/utilities/airtime">
                    <Card className="transition-transform hover:scale-105 hover:shadow-lg cursor-pointer">
                        <CardContent className="p-6">
                            <div className="flex flex-col items-center text-center">
                                <div className="p-4 bg-[#F5F7F9] rounded-full mb-4 text-[#008EA8]">
                                    <Phone size={24} />
                                </div>
                                <h3 className="text-lg font-medium text-[#394B59] mb-2">
                                    Airtime
                                </h3>
                                <p className="text-sm text-[#8E9BAA]">
                                    MTN, GLO, Airtel & 9Mobile
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </a>
                <a href="/utilities/data">
                    <Card className="transition-transform hover:scale-105 hover:shadow-lg cursor-pointer">
                        <CardContent className="p-6">
                            <div className="flex flex-col items-center text-center">
                                <div className="p-4 bg-[#F5F7F9] rounded-full mb-4 text-[#008EA8]">
                                    <Wifi size={24} />
                                </div>
                                <h3 className="text-lg font-medium text-[#394B59] mb-2">
                                    Data
                                </h3>
                                <p className="text-sm text-[#8E9BAA]">
                                    MTN, GLO, Airtel & 9Mobile
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </a>
                <a href="/utilities/electricity">
                    <Card className="transition-transform hover:scale-105 hover:shadow-lg cursor-pointer">
                        <CardContent className="p-6">
                            <div className="flex flex-col items-center text-center">
                                <div className="p-4 bg-[#F5F7F9] rounded-full mb-4 text-[#008EA8]">
                                    <Zap size={24} />
                                </div>
                                <h3 className="text-lg font-medium text-[#394B59] mb-2">
                                    Electricity
                                </h3>
                                <p className="text-sm text-[#8E9BAA]">
                                    AEDC, IKEDC, EKEDC & more
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </a>
                <a href="/utilities/cable">
                    <Card className="transition-transform hover:scale-105 hover:shadow-lg cursor-pointer">
                        <CardContent className="p-6">
                            <div className="flex flex-col items-center text-center">
                                <div className="p-4 bg-[#F5F7F9] rounded-full mb-4 text-[#008EA8]">
                                    <Tv size={24} />
                                </div>
                                <h3 className="text-lg font-medium text-[#394B59] mb-2">
                                    Cable TV
                                </h3>
                                <p className="text-sm text-[#8E9BAA]">
                                    DSTV, GOTV & StarTimes
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </a>
            </div>

            <WalletFundingModal
                isOpen={showFundingModal}
                onClose={() => setShowFundingModal(false)}
                onSuccess={handleFundingSuccess}
                onError={handleFundingError}
                customerInfo={customerInfo}
            />
        </div>
    );
};

export default UtilitiesDashboardPage;