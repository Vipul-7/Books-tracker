import { useDispatch } from "react-redux";
import Modal from "./Layout/Modal";
import classes from "./UserLoginDetailModal.module.css";
import { ModalsActions } from "../store/modals-slice";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";

const UserLoginDetailModal = () => {
  const [user] = useAuthState(auth);
  const [toReadCount, setToReadCount] = useState(0);
  const [readingCount, setReadingCount] = useState(0);
  const [readCount, setReadCount] = useState(0);
  const [favCount, setFavCount] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);
      const data = userDoc.data();

      setToReadCount(data.toRead.length);
      setReadingCount(data.currentRead.length);
      setReadCount(data.haveRead.length);
      setFavCount(data.favourite.length);
    };
    fetchData();
  }, []);

  const logoutHandler = async () => {
    dispatch(ModalsActions.showProfileModal());
    await auth.signOut();
  };

  const closeModalHandler = () => {
    dispatch(ModalsActions.showProfileModal());
  };

  return (
    <Modal onClose={closeModalHandler}>
      <h1 className={classes.title}>PROFILE</h1>
      <section className={classes.details}>
        <img src={user.photoURL} alt={user.displayName} />
        <h2>{user.displayName}</h2>
        <h4>
          Signed-in as <span>{user.email}</span>
        </h4>
      </section>
      <div className={classes["books-count"]}>
        <ul>
          <li>
            <span className={classes.label}>Current read Books :- &nbsp;</span>
            <span className={classes.count}>{readingCount}</span>
          </li>
          <li>
            <span className={classes.label}>To-read books count :- &nbsp;</span>
            <span className={classes.count}>{toReadCount}</span>
          </li>
          <li>
            <span className={classes.label}>
              Have-read books count :- &nbsp;
            </span>
            <span className={classes.count}>{readCount}</span>
          </li>
          <li>
            <span className={classes.label}>Fav-books count :- &nbsp;</span>
            <span className={classes.count}>{favCount}</span>
          </li>
        </ul>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={closeModalHandler}>
          Close
        </button>
        <button className={classes["button"]} onClick={logoutHandler}>
          Logout
        </button>
      </div>
    </Modal>
  );
};

export default UserLoginDetailModal;
