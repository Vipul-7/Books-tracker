import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "../components/UI/Card";
import classes from "./FavoriteBookLists.module.css";
import { favActions } from "../store/favorite-slice";

const FavoriteBooksList = (props) => {
  const dispatch = useDispatch();
  const [showDesc, setShowDesc] = useState(false);

  const removeFromFavoriteHandler = () => {
    dispatch(favActions.removeFromFavorite(props.id));
  };

  return (
    <div>
      <Card
        id={props.id}
        image={props.image}
        image_alt={props.title}
        title={props.title}
        authors={props.authors}
        categories={props.categories}
        language={props.language}
        pages={props.pages}
        description={props.description}
      />

      <section className={classes.buttons}>
        <button onClick={removeFromFavoriteHandler} type="button">
          Remove From Favorite
        </button>
        <button>Have read</button>
        <button>To read</button>
      </section>
    </div>
  );
};

export default FavoriteBooksList;
