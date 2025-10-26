"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user_id: null, // add this line
  name: "",
  email: "",
  password: "",
  bio: "",
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user_id, name, email, password, bio } = action.payload;
      state.user_id = user_id || null; //  store user_id
      state.name = name;
      state.email = email;
      state.password = password;
      state.bio = bio;
      state.status = "succeeded";
      state.error = null;
    },
    clearUser: (state) => {
      state.user_id = null; //  reset here too
      state.name = "";
      state.email = "";
      state.password = "";
      state.bio = "";
      state.status = "idle";
      state.error = null;
    },
    setLoading: (state) => {
      state.status = "loading";
      state.error = null;
    },
    setError: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const { setUser, clearUser, setLoading, setError } = userSlice.actions;
export default userSlice.reducer;
