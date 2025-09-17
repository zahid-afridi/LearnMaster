"use client";
import React from "react";

const VideoPlayer = ({ src, alt }) => {
    console.log('src',src)
    // detect YouTube url
    const isYouTube = /youtube\.com|youtu\.be/.test(src);

    // extract YouTube video ID
    const getYouTubeId = (url) => {
        try {
            const youtubeRegex =
                /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/;
            const match = url.match(youtubeRegex);
            return match ? match[1] : null;
        } catch {
            return null;
        }
    };

    const videoId = isYouTube ? getYouTubeId(src) : null;

    return (
        <div className="my-8 flex justify-center">
            <div className="relative w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl bg-black/5 backdrop-blur-sm border border-gray-200">
                {isYouTube && videoId ? (
                    <iframe
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title={alt || "YouTube video"}
                        className="w-full aspect-video rounded-2xl"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                ) : (
                    <video
                        controls
                        className="w-full h-auto aspect-video object-contain rounded-2xl"
                        poster="/api/placeholder/800/450"
                    >
                        <source src={src} type="video/mp4" />
                        {alt || "Your browser does not support the video tag."}
                    </video>
                )}
            </div>
        </div>
    );
};

export default VideoPlayer;
