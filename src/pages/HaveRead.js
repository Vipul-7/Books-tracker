import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HaveReadLists from "../components/HaveReadLists";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import classes from "./HaveRead.module.css";

import useRetrieveData from "../hooks/use-retrieve-data";
import { LoginActions } from "../store/login-slice";

const HaveReadPage = () => {
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);
  const { retrieveData: retrieveHaveReadData, isLoading } = useRetrieveData();

  // if not logged in then show login modal
  if (!user) {
    dispatch(LoginActions.changeShowLoginModal());
  }

  useEffect(() => {
    retrieveHaveReadData("have-read");
  }, []);

  const completedBooks = useSelector((state) => state.haveRead.completedBooks);
  return (
    <>
      {isLoading && <h1 style={{ textAlign: "center" }}>Loading...</h1>}
      <div className={classes.cards}>
        {completedBooks.map((done) => (
          <li key={done.id}>
            <HaveReadLists
              id={done.id}
              image={done.image}
              image_alt={done.title}
              title={done.title}
              authors={done.authors}
              categories={done.categories}
              language={done.language}
              pages={done.pages}
              description={done.description}
            />
          </li>
        ))}
      </div>
    </>
  );
};

export default HaveReadPage;
