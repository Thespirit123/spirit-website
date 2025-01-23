import { auth, db } from "@/lib/firebase";
import { AuthContextType, AuthState, SignUpFormData } from "@/types";
import { useMutation } from "@tanstack/react-query";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
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

  const signUpMutation = useMutation<User, Error, SignUpFormData>({
    mutationFn: async (userData) => {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          userData.email,
          userData.password
        );

        await setDoc(doc(db, "users", userCredential.user.uid), {
          uid: userCredential.user.uid,
          email: userData.email,
          username: userData.userName.toLowerCase(),
          firstName: userData.firstName,
          lastName: userData.lastName,
          dateOfBirth: userData.dateOfBirth,
          phone: userData.phone,
          createdAt: serverTimestamp(),
        });

        return userCredential.user;
      } catch (error) {
        console.error("❌ Signup error:", error);
        setState((prev) => ({ ...prev, error: error as Error }));
        throw error;
      }
    },
  });

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
    <AuthContext.Provider
      value={{
        ...state,
        signUp: signUpMutation.mutateAsync,
        isSigningUp: signUpMutation.isPending,
        signUpError: signUpMutation.error,
        signIn,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
