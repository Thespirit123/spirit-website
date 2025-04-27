import { db } from "@/lib/firebase";
import { ReferralRecord } from "@/types";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

interface UserStats {
  totalEarnings: number;
  availableBalance: number;
  pendingBalance: number;
  referralCount: number;
  referralCode: string;
  referrals: ReferralRecord[];
}

export const useUserStats = (userId: string | undefined) => {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const userRef = doc(db, "users", userId);
    const unsubscribe = onSnapshot(
      userRef,
      (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          setStats({
            totalEarnings: data.totalEarnings ?? 0,
            availableBalance: data.availableBalance ?? 0,
            pendingBalance: data.pendingBalance ?? 0,
            referralCount: data.referralCount ?? 0,
            referralCode: data.referralCode ?? "",
            referrals: data.referrals || [],
          });
        }
        setLoading(false);
      },
      (error) => {
        setError(error as Error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [userId]);

  return { stats, loading, error };
};
