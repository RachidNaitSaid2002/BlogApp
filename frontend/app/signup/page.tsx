"use client"

import { motion } from "framer-motion"
import { Lock, User, Mail, ArrowRight } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Plus } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"

const InputField = ({ icon, placeholder }: { icon: React.ReactNode, placeholder: string }) => (
  <div className="relative w-full mb-6">
    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
      {icon}
    </div>
    <input
      type="text"
      placeholder={placeholder}
      className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg py-3 pl-10 pr-4 text-zinc-100 placeholder-zinc-500 backdrop-blur-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
    />
  </div>
)

// Reusable Corner Plus Component
const CornerPlus = ({ className }: { className?: string }) => (
  <Plus
    strokeWidth={3}
    className={cn("absolute w-7 h-7 text-zinc-700 transition-colors duration-300 group-hover:text-zinc-400", className)}
  />
)

export default function SignupPage() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-black text-white py-24 px-6 flex col flex-col col gap-8 relative overflow-hidden">

      {/* Background Grid */}
      <div
        className="
          absolute inset-0
          bg-transparent
          bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)]
          bg-[length:24px_24px,24px_24px]
          [animation:flicker_5s_ease-in-out_infinite]
        "
      />

      {/* Logo */}
      <Link href="/" className="text-2xl font-bold tracking-tighter relative z-50">
        <Image
          src="/images/Logo/logo.png"
          alt="Logo"
          width={180}
          height={40}
        />
      </Link>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md bg-zinc-900/50 border border-zinc-800 p-10 backdrop-blur-sm shadow-lg"
      >
        {/* Corner Markers */}
        <CornerPlus className="-top-4 -left-4" />
        <CornerPlus className="-top-4 -right-4" />
        <CornerPlus className="-bottom-4 -left-4" />
        <CornerPlus className="-bottom-4 -right-4" />

        <br />

        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold mb-6 tracking-tight"
        >
          Create Account
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-zinc-400 mb-8"
        >
          Sign up and start summarizing anything instantly with your AI workspace.
        </motion.p>

        {/* Signup Form */}
        <form className="flex flex-col">
          <InputField icon={<User className="w-5 h-5" />} placeholder="Username" />
          <InputField icon={<User className="w-5 h-5" />} placeholder="Full Name" />
          <InputField icon={<Mail className="w-5 h-5" />} placeholder="Email Address" />
          <InputField icon={<Lock className="w-5 h-5" />} placeholder="Password" />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 transition text-white font-semibold py-3 rounded-lg mt-2"
          >
            Sign Up <ArrowRight className="w-5 h-5" />
          </motion.button>
        </form>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 text-zinc-400 text-sm flex justify-between"
        >
          <span>Already have an account?</span>
          <Link href="/login" className="text-blue-500 cursor-pointer hover:underline">
            Log In
          </Link>
        </motion.div>
      </motion.div>

    </section>
  )
}
