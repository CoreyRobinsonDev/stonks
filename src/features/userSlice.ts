import { createSlice } from "@reduxjs/toolkit";
import { User } from "../util/types";

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
    }
  }
});

export const { setUser } = userSlice.actions;
export const userReducer = userSlice.reducer; 