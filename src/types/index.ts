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
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: Error | null;
}

export interface AuthContextType extends AuthState {
  signUp: (
    userData: Omit<UserData, "uid"> & { password: string }
  ) => Promise<void>;
  signIn: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
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
