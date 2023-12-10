import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";

const initialState = {
  URL: "",
  videoTitle: "[Video Title]",
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setURL: (state, action: PayloadAction<string>) => {
      state.URL = action.payload;
    },
    setVideoTitle: (state, action: PayloadAction<string>) => {
      state.videoTitle = action.payload;
    },
  },
});

export const { setURL, setVideoTitle } = appSlice.actions;

export const store = configureStore({
  reducer: {
    user: appSlice.reducer,
  },
});

const state = store.getState();
export type AppState = typeof state;
