import { FieldValue, Timestamp } from "firebase/firestore";
import { StaticImageData } from "next/image";

export type TransactionType =
    | "electricity"
    | "wallet"
    | "airtime"
    | "data"
    | "cable";
export type TransactionStatus = "success" | "pending" | "failed";
export type WalletTransactionType = "credit" | "debit";

export interface Network {
    id: "MTN" | "GLO" | "Airtel" | "9MOBILE";
    name: string;
    logo: StaticImageData;
    apiId: string;
}

export interface Transaction {
    id: number | string;
    type: TransactionType;
    description: string;
    amount: number;
    date: string;
    status: TransactionStatus;
    isCredit: boolean;
    reference?: string;
    paymentMethod?: string;
    metadata?: Record<string, any>;
}

export interface WalletTransaction {
    amount: number;
    timestamp: Timestamp;
    description: string;
    paymentMethod: string;
    reference: string;
    status: TransactionStatus;
    transactionId: string;
    type: WalletTransactionType;
    metadata: Record<string, any>;
}

export interface WalletTransactionDocument
    extends Omit<WalletTransaction, "timestamp"> {
    timestamp: FieldValue;
}

export interface CustomerInfo {
    name: string;
    email: string;
    phone: string;
}

export interface WalletData {
    balance: number;
    transactions: Transaction[];
}

export interface FundingResult {
    newTransactionForState: Transaction;
}

export interface DataPlan {
    plan_id: number;
    network: "MTN" | "GLO" | "Airtel" | "9MOBILE";
    data_type: string;
    plan_size: string;
    plan_price: string;
    validity: string;
    data_network_type: string;
}

export interface DataFormData {
    phoneNumber: string;
    network: Network;
    plan: DataPlan;
}

export interface TransactionResult {
    status: "success" | "failed";
    message: string;
    details: {
        transactionId: string;
        date: string;
    } & Partial<DataFormData>;
}