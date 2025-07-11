import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { ComponentConfig } from "../types/config";
import {
  fetchComponentConfig,
  updateComponentConfig,
} from "../services/config";

interface ConfigState {
  config: ComponentConfig[];
  loading: boolean;
  error: string | null;
  sectionCount: number;
  curretSection?: number;
}

const initialState: ConfigState = {
  config: [],
  loading: false,
  error: null,
  sectionCount: 1,
};

export const fetchConfig = createAsyncThunk("config/fetch", async () => {
  return fetchComponentConfig();
});

export const updateConfigThunk = createAsyncThunk(
  "config/update",
  async (updatedConfig: ComponentConfig[]) => {
    await updateComponentConfig(updatedConfig);
  }
);

const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setConfig(state, action: PayloadAction<ComponentConfig[]>) {
      state.config = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConfig.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConfig.fulfilled, (state, action) => {
        state.loading = false;
        state.config = action.payload;
        state.sectionCount = Math.max(
          ...action.payload.map((c: { section: number }) => c.section)
        );
      })
      .addCase(fetchConfig.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch config";
      })
      .addCase(updateConfigThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateConfigThunk.fulfilled, (state, action) => {
        state.config = action.meta.arg;
        state.sectionCount = Math.max(
          ...action.meta.arg.map((c: { section: number }) => c.section)
        );
        state.loading = false;
        state.error = null;
      })
      .addCase(updateConfigThunk.rejected, (state) => {
        state.error = "Failed to update config";
      });
  },
});

export const { setConfig } = configSlice.actions;
export default configSlice.reducer;
