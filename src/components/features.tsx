import { useI18n } from '../lib/i18n'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, X, CheckCircle2, AlertCircle } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

type CardKey = 'borc' | 'abone' | 'kesinti' | 'talep'

const CARDS_TR = [
  { key: 'borc', n: '01', t: 'Borç Sorgulama', d: 'Cari ve geçmiş döneme ait fatura tutarlarınızı görüntüleyin, anında ödeyin.', cta: 'SORGULA', tag: 'Hesap 01' },
  { key: 'abone', n: '02', t: 'Abonelik Durumu', d: 'Sözleşme bilgileriniz, tarifeniz ve sayaç endeksiniz bir kart üzerinde.', cta: 'GÖRÜNTÜLE', tag: 'Hesap 02' },
  { key: 'kesinti', n: '03', t: 'Planlı Kesinti', d: 'Bölgenizdeki şebeke bakımları ve tahmini açılış zamanları.', cta: 'SORGULA', tag: 'Hesap 03' },
  { key: 'talep', n: '04', t: 'Talep & Öneri', d: 'Bir randevu, bir öneri, bir teşekkür — bize zarifçe iletin.', cta: 'İLET', tag: 'Hesap 04' },
] as const

const CARDS_EN = [
  { key: 'borc', n: '01', t: 'Debt Inquiry', d: 'View your current and past invoices, pay instantly.', cta: 'QUERY', tag: 'Account 01' },
  { key: 'abone', n: '02', t: 'Subscription Status', d: 'Your contract info, tariff and meter index on one card.', cta: 'VIEW', tag: 'Account 02' },
  { key: 'kesinti', n: '03', t: 'Planned Outage', d: 'Network maintenance in your area and estimated restoration times.', cta: 'QUERY', tag: 'Account 03' },
  { key: 'talep', n: '04', t: 'Request & Suggestion', d: 'An appointment, a suggestion, a thank you — relay it to us gracefully.', cta: 'SEND', tag: 'Account 04' },
] as const

const ILCELER = ['Konak', 'Karşıyaka', 'Bornova', 'Buca', 'Çiğli', 'Bayraklı', 'Gaziemir', 'Narlıdere', 'Balçova', 'Menemen']

function reTC(v: string) { return /^[1-9][0-9]{10}$/.test(v) }
function reHesap(v: string) { return /^[0-9]{10}$/.test(v) }
function reTel(v: string) { return /^(\+90|0)?5[0-9]{9}$/.test(v.replace(/\s/g, '')) }

function FieldBox({ ok, error, children }: { ok: boolean; error: boolean; children: React.ReactNode }) {
  return (
    <div className={`rounded-xl border-2 transition-colors ${error ? 'border-red-500' : ok ? 'border-emerald' : 'border-slate-200'} bg-white focus-within:border-sky-deep`}>
      {children}
    </div>
  )
}

