import { db } from "@/lib/firebase";
import {
    addDoc,
    collection,
    doc,
    DocumentReference,
    getDocs,
    orderBy,
    query,
    QueryConstraint,
    serverTimestamp,
    Timestamp,
    updateDoc,
    where
} from "firebase/firestore";

export interface Confession {
    id: string;
    content: string;
    createdAt: Timestamp;
    status: 'pending' | 'approved' | 'flagged';
    isAnonymous: boolean;
}

type NewConfession = Omit<Confession, 'id' | 'createdAt'>;

export const getConfessions = async (status?: string): Promise<Confession[]> => {
    try {
        const confessionsRef = collection(db, "confessions");
        const constraints: QueryConstraint[] = [orderBy("createdAt", "desc")];

        if (status && status !== "all") {
            constraints.push(where("status", "==", status));
        }

        const q = query(confessionsRef, ...constraints);
        const snapshot = await getDocs(q);

        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        } as Confession));
    } catch (error) {
        console.error("Error fetching confessions:", error);
        throw new Error("Failed to fetch confessions");
    }
};

export const updateConfessionStatus = async (
    confessionId: string,
    status: 'pending' | 'approved' | 'flagged'
): Promise<void> => {
    try {
        const confessionRef = doc(db, "confessions", confessionId);
        await updateDoc(confessionRef, { status });
    } catch (error) {
        console.error("Error updating confession:", error);
        throw new Error("Failed to update confession status");
    }
};

export const getConfessionStats = async () => {
    try {
        const snapshot = await getDocs(collection(db, "confessions"));
        const confessions = snapshot.docs.map(doc => doc.data());

        return {
            total: snapshot.size,
            pending: confessions.filter(c => c.status === 'pending').length,
            approved: confessions.filter(c => c.status === 'approved').length,
            flagged: confessions.filter(c => c.status === 'flagged').length,
        };
    } catch (error) {
        console.error("Error fetching stats:", error);
        throw new Error("Failed to fetch confession statistics");
    }
};

export const submitConfession = async (content: string): Promise<DocumentReference> => {
    try {
        const confession: NewConfession = {
            content: content.trim(),
            status: 'pending',
            isAnonymous: true,
        };

        const docRef = await addDoc(collection(db, "confessions"), {
            ...confession,
            createdAt: serverTimestamp(),
        });

        return docRef;
    } catch (error) {
        console.error("Error submitting confession:", error);
        throw new Error("Failed to submit confession. Please try again later.");
    }
};