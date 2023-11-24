import { useDispatch } from "react-redux";
import Card from "../components/UI/Card";
import classes from "./BooksListExplore.module.css";
import { favActions } from "../store/favorite-slice";
import { updateDoc, doc, getDoc, arrayRemove } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import useSendData from "../hooks/use-send-data";
import Button from "./UI/Button";
import { ModalsActions } from "../store/modals-slice";
import { useMutation } from "@tanstack/react-query";
import { addToHaveRead, addToToRead, queryClient, removeFromFavorite } from "../util/http";


const FavoriteBooksList = (props) => {
  // const { sendData: sendDataToToRead } = useSendData();
  // const { sendData: sendDataToHaveRead } = useSendData();

  const { mutate: removeFromFavoriteMutate } = useMutation({
    mutationFn: removeFromFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorite"] });
    }
  })

  const { mutate: haveReadMutate } = useMutation({
    mutationFn: addToHaveRead,
  })
  const { mutate: toReadMutate } = useMutation({
    mutationFn: addToToRead,
  })

  const [user] = useAuthState(auth);
  const dispatch = useDispatch();

  const bookData = {
    bookId: props.bookId,
    title: props.title,
    author: props.authors,
    categories: props.categories,
    image: props.image,
    description: props.description,
    language: props.language,
    pages: props.pages,
    textSnippet: props.textSnippet,
    previewLink: props.previewLink,
  };

  const removeFromFavoriteHandler = async () => {
    // dispatch(favActions.removeFromFavorite(props.id));

    removeFromFavoriteMutate(props.id);

    dispatch(ModalsActions.showInteractionFeedbackRemovedModal(true));
  };

  const addToToReadHandler = () => {
    // sendDataToToRead("to-read", bookData);
    toReadMutate(bookData);
  };

  const addToHaveReadHandler = () => {
    // sendDataToHaveRead("have-read", bookData);
    haveReadMutate(bookData);
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
        <Button onClick={removeFromFavoriteHandler} type="button">
          Remove From Favorite
        </Button>
        <Button onClick={addToToReadHandler}>To read</Button>
        <Button onClick={addToHaveReadHandler}>Have read</Button>
      </section>
    </div>
  );
};

export default FavoriteBooksList;
