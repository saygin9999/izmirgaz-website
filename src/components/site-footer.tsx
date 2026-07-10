// src/components/site-footer.tsx
import { useEffect, useState } from 'react'
import { MapPin, Lock, Phone, AlertTriangle, ExternalLink, Download } from 'lucide-react'
import { api, type FooterCol, type FooterLink, type FooterServiceLink, type Settings } from '../lib/api'
import logoUrl from '../assets/izmirgaz-logo-real.png'
import * as Icons from 'lucide-react'
import { useI18n } from '../lib/i18n'
import { trMenu } from '../lib/menu-i18n'

function DynamicIcon({ name, size = 22 }: { name: string; size?: number }) {
  const Icon = (Icons as Record<string, React.ComponentType<{ size?: number; className?: string }>>)[name]
  if (!Icon) return null
  return <Icon size={size} />
}

export function SiteFooter() {
  const { t, lang } = useI18n()
  const [cols, setCols] = useState<FooterCol[]>([])
  const [links, setLinks] = useState<FooterLink[]>([])
  const [serviceLinks, setServiceLinks] = useState<FooterServiceLink[]>([])
  const [settings, setSettings] = useState<Settings>({})

  useEffect(() => {
    api.getFooter().then(({ cols, links, serviceLinks }) => {
      setCols(cols)
      setLinks(links)
      setServiceLinks(serviceLinks)
    }).catch(() => {})
    api.getSettings().then(setSettings).catch(() => {})
  }, [])

  const callCenter = settings['call_center'] || '0850 222 3335'
  const address = settings['address'] || 'Ä°zmir, TÃ¼rkiye'
  const appBtn = settings['footer_app_btn'] || 'Ä°zmirGaz Mobili Ä°ndir'
  const copyright = settings['footer_copyright'] || `Â© ${new Date().getFullYear()} Ä°zmirGaz. TÃ¼m haklarÄ± saklÄ±dÄ±r.`

  return (
    <footer id="footer" className="relative overflow-hidden bg-gradient-to-br from-sky-deep via-[#3aa8ce] to-sky text-white">
      {/* SarÄ± servis bar */}
      <div className="relative bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 text-navy">
        <div className="mx-auto flex w-full flex-wrap items-center justify-between gap-x-10 gap-y-6 px-10 py-14 xl:px-20 xl:py-16">
          <a href="#" className="group flex items-center gap-3 rounded-full bg-navy/95 px-8 py-5 text-lg font-extrabold text-amber-300 shadow-xl transition-transform hover:scale-105">
            <Download size={22} /> {trMenu(appBtn, lang)}
          </a>
          <div className="flex flex-wrap items-center gap-x-10 gap-y-5">
            {serviceLinks.map((sl) => (
              <a key={sl.id} href={sl.href || '#'} className="group flex items-center gap-3 text-[18px] font-extrabold text-navy/90 transition-colors hover:text-navy">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-white/80 ring-2 ring-navy/10 shadow-sm group-hover:bg-white group-hover:ring-navy/25">
                  <DynamicIcon name={sl.icon} size={26} />
                </span>
                <span className="leading-tight">{trMenu(sl.label, lang)}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="relative w-full px-10 py-32 xl:px-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_repeat(5,1fr)]">
          <div className="flex flex-col items-center text-center">
            <span className="inline-flex items-center justify-center rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-white/40 transition-transform hover:scale-105">
              <img src={logoUrl} alt="Ä°zmirGaz â€” DoÄŸal Gaz UygarlÄ±ÄŸÄ±" className="h-28 w-auto object-contain md:h-32" />
            </span>
            <p className="mt-5 text-lg leading-relaxed text-white/90">{t('footer_tagline')}</p>
            <a href="https://www.turkiye.gov.tr" target="_blank" rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-sky-deep shadow-lg hover:shadow-xl">
              <ExternalLink size={16} /> {t('nav_edevlet')}
            </a>
          </div>

          {cols.map((col) => (
            <div key={col.id}>
              <button type="button" className="inline-flex w-full items-center justify-between rounded-full bg-white/15 px-5 py-3 text-base font-extrabold uppercase tracking-wide text-white shadow-md ring-1 ring-white/20 backdrop-blur transition hover:bg-white hover:text-sky-deep">
                {trMenu(col.title, lang)}
              </button>
              <ul className="mt-5 space-y-3 pl-2">
                {links.filter(l => l.col_id === col.id).map((l) => (
                  <li key={l.id}>
                    <a href={l.href || '#'} className="block text-[16px] leading-snug text-white/90 transition-colors hover:text-white hover:underline">
                      {trMenu(l.label, lang)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 grid gap-10 rounded-2xl bg-white/12 p-8 backdrop-blur-sm md:grid-cols-4 md:gap-16 md:px-12">
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/20"><MapPin size={22} /></span>
            <div><p className="text-sm text-white/80">{t('footer_gm')}</p><p className="text-lg font-semibold">{address}</p></div>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/20"><MapPin size={22} /></span>
            <div><p className="text-sm text-white/80">{t('footer_abone_m')}</p><p className="text-lg font-semibold">{t('footer_ilce')}</p></div>
          </div>
          <a href={`tel:${callCenter.replace(/\s/g, '')}`} className="flex items-center gap-4 rounded-xl transition-colors hover:bg-white/10">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/20"><Phone size={22} /></span>
            <div><p className="text-sm text-white/80">{t('footer_cagri')}</p><p className="font-mono text-xl font-bold">{callCenter}</p></div>
          </a>
          <a href="tel:187" className="flex items-center gap-4 rounded-xl transition-colors hover:bg-red-500/20">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-500/30 animate-pulse"><AlertTriangle size={22} /></span>
            <div><p className="text-sm text-white/80">{t('footer_acil')}</p><p className="font-mono text-2xl font-extrabold">187</p></div>
          </a>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/25 pt-6 md:flex-row md:items-center md:justify-between md:px-6">
          <div className="flex flex-wrap items-center gap-8">
            {['KVKK', 'EPDK', 'ISO 9001', 'ISO 27001'].map(l => (
              <span key={l} className="inline-flex items-center gap-2 font-mono text-sm font-semibold text-white/90"><Lock size={13} /> {l}</span>
            ))}
          </div>
          <p className="font-mono text-sm text-white/80">{copyright}</p>
        </div>
      </div>
    </footer>
  )
}





