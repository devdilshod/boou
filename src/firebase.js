import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAyWBB3wrPXo-5gy6uywxLtYn_maPADQOU",
  authDomain: "boou-81420.firebaseapp.com",
  projectId: "boou-81420",
  storageBucket: "boou-81420.firebasestorage.app",
  messagingSenderId: "679256558829",
  appId: "1:679256558829:web:87abe3197d898c5114d0e4",
  measurementId: "G-K8WBMMSLP6"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);