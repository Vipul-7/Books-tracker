import { useDispatch } from "react-redux";
import Card from "../components/UI/Card";
import classes from "./FavoriteBookLists.module.css";
import { favActions } from "../store/favorite-slice";
import { updateDoc, doc, getDoc, arrayRemove } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import useSendData from "../hooks/use-send-data";

const FavoriteBooksList = (props) => {
  const { sendData: sendDataToToRead } = useSendData();
  const { sendData: sendDataToHaveRead } = useSendData();

  const [user] = useAuthState(auth);
  const dispatch = useDispatch();

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

  const removeFromFavoriteHandler = async () => {
    dispatch(favActions.removeFromFavorite(props.id));

    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);

    const data = userDoc.data();
    const index = data.favorite.findIndex((item) => item.id === props.id);

    await updateDoc(userRef, {
      favorite: arrayRemove(data.favorite[index]),
    });
  };

  const addToToReadHandler = () => {
    sendDataToToRead("to-read", bookData);
  };

  const addToHaveReadHandler = () => {
    sendDataToHaveRead("have-read", bookData);
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
        <button onClick={addToToReadHandler}>To read</button>
        <button onClick={addToHaveReadHandler}>Have read</button>
      </section>
    </div>
  );
};

export default FavoriteBooksList;
