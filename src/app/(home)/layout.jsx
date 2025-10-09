'use client';
import { useState } from 'react';
import SideBar from "../components/SideBar"; // Assuming the path is correct
import Link from 'next/link';

// Component for the mobile header (contains the profile click area)
const NavBarMobile = ({ onProfileClick, userimg }) => (
    <header className="sticky top-0 z-20 h-14 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 lg:hidden px-4 flex items-center justify-between">
        {/* Profile Picture (Top-Left) to open sidebar */}
        <button onClick={onProfileClick} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition">
            <div
                className="w-8 h-8 rounded-full bg-cover bg-center"
                style={{ backgroundImage: `url(${userimg})` }}
            ></div>
        </button>

        {/* Logo (Center) */}
        <Link href="/" className="flex items-center justify-center flex-1">
            <svg
                className="h-6 w-6 text-primary"
                fill="currentColor"
                viewBox="0 0 24 24"
            >
                <path d="M12 0L24 24H0L12 0Z" />
            </svg>
        </Link>

        {/* Placeholder for optional right content (e.g., a search icon) */}
        <div className="w-8 h-8"></div>
    </header>
);

export default function Layout({ children }) {
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    const userimg = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRB4Z4KFA6L6bE_BR2FXu5w8XM_Rv9m8bFGfMic6tpvh8pj0hzalskj-UFCm1GWpQQEmLJ_i1OthwwhduBeVgWXZOiJwIH00GhmlGcqLwJLv9XtuTOE_vmIc3kR6cbIEXAaTLfFzGvPUcUsfxB7GcVEzOU7j46X-jOqesy2eUCg4i-FlXvsyPmzB4T2LUsBHUeaG-z9ryvhJBtbIp1ZqZCaTwadc91L3APrsWae0tgHmD_zlgHu9fMLB76TyVzMRsRiQoK9pd4';

    return (
        <div className="flex min-h-screen bg-white dark:bg-gray-950">
            {/* The main sidebar (handles both desktop and mobile overlay) */}
            <SideBar isOpen={isSideBarOpen} setIsOpen={setIsSideBarOpen} />

            <div className="flex-1 flex flex-col min-w-0">
                {/* Mobile Navigation Bar */}
                <NavBarMobile
                    onProfileClick={() => setIsSideBarOpen(true)}
                    userimg={userimg}
                />

                {/* Main content area */}
                <main className="flex-1 min-w-0">
                    {children}
                </main>
            </div>
        </div>
    );
}