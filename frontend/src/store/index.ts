import { configureStore } from "@reduxjs/toolkit";
import configReducer from "../slices/configSlice";
import userReducer from "../slices/userSlice";

const store = configureStore({
  reducer: {
    admin: configReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
