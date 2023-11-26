import { useDispatch } from "react-redux";
import Card from "../UI/Card";
import classes from "../exploreBooks/BooksListExplore.module.css";
import Button from "../UI/Button";
import { ModalsActions } from "../../store/modals-slice";
import { addToCurrentRead, addToHaveRead, queryClient, removeFromToRead } from "../../util/http";
import { useMutation } from "@tanstack/react-query";

const ToReadLists = (props) => {
  const dispatch = useDispatch();

  const { mutate: removeFromToReadMutate } = useMutation({
    mutationFn: removeFromToRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["toRead"] });
    }
  })

  const { mutate: haveReadMutate } = useMutation({
    mutationFn: addToHaveRead,
  })
  const { mutate: currentReadMutate } = useMutation({
    mutationFn: addToCurrentRead,
  })

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


  const removeFromToReadHandler = async () => {
    removeFromToReadMutate(props.id);
    dispatch(ModalsActions.showInteractionFeedbackRemovedModal(true));
  };

  const addToReadingNowHandler = () => {
    currentReadMutate(bookData);
  };

  const addToHaveReadHandler = () => {
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
        <Button onClick={removeFromToReadHandler}>Remove from To Read</Button>
        <Button onClick={addToReadingNowHandler}>Reading Now</Button>
        <Button onClick={addToHaveReadHandler}>Have read</Button>
      </section>
    </div>
  );
};

export default ToReadLists;
