import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBxXmQXs5nJe5zd9MBbd9AXZ914eFrwdAc",
  authDomain: "sentire-bypc.firebaseapp.com",
  projectId: "sentire-bypc",
  storageBucket: "sentire-bypc.firebasestorage.app",
  messagingSenderId: "306952336272",
  appId: "1:306952336272:web:fe3ef68f5330d6baf7f915",
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
