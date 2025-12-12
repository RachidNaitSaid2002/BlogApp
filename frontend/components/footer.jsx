import Link from "next/link"
import { Github, Twitter, Instagram, Linkedin } from 'lucide-react'
import Image from "next/image"

export function Footer() {
  return (
    <footer className="relative bg-zinc-800/80 pt-20 pb-12 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div>
            <Link href="/" className="text-2xl font-bold tracking-tighter relative z-50">
              <Image
                src="/images/Logo/logo.png"
                alt="Logo"
                width={120}
                height={40}
              />
            </Link>
            <br />
            <p className="text-white/50 leading-relaxed">
              Crafting digital experiences that merge art, technology, and human connection.
            </p>
          </div>

          <div>

          </div>

          <div>

          </div>

          <div>
            <h4 className="font-semibold mb-6">Sitemap</h4>
            <ul className="space-y-4 text-white/60">
              <li><Link href="#work" className="hover:text-white transition-colors">Why We</Link></li>
              <li><Link href="#services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link href="#about" className="hover:text-white transition-colors">About</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 text-sm text-white/40">
          <p>&copy; 2025 LBERMAJI.</p>
          {/* <div className="flex items-center gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div> */}
        </div>
      </div>
    </footer>
  )
}