function PanelBorc({ onClose }: { onClose: () => void }) {
  const [hesap, setHesap] = useState('')
  const [tc, setTc] = useState('')
  const okH = reHesap(hesap), okT = reTC(tc)
  const err = (hesap && !okH) || (tc && !okT)
  const valid = okH && okT
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-3xl bg-gradient-to-br from-navy to-ink p-8 text-white shadow-xl">
        <p className="font-mono text-sm uppercase tracking-widest text-sky-soft">— Hesap 01</p>
        <h3 className="mt-3 font-serif text-4xl font-light italic">Fatura <span className="text-sky-soft">sorgulama</span></h3>
        <p className="mt-4 text-base text-white/75">Sözleşme hesap numaranız ve T.C. kimlik numaranız ile son üç fatura döneminizi anında görüntüleyin.</p>
        <div className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block font-mono text-xs font-bold uppercase tracking-widest text-sky-soft">SÖZLEŞME HESAP NO</label>
            <input value={hesap} onChange={(e)=>setHesap(e.target.value.replace(/\D/g,'').slice(0,10))}
              placeholder="10 haneli" className={`w-full border-b-2 bg-transparent py-3 text-lg text-white placeholder-white/40 outline-none transition-colors ${hesap && !okH ? 'border-red-400' : okH ? 'border-emerald-glow' : 'border-white/30 focus:border-sky-soft'}`} />
          </div>
          <div>
            <label className="mb-2 block font-mono text-xs font-bold uppercase tracking-widest text-sky-soft">T.C. KİMLİK NO</label>
            <input value={tc} onChange={(e)=>setTc(e.target.value.replace(/\D/g,'').slice(0,11))}
              placeholder="11 haneli" className={`w-full border-b-2 bg-transparent py-3 text-lg text-white placeholder-white/40 outline-none transition-colors ${tc && !okT ? 'border-red-400' : okT ? 'border-emerald-glow' : 'border-white/30 focus:border-sky-soft'}`} />
          </div>
        </div>
        <button disabled={!valid} className={`mt-8 inline-flex items-center gap-2 rounded-xl border-2 px-7 py-4 font-mono text-sm font-bold uppercase tracking-widest transition-all ${valid ? 'border-emerald bg-emerald/20 text-white hover:bg-emerald hover:text-navy' : 'cursor-not-allowed border-white/15 text-white/30'}`}>
          Faturayı Görüntüle <ArrowRight size={16}/>
        </button>
        {err && <p className="mt-3 flex items-center gap-2 text-sm text-red-300"><AlertCircle size={14}/> Format hatalı, lütfen kontrol edin.</p>}
        {valid && <p className="mt-3 flex items-center gap-2 text-sm text-emerald-glow"><CheckCircle2 size={14}/> Bilgiler doğrulandı.</p>}
      </div>
      <button onClick={onClose} className="self-start rounded-full border-2 border-navy/15 bg-white px-5 py-2.5 text-sm font-bold text-navy hover:border-sky">Kapat ×</button>
    </div>
  )
}

