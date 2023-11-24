import { createSlice } from "@reduxjs/toolkit";

const ModalsSlice = createSlice({
  name: "modals",
  initialState: {
    isShowLogin: false,
    showProfile: false,
    interactionFeedbackAdded: false,
    interactionFeedbackRemoved: false,
  },
  reducers: {
    changeShowLoginModal(state) {
      state.isShowLogin = !state.isShowLogin;
    },
    showProfileModal(state) {
      state.showProfile = !state.showProfile;
    },
    showInteractionFeedbackAddedModal(state) {
      state.interactionFeedbackAdded = !state.interactionFeedbackAdded;
    },
    showInteractionFeedbackRemovedModal(state) {
      state.interactionFeedbackRemoved = !state.interactionFeedbackRemoved;
    },
  },
});

export const ModalsActions = ModalsSlice.actions;
export default ModalsSlice;
