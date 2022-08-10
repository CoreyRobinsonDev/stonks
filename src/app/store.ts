import { configureStore } from "@reduxjs/toolkit";

import { userReducer } from "../features/userSlice";
import { stocksReducer } from "../features/stocksSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    stocks: stocksReducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;