import { useRouteError } from "react-router";
import MainNavigation from "../components/Layout/MainNavigation";

const ErrorPage = () => {
  const error = useRouteError();
  let title = "Error Occurred";
  let message = "something went wrong";

  if (error.status === 500) {
    message = error.data.message;
  }

  return (
    <>
      <MainNavigation />
      <div style={{marginTop:'50px'}}>
        <h1 style={{ textAlign: "center" }}>{title}</h1>
        <h3 style={{ textAlign: "center" }}>{message}</h3>
      </div>
    </>
  );
};

export default ErrorPage;
