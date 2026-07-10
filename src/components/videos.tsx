// src/components/videos.tsx
import { useEffect, useState } from 'react'
import { Film } from 'lucide-react'
import { api, type Settings } from '../lib/api'

export function Videos() {
  const [settings, setSettings] = useState<Settings>({})

  useEffect(() => {
    api.getSettings().then(setSettings).catch(() => {})
  }, [])

  const videoUrl = settings['video_url'] || ''
  const videoTitle = settings['video_title'] || "İzmir'in enerjisi,"
  const videoSubtitle = settings['video_subtitle'] || 'hareket halinde.'

  if (!videoUrl) return null

  return (
    <section id="videos" className="mx-auto max-w-7xl px-6 py-24 md:py-28">
      <div className="mb-10">
        <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-emerald">
          <Film size={14} /> Kurumsal Film
        </span>
        <h2 className="mt-3 font-heading text-4xl font-bold tracking-tight text-navy md:text-5xl">
          {videoTitle} <span className="font-serif italic text-gradient">{videoSubtitle}</span>
        </h2>
      </div>
      <div className="relative overflow-hidden rounded-[2.5rem] border border-sky/30 bg-navy shadow-2xl shadow-sky-deep/30">
        <video
          src={videoUrl}
          className="block aspect-video w-full object-cover"
          controls
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      </div>
    </section>
  )
}
