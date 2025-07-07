import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

//  const firebaseConfig = {
//  apiKey: "23erty6589iou",
//    authDomain: "https://www.thespiritmedia.com.ng" ,
//    projectId: "62",
//   storageBucket: "22",
//    messagingSenderId: "56",
//   appId: "5",
//  };

// const firebaseConfig = {
//  apiKey: "AIzaSyBRM4Zpmsy6_sgZ8dr4uFoxrVcL9bkDhew",
//    authDomain: "spirit-media.firebaseapp.com" ,
//    projectId: "spirit-media",
//   storageBucket: "spirit-media.firebasestorage.app",
//    messagingSenderId: "981653965516",
//   appId: "1:981653965516:web:3ebd07dfb4118486e9d069",
//  };



export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
