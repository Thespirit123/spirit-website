"use client";

import { withAuth } from "@/components/auth/protected-route";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Transaction, TransactionStatus } from "@/types";
import {
  Calendar,
  ClipboardCopy,
  Clock,
  TrendingUp,
  Wallet,
} from "lucide-react";
import Link from "next/link";

const stats = [
  {
    title: "Total Lifetime Earnings",
    amount: "₦40,689",
    change: "8.5% Up from past week",
    isPositive: true,
    bgColor: "bg-purple-50",
    icon: TrendingUp,
    iconColor: "text-purple-500",
  },
  {
    title: "This Month's Earnings",
    amount: "₦10,009",
    change: "1.3% Up from past week",
    isPositive: true,
    bgColor: "bg-yellow-50",
    icon: Calendar,
    iconColor: "text-yellow-500",
  },
  {
    title: "Available for Withdrawal",
    amount: "₦8,689",
    change: "4.3% Down from yesterday",
    isPositive: false,
    bgColor: "bg-green-50",
    icon: Wallet,
    iconColor: "text-green-500",
  },
  {
    title: "Pending Commissions",
    amount: "₦8,689",
    change: "1.8% Up from yesterday",
    isPositive: true,
    bgColor: "bg-red-50",
    icon: Clock,
    iconColor: "text-red-500",
  },
];

const transactions: Transaction[] = [
  {
    id: "00001",
    name: "Christine Brooks",
    amount: "₦50.00",
    date: "14 Feb 2019",
    service: "Airtime",
    status: TransactionStatus.COMPLETED,
  },
  {
    id: "00002",
    name: "Rosie Pearson",
    amount: "₦1,530.00",
    date: "14 Feb 2019",
    service: "Spy App",
    status: TransactionStatus.PROCESSING,
  },
  {
    id: "00003",
    name: "Darrell Caldwell",
    amount: "₦3,650.00",
    date: "14 Feb 2019",
    service: "Movies App",
    status: TransactionStatus.REJECTED,
  },
  {
    id: "00004",
    name: "Gilbert Johnston",
    amount: "₦1,450.40",
    date: "14 Feb 2019",
    service: "Spy App",
    status: TransactionStatus.COMPLETED,
  },
  {
    id: "00005",
    name: "Alan Cain",
    amount: "₦70.90",
    date: "14 Feb 2019",
    service: "Airtime",
    status: TransactionStatus.PROCESSING,
  },
];

const getStatusStyle = (status: TransactionStatus): string => {
  switch (status) {
    case "Completed":
      return "bg-emerald-100 text-emerald-800";
    case "Processing":
      return "bg-purple-100 text-purple-800";
    case "Rejected":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const DashboardPage = () => {
  return (
    <section className="p-4 sm:p-6 lg:p-10 min-h-screen bg-brand-dashboard-bg">
      <h1 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
        Your Dashboard
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6 lg:mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="p-4 rounded-lg bg-white relative flex flex-col hover:shadow-md transition-shadow"
            >
              <h3 className="text-sm text-gray-600 mb-2 pr-10 sm:pr-12">
                {stat.title}
              </h3>
              <p className="text-lg sm:text-xl lg:text-2xl font-semibold mb-1 sm:mb-2">
                {stat.amount}
              </p>
              <p
                className={`text-xs sm:text-sm ${
                  stat.isPositive ? "text-green-600" : "text-red-600"
                }`}
              >
                {stat.change}
              </p>
              <div
                className={`absolute top-4 right-4 ${stat.bgColor} p-2 rounded-xl`}
              >
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 ${stat.iconColor}" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Referral Code Card */}
      <div className="bg-white rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 lg:mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4">
          <span className="text-gray-600">Referral Code</span>
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <span className="font-mono text-sm sm:text-base">
              SPIRITHQ-JD-2232
            </span>
            <ClipboardCopy className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-lg overflow-hidden mb-4 sm:mb-6 lg:mb-8">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="whitespace-nowrap">ID</TableHead>
                <TableHead className="whitespace-nowrap">NAME</TableHead>
                <TableHead className="whitespace-nowrap">AMOUNT</TableHead>
                <TableHead className="whitespace-nowrap">DATE</TableHead>
                <TableHead className="whitespace-nowrap">SERVICE</TableHead>
                <TableHead className="whitespace-nowrap">STATUS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium whitespace-nowrap">
                    {transaction.id}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {transaction.name}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {transaction.amount}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {transaction.date}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {transaction.service}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyle(
                        transaction.status
                      )}`}
                    >
                      {transaction.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-white rounded-lg p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
          How It Works
        </h2>
        <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
          Our affiliate program is designed to reward you for spreading the word
          about our awesome apps and services. It&apos;s simple, transparent,
          and potentially lucrative!
        </p>
        <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">
          Earning Opportunities
        </h3>
        <p className="text-sm sm:text-base text-gray-600 mb-2"></p>
        You can earn commissions by referring people to:
        <ul className="list-disc pl-6 mb-4 sm:mb-6 text-sm sm:text-base text-gray-600">
          <li className="mb-1">Movie Portal App</li>
          <li className="mb-1">WhatsApp Monitoring Tool</li>
          <li className="mb-1">Utility Top-Up Service</li>
        </ul>
        <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">
          Commission Structure
        </h3>
        <ul className="list-disc pl-6 text-sm sm:text-base text-gray-600 mb-4">
          <li className="mb-1">Earn 10% on Every Successful Referral</li>
          <li className="mb-1">Commissions are calculated instantly</li>
          <li className="mb-1">No maximum limit on your earnings</li>
          <li className="mb-1">Paid out in Nigerian Naira</li>
        </ul>
        <Link
          href="/terms-and-conditions"
          className="text-brand-primary text-sm hover:text-brand-primary/80 transition-colors inline-flex items-center gap-1"
        >
          *Terms and Conditions Apply
        </Link>
      </div>
    </section>
  );
};

export default withAuth(DashboardPage);
