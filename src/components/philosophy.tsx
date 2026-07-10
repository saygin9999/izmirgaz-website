import { useI18n } from '../lib/i18n'
// src/components/philosophy.tsx
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { api, type Settings } from '../lib/api'

gsap.registerPlugin(ScrollTrigger)

export function Philosophy() {
  const { lang } = useI18n()
  const root = useRef<HTMLElement>(null)
  const [settings, setSettings] = useState<Settings>({})

  useEffect(() => {
    api.getSettings().then(setSettings).catch(() => {})
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-line]', { y: 30, opacity: 0, duration: 1, ease: 'power3.out', stagger: 0.12,
        scrollTrigger: { trigger: root.current, start: 'top 70%' } })
    }, root)
    return () => ctx.revert()
  }, [])

  const label = lang === 'en' ? (settings['philosophy_label_en'] || 'Corporate Manifesto') : (settings['philosophy_label'] || 'Kurumsal Manifesto')
  const pre = lang === 'en' ? (settings['philosophy_pre_en'] || 'Most energy companies prioritize: speed.') : (settings['philosophy_pre'] || 'Çoğu enerji şirketi önceliği şuna verir: hız.')
  const title = lang === 'en' ? (settings['philosophy_title_en'] || 'We prioritize: safety and transparency.') : (settings['philosophy_title'] || 'Biz önceliği şuna veriyoruz: güvenlik ve şeffaflık.')

  return (
    <section ref={root} id="philosophy" className="relative overflow-hidden bg-gradient-to-br from-mist via-white to-sky-soft/30 py-28 md:py-40">
      <svg aria-hidden viewBox="0 0 800 600" className="pointer-events-none absolute inset-0 h-full w-full opacity-30">
        <defs>
          <radialGradient id="ph-g" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#5ac4e6" stopOpacity=".6" />
            <stop offset="100%" stopColor="#5ac4e6" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="200" cy="200" r="180" fill="url(#ph-g)" />
        <circle cx="600" cy="400" r="220" fill="url(#ph-g)" />
      </svg>
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <span data-line className="font-mono text-sm font-bold uppercase tracking-widest text-sky-deep">{label}</span>
        <p data-line className="mt-8 text-xl font-light leading-relaxed text-slate md:text-2xl">{pre}</p>
        <h2 data-line className="mt-5 text-balance font-serif text-5xl font-light italic leading-[1.1] text-navy md:text-6xl">
          {title}
        </h2>
      </div>
    </section>
  )
}
