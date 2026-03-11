import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../reducers/cartSlice";
import productsReducer from "../reducers/productsSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;