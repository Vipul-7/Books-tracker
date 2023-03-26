import classes from "./FeedbackForm.module.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useState } from "react";
import { db } from "../firebase";
import { arrayUnion, doc } from "firebase/firestore";
import { updateDoc } from "firebase/firestore";

const FeedbackForm = () => {
  const [user] = useAuthState(auth);
  const [rangeInput, setRangeInput] = useState(7);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();

    const userRef = doc(db, "users", user.uid);

    const data = {
      email: user.email,
      rate: event.target.rate.value,
      feature: event.target.feature.value,
      name: event.target.name.value,
    };

    const sendData = async () => {
      await updateDoc(userRef, {
        feedback: arrayUnion(data),
      });
    };

    sendData();
    setIsSubmitted(true);
  };

  return (
    <>
      {isSubmitted && (
        <h1 style={{ textAlign: "center" }}>Thank you for your Feedback!</h1>
      )}
      {!isSubmitted && (
        <form className={classes.form} onSubmit={submitHandler}>
          <label htmlFor="rate">Rate: </label>
          <span>{rangeInput}</span>
          <input
            type="range"
            min="1"
            max="10"
            id="rate"
            defaultValue={rangeInput}
            onChange={(e) => setRangeInput(e.target.value)}
            required
          />

          <>
            <label htmlFor="feature">
              According to you on which feature(s) I should work more:
            </label>
            <input type="text" id="feature" required />
          </>

          <label htmlFor="name">May I know your name: </label>
          <input type="text" id="name" required />
          <section>
            <button>Send to Vipul</button>
          </section>
        </form>
      )}
    </>
  );
};

export default FeedbackForm;
