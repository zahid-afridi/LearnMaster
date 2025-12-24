"use client";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import userReducer from "./feature/userSlice";

// Combine all reducers
const rootReducer = combineReducers({
  user: userReducer,
});

//  Persist configuration
const persistConfig = {
  key: "root",
  storage,
};

//  Wrap your root reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

//  Create store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }),
});

//  Create persistor
export const persistor = persistStore(store);
