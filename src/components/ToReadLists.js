import { useDispatch } from "react-redux";
import Card from "../components/UI/Card";
import classes from "./BooksListExplore.module.css";
import { ToReadActions } from "../store/to-read-slice";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { arrayRemove, doc, getDoc, updateDoc } from "firebase/firestore";
import useSendData from "../hooks/use-send-data";
import Button from "./UI/Button";
import { ModalsActions } from "../store/modals-slice";

const ToReadLists = (props) => {
  const { sendData: sendDataToReadingNow } = useSendData();
  const { sendData: sendDataToHaveRead } = useSendData();

  const bookData = {
    id: props.id,
    title: props.title,
    authors: props.authors,
    categories: props.categories,
    image: props.image,
    description: props.description,
    language: props.language,
    pages: props.pages,
    textSnippet: props.textSnippet,
    previewLink: props.previewLink,
  };

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

    dispatch(ModalsActions.showInteractionFeedbackRemovedModal(true));
  };

  const addToReadingNowHandler = () => {
    sendDataToReadingNow("current-read", { ...bookData, readPages: 0 });
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
        textSnippet={props.textSnippet}
        previewLink={props.previewLink}
      />

      <section className={classes.buttons}>
        <Button onClick={removeFromToReadHandler}>Remove from To Read</Button>
        <Button onClick={addToReadingNowHandler}>Reading Now</Button>
        <Button onClick={addToHaveReadHandler}>Have read</Button>
      </section>
    </div>
  );
};

export default ToReadLists;
