import { useEffect } from "react";
import { useSelector } from "react-redux";
import ToReadLists from "../components/ToReadLists";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import useRetrieveData from "../hooks/use-retrieve-data";
import NotLoggedIn from "../components/NotLoggedIn";
import Loading from "../components/Icons/Loading";

const ToReadPage = () => {
  const [user] = useAuthState(auth);
  const { retrieveData: retrieveToReadData, isLoading } = useRetrieveData();

  useEffect(() => {
    if (user) {
      retrieveToReadData("to-read");
    }
  }, []);

  const ToReadBooks = useSelector((state) => state.toRead.ToReadBooks);

  return (
    <>
      {isLoading && <Loading />}

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
            textSnippet={book.textSnippet}
            previewLink={book.previewLink}
          />
        </li>
      ))}
      {!user && <NotLoggedIn pageName="To-read Books" />}
    </>
  );
};

export default ToReadPage;
