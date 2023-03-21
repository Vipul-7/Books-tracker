import { useRouteError } from "react-router";
import MainNavigation from "../components/Layout/MainNavigation";

const ErrorPage = () => {
  const error = useRouteError();
  let message = "something went wrong";

  if (error.status === 500) {
    message = error.data.message;
  }

  return (
    <>
      <MainNavigation />
      <h1 style={{ textAlign: "center" }}>{message}</h1>
    </>
  );
};

export default ErrorPage;
