import { configureStore } from "@reduxjs/toolkit";
import ModalsSlice from "./modals-slice";

const store = configureStore({
  reducer: {
    modals: ModalsSlice.reducer,
  },
});

export default store;
