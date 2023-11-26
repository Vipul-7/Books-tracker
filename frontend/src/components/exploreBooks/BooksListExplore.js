import Card from "../UI/Card";
import classes from "./BooksListExplore.module.css";
import Button from "../UI/Button";
import { useMutation } from "@tanstack/react-query";
import { addToCurrentRead, addToFavorite, addToHaveRead, addToToRead } from "../../util/http";
import isValidToken from "../../util/validateToken";
import { useNavigate } from "react-router";

const BooksList = (props) => {
  const navigate = useNavigate();

  const { mutate: favoriteMutate } = useMutation({
    mutationFn: addToFavorite,
  })
  const { mutate: toReadMutate } = useMutation({
    mutationFn: addToToRead,
  })
  const { mutate: haveReadMutate } = useMutation({
    mutationFn: addToHaveRead,
  })
  const { mutate: currentReadMutate } = useMutation({
    mutationFn: addToCurrentRead,
  })

  const bookData = {
    title: props.title,
    author: props.authors,
    bookId: props.bookId,
    categories: props.categories,
    image: props.image,
    description: props.description,
    language: props.language,
    pages: props.pages,
    textSnippet: props.textSnippet,
    previewLink: props.previewLink,
  };

  const addToFavoriteHandler = async () => {
    if (!isValidToken()) {
      navigate("/auth/login");
      return;
    }
    favoriteMutate(bookData);
  };

  const addToToReadHandler = () => {
    if (!isValidToken()) {
      navigate("/auth/login");
      return;
    }
    toReadMutate(bookData);
  };

  const addToCompletedHandler = () => {
    if (!isValidToken()) {
      navigate("/auth/login");
      return;
    }
    haveReadMutate(bookData);
  };

  const addToCurrentReadHandler = () => {
    if (!isValidToken()) {
      navigate("/auth/login");
      return;
    }
    currentReadMutate(bookData);
  };

  return (
    <div>
      <Card
        id={props.id}
        title={props.title}
        authors={props.authors}
        categories={props.categories}
        image={props.image}
        description={props.description}
        language={props.language}
        pages={props.pages}
        textSnippet={props.textSnippet}
        previewLink={props.previewLink}
      />
      <section className={classes.buttons}>
        <Button onClick={addToFavoriteHandler}>Favorite</Button>
        <Button onClick={addToCurrentReadHandler}>Reading now</Button>
        <Button onClick={addToToReadHandler}>To read</Button>
        <Button onClick={addToCompletedHandler}>Have read</Button>
      </section>
    </div>
  );
};

export default BooksList;
