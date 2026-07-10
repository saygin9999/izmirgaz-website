// src/components/sticky-bar.tsx
import { useEffect, useState } from 'react'
import { useI18n } from '../lib/i18n'
import { X } from 'lucide-react'
import { api, type StickyItem, type Settings } from '../lib/api'
import * as Icons from 'lucide-react'

function DynIcon({ name, size = 16 }: { name: string; size?: number }) {
  const Icon = (Icons as Record<string, React.ComponentType<{ size?: number; className?: string }>>)[name]
  if (!Icon) return null
  return <Icon size={size} className="shrink-0" />
}

export function StickyBar() {
  const { lang } = useI18n()
  const [items, setItems] = useState<StickyItem[]>([])
  const [settings, setSettings] = useState<Settings>({})
  const [open, setOpen] = useState(false)
  const [show, setShow] = useState(false)

  useEffect(() => {
    api.getSticky().then(setItems).catch(() => {})
    api.getSettings().then(setSettings).catch(() => {})
  }, [])

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.9)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { if (show) setOpen(true) }, [show])

  if (!show || !open || settings['sticky_bar_active'] === 'false') return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 px-3 pb-3 sm:px-4 sm:pb-4">
      <div className="mx-auto flex max-w-5xl items-center gap-2 overflow-x-auto rounded-2xl bg-gradient-to-r from-emerald to-sky p-2 shadow-2xl shadow-emerald/30 backdrop-blur sm:gap-3 sm:p-2.5">
        <div className="flex flex-1 items-center gap-2 sm:gap-3">
          {items.map((it) => (
            <a key={it.id} href={it.href || '#'}
              className="magnetic-btn flex shrink-0 items-center gap-2 rounded-xl bg-white/15 px-3 py-2 text-xs font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/25 sm:text-sm">
              <DynIcon name={it.icon} size={16} />
              <span className="whitespace-nowrap">{lang === 'en' ? ((it as any).label_en || it.label) : it.label}</span>
            </a>
          ))}
        </div>
        <button onClick={() => setOpen(false)} aria-label="Şeridi kapat"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/15 text-white transition-colors hover:bg-white/30">
          <X size={16} />
        </button>
      </div>
    </div>
  )
}
