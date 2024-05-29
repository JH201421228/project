// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import getEnv from "./utils/getEnv";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: getEnv('FIREBASE_API_KEY'),
  authDomain: "st-project-3c625.firebaseapp.com",
  projectId: "st-project-3c625",
  storageBucket: "st-project-3c625.appspot.com",
  messagingSenderId: "862531382175",
  appId: "1:862531382175:web:4bc5650e7df3b441276baa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app)
export const storage = getStorage(app)

export default app