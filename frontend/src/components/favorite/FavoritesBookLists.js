import { useDispatch } from "react-redux";
import Card from "../UI/Card";
import classes from "../exploreBooks/BooksListExplore.module.css";
import Button from "../UI/Button";
import { ModalsActions } from "../../store/modals-slice";
import { useMutation } from "@tanstack/react-query";
import { addToHaveRead, addToToRead, queryClient, removeFromFavorite } from "../../util/http";


const FavoriteBooksList = (props) => {
  const dispatch = useDispatch();

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
    removeFromFavoriteMutate(props.id);
    dispatch(ModalsActions.showInteractionFeedbackRemovedModal(true));
  };

  const addToToReadHandler = () => {
    toReadMutate(bookData);
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
