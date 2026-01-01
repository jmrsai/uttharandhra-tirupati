
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getAnalytics, logEvent as fbLogEvent, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "global-trotter-6p38a.firebaseapp.com",
  databaseURL: "https://global-trotter-6p38a-default-rtdb.firebaseio.com",
  projectId: "global-trotter-6p38a",
  storageBucket: "global-trotter-6p38a.firebasestorage.app",
  messagingSenderId: "525620583648",
  appId: "1:525620583648:web:ef7b33895b35e752090485"
};

let app: any;
let db: any = null;
let rtdb: any = null;
let analytics: any = null;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  rtdb = getDatabase(app);
  
  if (typeof window !== "undefined") {
    isSupported().then(yes => {
      if (yes) {
        analytics = getAnalytics(app);
      }
    }).catch(err => console.debug("Analytics not supported", err));
  }
} catch (error) {
  console.error("Firebase initialization failed:", error);
}

export const logEvent = (name: string, params?: object) => {
  if (analytics) {
    fbLogEvent(analytics, name, params);
  } else {
    console.debug(`[Analytics-Mock] ${name}`, params);
  }
};

export { app, db, rtdb, analytics };
