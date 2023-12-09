import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";

const initialState = {
  URL: "",
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setURL: (state, action: PayloadAction<string>) => {
      state.URL = action.payload;
    },
  },
});

export const { setURL } = appSlice.actions;

export const store = configureStore({
  reducer: {
    user: appSlice.reducer,
  },
});

const state = store.getState();
export type AppState = typeof state;
