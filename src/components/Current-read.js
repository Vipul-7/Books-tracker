import ProgressBar from "@ramonak/react-progress-bar";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { auth, db } from "../firebase";
import { CurrentReadActions } from "../store/current-read-slice";
import classes from "./Current-read.module.css";

const CurrentRead = (props) => {
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);
  const [completedProgressBar, setCompletedProgressBar] = useState(0);
  const readPagesInput = useRef();

  const addToProgessBarHandler = async () => {
    const inputValue = readPagesInput.current.value;

    if (props.readPages > props.Totalpages) {
      setCompletedProgressBar(100);
    } else if (props.readPages < 0) {
      setCompletedProgressBar(0);
    } else {
      setCompletedProgressBar(
        Math.floor((props.readPages * 100) / props.Totalpages)
      );
    }

    // const userRef = doc(db, "users", user.uid);
    // const userDoc = await getDoc(userRef);

    // const data = userDoc.data();
    // const index = data.currentRead.findIndex((item) => item.id === props.id);

    // await updateDoc(userRef, {
    //   currentRead: arrayUnion({...currentRead[index]}),
    // });
  };

  const removeFromCurrentReadHandler = async () => {
    dispatch(CurrentReadActions.removeFromCurrentRead(props.id));

    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);

    const data = userDoc.data();
    const index = data.currentRead.findIndex((item) => item.id === props.id);

    await updateDoc(userRef, {
      currentRead: arrayRemove(data.currentRead[index]),
    });
  };

  return (
    <div className={classes["book-card"]}>
      <section className={classes.Info}>
        <section className={classes.image_sec}>
          <img src={props.image} alt={props.image_alt} />
        </section>
        <section className={classes.texts}>
          <div className={classes.title}>
            <h1>{props.title}</h1>
          </div>
          <div className={classes.author}>
            <h4>
              {" "}
              <span>Written By </span>
              {props.authors.map((author) => `${author}      `)}
            </h4>
          </div>
          <div className={classes.extra}>
            <section className={classes.cate}>
              <h5>
                Categorie(s) - {props.categories.map((cate) => `${cate}`)}
              </h5>
            </section>
            <section className={classes.tp}>
              <h5>Total Pages - {props.Totalpages}</h5>
            </section>
          </div>
        </section>
      </section>
      <section className={classes.progress}>
        <section className={classes.progressBar}>
          <ProgressBar
            completed={completedProgressBar}
            className={classes.wrapper}
          />
        </section>
        <section className={classes.changes}>
          <section className={classes["comp-pages"]}>
            Read{" "}
            {
              <input
                type="number"
                ref={readPagesInput}
                // value={props.readPages === 0 ? readPagesInput : props.readPages}
                onBlur={addToProgessBarHandler}
              />
            }{" "}
            pages
          </section>
          <section className={classes.remove}>
            <button onClick={removeFromCurrentReadHandler}>
              <span>
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                >
                  <title>trash</title>
                  <path d="M6 2l2-2h4l2 2h4v2h-16v-2h4zM3 6h14l-1 14h-12l-1-14zM8 8v10h1v-10h-1zM11 8v10h1v-10h-1z"></path>
                </svg>
              </span>
              Remove
            </button>
          </section>
        </section>
      </section>
    </div>
  );
};

export default CurrentRead;
