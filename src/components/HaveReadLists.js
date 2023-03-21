import { useDispatch } from "react-redux";
import Card from "../components/UI/Card";
import classes from "./FavoriteBookLists.module.css";
import { haveReadActions } from "../store/have-read-slice";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { arrayRemove, doc, getDoc, updateDoc } from "firebase/firestore";

const HaveReadLists = (props) => {
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();

  const removeFromCompletedHandler = async () => {
    dispatch(haveReadActions.removeFromCompleted(props.id));

    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);

    const data = userDoc.data();
    const index = data.haveRead.findIndex((item) => item.id === props.id);

    await updateDoc(userRef, {
      haveRead: arrayRemove(data.haveRead[index]),
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
        <button onClick={removeFromCompletedHandler} type="button">
          Remove From Completed
        </button>
      </section>
    </div>
  );
};

export default HaveReadLists;
