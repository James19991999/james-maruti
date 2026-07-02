import { initializeApp, getApps, getApp, type FirebaseOptions } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Avoid re-initializing during Next.js hot reloads / server re-renders.
export const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);

const hasValidConfig = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);

// Firebase's `getAuth` validates the API key format immediately, which throws
// during static prerendering / CI builds run without real credentials (e.g.
// this sandbox, or a fresh clone before `.env.local` is filled in). Guard
// initialization so `next build` succeeds either way — real auth/db calls
// will still fail loudly at runtime if credentials are genuinely missing.
export const isFirebaseConfigured = hasValidConfig;

const configErrorProxy = <T extends object>() =>
  new Proxy(
    {},
    {
      get() {
        throw new Error(
          "Firebase is not configured. Set NEXT_PUBLIC_FIREBASE_* environment variables (see .env.example)."
        );
      },
    }
  ) as T;

export const auth = hasValidConfig ? getAuth(firebaseApp) : configErrorProxy<ReturnType<typeof getAuth>>();
export const db = hasValidConfig ? getFirestore(firebaseApp) : configErrorProxy<ReturnType<typeof getFirestore>>();
