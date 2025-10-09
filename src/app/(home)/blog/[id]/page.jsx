"use client";

import React from "react";
import { FaHeart, FaLightbulb, FaShareAlt } from "react-icons/fa";

const POST_DATA = {
    title: "Python's Journey: From ABC to AI Dominance",
    authorName: "Guido van Developer",
    authorUsername: "@guido_dev",
    timeAgo: "1 day ago",
    avatarUrl: "https://i.pravatar.cc/150?img=68",
    coverImageUrl: "https://picsum.photos/1200/600?random=105",
    likes: 450,
    commentsCount: 72,
    readTime: "10 min read",
};

const TopReactionsBar = ({ likes, commentsCount }) => (
    <div className="sticky top-0 z-40 bg-white/70 dark:bg-gray-900/80 backdrop-blur-md flex items-center justify-between px-4 py-3 border-y border-slate-200 dark:border-gray-700">
        <div className="flex items-center gap-5">
            <button className="group flex items-center gap-2 text-red-500 hover:text-red-600 transition">
                <FaHeart className="text-lg group-hover:scale-110 transition-transform" />
                <span className="font-semibold text-base">{likes}</span>
            </button>

            <a
                href="#comments"
                className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition"
            >
                <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 12.76c0 1.634.123 3.253.357 4.831a2.2 2.2 0 002.394 1.831l1.583-.56c.715.275 1.545.38 2.454.38h4.51c1.282 0 2.484-.46 3.42-1.258l2.25-1.936a.75.75 0 00.12-.497V7.81c0-1.298-1.054-2.352-2.352-2.352h-11.43c-1.306 0-2.352 1.054-2.352 2.352v4.95z"
                    />
                </svg>
                <span className="text-sm">{commentsCount} Comments</span>
            </a>
        </div>

        <button className="text-slate-500 hover:text-green-600 transition">
            <FaShareAlt className="text-lg" />
        </button>
    </div>
);

