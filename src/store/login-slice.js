import { createSlice } from "@reduxjs/toolkit";

const LoginSlice = createSlice({
  name: "login",
  initialState: {
    isShowLogin: false,
  },
  reducers: {
    changeShowLoginModal(state) {
      state.isShowLogin = !state.isShowLogin;
    },
  },
});

export const LoginActions = LoginSlice.actions;
export default LoginSlice
