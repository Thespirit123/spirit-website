import { User } from "firebase/auth";

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
  videoSrc: string;
}

export interface UserData {
  uid: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phone: string;
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
  amount: string;
  date: string;
  service: "Airtime" | "Spy App" | "Movies App";
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

export interface APIResponse {
  status: boolean;
  message: string;
  data?: {
    id: number;
    token: string;
  };
}
