import { useState, useEffect } from 'react'
import { Sparkles, X, Send, Bot } from 'lucide-react'
import { useI18n } from '../lib/i18n'

const API = 'http://localhost:5001'

interface QA {
  id: number
  question: string
  answer: string
  question_en?: string
  answer_en?: string
}

export function AIChatbox() {
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState<{ r: 'bot' | 'me'; t: string }[]>([])
  const [input, setInput] = useState('')
  const [qa, setQA] = useState<QA[]>([])
  const { lang } = useI18n()

  useEffect(() => {
    fetch(`${API}/api/chatbox`)
      .then(r => r.json())
      .then(setQA)
      .catch(() => {})
  }, [])

  useEffect(() => {
    const welcome = lang === 'en'
      ? 'Hello! I am IzmirGaz AI Assistant. How can I help you?'
      : 'Merhaba! Ben İzmirGaz Yapay Zekâ Asistanı. Size nasıl yardımcı olabilirim?'
    setMsgs([{ r: 'bot', t: welcome }])
  }, [lang])

  const getQ = (item: QA) => lang === 'en' ? (item.question_en || item.question) : item.question
  const getA = (item: QA) => lang === 'en' ? (item.answer_en || item.answer) : item.answer

  const send = (text: string) => {
    if (!text.trim()) return
    setMsgs(m => [...m, { r: 'me', t: text }])
    setInput('')
    // DB'den eşleşen soru bul
    const norm = (s: string) => s.toLowerCase().trim()
    const match = qa.find(q => norm(getQ(q)).includes(norm(text)) || norm(text).includes(norm(getQ(q)).substring(0, 10)))
    setTimeout(() => {
      if (match) {
        setMsgs(m => [...m, { r: 'bot', t: getA(match) }])
      } else {
        const fallback = lang === 'en'
          ? 'I have forwarded your request. For emergencies call 187.'
          : 'Talebinizi aldım, en yakın temsilcimiz yönlendirilecek. Acil için 187.'
        setMsgs(m => [...m, { r: 'bot', t: fallback }])
      }
    }, 600)
  }

  const QUICK = qa.slice(0, 4).map(q => getQ(q))

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="ai-ring fixed bottom-24 right-5 z-40 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-sky to-sky-deep text-white shadow-2xl shadow-sky-deep/40 transition-transform hover:scale-110"
        aria-label="Yapay Zekâ Asistanı"
      >
        <Sparkles size={26}/>
      </button>
    )
  }

  return (
    <div className="fixed bottom-24 right-5 z-50 w-[360px] max-w-[calc(100vw-2.5rem)] overflow-hidden rounded-3xl border-2 border-sky/40 bg-white shadow-2xl shadow-sky-deep/30 animate-in fade-in slide-in-from-bottom-5">
      <div className="flex items-center justify-between bg-gradient-to-r from-sky-deep to-sky px-5 py-4 text-white">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20"><Bot size={20}/></span>
          <div>
            <p className="text-base font-bold">{lang === 'en' ? 'IzmirGaz AI Assistant' : 'İzmirGaz AI Asistanı'}</p>
            <p className="text-xs text-white/80">{lang === 'en' ? 'Online · 24/7' : 'Çevrimiçi · 7/24'}</p>
          </div>
        </div>
        <button onClick={() => setOpen(false)} aria-label="Kapat" className="rounded-full p-2 hover:bg-white/15"><X size={18}/></button>
      </div>

      <div className="max-h-80 space-y-3 overflow-y-auto bg-mist p-4">
        {msgs.map((m, i) => (
          <div key={i} className={`flex ${m.r === 'me' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${m.r === 'me' ? 'bg-sky-deep text-white' : 'bg-white text-navy shadow-sm'}`}>{m.t}</div>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-200 bg-white p-3">
        {QUICK.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-1.5">
            {QUICK.map((q) => (
              <button key={q} onClick={() => send(q)} className="rounded-full border border-sky/40 px-3 py-1 text-xs font-semibold text-sky-deep hover:bg-sky/10">{q}</button>
            ))}
          </div>
        )}
        <form onSubmit={(e) => { e.preventDefault(); send(input) }} className="flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={lang === 'en' ? 'Type your question…' : 'Sorunuzu yazın…'}
            className="flex-1 rounded-xl border-2 border-slate-200 px-4 py-2.5 text-base text-navy outline-none focus:border-sky-deep"
          />
          <button type="submit" className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-sky to-sky-deep text-white hover:from-sky-deep hover:to-sky-deep"><Send size={18}/></button>
        </form>
      </div>
    </div>
  )
}
