import { configureStore } from "@reduxjs/toolkit";
import favoritesSlice from "./features/favorite/favoriteSlice";
import cartsSlice from "./features/cart/cartSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      favorites: favoritesSlice,
      cart: cartsSlice,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
