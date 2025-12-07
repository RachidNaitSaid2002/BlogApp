import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { Work } from "@/components/work"
import { Footer } from "@/components/footer"
import { Cta } from "@/components/cta"

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-blue-500/30 relative">
    <div
      className="
        absolute inset-0
        bg-transparent
        bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)]
        bg-[length:24px_24px,24px_24px]
        [animation:flicker_5s_ease-in-out_infinite]
      "
    />
      <Navbar />
      <Hero />
      <Services />
      <Work />
      <Cta />
      <Footer />
    </main>
  )
}
