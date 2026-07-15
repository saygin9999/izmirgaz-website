// src/components/get-started.tsx
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Phone } from 'lucide-react'
import { api, type Settings } from '../lib/api'
import { useI18n } from '../lib/i18n'

gsap.registerPlugin(ScrollTrigger)

export function GetStarted({ className }: { className?: string }) {
  const { t, lang } = useI18n()
  const root = useRef<HTMLElement>(null)
  const [settings, setSettings] = useState<Settings>({})

  useEffect(() => {
    api.getSettings().then(setSettings).catch(() => {})
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-cta]', { y: 40, opacity: 0, duration: 1, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: root.current, start: 'top 75%' } })
    }, root)
    return () => ctx.revert()
  }, [])

  const title = lang === 'en' ? t('getstarted_title') : (settings['getstarted_title'] || 'Hemen abone olun, enerjiniz güvencede.')
  const cta1 = lang === 'en' ? 'Subscribe Now' : (settings['getstarted_cta1'] || 'Abone Ol')
  const cta1href = settings['getstarted_cta1_href'] || '#protocol'
  const cta2 = lang === 'en' ? '187 Emergency' : (settings['getstarted_cta2'] || '187 Acil Hat')
  const cta2href = settings['getstarted_cta2_href'] || 'tel:187'
  const bottom = lang === 'en' ? (t('footer_cagri') + ': 0850 222 3335') : (settings['getstarted_bottom'] || 'Sorularınız mı var? Çağrı Merkezi: 0850 222 3335')

  return (
    <section ref={root} id="get-started" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <div className="relative overflow-hidden rounded-[3rem] border-2 border-sky/30 bg-gradient-to-br from-sky-deep via-sky to-sky-soft px-6 py-20 text-center md:px-16 shadow-2xl shadow-sky-deep/30">
        <div className="absolute inset-x-0 top-0 h-1.5 bg-white/40" />
        <h2 data-cta className="mx-auto max-w-3xl font-heading text-5xl font-bold leading-tight tracking-tight text-white md:text-6xl">
          {title}
        </h2>
        <div data-cta className="mt-10 flex flex-wrap justify-center gap-4">
          <a href={cta1href} className="magnetic-btn group inline-flex items-center gap-2 rounded-full bg-white px-10 py-5 text-lg font-bold text-sky-deep shadow-xl">
            {cta1} <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
          </a>
          <a href={cta2href} className="magnetic-btn inline-flex items-center gap-2 rounded-full border-2 border-white/60 bg-white/10 px-10 py-5 text-lg font-bold text-white backdrop-blur hover:bg-white/20">
            <Phone size={18} /> {cta2}
          </a>
        </div>
        <p data-cta className="mt-8 text-lg text-white/90">{bottom}</p>
      </div>
    </section>
  )
}
