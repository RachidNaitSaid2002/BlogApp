"use client";

import Image from "next/image";
import { useEffect } from "react";
import Link from "next/link";
import { renderCanvas, ShineBorder, TypeWriter } from "@/components/ui/hero-designali";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils"

// --- Helper Component ---
// Defines the technical 'crop mark' Plus icon (required for the requested style)
// Reusable Corner Plus Component
const CornerPlus = ({ className }: { className?: string }) => (
  <Plus
    strokeWidth={2}
    className={cn("absolute w-6 h-6 text-zinc-500 transition-colors duration-300 group-hover:text-zinc-400", className)}
  />
)

export const Hero = () => {
  const talkAbout = [
    "articles",
    "reports",
    "research papers",
    "documents",
    "notes",
    "webpages",
    "audio files",
  ];

  useEffect(() => {
    renderCanvas();
  }, []);

  return (
    <main className="overflow-hidden bg-zinc-950">
      <section id="home" className="relative flex min-h-screen w-full flex-col items-center justify-center py-20">
        {/* Content Container */}
        <div className="flex flex-col items-center justify-center px-6 text-center z-10">
          <div className="mb-6 sm:justify-center md:mb-4">
            <div className="relative flex items-center rounded-full border px-3 py-1 text-xs text-primary/60">
              Introducing Dicons.
              <Link
                href="/products/dicons"
                rel="noreferrer"
                className="ml-1 flex items-center font-semibold"
              >
                <div
                  className="absolute inset-0 hover:font-semibold hover:text-ali flex"
                  aria-hidden="true"
                />
                Explore <span aria-hidden="true"></span>
              </Link>
            </div>
          </div>

          <div className="mx-auto max-w-5xl">
            <div className="relative bg-zinc-900/50 border border-zinc-800 p-8 md:p-12 backdrop-blur-sm transition-colors duration-500 hover:bg-zinc-900/80 hover:border-zinc-700 border-text-red-500 relative mx-auto h-full  border py-12 p-6 [mask-image:radial-gradient(800rem_96rem_at_center,white,transparent)]">
              <h1 className="flex flex-col text-center text-5xl font-semibold leading-none tracking-tight md:flex-col md:text-8xl lg:flex-row lg:text-8xl">
                <Plus
                  strokeWidth={4}
                  className="text-text-red-500 absolute -left-5 -top-5 h-10 w-10"
                />
                <Plus
                  strokeWidth={4}
                  className="text-text-red-500 absolute -bottom-5 -left-5 h-10 w-10"
                />
                <Plus
                  strokeWidth={4}
                  className="text-text-red-500 absolute -right-5 -top-5 h-10 w-10"
                />
                <Plus
                  strokeWidth={4}
                  className="text-text-red-500 absolute -bottom-5 -right-5 h-10 w-10"
                />
                <span>
                  Instant, Smart Summaries. Powered by{" "}
                  <span className="text-red-500">SummaX.</span>
                </span>
              </h1>
              <div className="flex items-center mt-4 justify-center gap-1">
                <span className="relative flex h-3 w-3 items-center justify-center">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                </span>
                <p className="text-xs text-green-500">Try It Now !!</p>
              </div>
            </div>

            <p className="text-primary/60 py-4">
              Stop drowning in text. SummaX transforms .{"  "}

              <span className="text-red-500 font-semibold">
                <TypeWriter strings={talkAbout} />
              </span>
              <br />
              into clear, concise insights — in seconds

            </p>
            <div className="mt-10">
              <Link href="/signup" target="_blank" className="relative bg-zinc-900/50 border border-zinc-800 px-6 py-3 backdrop-blur-sm transition-colors duration-500 hover:bg-zinc-900/80 hover:border-zinc-700">
                {/* Corner Markers */}
                <CornerPlus className="-top-3 -left-3" />
                <CornerPlus className="-top-3 -right-3" />
                <CornerPlus className="-bottom-3 -left-3" />
                <CornerPlus className="-bottom-3 -right-3" />
                Get Started Now
              </Link>
            </div>
          </div>
        </div>

        {/* Canvas Background - ensure it sits behind content */}
        <canvas
          className="pointer-events-none absolute inset-0 mx-auto"
          id="canvas"
        ></canvas>
      </section>
    </main>
  );
};