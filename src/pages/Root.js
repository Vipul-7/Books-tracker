import { Outlet } from "react-router";
import MainNavigation from "../components/MainNavigation";
import Footer from '../components/Footer';

const RootLayout = () => {
  return (
    <>
      <MainNavigation />
      <Outlet />
      <Footer/>
    </>
  );
};

export default RootLayout;
