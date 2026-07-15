// src/components/hero-carousel.tsx
import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { api, type Slide } from '../lib/api'
import { useI18n } from '../lib/i18n'

const DEFAULT_SLIDES: Slide[] = [
  { id: 1, tag: 'Ä°zmir', title: "Ä°zmir'in enerjisi,", subtitle: 'gÃ¼vencesi.', image_url: '/banner-1.png', href: '#', order_no: 0, is_active: 1 },
]

export function HeroCarousel({ className }: { className?: string }) {
  const { lang } = useI18n()
  const [slides, setSlides] = useState<Slide[]>(DEFAULT_SLIDES)
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    api.getSlides().then(setSlides).catch(() => {})
  }, [])

  useEffect(() => {
    if (paused || slides.length === 0) return
    timer.current = setInterval(() => setI((p) => (p + 1) % slides.length), 5000)
    return () => { if (timer.current) clearInterval(timer.current) }
  }, [paused, slides.length])

  const go = (d: number) => setI((p) => (p + d + slides.length) % slides.length)

  return (
    <div className="relative overflow-hidden rounded-[2.5rem] border border-sky/30 bg-navy shadow-2xl shadow-sky-deep/30">
      <div className="relative aspect-[21/9] w-full">
        {slides.map((s, idx) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${idx === i ? 'opacity-100' : 'opacity-0'}`}
          >
            <img src={s.image_url} alt={lang === 'en' ? (s.title_en || s.title) : s.title} className="h-full w-full object-cover" />
            <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-navy via-navy/90 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <span className="inline-block rounded-full bg-emerald/90 px-4 py-1.5 text-sm font-bold uppercase tracking-widest text-white">
                {s.tag}
              </span>
              <h3 className="mt-4 font-heading text-3xl font-extrabold leading-tight text-white md:text-5xl">
                {lang === 'en' ? (s.title_en || s.title) : s.title} <span className="font-serif italic text-sky-soft">{lang === 'en' ? (s.subtitle_en || s.subtitle) : s.subtitle}</span>
              </h3>
            </div>
          </div>
        ))}
      </div>

      <button onClick={() => go(-1)} aria-label="Ã–nceki" className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-navy shadow-lg hover:bg-white">
        <ChevronLeft size={22} />
      </button>
      <button onClick={() => go(1)} aria-label="Sonraki" className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-navy shadow-lg hover:bg-white">
        <ChevronRight size={22} />
      </button>

      <div className="absolute bottom-4 right-4 flex items-center gap-2">
        <button onClick={() => setPaused((v) => !v)} aria-label={paused ? 'Oynat' : 'Duraklat'} className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-navy shadow-lg hover:bg-white">
          {paused ? <Play size={16} /> : <Pause size={16} />}
        </button>
      </div>

      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            aria-label={`Slayt ${idx + 1}`}
            className={`h-2 rounded-full transition-all ${idx === i ? 'w-8 bg-white' : 'w-2 bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  )
}


