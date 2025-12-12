"use client"

import React, { useState, useEffect } from "react"
import { Menu, X, User, LogOut, Text, AudioLines, FileText, History, Link as LinkIcon, Clock, FileTextIcon, Trash2 } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { checkAuth } from "@/lib/auth"
import Link from 'next/link'

interface Article {
    id: number
    article: string
    class_name: string
    resume: string
    ton: string
    created_at: string
    user_id: number
}

export default function HistoriquePage() {
    const router = useRouter()
    const [isAuthChecking, setIsAuthChecking] = useState(true)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [userName, setUserName] = useState("User")
    const [articles, setArticles] = useState<Article[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)

    // Get user information from localStorage
    useEffect(() => {
        const userStr = localStorage.getItem('user')
        if (userStr) {
            const user = JSON.parse(userStr)
            setUserName(user.full_name || user.username || "User")
        }
    }, [])

    // Check authentication 
    useEffect(() => {
        const verifyAuth = async () => {
            console.log('Starting auth verification...')
            const isAuthenticated = await checkAuth()
            console.log('Is authenticated:', isAuthenticated)
            if (!isAuthenticated) {
                router.push('/login')
            } else {
                console.log('Setting isAuthChecking to false')
                setIsAuthChecking(false)
                fetchHistory()
            }
        }
        verifyAuth()
    }, [])

    // Fetch history
    const fetchHistory = async () => {
        setIsLoading(true)
        try {
            const response = await fetch('http://127.0.0.1:8000/history', {
                method: 'GET',
                credentials: 'include',
            })

            if (response.ok) {
                const data = await response.json()
                console.log('Full response data:', data)
                console.log('Articles array:', data.articles)
                console.log('Articles length:', data.articles?.length)
                setArticles(data.articles || [])
                console.log('Articles state updated:', articles)
            } else {
                console.error('Failed to fetch history')
            }
        } catch (error) {
            console.error('Error fetching history:', error)
        } finally {
            setIsLoading(false)
        }
    }

    // Toggle Sidebar
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

    const Logout = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:8000/logout', {
                method: 'POST',
                credentials: 'include',
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.message);
                localStorage.removeItem('user');
                window.location.href = '/';
            } else {
                let errorMessage = 'Logout failed.';
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.detail || errorData.message || errorMessage;
                } catch (jsonError) {
                    errorMessage += ` Status: ${response.statusText}`;
                }
                console.error(errorMessage);
                alert(errorMessage);
            }
        } catch (networkError) {
            console.error('Network Error during logout:', networkError);
            alert('Could not connect to the server. Please check your connection.');
        }
    }

    // Format date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    // Show loading state while checking authentication
    console.log('Rendering... isAuthChecking:', isAuthChecking, 'articles.length:', articles.length)
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
            <div className="absolute inset-0 er-events-none" />

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
                                <Link href="/analyse" className="flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition">
                                    <Text className="w-4 h-4" />
                                    <span className="text-sm font-medium">Summarize Text</span>
                                </Link>
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
                            <Link href="/historique" className="flex justify-start px-3 py-2 bg-zinc-800/50 rounded w-full mt-2 hover:bg-zinc-800/50 transition cursor-pointer text-blue-400">
                                <span className="text-zinc-200 font-mono"><History className="text-blue-400 w-5 h-5" /></span>
                                <span className="ml-5">Historique</span>
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
            <main className="flex-grow p-6 md:p-12 h-screen">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-3">
                            <History className="w-8 h-8 text-white" />
                            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                                History
                            </h1>
                        </div>
                        <div className="h-1 w-28 bg-white rounded-full mb-4" />
                        <p className="text-zinc-400 text-sm md:text-base">View all your previous summaries and analyses.</p>
                    </div>

                    {/* Content */}
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                            <p className="text-zinc-400">Loading your history...</p>
                        </div>
                    ) : articles.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <FileTextIcon className="w-16 h-16 text-zinc-700 mb-4" />
                            <p className="text-zinc-400 text-lg mb-2">No history yet</p>
                            <p className="text-zinc-500 text-sm">Start summarizing to see your history here</p>
                            <Link href="/analyse" className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition">
                                Start Summarizing
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-4">
                            {articles.map((article: Article) => (
                                <div
                                    key={article.id}
                                    className="bg-zinc-900/60 border border-zinc-800 rounded-lg p-6 hover:border-zinc-700 transition-all cursor-pointer  max-h-96"
                                    onClick={() => setSelectedArticle(selectedArticle?.id === article.id ? null : article)}
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-medium">
                                                    {article.class_name}
                                                </span>
                                                <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs font-medium">
                                                    {article.ton}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 text-zinc-500 text-sm">
                                                <Clock className="w-4 h-4" />
                                                <span>{formatDate(article.created_at)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Expanded Content */}
                                    {article.id && (
                                        <div className="mt-4 pt-4 border-t border-zinc-800">
                                            <h3 className="text-sm font-semibold text-zinc-300 mb-2">Original Article:</h3>
                                            <div className="bg-zinc-950 rounded-lg p-4 max-h-60 overflow-y-auto">
                                                <p className="text-zinc-400 text-sm whitespace-pre-wrap">
                                                    {article.article}
                                                </p>
                                            </div>
                                            <h3 className="text-sm font-semibold text-zinc-300 mb-2 mt-4">Full Summary:</h3>
                                            <div className="bg-zinc-950 rounded-lg p-4">
                                                <p className="text-zinc-300 text-sm whitespace-pre-wrap">
                                                    {article.resume}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}
