import { AuthContext } from "@/context/auth";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useCallback, useContext, useEffect, useState } from "react";

interface UserProfile {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  const { user } = context;

  const fetchProfile = useCallback(async () => {
    if (!user?.uid) {
      setProfile(null);
      setLoading(false);
      return;
    }

    try {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        setProfile(userDoc.data() as UserProfile);
      }
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    } finally {
      setLoading(false);
    }
  }, [user?.uid]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return {
    ...context,
    profile,
    loading,
    refreshProfile: fetchProfile,
  };
};
