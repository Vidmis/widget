import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    products: [],
  },
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.value.products.push(action.payload);
    },
  },
});

export const { addProduct } = productsSlice.actions;
export default productsSlice.reducer;
