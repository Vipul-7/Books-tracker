import CurrentRead from "../components/Current-read";
import { useSelector } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import useRetrieveData from "../hooks/use-retrieve-data";
import { useEffect } from "react";
import NotLoggedIn from "../components/NotLoggedIn";

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
        {isLoading && <h1 style={{ textAlign: "center" }}>Loading...</h1>}

        {CurrentReadBooks.map((book) => (
          <li key={book.id}>
            <CurrentRead
              id={book.id}
              title={book.title}
              image={book.image}
              image_alt={book.title}
              authors={book.authors}
              categories={book.categories}
              pages={book.pages}
              readPages={book.readPages}
            />
          </li>
        ))}
        {!user && <NotLoggedIn pageName="Cuurently Reading Books data" />}
      </div>
    </>
  );
};

export default ReadingNowPage;
