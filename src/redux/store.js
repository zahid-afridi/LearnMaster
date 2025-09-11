import { configureStore, combineReducers } from "@reduxjs/toolkit";
import ShowLogin from "./slices/course/ShowLogin";
import courseReducer from "./slices/course/courseSlice";

// Combine reducers (in case you add more later)
const rootReducer = combineReducers({
    course: courseReducer,
    showLogin: ShowLogin,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
