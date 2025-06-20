import {
    FundingResult,
    Transaction,
    TransactionType,
    WalletData,
    WalletTransaction,
    WalletTransactionDocument,
} from "@/types/wallet";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    increment,
    limit,
    orderBy,
    query,
    serverTimestamp,
    setDoc,
    Timestamp,
    writeBatch,
} from "firebase/firestore";
import { FlutterWaveResponse } from "flutterwave-react-v3/dist/types";
import { db } from "./firebase";

export const getWalletData = async (userId: string): Promise<WalletData> => {
    const walletRef = doc(db, "users", userId, "wallets", "utilities");
    const transactionsColRef = collection(
        db,
        "users",
        userId,
        "wallets",
        "utilities",
        "transactions"
    );

    const recentTransactionsQuery = query(
        transactionsColRef,
        orderBy("timestamp", "desc"),
        limit(10)
    );

    const [walletDoc, transactionsSnapshot] = await Promise.all([
        getDoc(walletRef),
        getDocs(recentTransactionsQuery),
    ]);

    let balance = 0;
    if (walletDoc.exists()) {
        balance = walletDoc.data().balance || 0;
    } else {
        await setDoc(walletRef, {
            balance: 0,
            lastUpdated: serverTimestamp(),
        });
    }

    const transactions: Transaction[] = transactionsSnapshot.docs.map((doc) => {
        const txn = doc.data() as WalletTransaction;
        const date =
            txn.timestamp instanceof Timestamp ? txn.timestamp.toDate() : new Date();
        return {
            id: doc.id,
            type: (txn.metadata?.service as TransactionType) || "wallet",
            description: txn.description,
            amount: txn.amount,
            date: date.toISOString().split("T")[0],
            status: txn.status,
            isCredit: txn.type === "credit",
            reference: txn.reference,
            paymentMethod: txn.paymentMethod,
        };
    });

    return { balance, transactions };
};

export const processWalletFunding = async (
    userId: string,
    response: FlutterWaveResponse,
    amount: number
): Promise<FundingResult> => {
    const transactionId = `fw_${response.transaction_id || Date.now()}`;
    const clientTimestamp = new Date();

    const transactionDataForDoc: WalletTransactionDocument = {
        amount,
        timestamp: serverTimestamp(),
        description: "Wallet Funding",
        // @ts-expect-error
        paymentMethod: response.payment_type || "Unknown",
        reference: response.tx_ref || "",
        status: "success",
        transactionId,
        type: "credit",
        metadata: {
            service: "wallet",
            flutterwaveRef: response.flw_ref,
            flutterwaveTransactionId: response.transaction_id,
            chargedAmount: response.charged_amount,
            currency: response.currency,
            customerEmail: response.customer.email,
            customerName: response.customer.name,
            customerPhone: response.customer.phone_number,
            // @ts-expect-error
            processorResponse: response.processor_response,
            paymentDate: clientTimestamp.toISOString(),
        },
    };

    const batch = writeBatch(db);

    const walletRef = doc(db, "users", userId, "wallets", "utilities");
    batch.update(walletRef, {
        balance: increment(amount),
        lastUpdated: serverTimestamp(),
    });

    const userTransactionRef = doc(
        db,
        "users",
        userId,
        "wallets",
        "utilities",
        "transactions",
        transactionId
    );
    batch.set(userTransactionRef, transactionDataForDoc);

    const globalTransactionRef = doc(
        db,
        "transactions",
        "utilities",
        "wallet",
        transactionId
    );
    batch.set(globalTransactionRef, { ...transactionDataForDoc, userId });

    await batch.commit();

    const newTransactionForState: Transaction = {
        id: transactionId,
        type: "wallet",
        description: "Wallet Funding",
        amount,
        date: clientTimestamp.toISOString().split("T")[0],
        status: "success",
        isCredit: true,
        reference: response.tx_ref || "",
        // @ts-expect-error
        paymentMethod: response.payment_type || "Unknown",
    };

    return { newTransactionForState };
};