import { useDispatch } from "react-redux";
import { signInWithPopup } from "firebase/auth";
import Modal from "./Layout/Modal";
import { LoginActions } from "../store/login-slice";
import classes from "./Login.module.css";
import { auth, provider } from "../../firebase";

const Login = () => {
  const dispatch = useDispatch();

  const signInHandler = () => {
    signInWithPopup(auth,provider)
  };

  const closeModalHandler = () => {
    dispatch(LoginActions.changeShowLoginModal());
  };

  return (
    <Modal>
      <h1 className={classes.title}>Sign-In Page</h1>
      <div>
        <button onClick={signInHandler}>Sign-In with Google</button>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={closeModalHandler}>
          Close
        </button>
        {/* <button className={classes.button} onClick={closeModalHandler}>
          Close
        </button> */}
      </div>
    </Modal>
  );
};

export default Login;
