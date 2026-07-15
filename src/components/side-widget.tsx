
import { useState } from 'react'
import { Smartphone, X, Apple, Play } from 'lucide-react'

export function SideWidget({ className }: { className?: string }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Vertical tab — fixed to right edge */}
      <button
        onClick={() => setOpen(true)}
        className="group fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 items-center gap-2 rounded-l-xl bg-gradient-to-b from-emerald to-sky py-4 pl-3 pr-2 text-sm font-bold text-night shadow-lg shadow-emerald/30 transition-all duration-300 hover:from-[#5d9132] hover:to-[#3a9bc4] hover:pr-4 hover:shadow-xl md:flex"
        style={{ writingMode: 'vertical-rl' }}
        aria-label="İzmirGaz Mobil uygulamasını indir"
      >
        <Smartphone size={18} className="rotate-90 transition-transform group-hover:scale-110" />
        İzmirGaz Mobil İndir
      </button>

      {/* Mobile floating button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-24 right-4 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-emerald to-sky text-night shadow-xl shadow-emerald/40 transition-transform hover:scale-105 md:hidden"
        aria-label="İzmirGaz Mobil uygulamasını indir"
      >
        <Smartphone size={22} />
      </button>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-night/60 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-sm rounded-[2rem] border border-border bg-card p-8 text-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Kapat"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X size={18} />
            </button>
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald to-sky text-night">
              <Smartphone size={30} />
            </div>
            <h3 className="font-heading text-2xl font-bold text-foreground">
              İzmirGaz Mobil
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Faturanızı görüntüleyin, ödeme yapın, sayaç bildirin ve
              başvurularınızı cebinizden yönetin.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <a
                href="#"
                className="magnetic-btn flex items-center justify-center gap-2 rounded-xl bg-night px-5 py-3 text-sm font-semibold text-white"
              >
                <Apple size={18} /> App Store
              </a>
              <a
                href="#"
                className="magnetic-btn flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald to-sky px-5 py-3 text-sm font-semibold text-night"
              >
                <Play size={18} /> Google Play
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
