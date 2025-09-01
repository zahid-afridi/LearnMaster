// // store.js
// import { configureStore } from "@reduxjs/toolkit";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage"; // defaults to localStorage in web
// import { combineReducers } from "redux";

// import courseMetaReducer from "./slices/course/courseSlice";

// // Combine reducers (in case you add more later)
// const rootReducer = combineReducers({
//     courseMeta: courseMetaReducer,
// });

// // Persist config
// const persistConfig = {
//     key: "root", // key for localStorage
//     storage,
//     whitelist: ["courseMeta"], // reducers you want to persist
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//     reducer: persistedReducer,
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware({
//             serializableCheck: false, // required for redux-persist
//         }),
// });

// export const persistor = persistStore(store);


// store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";

import courseReducer from "./slices/course/courseSlice";

// Combine reducers (in case you add more later)
const rootReducer = combineReducers({
    course: courseReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
