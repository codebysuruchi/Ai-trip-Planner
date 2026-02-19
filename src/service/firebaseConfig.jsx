// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlvMjeM6lVvyp5u7zATxHHYAE7B5DEOEQ",
  authDomain: "ai-trip-planner-beige-two.vercel.app",
  projectId: "yatramitra-799eb",
  storageBucket: "yatramitra-799eb.firebasestorage.app",
  messagingSenderId: "581403978446",
  appId: "1:581403978446:web:5ba28ad37897f36849be9f",
  measurementId: "G-M1Z3T7DL8K"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)
// const analytics = getAnalytics(app);