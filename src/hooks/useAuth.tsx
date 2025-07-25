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
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  isAdmin: boolean;
  refreshProfile: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signUp: (userData: SignUpFormData) => Promise<User>;
  isSigningUp: boolean;
  signUpError: Error | null;
}

export const useAuth = (): AuthHookResult => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [internalUser, setInternalUser] = useState<User | null>(null);

  const fetchUserProfile = useCallback(async (uid: string) => {
    try {
      const userDocRef = doc(db, "users", uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const userData = userDoc.data() as UserProfile;
        setProfile(userData);
        setIsAdmin(userData.isAdmin === true);
      } else {
        console.warn("User profile document not found");
        setProfile(null);
        setIsAdmin(false);
      }
    } catch (err) {
      console.error("Failed to fetch user profile:", err);
      setProfile(null);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(true);
      if (user) {
        setInternalUser(user);
        fetchUserProfile(user.uid);
      } else {
        setInternalUser(null);
        setProfile(null);
        setIsAdmin(false);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [fetchUserProfile]);

  const refreshProfile = useCallback(async () => {
    if (internalUser) {
      await fetchUserProfile(internalUser.uid);
    } else {
      setProfile(null);
      setIsAdmin(false);
    }
  }, [internalUser, fetchUserProfile]);

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
