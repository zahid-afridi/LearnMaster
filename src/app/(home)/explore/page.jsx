'use client';
import React from 'react';

export default function Page() {
  const dumayimg =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAVcHCfSSjnBRI1tlf0XXUm2hqnelgO-teHMaW0i3Cjegvjl9yOpX57dlrEWAoTQ09gRnDhxFdDcHY-DemI4lsSjNvEXyoMLf8dCckSnXZXKS-ZV2013jIU852AWKgikg8pGQu-yRPP71DZFoGHiJ89zxVdZ_mtOFboYkuJw9qtZTfuKOuDtjZMRvGL7duc9GfrYNQmcEc1UCHvCMmhuxoxb76mlcKLGh4UtbIqRJcSHU_uognxtYdoCtDEIZ9uFa6BjLbEqgsT';

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950">
      <main className="flex-1 px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8 mb-16 lg:mb-0">
        {/* ===== Header Section ===== */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h1 className="text-slate-900 dark:text-white text-3xl sm:text-4xl font-bold tracking-tight">
            Explore
          </h1>
          <div className="relative w-full sm:max-w-xs">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-500 dark:text-slate-400">
              <svg
                fill="currentColor"
                height="20"
                viewBox="0 0 256 256"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
              </svg>
            </div>
            <input
              className="w-full h-10 sm:h-11 rounded-full border border-slate-200 dark:border-slate-800 bg-background-light dark:bg-background-dark pl-10 pr-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="Search blogs, authors, tags..."
            />
          </div>
        </div>

        <div className="flex flex-col gap-12">
          {/* ===== Trending Blogs ===== */}
          <section>
            <h2 className="text-slate-900 dark:text-white text-xl sm:text-2xl font-bold tracking-tight mb-4 px-2 sm:px-0">
              Trending Blogs
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex flex-col gap-4 rounded-lg bg-white dark:bg-slate-900/50 shadow-md hover:shadow-xl transition-shadow duration-300 p-4 group cursor-pointer"
                >
                  <div
                    className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg overflow-hidden"
                    style={{ backgroundImage: `url(${dumayimg})` }}
                  ></div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                      The Future of Urban Design
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                      A look at how cities are evolving with technology and
                      sustainability. We explore smart cities, green
                      infrastructure, and community-centric planning.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mt-auto pt-2 border-t border-slate-200 dark:border-slate-800">
                    <div
                      className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-6 h-6"
                      style={{ backgroundImage: `url(${dumayimg})` }}
                    ></div>
                    <span>Ethan Carter</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ===== Popular Authors ===== */}
          <section>
            <h2 className="text-slate-900 dark:text-white text-xl sm:text-2xl font-bold tracking-tight mb-4 px-2 sm:px-0">
              Popular Authors
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-3 p-4 rounded-lg bg-white dark:bg-slate-900/50 shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer group text-center"
                >
                  <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-20 h-20 sm:w-24 sm:h-24 group-hover:scale-105 transition-transform duration-300 ring-2 ring-offset-2 ring-offset-background-light dark:ring-offset-slate-900/50 ring-primary/50"
                    style={{ backgroundImage: `url(${dumayimg})` }}
                  ></div>
                  <div>
                    <p className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                      Author Name
                    </p>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                      10k followers
                    </p>
                  </div>
                  <button className="px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-primary text-white hover:bg-primary/90 transition-colors mt-2">
                    Follow
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* ===== Suggested Tags ===== */}
          <section className="w-full px-4 sm:px-0 mb-6">
            <h2 className="text-slate-900 dark:text-white text-base sm:text-2xl font-semibold tracking-tight mb-4 text-center sm:text-left">
              Suggested Tags
            </h2>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4">
              {[
                '#Technology',
                '#Design',
                '#Art',
                '#Travel',
                '#Health',
                '#Education',
                '#Coding',
                '#WebDevelopment',
                '#Nature',
                '#AI',
                '#Motivation',
              ].map((tag, i) => (
                <button
                  key={i}
                  className={`w-full px-3 py-2 rounded-full text-sm sm:text-base font-medium transition-colors duration-200 ${i === 1
                    ? 'bg-primary text-white hover:bg-primary/90'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-primary/10 hover:text-primary'
                    }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
