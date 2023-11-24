import Card from "./UI/Card";
import classes from "./BooksListExplore.module.css";
// import { useSelector } from "react-redux";

// import useSendData from "../hooks/use-send-data";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";
import { ModalsActions } from "../store/modals-slice";
import Button from "./UI/Button";
import { useMutation } from "@tanstack/react-query";
import { addToCurrentRead, addToFavorite, addToHaveRead, addToToRead } from "../util/http";

const BooksList = (props) => {
  const [user] = useAuthState(auth); // user, loading, error
  const dispatch = useDispatch();

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

  // const { sendData: sendFavoriteData } = useSendData();
  // const { sendData: sendToReadData } = useSendData();
  // const { sendData: sendCurrentReadData } = useSendData();
  // const { sendData: sendHaveReadData } = useSendData();

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
    // if (!user) {
    //   dispatch(ModalsActions.changeShowLoginModal());
    //   return;
    // }
    // sendFavoriteData("favorite", bookData);
    favoriteMutate(bookData);
  };

  const addToToReadHandler = () => {
    // if (!user) {
    //   dispatch(ModalsActions.changeShowLoginModal());
    //   return;
    // }
    // sendToReadData("to-read", bookData);
    toReadMutate(bookData);
  };

  const addToCompletedHandler = () => {
    // if (!user) {
    //   dispatch(ModalsActions.changeShowLoginModal());
    //   return;
    // }
    // sendHaveReadData("have-read", bookData);
    haveReadMutate(bookData);
  };

  const addToCurrentReadHandler = () => {
    // if (!user) {
    //   dispatch(ModalsActions.changeShowLoginModal());
    //   return;
    // }
    // sendCurrentReadData("current-read", currentReadBookData);
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
