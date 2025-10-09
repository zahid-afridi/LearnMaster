"use client";
import React, { useState } from "react";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    alert("Logging out...");
  };

  return (
    <div
      className={`flex flex-col min-h-screen font-display ${
        darkMode ? "bg-[#101a22] text-white" : "bg-white text-black"
      }`}
    >
      {/* ===== Header ===== */}
      <header
        className={`flex items-center justify-between p-4 shadow-sm sticky top-0 z-10 backdrop-blur-sm ${
          darkMode ? "bg-[#101a22]/80" : "bg-white/80"
        }`}
      >
        {/* Back button only for mobile */}
        <button className="p-2 rounded-full hover:bg-blue-500/10 lg:hidden">
          <span
            className={`material-symbols-outlined ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            arrow_back
          </span>
        </button>

        <h1 className="text-xl font-bold">Settings</h1>

        <div
          className="h-10 w-10 rounded-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCmvfiUjKA2_FmI5BTd6NkxwTabDRDgi6NJt2Lh4ZeNC99XvkqPBqvJlnkHv9Fpw3c4uO5HYgBbRqiQSWqUS_JTYg8Zckj_7d59j_bdMzy6hWFGuXpVs71c2JDcYJWChHW7IcFi_ZNFgOON_N4P3vYugp8a_qATb35xUkSTHIeBg_720lrJ8xOxO7j0yXzxPN0QFCz7aE1zYFuhrg0Eniy-XosQDhz1i9lApyuK7MASzVQdo0goJVutttY73f2KUhKGXGPnKyExpxBx')",
          }}
        ></div>
      </header>

      {/* ===== Settings Sections ===== */}
      <main className="flex-1 overflow-y-auto p-4 space-y-8">
        {/* === General Section === */}
        <section>
          <h2 className="px-4 pb-2 text-sm font-semibold text-blue-500">
            General
          </h2>
          <div
            className={`space-y-1 rounded-lg shadow-sm ${
              darkMode ? "bg-[#18222c]" : "bg-white"
            }`}
          >
            {[
              { icon: "person", title: "Profile Settings" },
              { icon: "lock", title: "Account & Privacy" },
              { icon: "notifications", title: "Notifications" },
            ].map((item, i) => (
              <a
                key={i}
                href="#"
                className="flex items-center gap-4 p-4 rounded-lg hover:bg-blue-500/10 transition-colors"
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    darkMode ? "bg-blue-500/20" : "bg-blue-500/10"
                  }`}
                >
                  <span
                    className={`material-symbols-outlined ${
                      darkMode ? "text-white" : "text-black"
                    }`}
                  >
                    {item.icon}
                  </span>
                </div>
                <span className="flex-1 text-base font-medium">{item.title}</span>
                <span
                  className={`material-symbols-outlined ${
                    darkMode ? "text-gray-400" : "text-black/40"
                  }`}
                >
                  chevron_right
                </span>
              </a>
            ))}

            {/* Appearance Toggle */}
            <div className="flex items-center gap-4 p-4 rounded-lg">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${
                  darkMode ? "bg-blue-500/20" : "bg-blue-500/10"
                }`}
              >
                <span
                  className={`material-symbols-outlined ${
                    darkMode ? "text-white" : "text-black"
                  }`}
                >
                  contrast
                </span>
              </div>
              <span className="flex-1 text-base font-medium">Appearance</span>
              <label className="relative inline-block w-11 h-6">
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                  className="peer sr-only"
                />
                <span className="absolute cursor-pointer inset-0 bg-gray-300 rounded-full peer-checked:bg-blue-500 transition-all"></span>
                <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition-all"></span>
              </label>
            </div>
          </div>
        </section>

        {/* === Security Section === */}
        <section>
          <h2 className="px-4 pb-2 text-sm font-semibold text-blue-500">
            Security
          </h2>
          <div
            className={`space-y-1 rounded-lg shadow-sm ${
              darkMode ? "bg-[#18222c]" : "bg-white"
            }`}
          >
            {[
              { icon: "shield", title: "Security & Password" },
              { icon: "database", title: "Data & Storage" },
            ].map((item, i) => (
              <a
                key={i}
                href="#"
                className="flex items-center gap-4 p-4 rounded-lg hover:bg-blue-500/10 transition-colors"
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    darkMode ? "bg-blue-500/20" : "bg-blue-500/10"
                  }`}
                >
                  <span
                    className={`material-symbols-outlined ${
                      darkMode ? "text-white" : "text-black"
                    }`}
                  >
                    {item.icon}
                  </span>
                </div>
                <span className="flex-1 text-base font-medium">{item.title}</span>
                <span
                  className={`material-symbols-outlined ${
                    darkMode ? "text-gray-400" : "text-black/40"
                  }`}
                >
                  chevron_right
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* === Support Section === */}
        <section>
          <h2 className="px-4 pb-2 text-sm font-semibold text-blue-500">
            Support
          </h2>
          <div
            className={`space-y-1 rounded-lg shadow-sm ${
              darkMode ? "bg-[#18222c]" : "bg-white"
            }`}
          >
            <a
              href="#"
              className="flex items-center gap-4 p-4 rounded-lg hover:bg-blue-500/10 transition-colors"
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${
                  darkMode ? "bg-blue-500/20" : "bg-blue-500/10"
                }`}
              >
                <span
                  className={`material-symbols-outlined ${
                    darkMode ? "text-white" : "text-black"
                  }`}
                >
                  help
                </span>
              </div>
              <span className="flex-1 text-base font-medium">Help & Support</span>
              <span
                className={`material-symbols-outlined ${
                  darkMode ? "text-gray-400" : "text-black/40"
                }`}
              >
                chevron_right
              </span>
            </a>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-4 p-4 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10">
                <span className="material-symbols-outlined text-red-500">logout</span>
              </div>
              <span className=" text-base font-medium">Logout</span>
            </button>
          </div>
        </section>
      </main>

      {/* ===== Bottom Navigation (MOBILE ONLY) ===== */}
      <nav
        className={`lg:hidden sticky bottom-0 z-10 border-t backdrop-blur-sm ${
          darkMode ? "bg-[#101a22]/90 border-gray-800" : "bg-white/90 border-gray-200"
        }`}
      >
        <div className="mx-auto flex max-w-md justify-around">
          {[
            { icon: "home", label: "Home" },
            { icon: "search", label: "Explore" },
            { icon: "notifications", label: "Notifications" },
            { icon: "mail", label: "Messages" },
            { icon: "person", label: "Profile", active: true },
          ].map((item, i) => (
            <a
              key={i}
              href="#"
              className={`flex flex-1 flex-col items-center gap-1 py-2 transition-colors ${
                item.active ? "text-blue-500" : "text-gray-500 hover:text-blue-500"
              }`}
            >
              <span
                className="material-symbols-outlined"
                style={item.active ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {item.icon}
              </span>
              <span className="text-xs font-medium">{item.label}</span>
            </a>
          ))}
        </div>
      </nav>
    </div>
  );
}
