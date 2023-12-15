import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";

interface LabelAnalysis {
  positive: number;
  negative: number;
  comments: string[];
}

interface AnalysisResults {
  total_comments: number;
  details: {
    [label: string]: LabelAnalysis;
  };
  label_comments: {
    [label: string]: string[];
  }; // Adding this line
}

interface AnalysisDTO {
  analysis_results: AnalysisResults;
  video_title: string;
}

interface LabelAnalysis {
  positive: number;
  negative: number;
  comments: string[];
}

interface VideoAnalysis {
  videoTitle: string;
  total_comments: number;
  details: {
    [label: string]: LabelAnalysis;
  };
}

// Async thunk for requesting an analyssi from the flask server
// given youtube URL
export const fetchAnalysisResults = createAsyncThunk<AnalysisDTO, string>(
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
  loading: false,
  URLError: false,
  video: {
    videoTitle: "",
    total_comments: 0,
    details: {} as { [label: string]: LabelAnalysis },
    label_comments: {} as { [label: string]: string[] },
  },
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalysisResults.pending, (state) => {
        state.URLError = false;
        state.loading = true;
      })
      .addCase(fetchAnalysisResults.fulfilled, (state, action) => {
        state.loading = false;
        const { analysis_results, video_title } = action.payload;

        state.video = {
          videoTitle: video_title,
          total_comments: analysis_results.total_comments,
          details: analysis_results.details,
          label_comments: analysis_results.label_comments,
        };
      })
      .addCase(fetchAnalysisResults.rejected, (state) => {
        state.URLError = true;
        state.loading = false;
      });
  },
});

export const {} = appSlice.actions;

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
