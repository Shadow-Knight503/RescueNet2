// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAv535_ZAhmdwXiDHu-qLOi_MFrc9Ja2jo",
  authDomain: "vecalumini.firebaseapp.com",
  projectId: "vecalumini",
  storageBucket: "vecalumini.firebasestorage.app",
  messagingSenderId: "702283258976",
  appId: "1:702283258976:web:935a4a4a01c07b98f0f705"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);