import { createSlice } from "@reduxjs/toolkit";
import { FavoriteItem } from "@/lib/utils/types";

let favs: FavoriteItem[] = [];

const favoritesSlice = createSlice({
  name: "favorite",
  initialState: {
    favorites: favs,
  },
  reducers: {
    setFavorite(state, action) {
      state.favorites = action.payload;
    },
    updateFavorites(state, action) {
      state.favorites = state.favorites.some(
        (favorite) => favorite.id === action.payload.id
      )
        ? state.favorites.filter(
            (favorite) => favorite.id !== action.payload.id
          )
        : [...state.favorites, action.payload];
      if (typeof window !== "undefined") {
        localStorage.setItem("favorites", JSON.stringify(state.favorites));
      }
    },
    removeFavorite(state, action) {
      state.favorites = state.favorites.filter(
        (favorite) => favorite.id !== Number(action.payload)
      );
      if (typeof window !== "undefined") {
        localStorage.setItem("favorites", JSON.stringify(state.favorites));
      }
    },
    initializeFavorite(state) {
      if (typeof window !== "undefined") {
        const favoriteLocal = localStorage.getItem("favorites");
        state.favorites = favoriteLocal ? JSON.parse(favoriteLocal) : [];
      }
    },
  },
});

export const {
  updateFavorites,
  removeFavorite,
  setFavorite,
  initializeFavorite,
} = favoritesSlice.actions;
export default favoritesSlice.reducer;
