import { AuthContext } from "@/context/auth";
import { auth, db } from "@/lib/firebase";
import { SignUpFormData } from "@/types";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useCallback, useContext, useEffect, useState } from "react";

interface UserProfile {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  isAdmin?: boolean;
}

interface AuthHookResult {
  user: User | null | undefined;
  profile: UserProfile | null;
  loading: boolean;
  isAdmin: boolean | undefined;
  refreshProfile: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signUp: (userData: SignUpFormData) => Promise<User>;
  isSigningUp: boolean;
  signUpError: Error | null | undefined;
}

export const useAuth = (): AuthHookResult => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState<boolean | undefined>(undefined);

  const [internalUser, setInternalUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);

      if (user) {
        setInternalUser(user);
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data() as UserProfile;
            setProfile(userData);
            setIsAdmin(userData.isAdmin === true);
          } else {
            setIsAdmin(false);
            setProfile(null);
          }
        } catch (error) {
          console.error("Failed to fetch user profile:", error);
          setIsAdmin(false);
          setProfile(null);
        } finally {
          setLoading(false);
        }
      } else {
        setInternalUser(null);
        setProfile(null);
        setIsAdmin(undefined);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const refreshProfile = useCallback(async () => {
    if (!internalUser?.uid) {
      setProfile(null);
      setIsAdmin(false);
      return;
    }

    try {
      const userDocRef = doc(db, "users", internalUser.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data() as UserProfile;
        setProfile(userData);
        setIsAdmin(userData.isAdmin === true);
      } else {
        setIsAdmin(false);
        setProfile(null);
      }
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      setIsAdmin(false);
      setProfile(null);
    }
  }, [internalUser?.uid]);

  return {
    user: internalUser,
    profile,
    loading,
    isAdmin,
    refreshProfile,
    signIn: context.signIn,
    logout: context.logout,
    signUp: context.signUp,
    isSigningUp: context.isSigningUp,
    signUpError: context.signUpError,
  };
};