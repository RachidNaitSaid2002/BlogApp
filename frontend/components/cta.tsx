
import { Plus, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

const CornerPlus = ({ className }: { className?: string }) => (
  <Plus
    strokeWidth={2}
    className={cn("absolute w-6 h-6 text-zinc-500 transition-colors duration-300 group-hover:text-zinc-900", className)}
  />
)

export function Cta() {
  return (
    <section id="contact" className="py-32 bg-zinc-950">
      <div className="container mx-auto px-6 text-center relative z-10">
        <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
          Ready to Take the <br />
          <span className="text-gradient">Leap?</span>
        </h2>
        <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto">
          Don’t wait to experience the future! Join thousands who are already making life easier, faster, and smarter. One click is all it takes to start your journey.
        </p>
        <Link href="/signup" target="_blank" className="relative bg-zinc-900/50 border border-zinc-800 px-6 py-3 backdrop-blur-sm transition-colors duration-500 hover:bg-zinc-900/80 hover:border-zinc-700">
          {/* Corner Markers */}
          <CornerPlus className="-top-3 -left-3" />
          <CornerPlus className="-top-3 -right-3" />
          <CornerPlus className="-bottom-3 -left-3" />
          <CornerPlus className="-bottom-3 -right-3" />
          Get Started Now
        </Link>
      </div>

    </section>
  )
}