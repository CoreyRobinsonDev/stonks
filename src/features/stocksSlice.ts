import { createSlice } from "@reduxjs/toolkit";
import { GroupedDailyBars } from "../util/types";


type SliceState = {
  groupedDailyBars: GroupedDailyBars | null
}

const initialState: SliceState = {
  groupedDailyBars: null
}

const stocksSlice = createSlice({
  name: "stocksSlice",
  initialState,
  reducers: {
    setGroupedDailyBars: (state, { payload }) => {
      state.groupedDailyBars = payload;
    }
  }
});

export const { setGroupedDailyBars } = stocksSlice.actions;
export const stocksReducer = stocksSlice.reducer; 