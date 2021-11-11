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
    addPrice(state, action: PayloadAction<number>) {
      state.price.netTotal += action.payload;
    },
    subtractPrice(state, action: PayloadAction<number>) {
      state.price.netTotal -= action.payload;
    },
    addTaxes(state, action: PayloadAction<TaxInfo>) {
      state.taxInfo = action.payload;
    },
    applyTaxes(state, action: PayloadAction<number>) {
      state.price.taxes = (action.payload * state.taxInfo?.rate) / 100;
    },
    applyPrice(state, action: PayloadAction<string>) {
      state.price.grossTotal = state.price.netTotal + state.price.taxes;
      state.price.currency = action.payload;
    },
    resetValues: () => initialState,
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
  resetValues,
} = orderSlice.actions;
export default orderSlice.reducer;
