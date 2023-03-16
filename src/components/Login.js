import { useDispatch } from "react-redux";
import Modal from "./Layout/Modal";
import { LoginActions } from "../store/login-slice";

const Login = () => {
  const dispatch = useDispatch();

  const closeModalHandler = () => {
    dispatch(LoginActions.changeShowLoginModal());
  };

  return (
    <Modal>
      Login with Google
      <button onClick={closeModalHandler}>Close</button>
    </Modal>
  );
};

export default Login;
