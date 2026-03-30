import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Validate Firebase configuration
const validateFirebaseConfig = (config: Record<string, string | undefined>) => {
  const missingKeys = Object.entries(config)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  if (missingKeys.length > 0) {
    console.error("Missing Firebase configuration keys:", missingKeys);
    console.log("Available env keys:", Object.keys(import.meta.env));
  }
  return missingKeys.length === 0;
};

if (!validateFirebaseConfig(firebaseConfig)) {
  console.error("Firebase configuration is incomplete. Forms will not work.");
}

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

console.log("Firebase initialized with project:", firebaseConfig.projectId);
