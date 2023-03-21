import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import LoginModal from "../components/LoginModal";
import MainNavigation from "../components/Layout/MainNavigation";
import UserLoginDetailModal from "../components/UserLoginDetailModal";

const RootLayout = () => {
  const isShowLoginModal = useSelector((state) => state.login.isShowLogin);
  const showProfile = useSelector((state) => state.login.showProfile);

  return (
    <>
      {isShowLoginModal && <LoginModal />}
      {showProfile && <UserLoginDetailModal />}
      <MainNavigation />
      <Outlet />
      {/* <Footer/> */}
    </>
  );
};

export default RootLayout;
