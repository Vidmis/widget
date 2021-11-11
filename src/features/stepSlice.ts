import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StepState {
  value: number;
}

const initialState: StepState = { value: 0 };

export const stepSlice = createSlice({
  name: "stepCounter",
  initialState,
  reducers: {
    nextStep(state) {
      state.value++;
    },
    prevStep(state) {
      state.value--;
    },
    firstStep(state) {
      state.value = initialState.value;
    },
    chooseStep(state, action: PayloadAction<number>) {
      state.value = action.payload;
    },
  },
});

export const { nextStep, prevStep, firstStep, chooseStep } = stepSlice.actions;
export default stepSlice.reducer;
