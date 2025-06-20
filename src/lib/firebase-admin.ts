import admin from "firebase-admin";
import serviceAccount from "../../spirit-media-firebase-adminsdk-rr4xo-352b8c2076.json";

if (!admin.apps.length) {
    try {
        admin.initializeApp({
            credential: admin.credential.cert(
                serviceAccount as admin.ServiceAccount
            ),
        });
    } catch (error) {
        console.error("Firebase admin initialization error", error);
    }
}

export const adminAuth = admin.auth();
export const adminDb = admin.firestore();