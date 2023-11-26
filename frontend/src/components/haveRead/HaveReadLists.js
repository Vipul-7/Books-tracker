import { useDispatch } from "react-redux";
import CompletedBookCard from "../UI/CompletedBookCard";
import { ModalsActions } from "../../store/modals-slice";
import { queryClient, removeFromHaveRead } from "../../util/http";
import { useMutation } from "@tanstack/react-query";

const HaveReadLists = (props) => {
  const dispatch = useDispatch();

  const { mutate: removeFromHaveReadMutate } = useMutation({
    mutationFn: removeFromHaveRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["haveRead"] });
    }
  })

  const removeFromCompletedHandler = async () => {
    removeFromHaveReadMutate(props.id);
    dispatch(ModalsActions.showInteractionFeedbackRemovedModal(true));
  };

  return (
    <div>
      <CompletedBookCard
        removeFromCompletedHandler={removeFromCompletedHandler}
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
    </div>
  );
};

export default HaveReadLists;
