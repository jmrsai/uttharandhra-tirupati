
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getAnalytics, logEvent as fbLogEvent, isSupported } from "firebase/analytics";

// Note: Replace with your actual Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAs-EXAMPLE-KEY", // Replace with real key
  authDomain: "uttharandhra-tirupati.firebaseapp.com",
  projectId: "uttharandhra-tirupati",
  storageBucket: "uttharandhra-tirupati.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456",
  measurementId: "G-EXAMPLE",
  databaseURL: "https://global-trotter-6p38a-default-rtdb.firebaseio.com/"
};

let app: any;
let db: any = null;
let rtdb: any = null;
let analytics: any = null;

try {
  // Initialize Firebase modularly
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  rtdb = getDatabase(app);
  
  // Initialize Analytics if supported and in browser environment
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
