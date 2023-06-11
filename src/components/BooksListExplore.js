import Card from "./UI/Card";
import classes from "./BooksListExplore.module.css";
// import { useSelector } from "react-redux";

import useSendData from "../hooks/use-send-data";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";
import { LoginActions } from "../store/login-slice";
import Button from "./UI/Button";

const BooksList = (props) => {
  const [user] = useAuthState(auth); // user, loading, error
  const dispatch = useDispatch();

  const { sendData: sendFavoriteData } = useSendData();
  const { sendData: sendToReadData } = useSendData();
  const { sendData: sendCurrentReadData } = useSendData();
  const { sendData: sendHaveReadData } = useSendData();

  const bookData = {
    id: props.id,
    title: props.title,
    authors: props.authors,
    categories: props.categories,
    image: props.image,
    description: props.description,
    language: props.language,
    pages: props.pages,
    textSnippet: props.textSnippet,
    previewLink: props.previewLink,
  };

  const addToFavoriteHandler = async () => {
    if (!user) {
      dispatch(LoginActions.changeShowLoginModal());
      return;
    }
    sendFavoriteData("favorite", bookData);
  };

  const addToToReadHandler = () => {
    if (!user) {
      dispatch(LoginActions.changeShowLoginModal());
      return;
    }
    sendToReadData("to-read", bookData);
  };

  const addToCompletedHandler = () => {
    if (!user) {
      dispatch(LoginActions.changeShowLoginModal());
      return;
    }
    sendHaveReadData("have-read", bookData);
  };

  const addToCurrentReadHandler = () => {
    if (!user) {
      dispatch(LoginActions.changeShowLoginModal());
      return;
    }
    const currentReadBookData = {
      id: props.id,
      title: props.title,
      authors: props.authors,
      categories: props.categories,
      image: props.image,
      pages: props.pages,
      textSnippet: props.textSnippet,
      previewLink: props.previewLink,
      readPages: 0,
    };
    sendCurrentReadData("current-read", currentReadBookData);
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
