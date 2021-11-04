import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  contacts: {
    firstName: "",
    lastName: "",
    email: "",
  },
  price: {
    netTotal: 0,
    taxes: 0,
    grossTotal: 0,
    currency: "",
  },
  taxInfo: {
    countryCode: "",
    rate: 0,
  },
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products = action.payload;
    },
    addContacts: (state, action) => {
      state.contacts = action.payload;
    },
    addPrice: (state, action) => {
      state.price.netTotal += action.payload;
    },
    subtractPrice: (state, action) => {
      state.price.netTotal -= action.payload;
    },
    addTaxes: (state, action) => {
      state.taxInfo = action.payload;
    },
    applyTaxes: (state, action) => {
      state.price.taxes = (action.payload * state.taxInfo?.rate) / 100;
    },
    applyPrice: (state, action) => {
      state.price.grossTotal = state.price.netTotal + state.price.taxes;
      state.price.currency = action.payload;
    },
  },
});

export const {
  addProduct,
  addContacts,
  addPrice,
  subtractPrice,
  addTaxes,
  applyTaxes,
  applyPrice,
} = orderSlice.actions;
export default orderSlice.reducer;
