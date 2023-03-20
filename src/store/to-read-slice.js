import { createSlice } from "@reduxjs/toolkit";

const ToReadSlice = createSlice({
  name: "To-Read",
  initialState: {
    ToReadBooks: [],
  },
  reducers: {
    replaceToReadBooks(state, action) {
      // this function is useful when we request to the cloud
      state.ToReadBooks = action.payload;
    },
    addToToRead(state, action) {
      const newBook = action.payload;
      const isExist = state.ToReadBooks.find((item) => item.id === newBook.id);

      if (!isExist) {
        state.ToReadBooks.push({
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

    removeFromToRead(state, action) {
      const id = action.payload;
      state.ToReadBooks = state.ToReadBooks.filter((item) => item.id !== id);
    },
  },
});

export const ToReadActions = ToReadSlice.actions;
export default ToReadSlice;
