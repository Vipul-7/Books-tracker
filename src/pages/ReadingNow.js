import CurrentRead from "../components/Current-read";
import { useSelector } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import useRetrieveData from "../hooks/use-retrieve-data";
import { useEffect } from "react";
import NotLoggedIn from "../components/NotLoggedIn";
import Loading from "../components/Icons/Loading";

const ReadingNowPage = () => {
  const [user] = useAuthState(auth);
  const { retrieveData: retrieveCurrentReadData, isLoading } =
    useRetrieveData();

  useEffect(() => {
    if (user) {
      retrieveCurrentReadData("current-read");
    }
  }, []);

  const CurrentReadBooks = useSelector((state) => state.Current.books);

  return (
    <>
      <div>
        {isLoading && <Loading />}

        {CurrentReadBooks.map((book) => (
          <li key={book.id}>
            <CurrentRead
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
              readPages={book.readPages}
            />
          </li>
        ))}
        {!user && <NotLoggedIn pageName="Currently Reading Books" />}
      </div>
    </>
  );
};

export default ReadingNowPage;
