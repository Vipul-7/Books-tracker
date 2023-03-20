import Card from "./UI/Card";
import classes from "./BooksListExplore.module.css";
import { useDispatch, useSelector } from "react-redux";
import { favActions } from "../store/favorite-slice";
import { CurrentReadActions } from "../store/current-read-slice";
import { haveReadActions } from "../store/have-read-slice";
import { ToReadActions } from "../store/to-read-slice";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "../firebase";
import useSendData from "../hooks/use-send-data";

const BooksList = (props) => {
  const { sendData: sendFavoriteData } = useSendData();
  const { sendData: sendToReadData } = useSendData();
  const { sendData: sendCurrentReadData } = useSendData();
  const { sendData: sendHaveReadData } = useSendData();
  const [user, loading] = useAuthState(auth);

  const dispatch = useDispatch();
  const favoriteBooks = useSelector((state) => state.favorite.favBooks);

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

  const isBookExistInFavorite = favoriteBooks.find(
    (item) => item.id === props.id
  );

  const addToFavoriteHandler = async () => {
    dispatch(favActions.addToFavorite(bookData));

    sendFavoriteData("favorite", bookData);
  };

  const removeFromFavoriteHandler = () => {
    dispatch(favActions.removeFromFavorite(props.id));
  };

  const addToToReadHandler = () => {
    dispatch(ToReadActions.addToToRead(bookData));

    sendToReadData("to-read", bookData);
  };

  const addToCompletedHandler = () => {
    dispatch(haveReadActions.addToCompleted(bookData));

    sendHaveReadData("have-read", bookData);
  };

  const addToCurrentReadHandler = () => {
    const currentReadBookData = {
      id: props.id,
      title: props.title,
      authors: props.authors,
      categories: props.categories,
      image: props.image,
      Totalpages: props.pages,
    };
    dispatch(CurrentReadActions.addToCurrentRead(currentReadBookData));

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
        {!isBookExistInFavorite && (
          <button onClick={addToFavoriteHandler} type="button">
            Add to Favorite
          </button>
        )}
        {isBookExistInFavorite && (
          <button onClick={removeFromFavoriteHandler} type="button">
            Remove From Favorite
          </button>
        )}
        <button onClick={addToCurrentReadHandler} type="button">
          Reading Now
        </button>
        <button onClick={addToToReadHandler}>To read</button>
        <button onClick={addToCompletedHandler}>Have read</button>
      </section>
    </div>
  );
};

export default BooksList;
