"use client"

import { motion } from "framer-motion"
import { Lock, User, Mail, ArrowRight } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Code2, Palette, Rocket, Smartphone, Plus, ArrowUpRight, TextAlignStart, AudioLines, Files } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/navigation"

const InputField = ({ icon, placeholder, value, onChange, type }: { icon: React.ReactNode, placeholder: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, type: string }) => (
  <div className="relative w-full mb-6">
    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
      {icon}
    </div>
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg py-3 pl-10 pr-4 text-zinc-100 placeholder-zinc-500 backdrop-blur-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
    />
  </div>
)

const CornerPlus = ({ className }: { className?: string }) => (
  <Plus
    strokeWidth={3}
    className={cn("absolute w-7 h-7 text-zinc-700 transition-colors duration-300 group-hover:text-zinc-400", className)}
  />
)

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('http://127.0.0.1:8000/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        hashed_password: password,
      }),
    });

    const data = await response.json();
    setMessage(data.message);

    if (response.ok) {
      // Store user information in localStorage
      localStorage.setItem('user', JSON.stringify({
        user_id: data.user_id,
        username: data.username,
        full_name: data.full_name,
        email: data.email
      }));

      router.push('/analyse');
    } else {
      console.log('Login failed');
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-black text-white py-24 px-6 flex col flex-col col gap-8 relative overflow-hidden">
      {/* Background Grid */}
      <div
        className="
          absolute inset-0
          bg-transparent
          bg-[linear-gradient(to_right,#80808012_3px,transparent_3px),linear-gradient(to_bottom,#80808012_3px,transparent_3px)]
          bg-[length:24px_24px,24px_24px]
          [animation:flicker_5s_ease-in-out_infinite]
        "
      />

      <Link href="/" className="text-2xl font-bold tracking-tighter relative z-50">
        <Image
          src="/images/Logo/logo.png"
          alt="Logo"
          width={180}
          height={40}
        />
      </Link>


      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md bg-zinc-900/50 border border-zinc-800  p-10 backdrop-blur-sm shadow-lg"
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
          Welcome Back
        </motion.h2>


        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-zinc-400 mb-8"
        >
          Log in to access your AI-powered dashboard and start summarizing instantly.
        </motion.p>

        {/* Form */}
        <form className="flex flex-col" onSubmit={handleLogin}>
          <InputField icon={<User className="w-5 h-5" />} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} type="text" />
          <InputField icon={<Lock className="w-5 h-5" />} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 transition text-white font-semibold py-3 rounded-lg mt-2 cursor-pointer"
            type="submit"
          >
            Log In <ArrowRight className="w-5 h-5" />
          </motion.button>
          {message && <p className="mt-4 text-center text-white-500">{message}</p>}
        </form>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 text-zinc-400 text-sm flex justify-between"
        >
          <span>Already have an account?</span>
          <Link href="/signup" className="text-blue-500 cursor-pointer hover:underline">
            Sign Up
          </Link>
        </motion.div>
      </motion.div>

    </section>
  )
}
