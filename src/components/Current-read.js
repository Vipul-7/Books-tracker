import ProgressBar from "@ramonak/react-progress-bar";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { auth, db } from "../firebase";
import { CurrentReadActions } from "../store/current-read-slice";
import classes from "./Current-read.module.css";
import Card from "./UI/Card";
import Button from "./UI/Button";

const CurrentRead = (props) => {
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);
  const readPagesInput = useRef();

  // send data to the firstore and update the porogress bar
  const addToProgessBarHandler = async () => {
    const inputValue = readPagesInput.current.value;
    const inputValuePercentage = Math.floor((inputValue * 100) / props.pages);

    let readPages = props.readPages;
    if (inputValue > props.pages) {
      readPages = 100;
    } else if (inputValue < 0) {
      readPages = 0;
    } else {
      readPages = inputValuePercentage;
    }

    dispatch(CurrentReadActions.removeFromCurrentRead(props.id)); // remove the old data from the redux store

    dispatch(
      CurrentReadActions.addToCurrentRead({
        ...props,
        readPages: readPages,
      }) // update the redux store
    );

    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);

    const data = userDoc.data();
    const index = data.currentRead.findIndex((item) => item.id === props.id);

    await updateDoc(userRef, {
      currentRead: arrayRemove(data.currentRead[index]), // remove the old data
    });

    await updateDoc(userRef, {
      currentRead: arrayUnion({ ...props, readPages: readPages }), // add the new data
    });
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
    <>
      <div className={classes["book-card"]}>
        <section className={classes.Info}>
          <Card
            id={props.id}
            image={props.image}
            image_alt={props.title}
            title={props.title}
            authors={props.authors}
            categories={props.categories}
            language={props.language}
            pages={props.pages}
            description={props.description}
            textSnippet={props.textSnippet}
            previewLink={props.previewLink}
          />
        </section>
        <section className={classes.progress}>
          <section className={classes.progressBar}>
            <ProgressBar
              completed={props.readPages}
              className={classes.wrapper}
              baseBgColor="#2c5d7a"
              bgColor="#09402e"
              labelAlignment="outside"
              labelColor="#adb5bd"
            />
          </section>
          <section className={classes.changes}>
            <section className={classes["comp-pages"]}>
              <span>Read&nbsp;</span>
              {
                <input
                  type="text"
                  ref={readPagesInput}
                  onBlur={addToProgessBarHandler}
                />
              }{" "}
              <span>Pages</span>
            </section>
            <p className={classes["instruction-text"]}>
              <i>*Pages that you have been done</i>
            </p>
          </section>
        </section>
      </div>
      <section className={classes.remove}>
        <Button onClick={removeFromCurrentReadHandler}>
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
          <span>&nbsp;Remove</span>
        </Button>
      </section>
    </>
  );
};

export default CurrentRead;
