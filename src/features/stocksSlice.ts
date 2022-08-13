import { createSlice } from "@reduxjs/toolkit";
import { GroupedDailyBars, GroupedDailyBarsResults } from "../util/types";


type SliceState = {
  groupedDailyBars: {
    sortBy: string,
    index: number,
    all: GroupedDailyBars | null,
    limitedResults: GroupedDailyBarsResults[] | null
  } 
}

const initialState: SliceState = {
  groupedDailyBars: {
    sortBy: "ticker",
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
      state.groupedDailyBars.limitedResults = state.groupedDailyBars.all!.results.slice(0, state.groupedDailyBars.index).sort((a,b) => a.T.localeCompare(b.T))
    },
    advanceGroupedDailyBarsLimited: (state) => {
      state.groupedDailyBars.index += 100;
      state.groupedDailyBars.limitedResults = state.groupedDailyBars.all!.results.slice(0, state.groupedDailyBars.index);
    },
    sortBy: (state, {payload}) => {
      const currentSort = state.groupedDailyBars.sortBy;
      const sort = payload;

      switch (sort) {
        case "close":
          if (currentSort === "close") {
            state.groupedDailyBars.limitedResults?.sort((a, b) => b.c - a.c);
          } else {
            state.groupedDailyBars.limitedResults?.sort((a, b) => a.c - b.c);
          }
          break;
        case "open":
          if (currentSort === "open") {
            state.groupedDailyBars.limitedResults?.sort((a, b) => b.o - a.o);
          } else {
            state.groupedDailyBars.limitedResults?.sort((a, b) => a.o - b.o);
          }
          break;
        case "high":
          if (currentSort === "high") {
            state.groupedDailyBars.limitedResults?.sort((a, b) => b.h - a.h);
          } else {
            state.groupedDailyBars.limitedResults?.sort((a, b) => a.h - b.h);
          }
          break;
        case "low":
          if (currentSort === "low") {
            state.groupedDailyBars.limitedResults?.sort((a, b) => b.l - a.l);
          } else {
            state.groupedDailyBars.limitedResults?.sort((a, b) => a.l - b.l);
          }
          break;
        case "volume":
          if (currentSort === "volume") {
            state.groupedDailyBars.limitedResults?.sort((a, b) => b.v - a.v);
          } else {
            state.groupedDailyBars.limitedResults?.sort((a, b) => a.v - b.v);
          }
          break;
        case "price":
          if (currentSort === "price") {
            state.groupedDailyBars.limitedResults?.sort((a, b) => b.vw - a.vw);
          } else {
            state.groupedDailyBars.limitedResults?.sort((a, b) => a.vw - b.vw);
          }
          break;
        case "transactions":
          if (currentSort === "transactions") {
            state.groupedDailyBars.limitedResults?.sort((a, b) => b.n - a.n);
          } else {
            state.groupedDailyBars.limitedResults?.sort((a, b) => a.n - b.n);
          }
          break;
        default:
          if (currentSort === "ticker") {
            state.groupedDailyBars.limitedResults?.sort((a,b) => b.T.localeCompare(a.T));
          } else {
            state.groupedDailyBars.limitedResults?.sort((a,b) => a.T.localeCompare(b.T));
          }
      }

      state.groupedDailyBars.sortBy = sort;
    }
  }
});

export const { setGroupedDailyBars, advanceGroupedDailyBarsLimited, sortBy } = stocksSlice.actions;
export const stocksReducer = stocksSlice.reducer; 