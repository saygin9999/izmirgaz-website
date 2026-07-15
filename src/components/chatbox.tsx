import { useState, useEffect } from 'react'
import { Sparkles, X, Send, Bot } from 'lucide-react'

const API = 'http://localhost:5001'

interface Msg { r: 'bot'|'me'; t: string; links?: {label:string;url:string;suggestValue?:string}[] }
interface QA {
  id: number
  question: string
  answer: string
  question_en?: string
  answer_en?: string
}

export function Chatbox({ className }: { className?: string }) {
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState<Msg[]>([
    { r: 'bot', t: 'Merhaba! 👋 İzmirGaz AI Asistanı. Türkçe veya İngilizce sorabilirsiniz.' }
  ])
  const [input, setInput] = useState('')
  const [qa, setQA] = useState<QA[]>([])

  useEffect(() => {
    fetch(`${API}/api/chatbox`)
      .then(r => r.json())
      .then(setQA)
      .catch(() => {})
  }, [])

  const norm = (s: string) => s.toLowerCase()
    .replace(/ç/g,'c').replace(/ğ/g,'g').replace(/ı/g,'i').replace(/ö/g,'o').replace(/ş/g,'s').replace(/ü/g,'u')
    .replace(/[^a-z0-9\s]/g, ' ').trim()

  // İki kelime arasındaki düzenleme mesafesi (Levenshtein) - yazım hatalarını tolere etmek için
  const editDistance = (a: string, b: string) => {
    const m = a.length, n = b.length
    if (m === 0) return n
    if (n === 0) return m
    const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0))
    for (let i = 0; i <= m; i++) dp[i][0] = i
    for (let j = 0; j <= n; j++) dp[0][j] = j
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        dp[i][j] = a[i-1] === b[j-1] ? dp[i-1][j-1] : 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])
      }
    }
    return dp[m][n]
  }

  // İki kelime "yeterince benzer" mi - kısa kelimede 1, uzun kelimede 2 harf farkına izin ver
  const isFuzzyMatch = (a: string, b: string) => {
    if (a === b) return true
    if (a.length < 3 || b.length < 3) return false
    const maxLen = Math.max(a.length, b.length)
    const tolerance = maxLen <= 5 ? 1 : 2
    return editDistance(a, b) <= tolerance
  }

  const score = (haystack: string, needle: string) => {
    const h = norm(haystack)
    const n = norm(needle)
    if (h.includes(n)) return 3
    const hWords = h.split(' ')
    const words = n.split(' ').filter(w => w.length > 2)
    // Önce tam kelime eşleşmesi (mevcut davranış), sonra yazım hatası toleranslı eşleşme
    const exactMatches = words.filter(w => h.includes(w))
    const fuzzyMatches = words.filter(w => !h.includes(w) && hWords.some(hw => isFuzzyMatch(hw, w)))
    const totalMatches = exactMatches.length + fuzzyMatches.length * 0.85
    return totalMatches / Math.max(words.length, 1)
  }

  const TR_WORDS = ['sertifika','abonelik','fatura','iptal','abone','merkez','gaz','sayac','tesisat','kombi','baca','tapu','kimlik','randevu','kampanya','tarife','borc','odeme','kesinti','ariza','basvuru','sozlesme','sikayet','oneri','tesekkur','merhaba','naber','selam','nasil','nerede','nerde','ne','kim','kac','soru','yardim','istiyorum','lazim','olur']
  const EN_WORDS = ['hello','how','what','where','when','subscribe','subscription','bill','payment','pay','emergency','contract','cancel','customer','service','career','job','certificate','certified','campaign','tariff','debt','leak','smell','thanks','thank','goodbye','application','center','meter']

  // Kullanıcının yazdığı kelimeye en yakın bilinen anahtar kelimeyi bul (yazım hatası düzeltme önerisi için)
  const SUGGEST_WORDS = [...new Set([...TR_WORDS, ...EN_WORDS])]
  const findClosestWord = (input: string): string | null => {
    const iw = norm(input)
    if (iw.length < 3) return null
    let best: string | null = null
    let bestDist = 999
    for (const w of SUGGEST_WORDS) {
      const nw = norm(w)
      if (nw === iw) return null // zaten doğru yazılmış, öneriye gerek yok
      const d = editDistance(iw, nw)
      const tolerance = nw.length <= 5 ? 2 : 3
      if (d <= tolerance && d < bestDist) { bestDist = d; best = w }
    }
    return best
  }

  const send = (text: string, skipSpellCheck?: boolean) => {
    if (!text.trim()) return
    setMsgs(m => [...m, { r: 'me', t: text }])
    setInput('')

    // Tek kelimelik, bilinen kelimelere yakın ama tam eşleşmeyen girişte önce düzeltme öner
    const trimmed = text.trim()
    const singleWord = trimmed.split(/\s+/).length === 1
    if (!skipSpellCheck && singleWord) {
      const suggestion = findClosestWord(trimmed)
      if (suggestion) {
        const askText = `"${suggestion}" mi demek istediniz?`
        setTimeout(() => {
          setMsgs(m => [...m, {
            r: 'bot', t: askText,
            links: [
              { label: `Evet, "${suggestion}"`, url: '#', suggestValue: suggestion },
              { label: 'Hayır, yazdığım gibi ara', url: '#', suggestValue: trimmed },
            ]
          }])
        }, 300)
        return
      }
    }

    const hasTR = /[çğışöüÇĞİŞÖÜ]/i.test(text)
    const lowerText = text.toLowerCase()
    const hasTRWord = TR_WORDS.some(w => lowerText.includes(w))
    const hasENWord = EN_WORDS.some(w => lowerText.includes(w))
    // Varsayılan Türkçe; sadece bilinen İngilizce kelime varsa ve TR işareti yoksa İngilizce say
    const isEN = !hasTR && !hasTRWord && hasENWord
    let userLang: 'tr'|'en' = isEN ? 'en' : 'tr'

    let best: QA | null = null
    let bestScore = 0
    let bestLang: 'tr'|'en' = userLang
    const topMatches: {q:QA;s:number}[] = []

    for (const q of qa) {
      const trScore = score(q.question, text)
      const enScore = q.question_en ? score(q.question_en, text) : 0
      const maxScore = Math.max(trScore, enScore)
      if (maxScore > 0.2) topMatches.push({q, s:maxScore})
      if (maxScore > bestScore) {
        bestScore = maxScore
        best = q
        bestLang = enScore > trScore ? 'en' : 'tr'
      }
    }
    topMatches.sort((a,b) => b.s - a.s)
    // Güçlü eşleşme bulunduysa, eşleşen alanın dilini kullan (önceden tahmin edilen dil yerine)
    if (bestScore >= 1) userLang = bestLang

    setTimeout(() => {
      if (best && bestScore > 0.3) {
        const ans = userLang === 'en' ? (best.answer_en || best.answer) : best.answer
        const wordCount = text.trim().split(/\s+/).length

        // Kısa soruda ve çok eşleşme varsa seçenek sun
        const tiedRaw = topMatches.filter(m => m.s >= bestScore - 0.01)
        const uniqueTiedQuestions = new Set(tiedRaw.map(m => norm(m.q.question)))
        const tiedTop = uniqueTiedQuestions.size

        if (wordCount <= 2 && tiedTop >= 2) {
          const seenQ = new Set<string>()
          const options: string[] = []
          for (const m of topMatches) {
            const key = norm(m.q.question)
            if (seenQ.has(key)) continue
            seenQ.add(key)
            options.push(userLang === 'en' ? (m.q.question_en || m.q.question) : m.q.question)
            if (options.length >= 4) break
          }
          const clarify = userLang === 'en'
            ? `I found several topics related to "${text}". Which one did you mean?`
            : `"${text}" ile ilgili birkaç konu buldum. Hangisini kastetdiniz?`
          setMsgs(m => [...m, { r: 'bot', t: clarify, links: options.map(o => ({label: o, url: '#'})) }])
        } else {
          const pageLink = ans.includes('Tarife') || ans.includes('tariff') ? [{label: userLang==='en'?'Tariffs Page':'Tarifeler Sayfası', url:'/musteri-hizmetleri?s=tarifeler'}]
            : (ans.includes('Abone Merkezi') || ans.includes('abone merkez') || ans.includes('Customer Center') || ans.includes('Aliağa') || ans.includes('Bayraklı')) ? [{label: userLang==='en'?'Customer Centers':'Abone Merkezleri', url:'/musteri-hizmetleri?s=abone-merkezleri'}]
            : (ans.includes('e-Devlet') || ans.includes('e-Government')) ? [{label:'e-Devlet', url:'https://www.turkiye.gov.tr'}]
            : (ans.includes('Kariyer') || ans.includes('Career') || ans.includes('İş Başvurusu') || ans.includes('Job')) ? [{label: userLang==='en'?'Career':'Kariyer', url:'/kurumsal?s=kariyer'}]
            : (ans.includes('Sertifika') || ans.includes('Certified')) ? [{label: userLang==='en'?'Certified Companies':'Sertifikalı Firmalar', url:'/musteri-hizmetleri?s=sertifikali-firmalar'}]
            : (ans.includes('Kampanya') || ans.includes('campaign')) ? [{label: userLang==='en'?'Campaigns':'Kampanyalar', url:'/musteri-hizmetleri?s=kampanyalar'}]
            : (ans.includes('KVKK') || ans.includes('GDPR') || ans.includes('gdpr')) ? [{label: userLang==='en'?'GDPR Page':'KVKK Sayfası', url:'/kurumsal?s=kvkk'}]
            : (ans.includes('Dilekçe') || ans.includes('Petition')) ? [{label: userLang==='en'?'Petition Templates':'Dilekçe Örnekleri', url:'/musteri-hizmetleri?s=dilekce-ornekleri'}]
            : (ans.includes('SSS') || ans.includes('FAQ')) ? [{label: userLang==='en'?'FAQ':'Sık Sorulan Sorular', url:'/bilgi-bankasi?s=sss'}]
            : (ans.includes('Sözleşme') || ans.includes('contract') || ans.includes('Contract')) ? [{label: userLang==='en'?'Customer Services':'Müşteri Hizmetleri', url:'/musteri-hizmetleri'}]
            : (ans.includes('Randevu') || ans.includes('Appointment')) ? [{label: userLang==='en'?'Online Appointment':'Online Randevu', url:'/bize-ulasin?s=online-randevu'}]
            : (ans.includes('Staj') || ans.includes('Internship')) ? [{label: userLang==='en'?'Internship':'Staj Başvurusu', url:'/kurumsal?s=staj-basvurusu'}]
            : []
          const confirm = userLang === 'en' ? "Got it! Here's what I found:" : "Anladım! İşte bulduğum bilgi:"
          setMsgs(m => [...m, { r: 'bot', t: confirm }])
          setTimeout(() => {
            setMsgs(m => [...m, { r: 'bot', t: ans, links: pageLink }])
          }, 400)
        }
      } else {
        const hmm = userLang === 'en' ? 'Hmm, let me check...' : 'Hmm, kontrol ediyorum...'
        setMsgs(m => [...m, { r: 'bot', t: hmm }])
        setTimeout(() => {
          const fallback = userLang === 'en'
            ? `"${text}" for related topic not found. This platform can only assist with IzmirGaz and natural gas topics. If you have a question about our services, I would be happy to help!`
            : `"${text}" adında bir konu/belge bulunamamıştır. Bu platform yalnızca İzmirGaz ve doğal gaz hizmetleriyle ilgili konularda yardımcı olabilmektedir. Hizmetlerimizle ilgili bir sorunuz varsa memnuniyetle yardımcı olurum!`
          const fallbackLinks = userLang === 'en'
            ? [{label:'Customer Services', url:'/musteri-hizmetleri'},{label:'FAQ', url:'/bilgi-bankasi?s=sss'},{label:'Contact Us', url:'/bize-ulasin'}]
            : [{label:'Müşteri Hizmetleri', url:'/musteri-hizmetleri'},{label:'Sık Sorulan Sorular', url:'/bilgi-bankasi?s=sss'},{label:'Bize Ulaşın', url:'/bize-ulasin'}]
          setMsgs(m => [...m, { r: 'bot', t: fallback, links: fallbackLinks }])
        }, 600)
      }
    }, 500)
  }

  const QUICK = [
    { label: 'Nasıl abone olurum?', en: false },
    { label: 'Gaz kokusu aldım', en: false },
    { label: 'How to subscribe?', en: true },
    { label: 'Bill payment', en: true },
  ]

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="ai-ring fixed bottom-24 right-5 z-40 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-sky to-sky-deep text-white shadow-2xl shadow-sky-deep/40 transition-transform hover:scale-110"
        aria-label="AI Asistan"
      >
        <Sparkles size={26}/>
      </button>
    )
  }

  return (
    <div className="fixed bottom-24 right-5 z-50 w-[380px] max-w-[calc(100vw-2.5rem)] overflow-hidden rounded-3xl border-2 border-sky/40 bg-white shadow-2xl shadow-sky-deep/30">
      <div className="flex items-center justify-between bg-gradient-to-r from-sky-deep to-sky px-5 py-4 text-white">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20"><Bot size={20}/></span>
          <div>
            <p className="text-base font-bold">İzmirGaz AI Asistanı</p>
            <p className="text-xs text-white/80">🟢 Çevrimiçi · 7/24 · TR / EN</p>
          </div>
        </div>
        <button onClick={() => setOpen(false)} className="rounded-full p-2 hover:bg-white/15"><X size={18}/></button>
      </div>

      <div className="max-h-80 space-y-3 overflow-y-auto bg-slate-50 p-4">
        {msgs.map((m, i) => (
          <div key={i} className={`flex ${m.r === 'me' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${m.r === 'me' ? 'bg-sky-deep text-white' : 'bg-white text-navy shadow-sm border border-slate-100'}`}>
              <span dangerouslySetInnerHTML={{ __html: m.t.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }} />
              {m.links && m.links.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {m.links.map((l,idx) => (
                    <a key={idx}
                      href={l.url === '#' ? undefined : l.url}
                      onClick={l.url === '#' ? (e) => { e.preventDefault(); send(l.suggestValue || l.label, true) } : undefined}
                      className="inline-flex items-center gap-1 rounded-full bg-sky-deep/10 px-3 py-1 text-xs font-semibold text-sky-deep hover:bg-sky-deep hover:text-white transition-colors cursor-pointer">
                      {l.url === '#' ? '❓' : '🔗'} {l.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-200 bg-white p-3">
        <div className="mb-2 flex flex-wrap gap-1.5">
          {QUICK.map((q) => (
            <button key={q.label} onClick={() => send(q.label)}
              className={`rounded-full border px-3 py-1 text-xs font-semibold hover:bg-opacity-20 transition-colors ${q.en ? 'border-emerald/40 text-emerald hover:bg-emerald/10' : 'border-sky/40 text-sky-deep hover:bg-sky/10'}`}>
              {q.label}
            </button>
          ))}
        </div>
        <form onSubmit={(e) => { e.preventDefault(); send(input) }} className="flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Sorunuzu yazın / Type your question…"
            className="flex-1 rounded-xl border-2 border-slate-200 px-4 py-2.5 text-sm text-navy outline-none focus:border-sky-deep"
          />
          <button type="submit" className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky to-sky-deep text-white"><Send size={16}/></button>
        </form>
      </div>
    </div>
  )
}
