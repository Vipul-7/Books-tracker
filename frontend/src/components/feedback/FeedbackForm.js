import classes from "./FeedbackForm.module.css";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { sendFeedback } from "../../util/http";
import isValidToken from "../../util/validateToken";
import { useNavigate } from "react-router";

const FeedbackForm = () => {
  const navigate = useNavigate();
  const [rangeInput, setRangeInput] = useState(7);

  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: sendFeedback,
  })

  const submitHandler = (event) => {
    event.preventDefault();

    if (!isValidToken()) {
      navigate("/auth/login");
      return;
    }

    mutate({
      message: event.target.feature.value,
      rating: parseInt(event.target.rate.value),
    })
  };

  return (
    <>
      {isSuccess && (
        <h1 style={{ textAlign: "center" }}>Thank you for your Feedback!</h1>
      )}
      {isError && <h1 style={{ textAlign: "center" }}>{error}</h1>}
      {!isSuccess && !isError && (
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

          <section>
            {isPending && <button disabled={true} >Loading...</button>}
            {!isPending && <button>Send</button>}
          </section>
        </form>
      )}
    </>
  );
};

export default FeedbackForm;
