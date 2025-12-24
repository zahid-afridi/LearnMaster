"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user_id: null,
  username: "",
  email: "",
  profile_images: "",
  bio: "",
  token: "",  // add token storage
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user_id, username, email, profile_images, bio, token } = action.payload;
      state.user_id = user_id || null;
      state.username = username || "";
      state.email = email || "";
      state.profile_images = profile_images || "";
      state.bio = bio || "";
      state.token = token || "";
      state.status = "succeeded";
      state.error = null;
    },
    clearUser: (state) => Object.assign(state, initialState),
    setLoading: (state) => { state.status = "loading"; state.error = null; },
    setError: (state, action) => { state.status = "failed"; state.error = action.payload; },
    resetStatus: (state) => { state.status = "idle"; state.error = null; },
  },
});

export const { setUser, clearUser, setLoading, setError, resetStatus } = userSlice.actions;
export default userSlice.reducer;
