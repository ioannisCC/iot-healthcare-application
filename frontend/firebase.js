// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// const firebaseConfig = {
//     apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAL9fyBypuR2gxJiKcznysSTCjChEVTbJA",
  authDomain: "healthcareapp-ad83b.firebaseapp.com",
  projectId: "healthcareapp-ad83b",
  storageBucket: "healthcareapp-ad83b.appspot.com",
  messagingSenderId: "1006467603625",
  appId: "1:543862425188:web:449e937ce2d4d7ffdd4171",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
