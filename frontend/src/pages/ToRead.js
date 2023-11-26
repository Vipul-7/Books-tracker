import { useEffect } from "react";
import ToReadLists from "../components/toRead/ToReadLists";
import Loading from "../components/Icons/Loading";
import { fetchToReadBooks } from "../util/http";
import { useQuery } from "@tanstack/react-query";
import isValidToken from "../util/validateToken";
import { useNavigate } from "react-router";

const ToReadPage = () => {
  const navigate = useNavigate();

  const { data: books, isPending, isError, error } = useQuery({
    queryKey: ["toRead"],
    queryFn: ({ signal }) => fetchToReadBooks({ signal })
  })

  useEffect(() => {
    if (!isValidToken()) {
      console.log("Not authenticated");
      navigate("/auth/login");
    }
  }, [])

  let content;
  if (books) {
    content = books.data?.toReadBooks.map((book) => (
      <li key={book.id}>
        <ToReadLists
          id={book.id}
          bookId={book.bookId}
          image={book.image}
          image_alt={book.title}
          title={book.title}
          authors={book.author}
          categories={book.categories}
          language={book.language}
          pages={book.pages}
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

export default ToReadPage;
