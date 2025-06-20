import { User } from "firebase/auth";
import { Timestamp } from "firebase/firestore";
import { FlutterWaveResponse } from "flutterwave-react-v3/dist/types";
import { StaticImageData } from "next/image";

export type Platform = "ios" | "android";

export interface AppType {
  name: string;
  platform: Platform;
}

export interface Slide {
  appType: AppType;
  price: {
    original: string;
    discounted: string;
  };
  features: string[];
  videoUrl: string;
}

export interface ReferralRecord {
  id: string;
  name: string;
  amount: number;
  date: Timestamp;
  service: string;
}

export interface UserData {
  uid: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phone: string;
  referralCode: string;
  createdAt: Date;
  totalEarnings: number;
  availableBalance: number;
  pendingBalance: number;
  referralCount: number;
  referrals: ReferralRecord[];
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: Error | null;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: Error | null;
  signUp: (userData: SignUpFormData) => Promise<User>;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isSigningUp: boolean;
  signUpError: Error | null;
}

export enum TransactionStatus {
  COMPLETED = "Completed",
  PROCESSING = "Processing",
  REJECTED = "Rejected",
}

export interface Transaction {
  id: string;
  name: string;
  amount: number;
  date: Timestamp | Date;
  service: string;
  status: TransactionStatus;
}

export interface SignUpFormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  userName: string;
  phone: string;
  dateOfBirth: string;
}

export interface CardHolderResponse {
  status: string;
  cardholder_id: string;
  response_message: string;
}

export interface APIResponse {
  status: boolean;
  message: string;
  data?: {
    id: number;
    token: string;
  };
}

export interface PaymentPlan {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  duration: string;
  platform: Platform;
  features: string[];
}

export interface PaymentResponse {
  transaction_id: string;
  tx_ref: string;
  customer: {
    email: string;
    phone_number: string;
    name: string;
  };
  amount: number;
  status: string;
}

export interface PaymentError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  productType: "movie-portal" | "whatsapp-tool" | "cracked-apps";
  onPaymentSuccess: (
    response: FlutterWaveResponse,
    planDetails: PaymentPlan
  ) => void;
  onPaymentError: (error: PaymentError) => void;
  initialPlan?: string;
  customerInfo: CustomerInfo;
  setCustomerInfo: (info: CustomerInfo) => void;
}

export interface FlutterwaveCustomer {
  email: string;
  phone_number: string;
  name: string;
}

export interface FlutterwaveCustomizations {
  title: string;
  description: string;
  logo: string;
}

export interface FlutterwaveConfig {
  public_key: string;
  tx_ref: string;
  amount: number;
  currency: string;
  payment_options: string;
  customer: FlutterwaveCustomer;
  customizations: FlutterwaveCustomizations;
  text: string;
  callback: (response: FlutterWaveResponse) => void;
  onClose: () => void;
  disabled?: boolean;
}

export type UtilityType = "data" | "airtime" | "cable" | "electricity" | "epin";

export interface UtilityProductItem {
  product: string;
  value: number;
  product_id: number;
  comm: number;
}

export interface UtilityProductResponse {
  product_slug: UtilityType;
  products: UtilityProductItem[];
}

export interface UtilityProductRequest {
  product_slug: UtilityType;
}

export interface AppDownloadEmail {
  customerEmail: string;
  appName: string;
  downloadUrl?: string;
  downloadUrls?: {
    ios?: string;
    android?: string;
  };
  instructions?: string[];
}

export type DownloadAppType =
  | "android-movies"
  | "android-anime"
  | "android-whatsapp"
  | "ios-movies"
  | "bulk-message-pro"
  | "auto-save-contact"
  | "cap-cut-premium"
  | "spotify-premium";

export interface AppDownloadConfig {
  type: DownloadAppType;
  downloadUrl?: string;
  downloadUrls?: {
    ios?: string;
    android?: string;
  };
  instructions?: string[];
}

export interface FeedbackFormData {
  fullName: string;
  email: string;
  rating: string;
  service: string;
  experience: string;
  improvement: string;
  recommend: string;
}

export interface CommissionRates {
  "android-movies": number;
  "android-anime": number;
  "android-whatsapp": number;
  "ios-movies": number;
}

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  referralCode?: string;
}

export interface PurchaseRecord {
  transactionId: number;
  transactionRef: string;
  customerEmail: string;
  customerName: string;
  appType: DownloadAppType;
  amount: number;
  referralCode?: string;
  referrerId?: string;
  commissionAmount?: number;
  commissionStatus?: "pending" | "failed";
  status: TransactionStatus;
  createdAt: Date;
}

export interface ReferralValidation {
  isValid: boolean;
  referrerId?: string;
  error?: string;
}

export type Step = 1 | 2 | 3;

export interface Network {
  id: "mtn" | "glo" | "airtel" | "9mobile";
  name: string;
  logo: StaticImageData;
  apiId: string;
}

export interface AirtimeFormData {
  phoneNumber: string;
  amount: number;
  network: Network;
}

export interface TransactionResult {
  status: "success" | "failed";
  message: string;
  details: {
    transactionId: string;
    date: string;
  } & Partial<AirtimeFormData>;
}

export interface Disco {
  meter_id: number;
  meter_company: string;
}

export interface ElectricityCustomerInfo {
  name: string;
  address: string;
}

export interface ElectricityFormData {
  disco: Disco;
  meterType: "prepaid" | "postpaid";
  meterNumber: string;
  amount: number;
  customerInfo: ElectricityCustomerInfo;
}

export interface ElectricityTransactionResult {
  status: "success" | "failed";
  message: string;
  details: {
    transactionId: string;
    date: string;
    token?: string;
  } & Partial<ElectricityFormData>;
}