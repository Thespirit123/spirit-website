import { db } from "@/lib/firebase";
import {
  DownloadAppType,
  Platform,
  ReferralRecord,
  ReferralValidation,
  TransactionStatus,
} from "@/types";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  runTransaction,
  updateDoc,
  where,
} from "firebase/firestore";
import { FlutterWaveResponse } from "flutterwave-react-v3/dist/types";

const MINIMUM_WITHDRAWAL = 1000;

export const createPurchaseRecord = async (
  response: FlutterWaveResponse,
  productDetails: {
    id: string;
    name: string;
    platform: Platform;
    price: number;
    appType: DownloadAppType;
    referralCode?: string;
  }
): Promise<string> => {
  try {
    let referrerId: string | null = null;
    let commissionAmount: number | null = null;
    let commissionStatus: "pending" | "failed" | null = null;

    if (productDetails.referralCode) {
      const validation = await validateReferralCode(
        productDetails.referralCode,
        response.customer.email
      );

      if (validation.isValid && validation.referrerId) {
        referrerId = validation.referrerId;
        commissionAmount = productDetails.price * 0.1;
        commissionStatus = "pending";
      }
    }

    const purchase = {
      transactionId: response.transaction_id,
      transactionRef: response.tx_ref,
      customerEmail: response.customer.email,
      customerName: response.customer.name,
      appType: productDetails.appType,
      amount: productDetails.price,
      status: TransactionStatus.COMPLETED,
      createdAt: new Date(),
      ...(productDetails.referralCode && {
        referralCode: productDetails.referralCode,
      }),
      ...(referrerId && { referrerId }),
      ...(commissionAmount && { commissionAmount }),
      ...(commissionStatus && { commissionStatus }),
    };

    console.log("📝 Attempting to create purchase record:", purchase);

    const purchasesRef = collection(db, "purchases");
    const docRef = await addDoc(purchasesRef, purchase);

    if (referrerId && commissionAmount) {
      try {
        await updateReferrerBalance(
          referrerId,
          commissionAmount,
          docRef.id,
          response.customer.name,
          productDetails.name
        );
      } catch (error) {
        console.error("Failed to update referrer balance:", error);
        await updateDoc(doc(db, "purchases", docRef.id), {
          commissionStatus: "failed",
        });
      }
    }

    return docRef.id;
  } catch (error) {
    console.error("Purchase record error:", {
      error,
      errorMessage: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      data: { response, productDetails },
    });
    throw error;
  }
};

export async function validateReferralCode(
  code: string,
  customerEmail: string
): Promise<ReferralValidation> {
  if (!code) return { isValid: false, error: "No code provided" };

  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("referralCode", "==", code));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return { isValid: false, error: "Invalid referral code" };
    }

    const referrerData = snapshot.docs[0].data();

    if (referrerData.email === customerEmail) {
      return { isValid: false, error: "Cannot use own referral code" };
    }

    return {
      isValid: true,
      referrerId: snapshot.docs[0].id,
    };
  } catch (error) {
    console.error("Referral validation error:", error);
    return { isValid: false, error: "Failed to validate code" };
  }
}

async function updateReferrerBalance(
  referrerId: string,
  commissionAmount: number,
  purchaseId: string,
  customerName: string,
  serviceName: string
): Promise<void> {
  try {
    const referrerRef = doc(db, "users", referrerId);

    await runTransaction(db, async (transaction) => {
      const referrerDoc = await transaction.get(referrerRef);
      if (!referrerDoc.exists()) {
        throw new Error("Referrer document not found");
      }

      const referrerData = referrerDoc.data();
      const existingReferrals = referrerData.referrals || [];

      const newReferral: ReferralRecord = {
        id: purchaseId,
        name: customerName,
        amount: commissionAmount,
        // @ts-expect-error - TS doesn't like new Date()
        date: new Date(),
        service: serviceName,
      };

      transaction.update(referrerRef, {
        pendingBalance: (referrerData.pendingBalance || 0) + commissionAmount,
        totalEarnings: (referrerData.totalEarnings || 0) + commissionAmount,
        referralCount: (referrerData.referralCount || 0) + 1,
        referrals: [newReferral, ...existingReferrals],
      });
    });
  } catch (error) {
    console.error("Error updating referrer balance:", error);
    throw new Error("Failed to update referrer balance");
  }
}

export async function processUserBalance(userId: string): Promise<void> {
  const userRef = doc(db, "users", userId);

  await runTransaction(db, async (transaction) => {
    const userDoc = await transaction.get(userRef);
    if (!userDoc.exists()) return;

    const userData = userDoc.data();
    const pendingBalance = userData.pendingBalance || 0;

    if (pendingBalance >= MINIMUM_WITHDRAWAL) {
      transaction.update(userRef, {
        pendingBalance: 0,
        availableBalance: (userData.availableBalance || 0) + pendingBalance,
        lastBalanceProcessedAt: new Date(),
      });
    }
  });
}
