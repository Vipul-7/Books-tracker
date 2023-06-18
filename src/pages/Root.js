import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import LoginModal from "../components/LoginModal";
import MainNavigation from "../components/Layout/MainNavigation";
import UserLoginDetailModal from "../components/UserLoginDetailModal";
import Feedback from "../components/Feedback";
import InteractionFeedback from "../components/UI/InteractionFeedback";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ModalsActions } from "../store/modals-slice";

const RootLayout = () => {
  const dispatch = useDispatch();
  const isShowLoginModal = useSelector((state) => state.modals.isShowLogin);
  const showProfile = useSelector((state) => state.modals.showProfile);
  const showFeedbackAdded = useSelector(
    (state) => state.modals.interactionFeedbackAdded
  );
  const showFeedbackRemoved = useSelector(
    (state) => state.modals.interactionFeedbackRemoved
  );

  useEffect(() => {
    if (showFeedbackAdded) {
      setTimeout(() => {
        dispatch(ModalsActions.showInteractionFeedbackAddedModal(false));
      }, 3000);
    }
    if (showFeedbackRemoved) {
      setTimeout(() => {
        dispatch(ModalsActions.showInteractionFeedbackRemovedModal(false));
      }, 3000);
    }
  }, [showFeedbackAdded, showFeedbackRemoved]);

  return (
    <>
      {isShowLoginModal && <LoginModal />}
      {showProfile && <UserLoginDetailModal />}
      <MainNavigation />
      {showFeedbackAdded && <InteractionFeedback actionText="added" />}
      {showFeedbackRemoved && <InteractionFeedback actionText="removed" />}
      <Outlet />
      <Feedback />
      {/* <Footer/> */}
    </>
  );
};

export default RootLayout;
