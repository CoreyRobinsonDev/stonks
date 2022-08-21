import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../util/types";

type SliceState = {
  loggedUser: User | null
}

const initialState: SliceState = {
  loggedUser: null
}

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      if (payload === "") {
        state.loggedUser = null;
      } else {
        state.loggedUser = payload;
      }
    },
    updateBalance: (state, { payload }) => {
      state.loggedUser!.balance! = payload;      
    }
  }
});

export const { setUser, updateBalance } = userSlice.actions;
export const userReducer = userSlice.reducer; 