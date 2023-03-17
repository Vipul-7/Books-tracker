import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC6ogKsC2Gc-fzX2zt2z1x_rMn3BI7ST2M",
  authDomain: "book-tracker-cfeeb.firebaseapp.com",
  projectId: "book-tracker-cfeeb",
  storageBucket: "book-tracker-cfeeb.appspot.com",
  messagingSenderId: "580041989544",
  appId: "1:580041989544:web:704da41c869e9f7b6bd19d",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
