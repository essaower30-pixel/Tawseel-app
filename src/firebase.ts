import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import firebaseConfigData from "../firebase-applet-config.json";

export const firebaseConfig = {
  projectId: firebaseConfigData.projectId || "celtic-script-nzp2g",
  appId: firebaseConfigData.appId || "1:711470865456:web:1d26fb12e63b445d2ae1f5",
  apiKey: firebaseConfigData.apiKey || "AIzaSyCm-sjT61lvoVNCe3x87l-0HkbvAiJ9SVM",
  authDomain: firebaseConfigData.authDomain || "celtic-script-nzp2g.firebaseapp.com",
  firestoreDatabaseId: firebaseConfigData.firestoreDatabaseId || "ai-studio-f5ee6347-45ec-46b2-baf0-223722b5904f",
  storageBucket: firebaseConfigData.storageBucket || "celtic-script-nzp2g.firebasestorage.app",
  messagingSenderId: firebaseConfigData.messagingSenderId || "711470865456"
};

// Initialize Firebase App safely
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore
let firestoreDb: Firestore;
try {
  if (firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== "(default)") {
    firestoreDb = getFirestore(app, firebaseConfig.firestoreDatabaseId);
  } else {
    firestoreDb = getFirestore(app);
  }
} catch (e) {
  console.warn("Firestore custom database init error, falling back to default:", e);
  firestoreDb = getFirestore(app);
}

export const db = firestoreDb;
