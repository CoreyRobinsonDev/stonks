import { createSlice } from "@reduxjs/toolkit";
import { GroupedDailyBarsResults } from "../../util/types";


type SliceState = {
  groupedDailyBars: {
    sortBy: string,
    index: number,
    all: GroupedDailyBarsResults[] | null,
    limitedResults: GroupedDailyBarsResults[] | null
  } 
}

const initialState: SliceState = {
  groupedDailyBars: {
    sortBy: "",
    index: 100,
    all: null,
    limitedResults: null
  }
}

const stocksSlice = createSlice({
  name: "stocksSlice",
  initialState,
  reducers: {
    setGroupedDailyBars: (state, { payload }) => {
      state.groupedDailyBars.all = payload;
      state.groupedDailyBars.limitedResults = payload.slice(0, state.groupedDailyBars.index);
    },
    advanceGroupedDailyBarsLimited: (state) => {
      state.groupedDailyBars.index += 100;
      state.groupedDailyBars.limitedResults = state.groupedDailyBars.all!.slice(0, state.groupedDailyBars.index);
    },
    sortBy: (state, {payload}) => {
      const currentSort = state.groupedDailyBars.sortBy;
      const sort = payload;

      switch (sort) {
        case "close":
          if (currentSort === "close") {
            state.groupedDailyBars.limitedResults?.sort((a, b) => b.close - a.close);
          } else {
            state.groupedDailyBars.limitedResults?.sort((a, b) => a.close - b.close);
          }
          break;
        case "open":
          if (currentSort === "open") {
            state.groupedDailyBars.limitedResults?.sort((a, b) => b.open - a.open);
          } else {
            state.groupedDailyBars.limitedResults?.sort((a, b) => a.open - b.open);
          }
          break;
        case "high":
          if (currentSort === "high") {
            state.groupedDailyBars.limitedResults?.sort((a, b) => b.high - a.high);
          } else {
            state.groupedDailyBars.limitedResults?.sort((a, b) => a.high - b.high);
          }
          break;
        case "low":
          if (currentSort === "low") {
            state.groupedDailyBars.limitedResults?.sort((a, b) => b.low - a.low);
          } else {
            state.groupedDailyBars.limitedResults?.sort((a, b) => a.low - b.low);
          }
          break;
        case "volume":
          if (currentSort === "volume") {
            state.groupedDailyBars.limitedResults?.sort((a, b) => b.volume - a.volume);
          } else {
            state.groupedDailyBars.limitedResults?.sort((a, b) => a.volume - b.volume);
          }
          break;
        case "price":
          if (currentSort === "price") {
            state.groupedDailyBars.limitedResults?.sort((a, b) => b.volume_weighted_price - a.volume_weighted_price);
          } else {
            state.groupedDailyBars.limitedResults?.sort((a, b) => a.volume_weighted_price - b.volume_weighted_price);
          }
          break;
        case "transactions":
          if (currentSort === "transactions") {
            state.groupedDailyBars.limitedResults?.sort((a, b) => b.num_transactions - a.num_transactions);
          } else {
            state.groupedDailyBars.limitedResults?.sort((a, b) => a.num_transactions - b.num_transactions);
          }
          break;
        default:
          if (currentSort === "ticker") {
            state.groupedDailyBars.limitedResults?.sort((a,b) => b.symbol.localeCompare(a.symbol));
          } else {
            state.groupedDailyBars.limitedResults?.sort((a,b) => a.symbol.localeCompare(b.symbol));
          }
      }

      state.groupedDailyBars.sortBy = sort;
    }
  }
});

export const { setGroupedDailyBars, advanceGroupedDailyBarsLimited, sortBy } = stocksSlice.actions;
export const stocksReducer = stocksSlice.reducer; 