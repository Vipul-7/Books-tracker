import CurrentRead from "../components/Current-read";
import { useDispatch, useSelector } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import useRetrieveData from "../hooks/use-retrieve-data";
import { useEffect } from "react";
import { LoginActions } from "../store/login-slice";

const ReadingNowPage = () => {
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);
  const { retrieveData: retrieveCurrentReadData } = useRetrieveData();

  if (!user) {
    dispatch(LoginActions.changeShowLoginModal());
  }

  useEffect(() => {
    retrieveCurrentReadData("current-read");
  }, []);

  const CurrentReadBooks = useSelector((state) => state.Current.books);

  return (
    <>
      <div>
        {CurrentReadBooks.map((book) => (
          <li key={book.id}>
            <CurrentRead
              id={book.id}
              title={book.title}
              image={book.image}
              image_alt={book.title}
              authors={book.authors}
              categories={book.categories}
              Totalpages={book.Totalpages}
            />
          </li>
        ))}
      </div>
    </>
  );
};

export default ReadingNowPage;
