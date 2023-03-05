import { configureStore } from "@reduxjs/toolkit";
import favoriteSlice from "./favorite-slice";

const store = configureStore({
  reducer: { favorite: favoriteSlice },
});

export default store;
