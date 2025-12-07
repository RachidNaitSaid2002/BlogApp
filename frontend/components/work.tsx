"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Plus, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

const CornerPlus = ({ className }: { className?: string }) => (
  <Plus
    strokeWidth={2}
    className={cn("absolute w-6 h-6 text-zinc-700 transition-colors duration-300 group-hover:text-zinc-400", className)}
  />
)

const projects = [
  {
    title: "Smart Key Insights",
    category: "AI Knowledge Extraction",
    image: "/images/Features/image1.png",
    color: "from-cyan-500/20 to-blue-500/20",
    tags: ["AI", "Knowledge"],
    description: "Automatically extracts the most important ideas, facts, and takeaways—perfect for fast learning.",
    link: "/features/key-insights",
  }
  ,
  {
    title: "Tone & Style Rewriting",
    category: "Content Transformation",
    image: "/images/Features/image2.png",
    color: "from-rose-500/20 to-purple-500/20",
    tags: ["AI Writing", "Creativity"],
    description: "Transform any text into different tones—professional, friendly, academic, or simplified.",
    link: "/features/style-rewriter",
  }
  ,
  {
    title: "Compare & Merge Summaries",
    category: "AI Productivity",
    image: "/images/Features/image3.png",
    color: "from-yellow-500/20 to-orange-500/20",
    tags: ["Productivity", "AI Tools"],
    description: "Generate multiple summaries, compare them side-by-side, and merge the best parts automatically.",
    link: "/features/compare-merge",
  },
  {
    title: "Auto-Organized Study Notes",
    category: "Learning Tools",
    image: "/images/Features/image4.png",
    color: "from-green-500/20 to-lime-500/20",
    tags: ["Students", "Learning"],
    description: "Convert any content into structured study notes—headings, bullets, highlights, and quick reviews.",
    link: "/features/study-notes",
  }

]


export function Work() {
  return (
    <section id="work" className="py-24 md:py-32 bg-zinc-950 text-white overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-blue-900/10 rounded-full blur-[180px] opacity-30 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
              Unlock the Power of Our Features
            </h2>
            <p className="text-xl text-white/60 max-w-md">
              Explore the tools and capabilities designed to make your experience seamless and efficient.
            </p>
          </motion.div>
        </div>

        {/* Projects List with Alternating Layout */}
        <div className="space-y-20">
          {projects.map((project, index) => {
            const isImageFirst = index % 2 !== 0; // Alternating logic

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
              >
                <div className="relative h-full bg-zinc-900/50 border border-zinc-800 p-8 md:p-12 backdrop-blur-sm transition-colors duration-500 hover:bg-zinc-900/80 hover:border-zinc-700">

                  {/* Corner Markers */}
                  <CornerPlus className="-top-3 -left-3" />
                  <CornerPlus className="-top-3 -right-3" />
                  <CornerPlus className="-bottom-3 -left-3" />
                  <CornerPlus className="-bottom-3 -right-3" />
                  {/* NEW CARD STYLE APPLIED HERE: Replaced GlassCard */}
                  <a className="relative h-full overflow-hidden group block cursor-pointer bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm transition-colors duration-500 hover:bg-zinc-900/80 hover:border-zinc-700">

                    <div className="grid md:grid-cols-2 gap-0">
                      {/* Text Block */}
                      <div className={`p-8 md:p-12 lg:p-16 flex flex-col justify-center relative overflow-hidden ${isImageFirst ? 'md:order-2' : 'md:order-1'}`}>

                        {/* Background Gradient on Hover */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                        <div className="relative z-10">
                          <span className="text-sm font-medium text-white/50 mb-4 block uppercase tracking-wider">
                            {project.category}
                          </span>
                          <h3 className="text-4xl md:text-5xl font-bold mb-6 group-hover:translate-x-2 transition-transform duration-500">
                            {project.title}
                          </h3>
                          <p className="text-white/70 mb-8 max-w-md">
                            {project.description}
                          </p>
                          <div className="flex items-center gap-4 text-sm font-medium">
                            {project.tags?.map((tag, i) => (
                              <span key={i} className="px-4 py-2 rounded-full bg-white/5 border border-white/10">{tag}</span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Image Block */}
                      <div className={`relative h-[400px] md:h-auto overflow-hidden ${isImageFirst ? 'md:order-1' : 'md:order-2'}`}>
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                      </div>
                    </div>
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}