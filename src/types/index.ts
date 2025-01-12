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

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: Error | null;
}

export interface AuthContextType extends AuthState {
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}
