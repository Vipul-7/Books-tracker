import { useEffect } from "react";
import { useSelector } from "react-redux";
import ToReadLists from "../components/ToReadLists";
import { useDispatch } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import useRetrieveData from "../hooks/use-retrieve-data";
import { LoginActions } from "../store/login-slice";

const ToReadPage = () => {
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);
  const { retrieveData: retrieveToReadData } = useRetrieveData();

  // if not logged in then show login modal
  if (!user) {
    dispatch(LoginActions.changeShowLoginModal("to-read"));
  }

  useEffect(() => {
    retrieveToReadData("to-read");
  }, []);

  const ToReadBooks = useSelector((state) => state.toRead.ToReadBooks);

  return (
    <>
      {ToReadBooks.map((book) => (
        <li key={book.id}>
          <ToReadLists
            id={book.id}
            image={book.image}
            image_alt={book.title}
            title={book.title}
            authors={book.authors}
            categories={book.categories}
            language={book.language}
            pages={book.pages}
            description={book.description}
          />
        </li>
      ))}
    </>
  );
};

export default ToReadPage;
