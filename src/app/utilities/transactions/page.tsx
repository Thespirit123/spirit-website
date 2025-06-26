"use client"
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { getAllWalletTransactions } from "@/lib/wallet";
import { Transaction } from "@/types/wallet";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

const PAGE_SIZE = 10;

const TransactionHistory: React.FC = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState<"all" | "wallet" | "utility">("all");
    const [statusFilter, setStatusFilter] = useState<"all" | "success" | "pending" | "failed">("all");
    const [search, setSearch] = useState("");
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    const fetchTransactions = useCallback(async () => {
        if (!user?.uid) return;
        setIsLoading(true);
        try {
            const { transactions: txns, total: totalCount } = await getAllWalletTransactions(user.uid, {
                page,
                pageSize: PAGE_SIZE,
                search,
                status: statusFilter === "all" ? undefined : statusFilter,
            });

            let filtered: Transaction[] = txns;
            if (activeTab === "wallet") {
                filtered = txns.filter(
                    (txn) =>
                        typeof txn.id === "string" &&
                        txn.id.startsWith("fw") &&
                        txn.isCredit === true
                );
            } else if (activeTab === "utility") {
                filtered = txns.filter(
                    (txn) =>
                        typeof txn.id === "string" &&
                        (
                            txn.id.startsWith("airtime_") ||
                            txn.id.startsWith("data_") ||
                            txn.id.startsWith("elec_") ||
                            txn.id.startsWith("cable_")
                        ) &&
                        txn.isCredit === false
                );
            }
            setTransactions(filtered);
            setTotal(totalCount);
        } catch (error) {
            toast.error("Failed to load transactions");
        } finally {
            setIsLoading(false);
        }
    }, [user, page, activeTab, statusFilter, search]);

    useEffect(() => {
        setPage(1);
    }, [activeTab, statusFilter, search]);

    useEffect(() => {
        fetchTransactions();
    }, [fetchTransactions]);

    const totalPages = Math.ceil(total / PAGE_SIZE);

    const getStatusStyle = (status: string) => {
        switch (status) {
            case "success":
                return "bg-[#E6F7F0] text-[#10B981]";
            case "pending":
                return "bg-[#FEF3C7] text-[#F59E0B]";
            case "failed":
                return "bg-[#FEE2E2] text-[#EF4444]";
            default:
                return "bg-[#F5F7F9] text-[#8E9BAA]";
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case "success":
                return "Successful";
            case "pending":
                return "Pending";
            case "failed":
                return "Failed";
            default:
                return status;
        }
    };

    return (
        <div className="bg-[#F9FAFB] min-h-screen pb-10">
            <div className="container mx-auto px-4 py-6">
                <div className="mb-6">
                    <h2 className="text-xl md:text-2xl font-semibold text-[#1F2937]">
                        Transaction History
                    </h2>
                    <p className="text-sm text-[#6B7280]">
                        View and manage your transaction records
                    </p>
                </div>

                <Card className="p-6 shadow-sm border border-[#E5E7EB] rounded-xl bg-white">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-5">
                        <div className="flex flex-wrap gap-2">
                            <button
                                type="button"
                                className={`px-3 py-1 rounded-[5px] font-medium text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 inline-flex items-center justify-center ${activeTab === "all"
                                    ? "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-200/50"
                                    : "border-2 border-[#008EA8] text-[#008EA8] hover:bg-[#008EA8] hover:text-white focus:ring-[#008EA8]/50"
                                    }`}
                                onClick={() => setActiveTab("all")}
                            >
                                All
                            </button>
                            <button
                                type="button"
                                className={`px-3 py-1 rounded-[5px] font-medium text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 inline-flex items-center justify-center ${activeTab === "wallet"
                                    ? "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-200/50"
                                    : "border-2 border-[#008EA8] text-[#008EA8] hover:bg-[#008EA8] hover:text-white focus:ring-[#008EA8]/50"
                                    }`}
                                onClick={() => setActiveTab("wallet")}
                            >
                                Wallet
                            </button>
                            <button
                                type="button"
                                className={`px-3 py-1 rounded-[5px] font-medium text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 inline-flex items-center justify-center ${activeTab === "utility"
                                    ? "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-200/50"
                                    : "border-2 border-[#008EA8] text-[#008EA8] hover:bg-[#008EA8] hover:text-white focus:ring-[#008EA8]/50"
                                    }`}
                                onClick={() => setActiveTab("utility")}
                            >
                                Utilities
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-3 mb-5">
                        <Input
                            placeholder="Search transactions..."
                            className="md:flex-1"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                        <div className="flex gap-2">
                            <select
                                value={statusFilter}
                                onChange={e => setStatusFilter(e.target.value as any)}
                                className="px-3 py-2 rounded-md border border-[#D1D5DB] text-sm text-[#374151] focus:outline-none focus:ring-2 focus:ring-[#008EA8]"
                            >
                                <option value="all">All Status</option>
                                <option value="success">Successful</option>
                                <option value="pending">Pending</option>
                                <option value="failed">Failed</option>
                            </select>
                        </div>
                    </div>

                    <div className="overflow-x-auto rounded-lg border border-[#E5E7EB]">
                        <table className="w-full text-sm">
                            <thead className="bg-[#F3F4F6]">
                                <tr>
                                    <th className="text-left px-4 py-3 text-[#6B7280] font-medium">Date & Time</th>
                                    <th className="text-left px-4 py-3 text-[#6B7280] font-medium">Description</th>
                                    <th className="text-left px-4 py-3 text-[#6B7280] font-medium">Reference</th>
                                    <th className="text-left px-4 py-3 text-[#6B7280] font-medium">Amount</th>
                                    <th className="text-left px-4 py-3 text-[#6B7280] font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#F3F4F6]">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan={5} className="py-8 text-center text-gray-400">
                                            Loading...
                                        </td>
                                    </tr>
                                ) : transactions.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="py-8 text-center text-gray-400">
                                            No transactions found
                                        </td>
                                    </tr>
                                ) : (
                                    transactions.map(transaction => (
                                        <tr key={transaction.id} className="hover:bg-[#FAFAFA] transition">
                                            <td className="px-4 py-3 text-[#374151]">{transaction.date}</td>
                                            <td className="px-4 py-3 font-medium text-[#111827]">{transaction.description}</td>
                                            <td className="px-4 py-3 text-[#9CA3AF]">{transaction.reference}</td>
                                            <td className="px-4 py-3 text-[#111827] font-semibold">
                                                <div className="flex items-center gap-1">
                                                    <span className={transaction.isCredit ? "text-[#1e906a]" : "text-[#d53131]"}>
                                                        {transaction.isCredit ? "+ " : "- "}₦
                                                        {transaction.amount.toLocaleString()}
                                                    </span>
                                                    {transaction.isCredit ? (
                                                        <ArrowDown size={14} className="text-[#1e906a]" />
                                                    ) : (
                                                        <ArrowUp size={14} className="text-[#d53131]" />
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                                                        transaction.status
                                                    )}`}
                                                >
                                                    {getStatusText(transaction.status)}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex items-center justify-between mt-6">
                        <p className="text-xs text-[#6B7280]">
                            {transactions.length > 0
                                ? `Showing ${(page - 1) * PAGE_SIZE + 1}–${Math.min(page * PAGE_SIZE, total)} of ${total}`
                                : "No transactions"}
                        </p>
                        <div className="flex space-x-2">
                            <button
                                type="button"
                                className="px-3 py-1 rounded-[5px] font-medium text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 border-2 border-[#008EA8] text-[#008EA8] focus:ring-[#008EA8]/50 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={page === 1}
                                onClick={() => setPage(page - 1)}
                            >
                                Previous
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i + 1}
                                    type="button"
                                    className={`px-3 py-1 rounded-[5px] font-medium text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 border-2 border-[#008EA8] ${page === i + 1
                                        ? "bg-[#008EA8] text-white"
                                        : "text-[#008EA8] hover:bg-[#008EA8] hover:text-white"
                                        } focus:ring-[#008EA8]/50`}
                                    onClick={() => setPage(i + 1)}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <button
                                type="button"
                                className="px-3 py-1 rounded-[5px] font-medium text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 border-2 border-[#008EA8] text-[#008EA8] focus:ring-[#008EA8]/50 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={page === totalPages || totalPages === 0}
                                onClick={() => setPage(page + 1)}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default TransactionHistory;