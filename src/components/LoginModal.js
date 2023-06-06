import { useDispatch } from "react-redux";
import { signInWithPopup } from "firebase/auth";
import Modal from "./Layout/Modal";
import { LoginActions } from "../store/login-slice";
import classes from "./LoginModal.module.css";
import { auth, provider } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import GoogleIcon from "./Icons/GoogleIcon";

const LoginModal = () => {
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();

  const signInHandler = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      window.alert(error.message);
    }
  };

  // close the modal while just logged in
  if (user) {
    dispatch(LoginActions.changeShowLoginModal());
  }

  const closeModalHandler = () => {
    dispatch(LoginActions.changeShowLoginModal());
  };

  return (
    <Modal>
      <h1 className={classes.title}>Sign-In</h1>
      <div className={classes["provider-button"]}>
        <button onClick={signInHandler}>
          <GoogleIcon />
          <span>Sign-In with Google</span>
        </button>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={closeModalHandler}>
          Close
        </button>
      </div>
    </Modal>
  );
};

export default LoginModal;
