import { useState } from "react";
import classes from "./Feedback.module.css";
import FeedbackForm from "./FeedbackForm";
import CloseIcon from "./Icons/CloseIcon";
import FeedbackIcon from "./Icons/FeedbackIcon";
import Modal from "./Layout/Modal";

const Feedback = () => {
  const [isShowModal, setIsShowModal] = useState(false);

  const clickHandler = () => {
    setIsShowModal(true);
  };

  return (
    <div>
      {isShowModal && (
        <Modal>
          <button
            className={classes.close}
            onClick={() => setIsShowModal(false)}
          >
            <CloseIcon />
          </button>
          <h3 className={classes.title}>Your Feedback Matters for me</h3>
          <section className={classes.form}>
            <FeedbackForm />
          </section>
          <h3>
            Improve this web application on{" "}
            <a href="https://github.com/Vipul-7/Books-tracker-using-google-book-api">
              Github
            </a>
          </h3>
        </Modal>
      )}
      {!isShowModal && (
        <button className={classes.icon} onClick={clickHandler}>
          <FeedbackIcon />
        </button>
      )}
    </div>
  );
};

export default Feedback;
