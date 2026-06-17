// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvVeMvvqGoRq6yXhNaUHDsdpUEpO-Pu5M",
  authDomain: "proyecto-reactjs-mr.firebaseapp.com",
  projectId: "proyecto-reactjs-mr",
  storageBucket: "proyecto-reactjs-mr.firebasestorage.app",
  messagingSenderId: "397744357812",
  appId: "1:397744357812:web:0ede5fe35e75729549b2e1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
