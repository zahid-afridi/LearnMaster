import { createSlice } from "@reduxjs/toolkit";

const CourseMetaSlice = createSlice({
    name: "courseMeta",
    initialState: {
        course: null,
        courseLoading: false,
        courseError: null,
    },
    reducers: {
        setCourseMeta: (state, action) => {
            state.course = action.payload;
        },
        setCourseLoading: (state, action) => {
            state.courseLoading = action.payload;
        },
        setCourseError: (state, action) => {
            state.courseError = action.payload;
        },
    },
});

export const { setCourseMeta, setCourseLoading, setCourseError } =
    CourseMetaSlice.actions;

export default CourseMetaSlice.reducer;
