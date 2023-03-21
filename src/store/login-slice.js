import { createSlice } from "@reduxjs/toolkit";

const LoginSlice = createSlice({
  name: "login",
  initialState: {
    isShowLogin: false,
    showProfile: false,
  },
  reducers: {
    changeShowLoginModal(state) {
      state.isShowLogin = !state.isShowLogin;
    },
    showProfileModal(state) {
      state.showProfile = !state.showProfile;
    },
  },
});

export const LoginActions = LoginSlice.actions;
export default LoginSlice;
