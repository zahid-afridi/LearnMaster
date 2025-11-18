'use client';

import React from "react";

export default function CreatePostLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-[9999]">
      <div className="w-16 h-16 border-4 border-slate-300 dark:border-slate-700 border-t-primary rounded-full animate-spin"></div>
    </div>
  );
}
