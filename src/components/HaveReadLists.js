import { useDispatch } from "react-redux";
import Card from "../components/UI/Card";
import classes from "./FavoriteBookLists.module.css";
import { haveReadActions } from "../store/have-read-slice";

const HaveReadLists = (props) => {
  const dispatch = useDispatch();

  const removeFromCompletedHandler = () => {
    dispatch(haveReadActions.removeFromCompleted(props.id));
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
        <button onClick={removeFromCompletedHandler} type="button">
          Remove From Favorite
        </button>
        <button>Have read</button>
        <button>To read</button>
      </section>
    </div>
  );
};

export default HaveReadLists;
