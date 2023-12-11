import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";

interface videoAnalysis {
  videoTitle: string;
  total_comments: number;
  positiveRatio: number;
  negativeRatio: number;
  positiveCount: number;
  negativeCount: number;
}

interface analysisDTO {
  analysis_results: {
    total_comments: number;
    negative_count: number;
    positive_count: number;
    negative_ratio: number;
    positive_ratio: number;
  };
  video_title: string;
}

// Async thunk for requesting an analyssi from the flask server
// given youtube URL
export const fetchAnalysisResults = createAsyncThunk<analysisDTO, string>(
  "app/fetchAnalysisResults",
  async (youtubeURL: string) => {
    try {
      const response = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ youtube_link: youtubeURL }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Fetch error: ", error);
      throw error;
    }
  }
);

const initialState = {
  URL: "",
  loading: false,
  video: {
    videoTitle: "",
    total_comments: 0,
    positiveRatio: 0,
    negativeRatio: 0,
    positiveCount: 0,
    negativeCount: 0,
  },
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setURL: (state, action: PayloadAction<string>) => {
      state.URL = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalysisResults.pending, (state) => {
        state.loading = true;
        console.log("pending");
      })
      .addCase(fetchAnalysisResults.fulfilled, (state, action) => {
        state.loading = false;
        const { analysis_results, video_title } = action.payload;

        state.video = {
          videoTitle: video_title,
          total_comments: analysis_results.total_comments,
          positiveRatio: analysis_results.positive_ratio,
          negativeRatio: analysis_results.negative_ratio,
          positiveCount: analysis_results.positive_count,
          negativeCount: analysis_results.negative_count,
        };
      })
      .addCase(fetchAnalysisResults.rejected, (state, action) => {
        state.loading = false;
        console.log("error, ", action.error);
      });
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
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { useDispatch as reduxUseDispatch } from "react-redux";
export const useDispatch = () => reduxUseDispatch<AppDispatch>();
