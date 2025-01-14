import { auth, db } from "@/lib/firebase";
import { AuthContextType, AuthState, UserData } from "@/types";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
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

  const signUp = async (
    userData: Omit<UserData, "uid"> & { password: string }
  ) => {
    try {
      // Check if username exists
      const usernameQuery = query(
        collection(db, "users"),
        where("username", "==", userData.username)
      );
      const usernameSnapshot = await getDocs(usernameQuery);

      if (!usernameSnapshot.empty) {
        throw new Error("Username already taken");
      }

      // Create auth account
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );

      // Store user data
      await setDoc(doc(db, "users", userCredential.user.uid), {
        uid: userCredential.user.uid,
        email: userData.email,
        username: userData.username,
        firstName: userData.firstName,
        lastName: userData.lastName,
        dateOfBirth: userData.dateOfBirth,
        createdAt: serverTimestamp(),
      });
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
