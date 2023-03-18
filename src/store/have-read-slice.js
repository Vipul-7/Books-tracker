import { createSlice } from "@reduxjs/toolkit";

const haveReadSlice = createSlice({
  name: "Have-Read",
  initialState: {
    completedBooks: [],
  },
  reducers: {
    addToCompleted(state, action) {
      const newBook = action.payload;
      const isExist = state.completedBooks.find(
        (item) => item.id === newBook.id
      );

      if (!isExist) {
        state.completedBooks.push({
          id: newBook.id,
          image: newBook.image,
          title: newBook.title,
          authors: newBook.authors, //aray
          categories: newBook.categories, //aray
          language: newBook.language,
          pages: newBook.pages,
          description: newBook.description,
        });
      }
    },

    removeFromCompleted(state, action) {
      const id = action.payload;
      state.completedBooks = state.completedBooks.filter(
        (item) => item.id !== id
      );
    },
  },
});

export const haveReadActions = haveReadSlice.actions;
export default haveReadSlice;
