'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

// === Desktop Profile Menu ===
const ProfileMenuDesktop = ({ userimg }) => {
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter(); 

  const handleLogout = () => {
    alert('Logging out...');
  };

  return (
    <div className="relative pt-4 space-y-3 shrink-0">
      {/* Create Post Button (Desktop) */}
      <button
        onClick={() => router.push('/create-post')}
        className="w-full bg-black text-white font-semibold py-3 rounded-full hover:bg-gray-800 transition"
      >
        Create Post
      </button>

      {/* Profile Section */}
      <div
        className="flex items-center justify-between px-2 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 transition cursor-pointer"
        onClick={() => setShowMenu(!showMenu)}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full bg-cover bg-center shrink-0"
            style={{ backgroundImage: `url(${userimg})` }}
          ></div>
          <div className="min-w-0">
           <p
  onClick={() => router.push("/login")}
  className="font-semibold text-black dark:text-white truncate cursor-pointer hover:underline"
>
  Login
</p>

            {/* <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
              @alex_turner
            </p> */}
          </div>
        </div>
        <span className="material-symbols-outlined text-gray-500 dark:text-gray-400">
          {showMenu ? 'keyboard_arrow_down' : 'more_horiz'}
        </span>
      </div>

      {/* {showMenu && (
        <div className="absolute bottom-full left-0 right-0 mb-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-2 z-50">
          <button
            onClick={handleLogout}
            className="w-full text-left flex items-center space-x-3 px-4 py-2 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition font-medium"
          >
            <span className="material-symbols-outlined">logout</span>
            <span>Logout @alex_turner</span>
          </button>
        </div>
      )} */}
    </div>
  );
};

// === MAIN SIDEBAR COMPONENT ===
export default function SideBar({ isOpen, setIsOpen }) {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter(); // for mobile Create Post button

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const userimg =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDRB4Z4KFA6L6bE_BR2FXu5w8XM_Rv9m8bFGfMic6tpvh8pj0hzalskj-UFCm1GWpQQEmLJ_i1OthwwhduBeVgWXZOiJwIH00GhmlGcqLwJLv9XtuTOE_vmIc3kR6cbIEXAaTLfFzGvPUcUsfxB7GcVEzOU7j46X-jOqesy2eUCg4i-FlXvsyPmzB4T2LUsBHUeaG-z9ryvhJBtbIp1ZqZCaTwadc91L3APrsWae0tgHmD_zlgHu9fMLB76TyVzMRsRiQoK9pd4';

  const getLinkClasses = (path) =>
    `flex items-center space-x-3 px-4 py-3 rounded-full transition text-base ${pathname === path
      ? 'bg-gray-200 text-black font-semibold'
      : 'hover:bg-gray-100 text-gray-800 dark:text-gray-300'
    }`;

  const navLinks = (
    <nav className="flex flex-col space-y-1 py-4">
      <Link href="/" className={getLinkClasses('/')} onClick={() => setIsOpen(false)}>
        <span className="material-symbols-outlined filled">home</span>
        <span>Home</span>
      </Link>
      <Link href="/explore" className={getLinkClasses('/explore')} onClick={() => setIsOpen(false)}>
        <span className="material-symbols-outlined">explore</span>
        <span>Explore</span>
      </Link>
      <Link href="/profile" className={getLinkClasses('/profile')} onClick={() => setIsOpen(false)}>
        <span className="material-symbols-outlined">person</span>
        <span>Profile</span>
      </Link>
      <Link href="/setting" className={getLinkClasses('/setting')} onClick={() => setIsOpen(false)}>
        <span className="material-symbols-outlined">settings</span>
        <span>Settings</span>
      </Link>
      <Link href="/bookmarks" className={getLinkClasses('/bookmarks')} onClick={() => setIsOpen(false)}>
        <span className="material-symbols-outlined">bookmarks</span>
        <span>Bookmarks</span>
      </Link>
    </nav>
  );

  const logo = (
    <Link href="/" className="flex items-center space-x-2 px-3 py-4 shrink-0">
      <svg className="h-8 w-8 text-black" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0L24 24H0L12 0Z" />
      </svg>
      <h1 className="text-2xl font-bold text-black dark:text-white">LOGO</h1>
    </Link>
  );

  // === Mobile Logout Button ===
  const mobileLogoutLink = (
    <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-800 shrink-0">
      <button
        onClick={() => {
          alert('Mobile logging out...');
          setIsOpen(false);
        }}
        className="w-full flex items-center space-x-3 px-4 py-3 rounded-full transition font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
      >
        <span className="material-symbols-outlined">logout</span>
        <span>Logout</span>
      </button>
    </div>
  );

  return (
    <>
      {/* === DESKTOP SIDEBAR === */}
      {!isMobile && (
        <aside className="w-64 shrink-0 hidden lg:flex flex-col sticky top-0 h-screen px-4 border-r border-gray-200 bg-white dark:bg-gray-950">
          {logo}
          <div className="flex-1 overflow-y-auto">{navLinks}</div>
          <ProfileMenuDesktop userimg={userimg} />
        </aside>
      )}

      {/* === MOBILE SIDEBAR === */}
      {isMobile && isOpen && (
        <div className="fixed inset-0 z-50 flex" onClick={() => setIsOpen(false)}>
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
          <div
            className="relative z-50 w-72 h-full bg-white dark:bg-gray-950 flex flex-col border-r border-gray-200 dark:border-gray-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
              {logo}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 transition"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">{navLinks}</div>
            {mobileLogoutLink}
          </div>
        </div>
      )}

      {/* === MOBILE BOTTOM NAVBAR === */}
      {isMobile && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-gray-950/90 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-40 overflow-hidden">
          <div className="flex justify-around items-center px-2 py-3">
            <Link
              href="/"
              className={`flex flex-col items-center justify-center transition ${pathname === '/' ? 'text-black' : 'text-gray-600 dark:text-gray-400'
                }`}
            >
              <span className="material-symbols-outlined text-[26px]">home</span>
              <span className="text-[10px] font-medium">Home</span>
            </Link>

            <Link
              href="/explore"
              className={`flex flex-col items-center justify-center transition ${pathname === '/explore' ? 'text-black' : 'text-gray-600 dark:text-gray-400'
                }`}
            >
              <span className="material-symbols-outlined text-[26px]">explore</span>
              <span className="text-[10px] font-medium">Explore</span>
            </Link>

            {/* ✅ Mobile Create Post Button */}
            <div className="relative translate-y-1">
              <button
                onClick={() => router.push('/create-post')}
                className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center shadow-lg hover:bg-gray-800 transition"
              >
                <span className="material-symbols-outlined text-[28px]">add</span>
              </button>
            </div>

            <Link
              href="/bookmarks"
              className={`flex flex-col items-center justify-center transition ${pathname === '/bookmarks' ? 'text-black' : 'text-gray-600 dark:text-gray-400'
                }`}
            >
              <span className="material-symbols-outlined text-[26px]">bookmarks</span>
              <span className="text-[10px] font-medium">Alerts</span>
            </Link>

            <Link
              href="/profile"
              className="flex flex-col items-center justify-center text-gray-600 dark:text-gray-400 transition"
            >
              <span className="material-symbols-outlined text-[26px]">person</span>
              <span className="text-[10px] font-medium">Profile</span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
