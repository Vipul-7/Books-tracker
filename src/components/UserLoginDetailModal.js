import { useDispatch } from "react-redux";
import Modal from "./Layout/Modal";
import classes from "./UserLoginDetailModal.module.css";
import { LoginActions } from "../store/login-slice";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const UserLoginDetailModal = () => {
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    dispatch(LoginActions.showProfileModal());
    await auth.signOut();
  };

  const closeModalHandler = () => {
    dispatch(LoginActions.showProfileModal());
  };

  return (
    <Modal onClose={closeModalHandler}>
      <h1 className={classes.title}>Your Profile</h1>
      <section className={classes.details}>
        <img src={user.photoURL} alt={user.displayName} />
        <h2>{user.displayName}</h2>
        <h4>
          Logged-in as <span>{user.email}</span>
        </h4>
      </section>
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
