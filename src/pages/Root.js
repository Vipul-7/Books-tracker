import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import Modal from "../components/Layout/Modal";
import Login from "../components/Login";
import MainNavigation from "../components/MainNavigation";

const RootLayout = () => {
  const isShowLoginModal = useSelector((state) => state.login.isShowLogin);
  return (
    <>
      {isShowLoginModal && <Login />}
      <MainNavigation />
      <Outlet />
      {/* <Footer/> */}
    </>
  );
};

export default RootLayout;
