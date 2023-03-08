import { createSlice } from "@reduxjs/toolkit";

const initialState = { books: [] };

const currentReadSlice = createSlice({
  name: "current-read",
  initialState,
  reducers: {
    addToCurrentRead(state, action) {
      const newBook = action.payload;
      const isExist = state.books.find((item) => item.id === newBook.id);

      if (!isExist) {
        state.books.push({
          id: newBook.id,
          image: newBook.image,
          title: newBook.title,
          authors: newBook.authors,
          categories: newBook.categories,
          Totalpages: newBook.Totalpages,
        });
      }
    },
    removeFromCurrentRead(state, action) {
      const id = action.payload;
      state.books = state.books.filter((item) => item.id !== id);
    },
  },
});

export const CurrentReadActions = currentReadSlice.actions;
export default currentReadSlice;
