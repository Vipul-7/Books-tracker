import { useDispatch } from "react-redux";
import { signInWithPopup } from "firebase/auth";
import Modal from "./Layout/Modal";
import { ModalsActions } from "../store/modals-slice";
import classes from "./AuthModal.module.css";
import { auth, provider } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import GoogleIcon from "./Icons/GoogleIcon";
import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import { login } from "../util/http";
import { Link, useNavigate } from "react-router-dom"

const LoginModal = () => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();

  const [user] = useAuthState(auth);
  const dispatch = useDispatch();

  const { mutate: loginMutate, isPending, isError, error } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (data.error) {
        window.alert(data.error);
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
        // dispatch(ModalsActions.changeShowLoginModal());
      }
      // navigate(-1);
    }
  })

  const signInHandler = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      window.alert(error.message);
    }
  };

  const loginHandler = () => {
    loginMutate({
      email: emailRef.current.value,
      password: passwordRef.current.value
    })
  }

  // // close the modal while just logged in
  // if (user) {
  //   dispatch(ModalsActions.changeShowLoginModal());
  // }

  const closeModalHandler = () => {
    navigate(-1);
    // dispatch(ModalsActions.changeShowLoginModal());
  };

  return (
    <Modal>
      <h1 className={classes.title}>Login</h1>
      {/* <div className={classes["provider-button"]}>
        <button onClick={signInHandler}>
          <GoogleIcon />
          <span>Sign-In with Google</span>
        </button>
      </div> */}
      <div className={classes["auth-input"]}>
        {isError && <h1 style={{ textAlign: "center" }}>{error}</h1>}
        <label htmlFor="email">E-mail</label>
        <input id="email" type="email" ref={emailRef} />
        <label htmlFor="password">Password</label>
        <input id="password" type="password" ref={passwordRef} />
        {!isPending && <button onClick={loginHandler}>submit</button>}
        {isPending && <button disabled>Loading...</button>}
      </div>
      <div className={classes["auth-transfer"]}>
        <span>Don't have an account?</span>
        <Link to="/auth/signup">Sign up</Link>
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
