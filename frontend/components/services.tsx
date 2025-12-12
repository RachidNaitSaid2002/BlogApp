"use client"

import { motion } from "framer-motion"
import { Code2, Palette, Rocket, Smartphone, Plus, ArrowUpRight, TextAlignStart, AudioLines, Link, Files } from 'lucide-react'
import { cn } from "@/lib/utils"
import { LogoCloud } from "./ui/logo-cloud-3";

const services = [
  {
    title: "Summarize Any Text",
    description:
      "Turn long text, articles, essays, or notes into clear and concise summaries in seconds.",
    icon: <TextAlignStart />,
    color: "text-blue-500",
    availableNow: (
      <>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="text-xs font-mono text-emerald-500 uppercase tracking-widest">
          Available Now
        </span>
      </>
    )
  },
  {
    title: "Summarize Audio",
    description:
      "Upload audio files and get accurate, structured summaries generated instantly.",
    icon: <AudioLines />,
    color: "text-purple-500",
    availableNow: (
      <>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
        </span>
        <span className="text-xs font-mono text-red-500 uppercase tracking-widest">
          Comming Soon
        </span>
      </>
    )
  },
  {
    title: "Summarize Files (PDF / TXT)",
    description:
      "From PDFs to text documents, SummaX extracts the essential ideas and key points for fast understanding.",
    icon: <Files />,
    color: "text-green-500",
    availableNow: (
      <>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
        </span>
        <span className="text-xs font-mono text-red-500 uppercase tracking-widest">
          Comming Soon
        </span>
      </>
    )
  },
  {
    title: "Summarize Webpages",
    description:
      "Paste a link and let SummaX read the entire webpage for you — delivering a clean, easy-to-digest summary.",
    icon: <Link />,
    color: "text-pink-500",
    availableNow: (
      <>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
        </span>
        <span className="text-xs font-mono text-red-500 uppercase tracking-widest">
          Comming Soon
        </span>
      </>
    )
  },
];

const logos = [
  {
    src: "/images/Logo/logo.png",
    alt: "Nvidia Logo",
  }, {
    src: "/images/Logo/logo.png",
    alt: "Nvidia Logo",
  }, {
    src: "/images/Logo/logo.png",
    alt: "Nvidia Logo",
  }, {
    src: "/images/Logo/logo.png",
    alt: "Nvidia Logo",
  }, {
    src: "/images/Logo/logo.png",
    alt: "Nvidia Logo",
  }, {
    src: "/images/Logo/logo.png",
    alt: "Nvidia Logo",
  }, {
    src: "/images/Logo/logo.png",
    alt: "Nvidia Logo",
  }, {
    src: "/images/Logo/logo.png",
    alt: "Nvidia Logo",
  }, {
    src: "/images/Logo/logo.png",
    alt: "Nvidia Logo",
  }, {
    src: "/images/Logo/logo.png",
    alt: "Nvidia Logo",
  }, {
    src: "/images/Logo/logo.png",
    alt: "Nvidia Logo",
  }, {
    src: "/images/Logo/logo.png",
    alt: "Nvidia Logo",
  }, {
    src: "/images/Logo/logo.png",
    alt: "Nvidia Logo",
  }, {
    src: "/images/Logo/logo.png",
    alt: "Nvidia Logo",
  }, {
    src: "/images/Logo/logo.png",
    alt: "Nvidia Logo",
  }, {
    src: "/images/Logo/logo.png",
    alt: "Nvidia Logo",
  }, {
    src: "/images/Logo/logo.png",
    alt: "Nvidia Logo",
  },
];


// Reusable Corner Plus Component
const CornerPlus = ({ className }: { className?: string }) => (
  <Plus
    strokeWidth={2}
    className={cn("absolute w-6 h-6 text-zinc-700 transition-colors duration-300 group-hover:text-zinc-400", className)}
  />
)

export function Services() {
  return (
    <section id="services" className="py-2 bg-[#000000ff] text-white relative overflow-hidden">
      
          <div
            className="
              absolute inset-0
              bg-transparent
              bg-[linear-gradient(to_right,#80808012_3px,transparent_3px),linear-gradient(to_bottom,#80808012_3px,transparent_3px)]
              bg-[length:24px_24px,24px_24px]
            "
          />
      <LogoCloud logos={logos} />

      <br />
      <br />
      <br />
      <br />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="mb-20 max-w-2xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 tracking-tight"
          >
            What We Do
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: "100px" }}
            viewport={{ once: true }}
            className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-6"
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-zinc-400 text-lg"
          >
            We turn complexity into clarity with AI-powered summarization across formats.
          </motion.p>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative"
            >
              {/* Card Container */}
              <div className="relative h-full bg-zinc-900/50 border border-zinc-800 p-8 md:p-12 backdrop-blur-sm transition-colors duration-500 hover:bg-zinc-900/80 hover:border-zinc-700">

                {/* Corner Markers */}
                <CornerPlus className="-top-3 -left-3" />
                <CornerPlus className="-top-3 -right-3" />
                <CornerPlus className="-bottom-3 -left-3" />
                <CornerPlus className="-bottom-3 -right-3" />

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-8">
                    <div className={`p-3 rounded-lg bg-zinc-900 border border-zinc-800 ${service.color}`}>
                      {service.icon}
                    </div>

                    {/* Hover Call to Action */}
                    <div className="flex items-center gap-2 opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                      <span className="text-xs font-mono text-zinc-500">EXPLORE</span>
                      <ArrowUpRight className="w-4 h-4 text-zinc-500" />
                    </div>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-zinc-100">
                    {service.title}
                  </h3>

                  <p className="text-zinc-400 leading-relaxed mb-8 flex-grow">
                    {service.description}
                  </p>

                  {/* "Available Now" Indicator - Optional: Only show on some, or keep generic */}
                  <div className="flex items-center gap-2 pt-6 border-t border-zinc-800/50 mt-auto">
                    {service.availableNow}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}