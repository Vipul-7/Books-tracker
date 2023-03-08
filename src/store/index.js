import { configureStore } from "@reduxjs/toolkit";
import favoriteSlice from "./favorite-slice";
import currentReadSlice from "./current-read-slice";

const store = configureStore({
  reducer: {
    favorite: favoriteSlice.reducer,
    Current: currentReadSlice.reducer,
  },
});

export default store;
