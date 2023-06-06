import Card from "./UI/Card";
import classes from "./BooksListExplore.module.css";
// import { useSelector } from "react-redux";

import useSendData from "../hooks/use-send-data";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";
import { LoginActions } from "../store/login-slice";

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
      />
      <section className={classes.buttons}>
        <button onClick={addToFavoriteHandler}>Add to Favorite</button>
        <button onClick={addToCurrentReadHandler}>Reading Now</button>
        <button onClick={addToToReadHandler}>To read</button>
        <button onClick={addToCompletedHandler}>Have read</button>
      </section>
    </div>
  );
};

export default BooksList;
