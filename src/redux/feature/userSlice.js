"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user_id: null, // 
  name: "",
  email: "",
  password: "",
  profile_images: "", 
  bio: "",
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
    const { user_id, name, email, password, bio, profile_images } = action.payload;

      state.user_id = user_id || null; //  store user_id
      state.name = name;
      state.email = email;
      state.password = password;
       state.profile_images = profile_images || "";
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
      state.profile_images = ""; 
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
