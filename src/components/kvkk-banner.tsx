// src/components/kvkk-banner.tsx
import { useEffect, useState } from 'react'
import { Cookie } from 'lucide-react'
import { api, type Settings } from '../lib/api'

export function KvkkBanner() {
  const [visible, setVisible] = useState(false)
  const [settings, setSettings] = useState<Settings>({})

  useEffect(() => {
    api.getSettings().then(setSettings).catch(() => {})
    try {
      if (!localStorage.getItem('izg-kvkk')) {
        const t = setTimeout(() => setVisible(true), 1200)
        return () => clearTimeout(t)
      }
    } catch {}
  }, [])

  const accept = () => {
    try { localStorage.setItem('izg-kvkk', '1') } catch {}
    setVisible(false)
  }

  if (!visible || settings['kvkk_active'] === 'false') return null

  return (
    <div className="fixed bottom-4 left-4 z-[55] w-[calc(100%-2rem)] max-w-sm rounded-2xl border border-border bg-card p-5 shadow-2xl">
      <div className="flex items-start gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald/12 text-emerald">
          <Cookie size={18} />
        </span>
        <div>
          <h4 className="text-sm font-bold text-foreground">
            {settings['kvkk_title'] || 'Çerez ve KVKK Bildirimi'}
          </h4>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            {settings['kvkk_text'] || 'Deneyiminizi iyileştirmek için çerezler kullanıyoruz.'}
          </p>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <button onClick={accept} className="magnetic-btn flex-1 rounded-xl bg-gradient-to-r from-emerald to-sky py-2.5 text-xs font-semibold text-night">
          Kabul Et
        </button>
        <a href="#" className="rounded-xl border border-border px-4 py-2.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground">
          Detaylar
        </a>
      </div>
    </div>
  )
}
