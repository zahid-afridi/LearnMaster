"use client";

import { Provider } from "react-redux";
import { persistor, store } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { SessionProvider } from "next-auth/react";
import { Toaster, toast } from 'sonner'

export function Providers({ children }) {
    return (
        <SessionProvider>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Toaster position="top-right" richColors/>
                    {children}
                    
                </PersistGate>
            </Provider>
        </SessionProvider>
    );
}
