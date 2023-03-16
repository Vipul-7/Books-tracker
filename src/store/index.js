import { configureStore } from "@reduxjs/toolkit";
import favoriteSlice from "./favorite-slice";
import currentReadSlice from "./current-read-slice";
import ToReadSlice from "./to-read-slice";
import haveReadSlice from "./have-read-slice";
import LoginSlice from "./login-slice";

const store = configureStore({
  reducer: {
    favorite: favoriteSlice.reducer,
    Current: currentReadSlice.reducer,
    toRead: ToReadSlice.reducer,
    haveRead: haveReadSlice.reducer,
    login: LoginSlice.reducer,
  },
});

export default store;
