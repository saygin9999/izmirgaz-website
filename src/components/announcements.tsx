// src/components/announcements.tsx
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight, Megaphone } from 'lucide-react'
import { api, type NewsItem } from '../lib/api'
import { useI18n } from '../lib/i18n'

gsap.registerPlugin(ScrollTrigger)

export function Announcements({ className }: { className?: string }) {
  const { t } = useI18n()
  const root = useRef<HTMLElement>(null)
  const [news, setNews] = useState<NewsItem[]>([])

  useEffect(() => {
    api.getNews().then(setNews).catch(() => {})
  }, [])

  useEffect(() => {
    if (news.length === 0) return
    const ctx = gsap.context(() => {
      gsap.from('[data-news]', {
        y: 50, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12,
        scrollTrigger: { trigger: root.current, start: 'top 72%' },
      })
    }, root)
    return () => ctx.revert()
  }, [news])

  return (
    <section ref={root} id="news" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-emerald">
            <Megaphone size={14} /> Duyurular ve Haberler
          </span>
          <h2 className="mt-4 text-balance font-heading text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            {t('ann_from')}{' '}
            <span className="font-serif italic text-gradient">son gelişmeler.</span>
          </h2>
        </div>
        <a href="#" className="magnetic-btn inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground">
          Tümünü Gör <ArrowUpRight size={16} />
        </a>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {news.map((n) => (
          <article
            key={n.id}
            data-news
            className="card-hover group relative flex flex-col overflow-hidden rounded-[2rem] border border-border bg-card shadow-lg shadow-black/[0.03]"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <img src={n.image_url} alt={n.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-emerald px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-white">
                    {n.tag}
                  </span>
                  <span className="font-mono text-xs text-white/80">{n.date}</span>
                </div>
                <h3 className="mt-3 text-balance text-xl font-bold leading-snug text-white">{n.title}</h3>
              </div>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <p className="flex-1 text-[15px] leading-relaxed text-muted-foreground">{n.description}</p>
              <a href={n.href || '#'} className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-sky transition-transform group-hover:translate-x-1">
                Devamını oku <ArrowUpRight size={15} />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
