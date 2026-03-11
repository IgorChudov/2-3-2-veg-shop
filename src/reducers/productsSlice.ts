import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Product } from "../types/types";

type LoadingStatus = 'idle' | 'pending' | 'succeeded' | 'failed';

interface ProductsState {
  items: Product[];
  status: LoadingStatus;
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchProducts = createAsyncThunk<Product[]>(
  'products/fetchProducts',
  async () => {
    const response = await fetch(
      'https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json'
    );
    const data = await response.json();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return data;
  }
);

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'pending';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Ошибка при запросе на сервер'
      });
    },
  });

  export default productsSlice.reducer;