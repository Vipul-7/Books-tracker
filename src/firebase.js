import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDOtUUvw3phs05R2YJYVE9nVDJauBxPipM",
  authDomain: "book-tracker--api.firebaseapp.com",
  projectId: "book-tracker--api",
  storageBucket: "book-tracker--api.appspot.com",
  messagingSenderId: "443989530920",
  appId: "1:443989530920:web:b944828a509271fc0e981d",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
