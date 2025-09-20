"use client";
import React, { useState, useRef, useEffect } from "react";
import {
    Play,
    Share2,
    Folder,
    FileCode2,
    Terminal,
    Settings,
    Loader2,
    X,
} from "lucide-react";
import Editor from "@monaco-editor/react";
import { useSearchParams } from "next/navigation";

export default function Page() {
    const params = useSearchParams();
    const prefillCode = params.get("code");
    const prefillLang = params.get("lang");
    const [language, setLanguage] = useState("javascript");
    const [code, setCode] = useState(
        `// Write your code here\nconsole.log("Hello, World!");`
    );
    const [editorWidth, setEditorWidth] = useState(70);
    const [output, setOutput] = useState("");
    const [loading, setLoading] = useState(false);
    const isResizing = useRef(false);

    const startResizing = () => (isResizing.current = true);
    const stopResizing = () => (isResizing.current = false);
    const resize = (e) => {
        if (!isResizing.current) return;
        const newWidth = (e.clientX / window.innerWidth) * 100;
        if (newWidth > 20 && newWidth < 80) setEditorWidth(newWidth);
    };

    useEffect(() => {
        window.addEventListener("mousemove", resize);
        window.addEventListener("mouseup", stopResizing);
        return () => {
            window.removeEventListener("mousemove", resize);
            window.removeEventListener("mouseup", stopResizing);
        };
    }, []);

    useEffect(() => {
        if (prefillCode) {
            setCode(decodeURIComponent(prefillCode));
        }
        if (prefillLang) {
            setLanguage(prefillLang);
        }
    }, [prefillCode, prefillLang]);

    useEffect(() => {
        if (prefillCode) {
            SendCode(); // auto run when coming from lesson
        }
    }, [prefillCode]);

    const SendCode = async () => {
        try {
            setLoading(true);
            setOutput("");

            // ✅ NEW: handle HTML & CSS locally (no API call)
            if (language === "html" || language === "css") {
                const iframeContent =
                    language === "html"
                        ? code
                        : `<style>${code}</style><div>Write some HTML to see it styled</div>`;

                setOutput(
                    `<iframe style="width:100%;height:100%;border:none;" srcdoc="${iframeContent.replace(
                        /"/g,
                        "&quot;"
                    )}"></iframe>`
                );
                return;
            }

            // Map supported runtimes
            const runtimeMap = {
                javascript: {
                    language: "javascript",
                    version: "18.15.0",
                    file: "main.js",
                    run: "node main.js",
                },
                python: {
                    language: "python",
                    version: "3.10.0",
                    file: "main.py",
                    run: "python main.py",
                },
                cpp: {
                    language: "cpp",
                    version: "10.2.0",
                    file: "main.cpp",
                    run: "g++ main.cpp -o main && ./main",
                },
                java: {
                    language: "java",
                    version: "15.0.2",
                    file: "Main.java",
                    run: "java Main",
                },
                csharp: {
                    language: "csharp",
                    version: "6.12.0",
                    file: "main.cs",
                    run: "dotnet main.cs",
                },
                go: {
                    language: "go",
                    version: "1.16.2",
                    file: "main.go",
                    run: "go run main.go",
                },
                php: {
                    language: "php",
                    version: "8.2.3",
                    file: "main.php",
                    run: "php main.php",
                },
            };

            const runtime = runtimeMap[language];
            if (!runtime) {
                setOutput("❌ Unsupported language selected.");
                return;
            }

            const res = await fetch("https://emkc.org/api/v2/piston/execute", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    language: runtime.language,
                    version: runtime.version,
                    files: [{ name: runtime.file, content: code }],
                }),
            });

            const data = await res.json();

            let formatted = `$ ${runtime.run}\n\n`;
            if (data.run.stdout) formatted += `✅ ${data.run.stdout}\n`;
            if (data.run.stderr) formatted += `❌ ${data.run.stderr}\n`;
            if (data.run.code !== 0) formatted += `Exit Code: ${data.run.code}\n`;

            setOutput(formatted || "⚠️ No output.");
        } catch (error) {
            console.error("Error calling Piston:", error);
            setOutput("❌ Error: Could not execute code.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen flex flex-col bg-[#1e1e1e] text-gray-200 font-mono">
            {/* Top Navbar */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-gray-700 bg-[#252526]">
                <div className="flex items-center space-x-3">
                    <span className="font-bold text-xl text-blue-400">Learn Master</span>
                    <span className="text-sm text-gray-400">Online Editor</span>
                </div>

                <div className="flex items-center space-x-2">
                    {/* Language Selector */}
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="bg-[#1e1e1e] border border-gray-700 text-sm px-2 py-1 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                        <option value="javascript">JavaScript</option>
                        <option value="python">Python</option>
                        <option value="cpp">C++</option>
                        <option value="java">Java</option>
                        <option value="csharp">C#</option>
                        <option value="go">Go</option>
                        <option value="php">PHP</option>
                        {/* ✅ NEW */}
                        <option value="html">HTML</option>
                        <option value="css">CSS</option>
                    </select>

                    <button
                        onClick={SendCode}
                        disabled={loading}
                        className="bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded flex items-center space-x-1 disabled:opacity-50"
                    >
                        {loading ? (
                            <Loader2 size={16} className="animate-spin" />
                        ) : (
                            <Play size={16} />
                        )}
                        <span>{loading ? "Running..." : "Run"}</span>
                    </button>
                    <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded flex items-center space-x-1">
                        <Share2 size={16} />
                        <span>Share</span>
                    </button>
                </div>
            </div>

            {/* Main Section */}
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <div className="w-14 bg-[#252526] flex flex-col items-center py-4 space-y-6 border-r border-gray-700">
                    <button className="p-2 hover:bg-gray-700 rounded">
                        <Folder size={20} />
                    </button>
                    <button className="p-2 hover:bg-gray-700 rounded">
                        <FileCode2 size={20} />
                    </button>
                    <button className="p-2 hover:bg-gray-700 rounded">
                        <Terminal size={20} />
                    </button>
                    <button className="p-2 hover:bg-gray-700 rounded mt-auto">
                        <Settings size={20} />
                    </button>
                </div>

                {/* Editor + Output */}
                <div className="flex-1 flex flex-col">
                    {/* Tabs */}
                    <div className="flex items-center bg-[#2d2d2d] border-b border-gray-700 px-4 py-1 space-x-2 text-sm">
                        <div className="flex items-center bg-[#1e1e1e] px-3 py-1 rounded-t border border-b-0 border-gray-700">
                            <FileCode2 size={14} className="mr-1" />
                            <span>
                                main.
                                {language === "python"
                                    ? "py"
                                    : language === "cpp"
                                        ? "cpp"
                                        : language === "java"
                                            ? "java"
                                            : language === "csharp"
                                                ? "cs"
                                                : language === "go"
                                                    ? "go"
                                                    : language === "php"
                                                        ? "php"
                                                        : language === "html"
                                                            ? "html"
                                                            : language === "css"
                                                                ? "css"
                                                                : "js"}
                            </span>
                            <X
                                size={12}
                                className="ml-2 text-gray-500 hover:text-gray-300"
                            />
                        </div>
                    </div>

                    {/* Editor & Output Split */}
                    <div className="flex flex-1 relative">
                        {/* Editor */}
                        <div style={{ width: `${editorWidth}%` }} className="bg-[#1e1e1e]">
                            <Editor
                                height="100%"
                                language={language}
                                value={code}
                                theme="vs-dark"
                                onChange={(value) => setCode(value || "")}
                                options={{
                                    fontSize: 15,
                                    fontLigatures: true,
                                    fontFamily: "'Fira Code', 'JetBrains Mono', monospace",
                                    minimap: { enabled: true },
                                    scrollBeyondLastLine: false,
                                    automaticLayout: true,
                                }}
                            />
                        </div>

                        {/* Resizer */}
                        <div
                            onMouseDown={startResizing}
                            className="w-1 bg-gray-700 hover:bg-blue-500 cursor-col-resize transition-colors"
                        ></div>

                        {/* Output */}
                        <div className="flex-1 bg-[#111111] border-l border-gray-700 p-4 flex flex-col">
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-semibold text-gray-300">Terminal</span>
                                <button
                                    className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-sm rounded"
                                    onClick={() => setOutput("")}
                                >
                                    Clear
                                </button>
                            </div>

                            {/* ✅ NEW: render HTML/CSS preview OR plain text */}
                            <div className="flex-1 text-sm font-mono overflow-auto whitespace-pre-line bg-black p-3 rounded-lg border border-gray-700 transition-all">
                                {loading ? (
                                    <div className="flex items-center space-x-2 text-blue-400 animate-pulse">
                                        <Loader2 size={16} className="animate-spin" />
                                        <span>Running code...</span>
                                    </div>
                                ) : language === "html" || language === "css" ? (
                                    <div
                                        className="w-full h-full bg-white rounded overflow-hidden"
                                        dangerouslySetInnerHTML={{ __html: output }}
                                    />
                                ) : (
                                    output || "Run code to see output here..."
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
