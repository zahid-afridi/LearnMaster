"use client";

import { Provider } from "react-redux";
import { persistor, store } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { SessionProvider } from "next-auth/react";
import { Toaster, toast } from 'sonner'
import LoginModal from "@/components/Login/LoginModal";

export function Providers({ children }) {
    return (
        <SessionProvider>
            <Provider store={store}>
                
                    <Toaster position="top-right" richColors/>
                    <LoginModal/>
                    {children}
                    
              
            </Provider>
        </SessionProvider>
    );
}
