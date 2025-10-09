'use client';
import React from 'react';

export default function Header() {
    return (
        <header className="lg:hidden fixed top-0 left-0 w-full h-16 px-4 flex items-center border-b bg-white dark:bg-gray-950 z-30">
            {/* Empty on purpose because sidebar button is injected by SideBar */}
        </header>
    );
}
