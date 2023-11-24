import { useEffect } from "react";
import { useSelector } from "react-redux";
import HaveReadLists from "../components/HaveReadLists";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import classes from "./HaveRead.module.css";
import Loading from "../components/Icons/Loading";

import useRetrieveData from "../hooks/use-retrieve-data";
import NotLoggedIn from "../components/NotLoggedIn";
import { fetchHaveReadBooks } from "../util/http";
import { useQuery } from "@tanstack/react-query";

const HaveReadPage = () => {
  const [user] = useAuthState(auth);

  const { data: books, isPending, isError, error } = useQuery({
    queryKey: ["haveRead"],
    queryFn: ({ signal }) => fetchHaveReadBooks({ signal })
  })

  let content;
  if (books) {
    content = books.data.haveReadBooks.map((book) => (
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
