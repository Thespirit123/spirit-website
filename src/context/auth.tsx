import { auth } from "@/lib/firebase";
import { AuthContextType, AuthState } from "@/types";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => setState((prev) => ({ ...prev, user, loading: false })),
      (error) =>
        setState((prev) => ({ ...prev, error: error as Error, loading: false }))
    );

    return () => unsubscribe();
  }, []);

  const signUp = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setState((prev) => ({ ...prev, error: error as Error }));
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setState((prev) => ({ ...prev, error: error as Error }));
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      setState((prev) => ({ ...prev, error: error as Error }));
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, signUp, signIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
