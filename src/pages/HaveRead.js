import { useEffect } from "react";
import { useSelector } from "react-redux";
import HaveReadLists from "../components/HaveReadLists";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import classes from "./HaveRead.module.css";
import Loading from "../components/Icons/Loading";

import useRetrieveData from "../hooks/use-retrieve-data";
import NotLoggedIn from "../components/NotLoggedIn";

const HaveReadPage = () => {
  const [user] = useAuthState(auth);
  const { retrieveData: retrieveHaveReadData, isLoading } = useRetrieveData();

  useEffect(() => {
    if (user) {
      retrieveHaveReadData("have-read");
    }
  }, []);

  const completedBooks = useSelector((state) => state.haveRead.completedBooks);
  return (
    <>
      {isLoading && <Loading />}
      {completedBooks.length === 0 && !isLoading && user && (
        <p>You didn't have any completed books</p>
      )}
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
      {!user && <NotLoggedIn pageName="Completed Books" />}
    </>
  );
};

export default HaveReadPage;
