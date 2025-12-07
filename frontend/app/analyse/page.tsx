"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Play, Trash2, Copy, LogOut, History, FileText } from "lucide-react"
import { cn } from "@/lib/utils"
import { Navbar } from "@/components/navbar"
import Link from "next/link"
import Image from "next/image"

const CornerPlus = ({ className }: { className?: string }) => (
    <Plus
        strokeWidth={3}
        className={cn("absolute w-7 h-7 text-zinc-700 transition-colors duration-300", className)}
    />
)

export default function SummarizePage() {
    const [input, setInput] = useState<string>("")
    const [output, setOutput] = useState<string>("")
    const [creativity, setCreativity] = useState<number>(40) // 0 - 100
    const [thinking, setThinking] = useState<"High" | "Medium" | "Low">("Medium")
    const [copied, setCopied] = useState<boolean>(false)

    // Naive extractive summarizer (client-side). Replace with API call if needed.
    const summarizeText = (text: string) => {
        if (!text.trim()) return ""

        // split into sentences
        const sentences = text
            .replace(/\n+/g, " ")
            .split(/(?<=[.?!])\s+/)
            .filter(s => s.trim().length > 0)

        const total = sentences.length

        // determine how many sentences to keep
        // creativity: higher -> shorter/concise (fewer sentences)
        // thinking: High -> keep more sentences (more thorough)
        const thinkingFactor = thinking === "High" ? 1.0 : thinking === "Medium" ? 0.75 : 0.5
        const baseKeep = Math.max(1, Math.ceil(total * (0.2 + (1 - creativity / 100) * 0.6) * thinkingFactor))

        // Simple scoring: prefer earlier sentences and slightly weight longer sentences
        const scored = sentences.map((s, i) => {
            const lengthScore = Math.min(1, s.split(" ").length / 40) // longer sentences get slight boost
            const positionScore = 1 - i / Math.max(1, total - 1) // earlier sentences score higher
            // creativity nudges randomness — we add a tiny variation based on creativity
            const randomness = (Math.random() - 0.5) * (1 - creativity / 150)
            return { idx: i, sentence: s, score: 0.6 * positionScore + 0.4 * lengthScore + randomness }
        })

        scored.sort((a, b) => b.score - a.score)

        const selected = scored.slice(0, baseKeep).sort((a, b) => a.idx - b.idx) // keep original order
        return selected.map(s => s.sentence).join(" ").trim()
    }

    const handleSummarize = (e?: React.FormEvent) => {
        e?.preventDefault()
        const summary = summarizeText(input)
        setOutput(summary)
        setCopied(false)
    }

    const handleClear = () => {
        setInput("")
        setOutput("")
        setCopied(false)
    }

    const handleCopy = async () => {
        if (!output) return
        try {
            await navigator.clipboard.writeText(output)
            setCopied(true)
            setTimeout(() => setCopied(false), 1500)
        } catch {
            // ignore
        }
    }

    const sentenceCount = (txt: string) =>
        txt
            .replace(/\n+/g, " ")
            .split(/(?<=[.?!])\s+/)
            .filter(Boolean).length

    return (
        
        <section className="min-h-screen flex items-center justify-center justify-center bg-zinc-950 text-white py-24 px-6 relative overflow-hidden">
                {/* subtle grid background */}
                <div
                    className="absolute inset-0 bg-transparent bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[length:24px_24px,24px_24px] pointer-events-none"
                    aria-hidden
                />

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative w-full max-w-4xl bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 md:p-10 backdrop-blur-sm shadow-lg"
                >
                    <CornerPlus className="-top-5 -left-5" />
                    <CornerPlus className="-top-5 -right-5" />
                    <CornerPlus className="-bottom-5 -left-5" />
                    <CornerPlus className="-bottom-5 -right-5" />

                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Summarize</h1>
                        <div className="h-1 w-28 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-4 mb-4" />
                        <p className="text-zinc-400">Paste or type your text, tweak model parameters, and get a clear, concise summary.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left: Input + Controls */}
                        <div>
                            <label className="text-sm text-zinc-300 mb-2 block">Input</label>
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Paste article, notes, or text to summarize..."
                                className="w-full min-h-[260px] max-h-[520px] resize-vertical bg-zinc-900/40 border border-zinc-800 rounded-lg p-4 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
                            />

                            {/* Controls */}
                            <div className="mt-4 flex flex-col gap-4">
                                <div>
                                    <label className="text-xs text-zinc-400 mb-1 block">Creativity</label>
                                    <div className="flex items-center gap-4">
                                        <input
                                            type="range"
                                            min={0}
                                            max={100}
                                            value={creativity}
                                            onChange={(e) => setCreativity(Number(e.target.value))}
                                            className="w-full accent-blue-500"
                                        />
                                        <div className="w-14 text-right text-sm font-mono text-zinc-300">{creativity}%</div>
                                    </div>
                                    <p className="text-xs text-zinc-500 mt-1">Higher values produce more concise / creative extracts.</p>
                                </div>

                                <div>
                                    <label className="text-xs text-zinc-400 mb-1 block">Thinking</label>
                                    <select
                                        value={thinking}
                                        onChange={(e) => setThinking(e.target.value as any)}
                                        className="bg-zinc-900/40 border border-zinc-800 rounded-lg py-2 px-3 text-zinc-100"
                                    >
                                        <option value="High">High — thorough</option>
                                        <option value="Medium">Medium — balanced</option>
                                        <option value="Low">Low — fast</option>
                                    </select>
                                    <p className="text-xs text-zinc-500 mt-1">Higher thinking keeps more detail and context.</p>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-3">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={handleSummarize}
                                        className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
                                    >
                                        <Play className="w-4 h-4" /> Summarize
                                    </motion.button>

                                    <button
                                        onClick={handleClear}
                                        className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 py-2 px-4 rounded-lg border border-zinc-700"
                                    >
                                        <Trash2 className="w-4 h-4" /> Clear
                                    </button>

                                    <div className="ml-auto text-xs text-zinc-400 font-mono">
                                        {input.trim() ? `${input.trim().split(/\s+/).length} words • ${sentenceCount(input)} sentences` : "0 words"}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Output */}
                        <div>
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <label className="text-sm text-zinc-300 block">Summary</label>
                                    <p className="text-xs text-zinc-500">Copy, refine, or regenerate with new parameters.</p>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={handleCopy}
                                        className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 py-2 px-3 rounded-lg border border-zinc-700"
                                        title="Copy summary"
                                    >
                                        <Copy className="w-4 h-4" />
                                        <span className="text-xs">{copied ? "Copied" : "Copy"}</span>
                                    </button>
                                </div>
                            </div>

                            <div className="min-h-[260px] max-h-[520px] overflow-auto bg-zinc-900/40 border border-zinc-800 rounded-lg p-4 text-zinc-100">
                                {output ? (
                                    <p className="leading-relaxed">{output}</p>
                                ) : (
                                    <p className="text-zinc-500">Your summary will appear here after you click “Summarize”.</p>
                                )}
                            </div>

                            <div className="mt-3 text-xs text-zinc-400 flex justify-between">
                                <div>Sentences: {output ? sentenceCount(output) : 0}</div>
                                <div>Words: {output ? (output.trim().split(/\s+/).length) : 0}</div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

    )
}
