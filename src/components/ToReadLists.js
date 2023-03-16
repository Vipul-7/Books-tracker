import { useDispatch } from "react-redux";
import Card from "../components/UI/Card";
import classes from "./FavoriteBookLists.module.css";
import { ToReadActions } from "../store/to-read-slice";

const ToReadLists = (props) => {
  const dispatch = useDispatch();

  const removeFromToReadHandler = () => {
    dispatch(ToReadActions.removeFromToRead(props.id));
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
        <button onClick={removeFromToReadHandler} type="button">
          Remove From Favorite
        </button>
        <button>Have read</button>
        <button>To read</button>
      </section>
    </div>
  );
};

export default ToReadLists;
