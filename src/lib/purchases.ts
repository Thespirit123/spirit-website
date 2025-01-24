import { db } from "@/lib/firebase";
import { DownloadAppType, Platform } from "@/types";
import {
  addDoc,
  collection,
  FieldValue,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { FlutterWaveResponse } from "flutterwave-react-v3/dist/types";

interface PurchaseRecord {
  transactionId: number;
  transactionRef: string;
  flwRef: string;
  productId: string;
  productName: string;
  platform: Platform;
  amount: number;
  currency?: string;
  customerEmail: string;
  customerName: string;
  customerPhone: string;
  purchaseDate: string;
  paymentStatus: string;
  chargeResponseCode: string;
  chargeResponseMessage: string;
  createdAt: FieldValue | Timestamp;
  updatedAt: FieldValue | Timestamp;
}

export const createPurchaseRecord = async (
  response: FlutterWaveResponse,
  productDetails: {
    id: string;
    name: string;
    platform: Platform;
    price: number;
    appType: DownloadAppType;
  }
): Promise<string> => {
  try {
    if (response.status !== "completed") {
      throw new Error(`Payment not completed. Status: ${response.status}`);
    }

    const now = serverTimestamp();
    const purchase: PurchaseRecord = {
      transactionId: response.transaction_id,
      transactionRef: response.tx_ref,
      flwRef: response.flw_ref,
      productId: productDetails.id,
      productName: productDetails.name,
      platform: productDetails.platform,
      amount: response.amount,
      currency: response.currency,
      customerEmail: response.customer.email,
      customerName: response.customer.name,
      customerPhone: response.customer.phone_number,
      purchaseDate: response.created_at,
      paymentStatus: response.status,
      chargeResponseCode: response.charge_response_code,
      chargeResponseMessage: response.charge_response_message,
      createdAt: now,
      updatedAt: now,
    };

    const purchasesRef = collection(db, "purchases");
    const docRef = await addDoc(purchasesRef, purchase);
    return docRef.id;
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error("Failed to record purchase");
  }
};
