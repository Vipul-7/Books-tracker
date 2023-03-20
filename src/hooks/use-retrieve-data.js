import { doc, getDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { auth, db } from "../firebase";
import { CurrentReadActions } from "../store/current-read-slice";
import { favActions } from "../store/favorite-slice";
import { haveReadActions } from "../store/have-read-slice";
import { ToReadActions } from "../store/to-read-slice";

const useRetrieveData = () => {
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);
  let requestedData = [];

  const retrieveData = async (fieldName) => {
    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);

    if (fieldName === "favorite") {
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const requestedData = userData.favorite || [];

        dispatch(favActions.replaceFavoriteBooks(requestedData));
      } else {
        console.log("Document not found");
      }
    } else if (fieldName === "current-read") {
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const requestedData = userData.currentRead || [];

        dispatch(CurrentReadActions.replaceCurrentReadBooks(requestedData));
      } else {
        console.log("Document not found");
      }
    } else if (fieldName === "to-read") {
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const requestedData = userData.toRead || [];

        dispatch(ToReadActions.replaceToReadBooks(requestedData));
      } else {
        console.log("Document not found");
      }
    } else if (fieldName === "have-read") {
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const requestedData = userData.haveRead || [];

        dispatch(haveReadActions.replaceCompletedBooks(requestedData));
      } else {
        console.log("Document not found");
      }
    }
  };

  return {
    retrieveData,
    requestedData,
  };
};

export default useRetrieveData;
