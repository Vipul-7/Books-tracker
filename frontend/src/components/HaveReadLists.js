import { useDispatch } from "react-redux";
import { haveReadActions } from "../store/have-read-slice";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { arrayRemove, doc, getDoc, updateDoc } from "firebase/firestore";
import CompletedBookCard from "./UI/CompletedBookCard";
import { ModalsActions } from "../store/modals-slice";
import { queryClient, removeFromHaveRead } from "../util/http";
import { useMutation } from "@tanstack/react-query";

const HaveReadLists = (props) => {
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();

  const { mutate: removeFromHaveReadMutate } = useMutation({
    mutationFn: removeFromHaveRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["haveRead"] });
    }
  })

  const removeFromCompletedHandler = async () => {
    // dispatch(haveReadActions.removeFromCompleted(props.id));

    // const userRef = doc(db, "users", user.uid);
    // const userDoc = await getDoc(userRef);

    // const data = userDoc.data();
    // const index = data.haveRead.findIndex((item) => item.id === props.id);

    // await updateDoc(userRef, {
    //   haveRead: arrayRemove(data.haveRead[index]),
    // });
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