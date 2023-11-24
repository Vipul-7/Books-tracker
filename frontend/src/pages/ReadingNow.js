import CurrentRead from "../components/Current-read";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import Loading from "../components/Icons/Loading";
import { fetchCurrentReadBooks } from "../util/http";
import { useQuery } from "@tanstack/react-query";

const ReadingNowPage = () => {
  const [user] = useAuthState(auth);

  const { data: books, isPending, isError, error } = useQuery({
    queryKey: ["currentRead"],
    queryFn: ({ signal }) => fetchCurrentReadBooks({ signal })
  })

  let content;
  if (books) {
    content = books.data.currentReadBooks.map((book) => (
      <li key={book.id}>
        <CurrentRead
          id={book.id}
          image={book.image}
          image_alt={book.title}
          title={book.title}
          authors={book.author}
          categories={book.categories}
          language={book.language}
          pages={book.pages}
          readPages={book.readPages}
          description={book.description}
          textSnippet={book.textSnippet}
          previewLink={book.previewLink}
        />
      </li>
    ))
  }
  if (isError) {
    content = <h1>{error}</h1>
  }
  if (isPending) {
    content = <Loading />
  }

  return (
    <>
      {content}
      {/* {!user && <NotLoggedIn pageName="Favorite Books" />} */}
    </>
  );
};

export default ReadingNowPage;
