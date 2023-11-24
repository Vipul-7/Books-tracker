import classes from "./NotLoggedIn.module.css";

const NotLoggedIn = (props) => {
  return (
    <div className={classes.container}>
      <h2>
        First Sign-In to get the your <span>{props.pageName} </span>data
      </h2>
    </div>
  );
};

export default NotLoggedIn;
