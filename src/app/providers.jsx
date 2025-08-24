"use client"; // Required for client-side Redux

import { Provider } from "react-redux";
import { persistor, store } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";


export function Providers({ children }) {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>

            {children}
            

            </PersistGate>
        </Provider>
    )
}
