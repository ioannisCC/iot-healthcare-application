import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAL9fyBypuR2gxJiKcznysSTCjChEVTbJA",
  authDomain: "healthcareapp-ad83b.firebaseapp.com",
  projectId: "healthcareapp-ad83b",
  storageBucket: "healthcareapp-ad83b.appspot.com",
  messagingSenderId: "1006467603625",
  appId: "1:543862425188:web:449e937ce2d4d7ffdd4171",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
