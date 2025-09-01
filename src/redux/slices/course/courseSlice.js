// slices/course/courseSlice.js
import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
    name: "course",
    initialState: {
        coursemeta: {},
        module: null,     // store selected module
        lesson: null,     // store selected lesson
        loading: false,
        error: null,
    },
    reducers: {
        setCourseMeta: (state, action) => {
            state.coursemeta = action.payload;
        },
        setModule: (state, action) => {
            state.module = action.payload;
        },
        setLesson: (state, action) => {
            state.lesson = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearCourse: (state) => {
            state.coursemeta = {};
            state.module = null;
            state.lesson = null;
        },
    },
});

export const {
    setCourseMeta,
    setModule,
    setLesson,
    setLoading,
    setError,
    clearCourse,
} = courseSlice.actions;

export default courseSlice.reducer;
