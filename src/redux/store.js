"use client";
import { configureStore } from "@reduxjs/toolkit";
// import your reducers here, for example:
import userReducer from "./feature/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
