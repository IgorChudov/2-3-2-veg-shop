import type { RootState } from "../store/store";
import type { CartItem } from '../types/types';

export const selectCartItems = (state: RootState): CartItem[] => state.cart.items;

export const selectTotalCount = (state: RootState): number => state.cart.items.reduce((sum, item) => sum + item.quantity, 0);

export const selectTotalPrice = (state: RootState): number => state.cart.items.reduce((sum, item) => sum + item.quantity * item.price, 0);

export const selectProductInCart = (productId: number) => (state: RootState): CartItem | undefined => state.cart.items.find((item) => item.id === productId);

export const selectPopupOpened = (state: RootState): boolean => state.cart.popupOpened;

export const selectProductQuantity = (productId: number) => (state: RootState): number => state.cart.productQuantities[productId] ?? 1;