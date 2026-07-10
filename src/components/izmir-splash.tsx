import { ChevronDown } from 'lucide-react'
import izmirHero from '../assets/izmir-network-hero.png.asset.json'

export function IzmirSplash() {
  return (
    <section
      id="splash"
      className="relative aspect-square w-full overflow-hidden"
      style={{
        backgroundImage: `url(${izmirHero.url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >

      <div className="absolute inset-0 bg-gradient-to-b from-navy/40 via-transparent to-navy/70" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-6 text-center text-white">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald/60 bg-white/10 px-5 py-2 text-sm font-bold uppercase tracking-[0.3em] backdrop-blur-md">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald" />
          İzmir'in Enerjisi
        </span>
        <h1 className="font-heading text-6xl font-extrabold leading-[0.95] tracking-tight drop-shadow-2xl sm:text-7xl md:text-8xl lg:text-9xl">
          İzmir<span className="font-serif italic text-emerald-glow">Gaz</span>
        </h1>
        <p className="mt-6 max-w-2xl text-xl font-medium text-white/90 drop-shadow-lg sm:text-2xl">
          Bir milyondan fazla haneye güvenle, kesintisiz doğal gaz.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a href="#top" className="rounded-full bg-emerald px-8 py-4 text-base font-bold text-white shadow-2xl shadow-emerald/40 transition-transform hover:scale-105">
            Keşfet
          </a>
          <a href="#get-started" className="rounded-full border-2 border-white/70 bg-white/10 px-8 py-4 text-base font-bold text-white backdrop-blur-md hover:bg-white hover:text-navy">
            Online Abone Ol
          </a>
        </div>
      </div>

      <a href="#top" aria-label="Aşağı kaydır" className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white/90">
        <span className="text-sm font-semibold uppercase tracking-[0.25em]">Aşağı kaydır</span>
        <ChevronDown size={28} className="animate-bounce" />
      </a>
    </section>
  )
}
