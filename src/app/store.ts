import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "../features/orderSlice";
import stepReducer from "../features/stepSlice";

export const store = configureStore({
  reducer: {
    order: orderReducer,
    step: stepReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
