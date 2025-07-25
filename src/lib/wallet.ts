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
    QueryConstraint,
    serverTimestamp,
    setDoc,
    Timestamp,
    where,
    writeBatch
} from "firebase/firestore";
import { FlutterWaveResponse } from "flutterwave-react-v3/dist/types";
import { db } from "./firebase";

export const getWalletData = async (userId: string): Promise<WalletData> => {
    try {
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
    } catch (error) {
        if (error instanceof Error) {
            console.error("getWalletData error:", error.message, error.stack);
        } else {
            console.error("getWalletData unknown error:", error);
        }
        throw error;
    }
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

export const getAllWalletTransactions = async (
    userId: string,
    options: {
        page: number;
        pageSize: number;
        type?: "wallet" | "utility";
        status?: "success" | "pending" | "failed";
        search?: string;
    }
): Promise<{ transactions: Transaction[]; total: number }> => {
    const transactionsColRef = collection(
        db,
        "users",
        userId,
        "wallets",
        "utilities",
        "transactions"
    );

    const constraints: QueryConstraint[] = [orderBy("timestamp", "desc")];

    if (options.type === "wallet") {
        constraints.push(where("metadata.service", "==", "wallet"));
    } else if (options.type === "utility") {
        constraints.push(where("metadata.service", "!=", "wallet"));
    }

    if (options.status) {
        constraints.push(where("status", "==", options.status));
    }

    let allDocs: WalletTransaction[] = [];
    let total = 0;

    if (options.search) {
        const snapshot = await getDocs(query(transactionsColRef, ...constraints));
        allDocs = snapshot.docs.map((doc) => ({ ...(doc.data() as WalletTransaction), id: doc.id }));
        const filtered = allDocs.filter((txn) =>
            txn.description?.toLowerCase().includes(options.search!.toLowerCase()) ||
            txn.reference?.toLowerCase().includes(options.search!.toLowerCase())
        );
        total = filtered.length;
        const paginated = filtered.slice((options.page - 1) * options.pageSize, options.page * options.pageSize);
        return {
            transactions: paginated.map((txn) => {
                const date =
                    txn.timestamp instanceof Timestamp ? txn.timestamp.toDate() : new Date();
                return {
                    // @ts-expect-error
                    id: txn.id,
                    type: (txn.metadata?.service as TransactionType) || "wallet",
                    description: txn.description,
                    amount: txn.amount,
                    date: date.toISOString().replace("T", " ").slice(0, 16),
                    status: txn.status,
                    isCredit: txn.type === "credit",
                    reference: txn.reference,
                    paymentMethod: txn.paymentMethod,
                };
            }),
            total,
        };
    }

    const q = query(
        transactionsColRef,
        ...constraints,
        limit(options.pageSize * options.page)
    );
    const snapshot = await getDocs(q);
    const docs = snapshot.docs.map((doc) => ({ ...(doc.data() as WalletTransaction), id: doc.id }));
    total = docs.length;
    const paginated = docs.slice((options.page - 1) * options.pageSize, options.page * options.pageSize);

    const allSnapshot = await getDocs(query(transactionsColRef));
    const allCount = allSnapshot.size;

    return {
        transactions: paginated.map((txn) => {
            const date =
                txn.timestamp instanceof Timestamp ? txn.timestamp.toDate() : new Date();
            return {
                id: txn.id,
                type: (txn.metadata?.service as TransactionType) || "wallet",
                description: txn.description,
                amount: txn.amount,
                date: date.toISOString().replace("T", " ").slice(0, 16),
                status: txn.status,
                isCredit: txn.type === "credit",
                reference: txn.reference,
                paymentMethod: txn.paymentMethod,
            };
        }),
        total: allCount,
    };
};