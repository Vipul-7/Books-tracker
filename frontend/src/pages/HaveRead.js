import { useEffect } from "react";
import HaveReadLists from "../components/haveRead/HaveReadLists";
import Loading from "../components/Icons/Loading";
import { fetchHaveReadBooks } from "../util/http";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import isValidToken from "../util/validateToken";

const HaveReadPage = () => {
  const navigate = useNavigate();

  const { data: books, isPending, isError, error } = useQuery({
    queryKey: ["haveRead"],
    queryFn: ({ signal }) => fetchHaveReadBooks({ signal })
  })

  useEffect(() => {
    if (!isValidToken()) {
      console.log("Not authenticated");
      navigate("/auth/login");
    }
  }, [])

  let content;
  if (books) {
    content = books.data?.haveReadBooks.map((book) => (
      <li key={book.id}>
        <HaveReadLists
          id={book.id}
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

export default HaveReadPage;
