import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { CartState, Product } from '../types/types';

const initialState: CartState = {
  items: [],
  popupOpened: false,
  productQuantities: {},
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ product: Product; quantity: number }>) => {
      const { product, quantity } = action.payload;
      const existing = state.items.find((item) => item.id === product.id);
      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({ ...product, quantity });
      }
    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity -= 1;
        if (item.quantity === 0) {
          state.items = state.items.filter((i) => i.id !== action.payload);
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    togglePopup: (state) => {
      state.popupOpened = !state.popupOpened;
    },
    openPopup: (state) => {
      state.popupOpened = true;
    },
    closePopup: (state) => {
      state.popupOpened = false;
    },
    setProductQuantity: (state, action: PayloadAction<{ productId: number; quantity: number }>) => {
      const { productId, quantity } = action.payload;
      state.productQuantities[productId] = Math.max(1, quantity);
    },
    resetProductQuantity: (state, action: PayloadAction<number>) => {
      delete state.productQuantities[action.payload];
    },
  },
});

export const { addToCart, increaseQuantity, decreaseQuantity, clearCart, togglePopup, openPopup, closePopup, setProductQuantity, resetProductQuantity } = cartSlice.actions;
export default cartSlice.reducer;