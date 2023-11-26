import Modal from "../Layout/Modal";
import classes from "./AuthModal.module.css";
import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import {signUp } from "../../util/http"
import { Link, useNavigate } from "react-router-dom"

const SignupModal = () => {
    const navigate = useNavigate();
    const emailRef = useRef();
    const nameRef = useRef();
    const passwordRef = useRef();

    const { mutate: signupMutate, isPending, isError, error } = useMutation({
        mutationFn: signUp,
        onSuccess: (data) => {
            navigate("/auth/login");
        }
    })

    const signupHandler = () => {
        signupMutate({
            email: emailRef.current.value,
            password: passwordRef.current.value,
            name: nameRef.current.value
        })
    }

    const closeModalHandler = () => {
        navigate("/");
    };

    return (
        <Modal>
            <h1 className={classes.title}>Signup</h1>
            {/* <div className={classes["provider-button"]}>
        <button onClick={signInHandler}>
          <GoogleIcon />
          <span>Sign-In with Google</span>
        </button>
      </div> */}
            <div className={classes["auth-input"]}>
                {isError && <h1 style={{ textAlign: "center" }}>{error}</h1>}
                <label htmlFor="name">Name</label>
                <input id="name" type="text" ref={nameRef} />
                <label htmlFor="email">E-mail</label>
                <input id="email" type="email" ref={emailRef} />
                <label htmlFor="password">Password</label>
                <input id="password" type="password" ref={passwordRef} />
                {!isPending && <button onClick={signupHandler}>submit</button>}
                {isPending && <button disabled>Loading...</button>}
            </div>
            <div className={classes["auth-transfer"]}>
                <span>Already have an account?</span>
                <Link to="/auth/login">Login</Link>
            </div>
            <div className={classes.actions}>
                <button className={classes["button--alt"]} onClick={closeModalHandler}>
                    Close
                </button>
            </div>
        </Modal>
    );
};

export default SignupModal;
