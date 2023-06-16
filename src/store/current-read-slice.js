import { createSlice } from "@reduxjs/toolkit";

const initialState = { books: [] };

const currentReadSlice = createSlice({
  name: "current-read",
  initialState,
  reducers: {
    replaceCurrentReadBooks(state, action) {
      // this function is useful when we request to the cloud
      state.books = action.payload;
    },
    addToCurrentRead(state, action) {
      const newBook = action.payload;
      const isExist = state.books.find((item) => item.id === newBook.id);

      if (!isExist) {
        state.books.push({
          id: newBook.id,
          image: newBook.image,
          title: newBook.title,
          authors: newBook.authors, //aray
          categories: newBook.categories, //aray
          language: newBook.language,
          pages: newBook.pages,
          description: newBook.description,
          textSnippet: newBook.textSnippet,
          previewLink: newBook.previewLink,
          readPages: newBook.readPages,
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
