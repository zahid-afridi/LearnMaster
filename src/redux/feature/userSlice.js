"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  password: "",
  bio: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { name, email, password, bio } = action.payload;
      state.name = name;
      state.email = email;
      state.password = password;
      state.bio = bio;
    },
    clearUser: (state) => {
      state.name = "";
      state.email = "";
      state.password = "";
      state.bio = "";
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
