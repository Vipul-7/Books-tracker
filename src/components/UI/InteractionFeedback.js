import classes from "./InteractionFeedback.module.css";
import CorrectIcon from "../Icons/CorrectIcon";

const InteractionFeedback = (props) => {
  return (
    <div className={classes.main}>
      <div className={classes.icon}>
        <CorrectIcon />
      </div>
      &nbsp;
      <div className={classes.text}>
        <p>Successfully&nbsp;{props.actionText}</p>
      </div>
    </div>
  );
};

export default InteractionFeedback;
