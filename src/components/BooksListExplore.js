import Card from "./UI/Card";
import classes from "./BooksListExplore.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { favActions } from "../store/favorite-slice";

const BooksList = (props) => {
  const dispatch = useDispatch();
  const [showDesc, setShowDesc] = useState(false);

  const showDescHandler = () => {
    setShowDesc(!showDesc);
  };

  const addToFavoriteHandler = () => {
    dispatch(
      favActions.addToFavorite({
        id: props.id,
        title: props.title,
        authors: props.authors,
        categories: props.categories,
        image: props.image,
        description: props.description,
        language: props.language,
        pages: props.pages,
      })
    );
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
      {showDesc && <p className={classes.description}>{props.description}</p>}
      <section className={classes.buttons}>
        {!showDesc && <button onClick={showDescHandler} type="button">
          Show description
        </button>}
        {showDesc && <button onClick={showDescHandler} type="button">
          Hide description
        </button>}
        <button onClick={addToFavoriteHandler} type="button">Add to Favorite</button>
        <button>Have read</button>
        <button>To read</button>
      </section>
    </div>
  );
};

export default BooksList;
