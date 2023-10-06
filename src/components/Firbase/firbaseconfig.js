// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyC5_hhS20oVCceirh2XVN3i75KyLPSDAUs",
   authDomain: "cheapdaraz.firebaseapp.com",
   projectId: "cheapdaraz",
   storageBucket: "cheapdaraz.appspot.com",
   messagingSenderId: "689071720505",
   appId: "1:689071720505:web:294cb4d58daee3fa9d65e8",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