function PanelAbone({ onClose }: { onClose: () => void }) {
  const [il, setIl] = useState(''); const [mah, setMah] = useState(''); const [trk, setTrk] = useState('')
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-3xl border-2 border-slate-200 bg-white p-8 shadow-xl">
        <p className="font-mono text-sm uppercase tracking-widest text-sky-deep">— Hesap 02</p>
        <h3 className="mt-3 font-serif text-4xl font-light italic text-navy">Sokağımda gaz <span className="text-emerald">var mı?</span></h3>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block font-mono text-xs font-bold uppercase tracking-widest text-slate">İLÇE</label>
            <select value={il} onChange={(e)=>{setIl(e.target.value); setMah('')}} className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-base text-navy focus:border-sky-deep focus:outline-none">
              <option value="">İlçe seçiniz</option>
              {ILCELER.map(i=><option key={i}>{i}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-2 block font-mono text-xs font-bold uppercase tracking-widest text-slate">MAHALLE</label>
            <select value={mah} onChange={(e)=>setMah(e.target.value)} disabled={!il} className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-base text-navy focus:border-sky-deep focus:outline-none disabled:opacity-50">
              <option value="">{il ? 'Mahalle seçiniz' : 'Önce ilçe seçiniz'}</option>
              {il && ['Merkez','Atatürk','Cumhuriyet','Yeni'].map(m=><option key={m}>{m} Mah.</option>)}
            </select>
          </div>
        </div>
        {mah && <p className="mt-6 flex items-center gap-2 rounded-xl bg-emerald/10 px-4 py-3 text-base font-semibold text-emerald"><CheckCircle2 size={18}/> {mah}, {il} — Gaz hizmeti aktif.</p>}
      </div>
      <div className="rounded-3xl bg-gradient-to-br from-navy to-ink p-8 text-white shadow-xl">
        <p className="font-mono text-sm uppercase tracking-widest text-sky-soft">— Hesap 03</p>
        <h3 className="mt-3 font-serif text-3xl font-light italic">Başvuru takibi</h3>
        <div className="mt-6 flex gap-3">
          <input value={trk} onChange={(e)=>setTrk(e.target.value.toUpperCase())} placeholder="MÜR-2026-XXXXXX" className="flex-1 rounded-xl border-2 border-white/20 bg-white/5 px-4 py-3 text-base text-white placeholder-white/40 outline-none focus:border-sky-soft"/>
          <button className="rounded-xl bg-sky px-6 py-3 font-mono text-sm font-bold uppercase tracking-widest text-navy hover:bg-sky-glow">Sorgula →</button>
        </div>
        {trk.length > 5 && (
          <div className="mt-6 space-y-2">
            {['Başvuru alındı','Keşif planlandı','Sözleşme onayı','Aktivasyon'].map((s,i)=>(
              <div key={s} className="flex items-center gap-3">
                <div className={`h-3 flex-1 rounded-full ${i<2?'bg-emerald':'bg-white/15'}`}/>
                <span className="w-32 text-xs text-white/70">{s}</span>
              </div>
            ))}
          </div>
        )}
        <button onClick={onClose} className="mt-6 text-sm text-white/60 hover:text-white">Kapat ×</button>
      </div>
    </div>
  )
}

function PanelKesinti({ onClose }: { onClose: () => void }) {
  const [active, setActive] = useState<string | null>(null)
  const cuts: Record<string, string> = { Konak: 'Bakım yok', Bornova: '14:00 — 17:00 (Yarın)', Buca: 'Bakım yok', Çiğli: '09:00 — 12:00 (Bugün)', Karşıyaka: 'Bakım yok', Bayraklı: 'Bakım yok' }
  return (
    <div className="rounded-3xl border-2 border-slate-200 bg-white p-8 shadow-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-sm uppercase tracking-widest text-sky-deep">— Planlı Kesinti</p>
          <h3 className="mt-2 font-serif text-3xl font-light italic text-navy">Canlı kesinti <span className="text-emerald">haritası</span></h3>
        </div>
        <button onClick={onClose} className="rounded-full p-2 text-slate hover:bg-mist"><X size={18}/></button>
      </div>
      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {Object.entries(cuts).map(([ilce, info])=>{
          const bakim = info !== 'Bakım yok'
          return (
            <button key={ilce} onClick={()=>setActive(ilce)} className={`rounded-2xl border-2 p-5 text-left transition-all ${active===ilce?'border-sky-deep bg-sky/10':'border-slate-200 bg-white hover:border-sky/40'}`}>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-navy">{ilce}</span>
                <span className={`h-3 w-3 rounded-full ${bakim?'bg-amber-500 pulse-dot':'bg-emerald'}`}/>
              </div>
              <p className={`mt-2 text-sm font-semibold ${bakim?'text-amber-600':'text-emerald'}`}>{info}</p>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function PanelTalep({ onClose }: { onClose: () => void }) {
  const [tel, setTel] = useState(''); const [msg, setMsg] = useState(''); const okTel = reTel(tel)
  return (
    <div className="rounded-3xl border-2 border-slate-200 bg-white p-8 shadow-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-sm uppercase tracking-widest text-sky-deep">— Talep & Öneri</p>
          <h3 className="mt-2 font-serif text-3xl font-light italic text-navy">Bizimle <span className="text-emerald">iletişime geç</span></h3>
        </div>
        <button onClick={onClose} className="rounded-full p-2 text-slate hover:bg-mist"><X size={18}/></button>
      </div>
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block font-mono text-xs font-bold uppercase tracking-widest text-slate">TELEFON</label>
          <input value={tel} onChange={(e)=>setTel(e.target.value)} placeholder="+90 5xx xxx xx xx"
            className={`w-full rounded-xl border-2 px-4 py-3 text-base outline-none ${tel && !okTel ? 'border-red-500' : okTel ? 'border-emerald' : 'border-slate-200 focus:border-sky-deep'}`}/>
        </div>
        <div>
          <label className="mb-2 block font-mono text-xs font-bold uppercase tracking-widest text-slate">KONU</label>
          <select className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-base focus:border-sky-deep focus:outline-none">
            <option>Şikayet</option><option>Öneri</option><option>Teşekkür</option><option>Randevu Talebi</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="mb-2 block font-mono text-xs font-bold uppercase tracking-widest text-slate">MESAJINIZ</label>
          <textarea value={msg} onChange={(e)=>setMsg(e.target.value)} rows={4} className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-base focus:border-sky-deep focus:outline-none"/>
        </div>
      </div>
      <button disabled={!okTel || !msg} className={`mt-6 rounded-xl px-7 py-3.5 font-mono text-sm font-bold uppercase tracking-widest transition-all ${okTel && msg ? 'bg-emerald text-white hover:bg-emerald-glow' : 'cursor-not-allowed bg-slate-200 text-slate'}`}>Gönder →</button>
    </div>
  )
}

export function Features({ className }: { className?: string }) {
  const root = useRef<HTMLElement>(null)
  const [open, setOpen] = useState<CardKey | null>(null)
  const { lang } = useI18n()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-card]', { y: 50, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12, scrollTrigger: { trigger: root.current, start: 'top 75%' } })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} id="features" className="relative w-full px-6 py-24 md:px-12 md:py-32 lg:px-16">
      <div className="mx-auto mb-14 flex w-full max-w-[1600px] flex-wrap items-end justify-between gap-8">
        <h2 className="max-w-2xl font-heading text-5xl font-bold leading-tight tracking-tight text-navy md:text-6xl">
          {lang === 'en' ? <>Four essential <span className="font-serif italic text-emerald">actions</span>,<br/>one workshop.</> : <>Dört temel <span className="font-serif italic text-emerald">işlem</span>,<br/>tek bir atölye.</>}
        </h2>
        <p className="max-w-md text-lg leading-relaxed text-slate">
{lang === 'en' ? 'From subscription to billing, from outage queries to requests — your daily needs as clear as a watch crystal.' : 'Aboneliğinizi açmaktan fatura ödemeye, kesinti sorgulamasından talep iletmeye — günlük ihtiyaçlarınız bir saat camı kadar berrak.'}
        </p>
      </div>

      <div className="mx-auto grid w-full max-w-[1600px] auto-rows-fr items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {(lang === 'en' ? CARDS_EN : CARDS_TR).map((c) => (
          <button
            key={c.key}
            data-card
            onClick={() => setOpen(c.key)}
            className="card-hover group flex h-full min-h-[360px] w-full flex-col rounded-3xl border-2 border-slate-200 bg-white p-8 text-left shadow-lg shadow-sky-deep/5"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm font-bold text-emerald">{c.n}</span>
              <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-emerald/40 text-emerald transition-colors group-hover:border-emerald group-hover:bg-emerald group-hover:text-white">
                <ArrowRight size={20}/>
              </span>
            </div>
            <h3 className="mt-10 font-serif text-3xl font-light text-navy lg:text-4xl">{c.t}</h3>
            <p className="mt-4 flex-1 text-base leading-relaxed text-slate lg:text-lg">{c.d}</p>
            <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-4">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-navy">{c.cta}</span>
              <span className="font-serif text-sm italic text-slate">{c.tag}</span>
            </div>
          </button>
        ))}
      </div>


      {open && (
        <div className="mt-10">
          {open === 'borc' && <PanelBorc onClose={()=>setOpen(null)}/>}
          {open === 'abone' && <PanelAbone onClose={()=>setOpen(null)}/>}
          {open === 'kesinti' && <PanelKesinti onClose={()=>setOpen(null)}/>}
          {open === 'talep' && <PanelTalep onClose={()=>setOpen(null)}/>}
        </div>
      )}
    </section>
  )
}
