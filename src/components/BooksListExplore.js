import Card from "./UI/Card";
import classes from "./BooksListExplore.module.css";
import { useSelector } from "react-redux";

import useSendData from "../hooks/use-send-data";

const BooksList = (props) => {
  const { sendData: sendFavoriteData } = useSendData();
  const { sendData: sendToReadData } = useSendData();
  const { sendData: sendCurrentReadData } = useSendData();
  const { sendData: sendHaveReadData } = useSendData();

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
    sendFavoriteData("favorite", bookData);
  };

  const removeFromFavoriteHandler = () => {};

  const addToToReadHandler = () => {
    sendToReadData("to-read", bookData);
  };

  const addToCompletedHandler = () => {
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
