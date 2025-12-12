import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { Work } from "@/components/work"
import { Footer } from "@/components/footer"
import { Cta } from "@/components/cta"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#2e2d2d] text-white selection:bg-blue-500/30 ">
      <Navbar />
      <Hero />
      <Services />
      <Work />
      <Cta />
      <Footer />
    </main>
  )
}
