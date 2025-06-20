import admin from "firebase-admin";

interface FirebaseAdminConfig {
    projectId: string;
    clientEmail: string;
    privateKey: string;
}

const getFirebaseAdminConfig = (): FirebaseAdminConfig => {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY;

    if (!projectId || !clientEmail || !privateKey) {
        throw new Error("Missing Firebase Admin SDK configuration in environment variables.");
    }

    return {
        projectId,
        clientEmail,
        privateKey: privateKey.replace(/\\n/g, "\n"),
    };
};

if (!admin.apps.length) {
    try {
        const serviceAccount = getFirebaseAdminConfig();
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
    } catch (error) {
        console.error("Firebase admin initialization error", error);
    }
}

export const adminAuth = admin.auth();
export const adminDb = admin.firestore();