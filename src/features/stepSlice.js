import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: 0 };

export const stepSlice = createSlice({
  name: "step",
  initialState,
  reducers: {
    nextStep: (state) => {
      state.value += 1;
    },
    prevStep: (state) => {
      state.value -= 1;
    },
    firstStep: (state) => {
      state.value = initialState.value;
    },
    chooseStep: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { nextStep, prevStep, firstStep, chooseStep } = stepSlice.actions;
export default stepSlice.reducer;
