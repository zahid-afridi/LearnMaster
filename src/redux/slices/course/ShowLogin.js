// slices/course/courseSlice.js
import { createSlice } from "@reduxjs/toolkit";

// slices/course/courseSlice.js
const ShowLogin = createSlice({
    name: "showLogin",   // ✅ the state key will be "showLogin"
    initialState: {
        showLogin: false,
        active_Tab: "login", // "login" | "register"
    },
    reducers: {
        setShowLogin: (state, action) => {
            state.showLogin = action.payload;
        },
        setActiveTab: (state, action) => {
            state.active_Tab = action.payload;
        }
    },
});


export const { setShowLogin,setActiveTab } = ShowLogin.actions;
export default ShowLogin.reducer;

