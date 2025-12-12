"use client"

import React, { useState, useMemo, useEffect } from "react"
import { Plus, Trash2, Copy, Menu, X, Sparkles, FileText, Zap, Check, User, LogOut, Text, AudioLines, Link as LinkIcon, History } from "lucide-react"
import Image from "next/image"
import ThinkingSwitch from "@/components/ui/switch"
import { useRouter } from "next/navigation"
import { checkAuth } from "@/lib/auth"
import Link from 'next/link';


export default function SummarizePage() {
    const router = useRouter()
    const [isAuthChecking, setIsAuthChecking] = useState(true)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [Creativity, setCreativity] = useState(40)
    const [Thinking, setThinking] = useState(false)
    const [InputText, setInputText] = useState("")
    const [OutputText, setOutputText] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [class_name, setClass_name] = useState("")
    const [ton, setTon] = useState("")
    const [userName, setUserName] = useState("User")

    // Get user information from localStorage
    useEffect(() => {
        const userStr = localStorage.getItem('user')
        if (userStr) {
            const user = JSON.parse(userStr)
            setUserName(user.full_name || user.username || "User")
        }
    }, [])

    // Check authentication on mount
    useEffect(() => {
        const verifyAuth = async () => {
            const isAuthenticated = await checkAuth()
            if (!isAuthenticated) {
                router.push('/login')
            } else {
                setIsAuthChecking(false)
            }
        }
        verifyAuth()
    }, [router])

    // Calculate Temperateur and Thing
    const Temperateur = ((Creativity / 5) / 10).toFixed(1)
    const Thing = Thinking ? 0 : 1

    // Clear Input and Output
    const Clear = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setInputText("");
    }

    // Word Counter
    const WordsCounter = (text: string) => {
        return text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
    }

    useEffect(() => {
        if (InputText.length === 0) {
            setOutputText("");
        }
    })

    const CopieText = (e: React.FormEvent<HTMLButtonElement>) => {
        navigator.clipboard.writeText(OutputText);
    }


    // Toggle Sidebar
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

    const SubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        setIsLoading(true)
        e.preventDefault();
        const Data = {
            "article": InputText,
            "Creativite_level": Temperateur,
            "Thinking": Thing
        }

        const response = await fetch('http://127.0.0.1:8000/Summary', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Data),

        })


        const result = await response.json();
        if (response.ok) {
            setIsLoading(false);
            console.log(" Summary Response : ", result);
            setOutputText(result.resume);
            console.log(" Summary : ", OutputText);
            setClass_name(result.class_name);
            setTon(result.ton);
        } else {
            setOutputText("An error occurred while generating the summary.");
            console.error("Error generating summary:", result);
            setIsLoading(false);
        }

    }


    const Logout = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:8000/logout', {
                method: 'POST',
                credentials: 'include',
            });

            if (response.ok) {
                // Logout successful (HTTP 200)
                const data = await response.json();
                console.log(data.message);
                // Clear user data from localStorage
                localStorage.removeItem('user');
                window.location.href = '/';
            } else {
                // Logout failed due to a server-side issue (e.g., 400, 500)
                let errorMessage = 'Logout failed.';
                try {
                    // Try to get a specific error message from the response body
                    const errorData = await response.json();
                    errorMessage = errorData.detail || errorData.message || errorMessage;
                } catch (jsonError) {
                    // If the response is not JSON, use the status text
                    errorMessage += ` Status: ${response.statusText}`;
                }
                console.error(errorMessage);
                alert(errorMessage); // Notify the user
            }
        } catch (networkError) {
            // Handle network issues (server is unreachable)
            console.error('Network Error during logout:', networkError);
            alert('Could not connect to the server. Please check your connection.');
        }
    }

    // Show loading state while checking authentication
    if (isAuthChecking) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-zinc-400">Verifying authentication...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex bg-zinc-950 text-white relative overflow-hidden">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-black er-events-none" />

            {/* Sidebar Toggle - Always visible on mobile */}
            <button
                onClick={toggleSidebar}
                className="fixed top-4 left-4 z-50 p-3 md:hidden bg-blue-600 backdrop-blur-sm rounded-lg shadow-lg hover:bg-blue-700 transition-all border border-blue-500"
                aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
                {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Overlay for mobile sidebar */}
            {isSidebarOpen && (
                <div
                    onClick={toggleSidebar}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
                />
            )}

            {/* Sidebar */}
            <aside className={`w-64 border-r border-zinc-800/50 bg-[#0e0e10] backdrop-blur-sm flex-shrink-0 p-6 pt-6 z-40 transition-transform duration-300 ease-in-out
                    md:static  md:translate-x-0  h-screen
                    ${isSidebarOpen ? 'fixed top-0 left-0 h-full translate-x-0' : 'fixed top-0 left-0  -translate-x-full md:translate-x-0'}`}>
                <div className="space-y-6 flex flex-col gap-8 justify-between h-full">
                    <div>
                        <Image
                            src="/images/Logo/logo.png"
                            alt="Logo"
                            width={140}
                            height={40}
                            className="mb-15"
                        />
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-zinc-800/50 text-blue-400 hover:bg-zinc-800 transition">
                                    <Text className="w-4 h-4" />
                                    <span className="text-sm font-medium">Summarize Text</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition">
                                    <FileText className="w-4 h-4" />
                                    <span className="text-sm">Summarize Files</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition">
                                    <AudioLines className="w-4 h-4" />
                                    <span className="text-sm">Summarize Audio</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition">
                                    <LinkIcon className="w-4 h-4" />
                                    <span className="text-sm">Summarize Webpages</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">Quick LINKS</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-start px-3 py-2 bg-zinc-800/30 rounded">
                                <span className="text-zinc-200 font-mono"><User className="text-zinc-500 w-5 h-5" /></span>
                                <span className="text-zinc-400 ml-5">{userName}</span>
                            </div>
                            <Link href="/historique" className="flex justify-start px-3 py-2 bg-zinc-800/30 rounded w-full mt-2 hover:bg-zinc-800/50 transition cursor-pointer">
                                <span className="text-zinc-200 font-mono"><History className="text-zinc-500 w-5 h-5" /></span>
                                <span className="text-zinc-400 ml-5">Historique</span>
                            </Link>
                            <button onClick={Logout} className="flex justify-start px-3 py-2 bg-zinc-800/30 rounded w-full mt-2 hover:bg-zinc-800/50 transition cursor-pointer">
                                <span className="text-zinc-200 font-mono"><LogOut className="text-zinc-500 w-5 h-5" /></span>
                                <span className="text-zinc-400 ml-5">Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow flex items-center justify-center   overflow-auto ">
                <div className=" w-full md:max-w-8xl">
                    <div className="relative  p-6  h-screen  space-y-8">

                        {/* Header */}
                        <div className="mb-8 mt-12">
                            <div className="flex items-center gap-3 mb-3">
                                <Text className="w-8 h-8 text-white" />
                                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                                    Summarize Text
                                </h1>
                            </div>
                            <div className="h-1 w-28 bg-white rounded-full mb-4" />
                            <p className="text-zinc-400 text-sm md:text-base">Transform lengthy content into clear, concise summaries with AI-powered extraction.</p>
                        </div>

                        {/* Content Grid */}
                        <form onSubmit={SubmitHandler} className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                            {/* Input Section */}
                            <div className="space-y-4">
                                <div>
                                    <div className="flex items-start justify-between mb-2">
                                        <label className="text-sm font-medium text-zinc-300 mb-2 block">Input Text</label>
                                        <button
                                            onClick={Clear}
                                            className="flex items-center gap-2 bg-zinc-800 mb-2 hover:bg-zinc-700 disabled:bg-zinc-800/50 text-zinc-200 disabled:text-zinc-500 py-2 px-3 rounded-lg border border-zinc-700 transition-all disabled:cursor-not-allowed text-xs font-medium cursor-pointer"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            Clear
                                        </button>
                                    </div>

                                    <textarea
                                        placeholder="Paste or type your text here... The more content you provide, the better the summary will be."
                                        className="w-full min-h-[280px] max-h-[520px] resize-y bg-zinc-900/60 border border-zinc-700 rounded-lg p-4 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm leading-relaxed"
                                        value={InputText}
                                        onChange={(e) => setInputText(e.target.value)}
                                    />
                                    <div className="flex items-center justify-between mt-2 text-xs">
                                        <span className="text-zinc-400 font-mono">{WordsCounter(InputText)} words · {InputText.length} chars</span>
                                    </div>
                                </div>

                                {/* Controls */}
                                <div className="space-y-4  rounded-lg p-4">
                                    <div className="flex items-center justify-between gap-6 w-full">
                                        <div>
                                            <div className="flex items-center justify-between mb-2">
                                                <label className="text-xs font-medium text-zinc-300">Creativity</label>
                                                <span className="text-xs font-mono text-blue-400">{Creativity}%</span>
                                            </div>
                                            <input
                                                value={Creativity}
                                                onChange={(e) => setCreativity(Number(e.target.value))}
                                                type="range"
                                                min="0"
                                                max="100"
                                                className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                                            />
                                            <p className="text-xs text-zinc-500 mt-1">Higher values create more concise, creative summaries</p>
                                        </div>
                                        <div className="flex justify-end">
                                            <div>
                                                <label className="text-xs font-medium text-zinc-300 mb-2 block">Thinking</label>
                                                <ThinkingSwitch setIsThinking={setThinking} isThinking={Thinking} />
                                                <p className="text-xs text-zinc-500 mt-1">Controls the depth and detail of the summary</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Output Section */}
                            <div className="space-y-4">
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                        <label className="text-sm font-medium text-zinc-300 block">Summary Output</label>
                                        <p className="text-xs text-zinc-500 mt-1">Your generated summary appears here</p>
                                    </div>


                                    <button
                                        className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 disabled:bg-zinc-800/50 text-zinc-200 disabled:text-zinc-500 py-2 px-3 rounded-lg border border-zinc-700 transition-all disabled:cursor-not-allowed text-xs font-medium"
                                        title="Copy summary"
                                    >
                                        <Copy className="w-4 h-4" />
                                        Copy
                                    </button>
                                </div>

                                <div className="min-h-[280px] max-h-[520px] overflow-auto bg-zinc-900/60 border border-zinc-700 rounded-lg p-4 text-sm leading-relaxed flex items-center justify-center">

                                    <div className="flex flex-col items-center justify-center h-full  ">
                                        {OutputText ? (
                                            <p className="text-zinc-200 text-lg whitespace-pre-line">{OutputText}</p>
                                        ) : isLoading ? (
                                            <>
                                                <FileText className="w-12 h-12 text-zinc-700 mb-3" />
                                                <p className="text-zinc-500 text-sm">Generating your summary...</p>
                                            </>
                                        ) : (
                                            <>
                                                <FileText className="w-12 h-12 text-zinc-700 mb-3" />
                                                <p className="text-zinc-500 text-sm">Your summary will appear here</p>
                                                <p className="text-zinc-600 text-xs mt-1">Click "Summarize" to generate</p>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-4 rounded-lg">
                                    {/* Action Buttons */}
                                    <div className="flex items-center gap-3 flex-wrap">
                                        {isLoading ? (
                                            <button type="submit" disabled className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 disabled:from-zinc-700 disabled:to-zinc-700 text-white font-semibold py-2.5 px-5 rounded-lg transition-all disabled:cursor-not-allowed shadow-lg shadow-blue-500/20 disabled:shadow-none cursor-not-allowed">
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                Pleas Wait
                                            </button>

                                        ) : (
                                            <button type="submit" className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 disabled:from-zinc-700 disabled:to-zinc-700 text-white font-semibold py-2.5 px-5 rounded-lg transition-all disabled:cursor-not-allowed shadow-lg shadow-blue-500/20 disabled:shadow-none cursor-pointer">
                                                <Sparkles className="w-4 h-4" />
                                                Summarize
                                            </button>
                                        )}
                                    </div>
                                    {/* Summary Info */}
                                    {OutputText && !isLoading && (
                                        <div className="text-md text-zinc-500 mt-7 space-y-1">
                                            <p>Summary Tone: <span className="text-zinc-400 font-mono ">{ton}</span></p>
                                            <p>Class Name: <span className="text-zinc-400 font-mono">{class_name}</span></p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    )
}