export default function SinglePostPage() {
    const {
        title,
        authorName,
        authorUsername,
        timeAgo,
        avatarUrl,
        coverImageUrl,
        likes,
        commentsCount,
        readTime,
    } = POST_DATA;

    return (
        <div className="bg-white dark:bg-gray-900 min-h-screen text-slate-900 dark:text-white font-serif">
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <article className="space-y-10">
                    {/* === TITLE + AUTHOR === */}
                    <section className="space-y-6 text-center">
                        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight">
                            {title}
                        </h1>
                        <div className="flex flex-wrap items-center justify-center gap-3 border-y border-slate-200 dark:border-gray-700 py-3">
                            <img
                                src={avatarUrl}
                                alt="author"
                                className="h-12 w-12 rounded-full object-cover border-2"
                            />
                            <div>
                                <p className="font-bold">{authorName}</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    {authorUsername} · {timeAgo} · {readTime}
                                </p>
                            </div>
                            <button className="rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white hover:bg-blue-700 transition ml-3">
                                Follow
                            </button>
                        </div>
                    </section>

                    {/* === REACTIONS === */}
                    <TopReactionsBar likes={likes} commentsCount={commentsCount} />

                    {/* === FEATURED IMAGE === */}
                    {coverImageUrl && (
                        <figure>
                            <img
                                src={coverImageUrl}
                                alt="cover"
                                className="w-full max-h-[500px] object-cover rounded-xl shadow-md border border-slate-200 dark:border-gray-800"
                            />
                            <figcaption className="mt-2 text-center text-sm italic text-slate-500 dark:text-slate-400">
                                The simple syntax that started a revolution.
                            </figcaption>
                        </figure>
                    )}

                    {/* === MAIN CONTENT === */}
                    <div className="prose prose-lg dark:prose-invert max-w-none leading-relaxed">
                        <h2>The Genesis: Guido van Rossum’s Christmas Project</h2>
                        <p>
                            In the late 1980s, a Dutch programmer named Guido van Rossum was tired of
                            the clunky, verbose languages of his era. During one quiet Christmas
                            vacation, he decided to build something new — a clean, readable, and
                            enjoyable scripting language. What started as a hobby soon became one of
                            the most transformative inventions in programming history.
                        </p>
                        <p>
                            Guido wanted simplicity without sacrificing power. He borrowed ideas
                            from the ABC programming language but added flexibility and
                            extensibility. He called it <strong>Python</strong> — not after the
                            snake, but after his favorite comedy show,
                            <em> Monty Python’s Flying Circus</em>.
                        </p>

                        <pre className="rounded-lg bg-slate-800/90 p-4 text-sm text-white overflow-auto">
                            <code>{`import this
# Beautiful is better than ugly.
# Simple is better than complex.
# Readability counts.`}</code>
                        </pre>

                        <p>
                            Those words — the Zen of Python — became the philosophy that guides
                            developers to this day. Python wasn’t just a programming language; it
                            was a mindset.
                        </p>

                        <h2>The Great Divide: Python 2 vs. 3</h2>
                        <p>
                            Every revolution faces its crossroads, and Python’s came with the
                            infamous split between Python 2 and Python 3. Many developers resisted
                            the change, fearing that upgrading would break their codebases. Yet,
                            Guido knew evolution was necessary.
                        </p>

                        <ul>
                            <li><code>print</code> is now a function — improving consistency.</li>
                            <li>Unicode became the default, enabling true globalization.</li>
                            <li>Integer division was corrected for mathematical accuracy.</li>
                        </ul>

                        <p>
                            These changes modernized Python, paving the way for its future dominance
                            in emerging fields like data analysis, web frameworks, and machine
                            learning.
                        </p>

                        <figure>
                            <img
                                src="https://picsum.photos/800/400?random=106"
                                alt="diagram"
                                className="w-full rounded-xl shadow-md border border-slate-200 dark:border-gray-800"
                            />
                            <figcaption className="mt-2 text-center text-sm italic text-slate-500 dark:text-slate-400">
                                Python’s ecosystem today spans web development, AI, cloud computing,
                                and even quantum research.
                            </figcaption>
                        </figure>

                        <h2>Modern Renaissance: Data Science and AI</h2>
                        <p>
                            The 2010s marked Python’s rise as the <strong>language of the AI era</strong>.
                            Frameworks like TensorFlow, PyTorch, and Pandas turned it into the
                            backbone of artificial intelligence. From Tesla’s autopilot to Google’s
                            search algorithms, Python became the hidden force behind innovation.
                        </p>
                        <p>
                            Its charm lies in simplicity — a beginner can learn it in days, yet an
                            expert can craft systems that run billion-dollar companies. That rare
                            balance is what makes Python truly timeless.
                        </p>

                        <h2>The Future: Beyond Code</h2>
                        <p>
                            Python is no longer just a tool — it’s a community, a philosophy, and a
                            bridge between humans and machines. As AI evolves, Python stands at the
                            center, teaching us that code doesn’t need to be complex to be powerful.
                            Its story reminds developers that elegance, readability, and
                            collaboration will always outlast complexity.
                        </p>
                        <blockquote>
                            “Python isn’t just a language — it’s the art of making complexity
                            disappear.” — Unknown
                        </blockquote>
                    </div>

                    {/* === ACTIONS === */}
                    <div className="flex flex-wrap items-center gap-3 border-y border-slate-200 dark:border-slate-800 py-4 justify-center">
                        <button className="group flex items-center gap-2 px-4 py-1.5 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-full transition">
                            <FaHeart className="text-lg" />
                            <span className="font-semibold text-sm">{likes} Likes</span>
                        </button>

                        <button className="flex items-center gap-2 px-4 py-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700/50 rounded-full transition">
                            <FaLightbulb className="text-lg" />
                            <span className="font-semibold text-sm">128 Insights</span>
                        </button>

                        <button className="flex items-center gap-2 px-4 py-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700/50 rounded-full transition">
                            <FaShareAlt className="text-lg" />
                            <span className="font-semibold text-sm">Share</span>
                        </button>
                    </div>

                    {/* === COMMENTS === */}
                    <section id="comments" className="pt-8">
                        <h2 className="text-2xl font-bold border-b-2 border-blue-600 inline-block pb-1">
                            Discussion ({commentsCount})
                        </h2>

                        <div className="mt-4 border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-slate-50 dark:bg-gray-800 shadow-sm">
                            <textarea
                                className="w-full p-2 bg-transparent border-none focus:ring-0 text-sm resize-none placeholder:text-slate-400"
                                rows="3"
                                placeholder="Join the discussion..."
                            ></textarea>
                            <div className="flex justify-end mt-2">
                                <button className="rounded-full bg-blue-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-blue-700 transition">
                                    Post Comment
                                </button>
                            </div>
                        </div>

                        {/* === SAMPLE COMMENTS === */}
                        <div className="mt-6 space-y-6">
                            <div className="flex gap-3 border-b border-gray-100 dark:border-gray-800 pb-6">
                                <img
                                    src="https://i.pravatar.cc/150?img=1"
                                    alt="Ethan"
                                    className="h-10 w-10 rounded-full object-cover"
                                />
                                <div className="flex-1">
                                    <div className="rounded-lg bg-slate-100 dark:bg-slate-800/80 p-3 shadow-sm">
                                        <p className="font-bold text-sm">
                                            Ethan Carter{" "}
                                            <span className="text-xs text-slate-500 ml-2">
                                                2 days ago
                                            </span>
                                        </p>
                                        <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
                                            It's fascinating how the decision to make `print` a
                                            function changed everything! I remember migrating
                                            legacy codebases, and it was a headache at first—but
                                            looking back, it made Python far more consistent.
                                        </p>
                                    </div>
                                    <div className="mt-2 flex items-center gap-3 text-xs font-semibold text-slate-500">
                                        <button className="hover:text-red-500 transition">
                                            12 Likes
                                        </button>
                                        <button className="hover:text-blue-600 transition">
                                            Reply
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 border-b border-gray-100 dark:border-gray-800 pb-6">
                                <img
                                    src="https://i.pravatar.cc/150?img=32"
                                    alt="Amelia"
                                    className="h-10 w-10 rounded-full object-cover"
                                />
                                <div className="flex-1">
                                    <div className="rounded-lg bg-slate-100 dark:bg-slate-800/80 p-3 shadow-sm">
                                        <p className="font-bold text-sm">
                                            Amelia Stone{" "}
                                            <span className="text-xs text-slate-500 ml-2">
                                                1 day ago
                                            </span>
                                        </p>
                                        <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
                                            Loved the way you connected Python’s simplicity with its
                                            dominance in AI. As a data scientist, I can’t imagine
                                            training models without Python — it’s the glue holding
                                            everything together.
                                        </p>
                                    </div>
                                    <div className="mt-2 flex items-center gap-3 text-xs font-semibold text-slate-500">
                                        <button className="hover:text-red-500 transition">
                                            21 Likes
                                        </button>
                                        <button className="hover:text-blue-600 transition">
                                            Reply
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </article>
            </main>
        </div>
    );
}
