import { createSlice } from "@reduxjs/toolkit";

const initialState = { favBooks: [] };

const favoriteSlice = createSlice({
  name: "favorite-slice",
  initialState,
  reducers: {
    addToFavorite(state, action) {
      const newBook = action.payload;
      const isExist = state.favBooks.find((item) => item.id === newBook.id);

      if (!isExist) {
        state.favBooks.push({
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
    removeFromFavorite(state, action) {
      const id = action.payload;
      state.favBooks = state.favBooks.filter((item) => item.id !== id);
    },
  },
});

export const favActions = favoriteSlice.actions;
export default favoriteSlice;
