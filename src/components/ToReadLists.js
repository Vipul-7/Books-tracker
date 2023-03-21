import { useDispatch } from "react-redux";
import Card from "../components/UI/Card";
import classes from "./FavoriteBookLists.module.css";
import { ToReadActions } from "../store/to-read-slice";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { arrayRemove, doc, getDoc, updateDoc } from "firebase/firestore";

const ToReadLists = (props) => {
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();

  const removeFromToReadHandler = async () => {
    dispatch(ToReadActions.removeFromToRead(props.id));

    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);

    const data = userDoc.data();
    const index = data.toRead.findIndex((item) => item.id === props.id);

    await updateDoc(userRef, {
      toRead: arrayRemove(data.toRead[index]),
    });
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
          Remove from To Read
        </button>
        <button>Add to Reading Now</button>
        <button>Have read</button>
      </section>
    </div>
  );
};

export default ToReadLists;
