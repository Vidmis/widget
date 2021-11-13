import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Contacts {
  firstName: string;
  lastName: string;
  email: string;
}

interface Price {
  netTotal: number;
  taxes: number;
  grossTotal: number;
  currency: string;
}

interface TaxInfo {
  countryCode: string;
  rate: number;
}

interface StepState {
  products: Array<string>;
  contacts: Contacts;
  price: Price;
  taxInfo: TaxInfo;
}

const initialState: StepState = {
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
    addProduct(state, action: PayloadAction<Array<string>>) {
      state.products = action.payload;
    },
    addContacts(state, action: PayloadAction<Contacts>) {
      state.contacts = action.payload;
    },
    addTaxes(state, action: PayloadAction<TaxInfo>) {
      state.taxInfo = action.payload;
    },
    addPrice(state, action: PayloadAction<Price>) {
      state.price = action.payload;
    },
    resetValues: () => initialState,
  },
});

export const { addProduct, addContacts, addTaxes, resetValues, addPrice } =
  orderSlice.actions;
export default orderSlice.reducer;
