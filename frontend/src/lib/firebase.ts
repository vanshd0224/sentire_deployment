import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDsre9XitnehMTO7Du3aw5-vJfLSjZWl0c",
  authDomain: "sentire-perfumes.firebaseapp.com",
  projectId: "sentire-perfumes",
  storageBucket: "sentire-perfumes.firebasestorage.app",
  messagingSenderId: "646931469677",
  appId: "1:646931469677:web:466d1c04e48e675949f664",
  measurementId: "G-3R3PDHT3B0"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
