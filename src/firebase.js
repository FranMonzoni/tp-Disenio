import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCOHkkcA3uafbp8FxAiQnUHSPAjf12w57Q",
  authDomain: "analizador-de-gastos-dad47.firebaseapp.com",
  projectId: "analizador-de-gastos-dad47",
  storageBucket: "analizador-de-gastos-dad47.appspot.com",
  messagingSenderId: "706718028407",
  appId: "1:706718028407:web:90c044302695b99dfaac72",
  measurementId: "G-V66KZ3F1KP"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app); 