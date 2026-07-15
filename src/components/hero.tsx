import { useI18n } from '../lib/i18n'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ArrowRight } from 'lucide-react'


const STATS = [
  { value: '1M+', label: 'Abone' },
  { value: '25+', label_key: 'stat_deneyim' },
  { value: '7/24', label: 'Acil Hat 187' },
]

export function Hero({ className }: { className?: string }) {
  const { t } = useI18n()
  const root = useRef<HTMLElement>(null)
  const field = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-hero]', { y: 30, opacity: 0, duration: 1, ease: 'power3.out', stagger: 0.08, delay: 0.15 })

      const host = field.current
      if (host) {
        const colors = ['#5ac4e6', '#7cb037', '#2aa5cd']
        for (let i = 0; i < 22; i++) {
          const p = document.createElement('span')
          p.className = 'particle'
          const size = gsap.utils.random(3, 8)
          p.style.width = `${size}px`
          p.style.height = `${size}px`
          p.style.left = `${gsap.utils.random(0, 100)}%`
          p.style.top = `${gsap.utils.random(0, 100)}%`
          p.style.background = colors[i % colors.length]
          p.style.opacity = `${gsap.utils.random(0.18, 0.55)}`
          host.appendChild(p)
          gsap.to(p, {
            y: gsap.utils.random(-80, 80), x: gsap.utils.random(-50, 50),
            opacity: gsap.utils.random(0.1, 0.6),
            duration: gsap.utils.random(3, 6), ease: 'power1.inOut',
            repeat: -1, yoyo: true, delay: gsap.utils.random(0, 3),
          })
        }
      }
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} id="top" className="hero-light-bg relative flex min-h-[100dvh] items-center overflow-hidden pt-28">
      {/* soft network */}
      <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full opacity-60">
        {[['18%','32%'],['40%','22%'],['62%','40%'],['80%','26%'],['30%','62%'],['72%','68%']].map(([cx,cy],i)=>(
          <circle key={i} cx={cx} cy={cy} r="4" fill={i%2?'#5ac4e6':'#7cb037'} className="node-glow" style={{animationDelay:`${i*0.5}s`}}/>
        ))}
      </svg>
      <div ref={field} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden" />

      <div className="relative z-10 mx-auto grid w-full max-w-[100rem] items-center gap-12 px-6 pb-16 pt-12">
        <div>
          <span data-hero className="mb-7 inline-flex items-center gap-2 rounded-full border border-sky/40 bg-white/80 px-5 py-2 text-sm font-semibold uppercase tracking-widest text-sky-deep shadow-sm backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald pulse-dot" />
            DoÄŸal Gaz UygarlÄ±ÄŸÄ±
          </span>
          <h1 className="font-heading text-5xl font-extrabold leading-[1.02] tracking-tight text-navy sm:text-6xl md:text-7xl">
            <span data-hero className="block">Ä°zmir'in enerjisi,</span>
            <span data-hero className="block font-serif text-6xl font-light italic sm:text-7xl md:text-8xl">
              <span className="text-gradient">gÃ¼vencesi.</span>
            </span>
          </h1>
          <p data-hero className="mt-7 max-w-xl text-xl leading-relaxed text-slate">
            Bir milyondan fazla hanenin doÄŸal gaz hizmetini gÃ¼venle, kesintisiz ve sÃ¼rdÃ¼rÃ¼lebilir biÃ§imde saÄŸlÄ±yoruz.
          </p>
          <div data-hero className="mt-9 flex flex-wrap items-center gap-4">
            <a href="#get-started" className="magnetic-btn group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-deep to-sky px-8 py-4 text-base font-bold text-white shadow-xl shadow-sky-deep/30">
              Abone Ol
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#features" className="magnetic-btn inline-flex items-center gap-2 rounded-full border-2 border-navy/15 bg-white px-8 py-4 text-base font-bold text-navy hover:border-sky">
              Hizmetleri Ä°ncele
            </a>
          </div>
          <div data-hero className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-navy/10 pt-6">
            {STATS.map(s=>(
              <div key={s.label} className="flex items-baseline gap-2">
                <span className="font-mono text-3xl font-bold text-navy">{s.value}</span>
                <span className="text-base text-slate">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  )
}
