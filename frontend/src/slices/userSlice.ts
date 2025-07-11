import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { login } from "../services/auth";

interface UserState {
  currentSection: number;
  token: string | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  currentSection: 0,
  token: null,
  isLoggedIn: false,
  isLoading: false,
  error: null,
};

export const handleLogin = createAsyncThunk<
  { token: string; section: number },
  { email: string; password: string },
  { rejectValue: string }
>("user/login", async ({ email, password }, thunkAPI) => {
  try {
    const response = await login(email, password);
    return response;
  } catch (err: any) {
    return thunkAPI.rejectWithValue("Login failed. Please check credentials.");
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ token: string; section: number }>
    ) => {
      state.token = action.payload.token;
      state.currentSection = action.payload.section;
      state.isLoggedIn = true;
      state.isLoading = false;
      state.error = null;
    },
    setCurrentSection: (state, action: PayloadAction<number>) => {
      state.currentSection = action.payload;
    },
    logoutUser: (state) => {
      state.token = null;
      state.currentSection = 0;
      state.isLoggedIn = false;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(handleLogin.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.currentSection = action.payload.section;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(handleLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.error = action.payload || "Unknown error occurred during login";
      });
  },
});

export const { setUser, setCurrentSection, logoutUser } = userSlice.actions;
export default userSlice.reducer;
