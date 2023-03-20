import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const useSendData = () => {
  const [user, loading] = useAuthState(auth);

  const userUniqueId = user.uid;

  const sendData = async (fieldName, data) => {
    const userRef = doc(db, "users", userUniqueId);
    const userDoc = await getDoc(userRef);

    // i did for specific field because array wasn't taking parameters value
    if (fieldName === "Favorite") {
      if (userDoc.exists()) {
        await updateDoc(userRef, {
          favorite: arrayUnion(data),
        });
      } else {
        await setDoc(userRef, { favorite: [data] });
      }
    } else if (fieldName === "Current-read") {
      if (userDoc.exists()) {
        await updateDoc(userRef, {
          currentRead: arrayUnion(data),
        });
      } else {
        await setDoc(userRef, { currentRead: [data] });
      }
    } else if (fieldName === "To-read") {
      if (userDoc.exists()) {
        await updateDoc(userRef, {
          toRead: arrayUnion(data),
        });
      } else {
        await setDoc(userRef, { toRead: [data] });
      }
    } else if (fieldName === "have-Read") {
      if (userDoc.exists()) {
        await updateDoc(userRef, {
          haveRead: arrayUnion(data),
        });
      } else {
        await setDoc(userRef, { haveRead: [data] });
      }
    }
  };

  return {
    sendData,
  };
};

export default useSendData;