import { useI18n } from '../lib/i18n'
import { useState } from 'react'
import { ArrowRight, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react'

const TABS_TR = ['Yeni Abonelik', 'Sözleşme Yenileme', 'İptal', 'Şehit/Gazi/Engelli']
const TABS_EN = ['New Subscription', 'Contract Renewal', 'Cancellation', 'Martyr/Veteran/Disabled']

const STEPS_BY_TAB_EN: Record<number, { n: number; title: string; sub: string; desc: string; docs: string[] }[]> = {
  0: [
    { n: 1, title: 'Application', sub: 'New Subscription', desc: 'Share your ID and service address. Approved documents are accepted digitally.', docs: ['National ID copy', 'Title deed / rental contract', 'Phone verification'] },
    { n: 2, title: 'Survey & Design', sub: 'Field Work', desc: 'Our authorized team surveys your address and completes the project design.', docs: ['Address eligibility report', 'Piping project drawing', 'Cost estimate'] },
    { n: 3, title: 'Contract', sub: 'Official Approval', desc: 'Natural gas service agreement is signed and security deposit is collected.', docs: ['Contract signature', 'Security deposit', 'GDPR consent'] },
    { n: 4, title: 'Interior Piping', sub: 'Certified Company', desc: 'Authorized company installs interior piping and performs leak tests.', docs: ['Pipe installation', 'Leak test', 'Chimney check'] },
    { n: 5, title: 'Meter & Activation', sub: 'Commissioning', desc: 'Your meter is installed, system is pressurized and natural gas supply starts.', docs: ['Meter installation', 'Pressure test', 'First activation'] },
    { n: 6, title: 'Service Active', sub: 'Congratulations', desc: 'Your natural gas service is active. 24/7 support: 187', docs: ['User manual', 'Emergency: 187', 'Mobile app'] },
  ],
  1: [
    { n: 1, title: 'Authentication', sub: 'Contract Renewal', desc: 'Log in with your contract number and ID.', docs: ['Contract number', 'National ID', 'SMS verification'] },
    { n: 2, title: 'Current Contract', sub: 'Info Review', desc: 'Review your active contract information and note any changes needed.', docs: ['Tariff selection', 'Address confirmation', 'Contact info'] },
    { n: 3, title: 'Updated Documents', sub: 'Document Upload', desc: 'Upload your current residence / title deed document.', docs: ['Title deed / rental', 'Residence proof', 'Previous contract'] },
    { n: 4, title: 'Approval', sub: 'Digital Signature', desc: 'Approve the new term contract conditions.', docs: ['GDPR consent', 'Contract read', 'Digital signature'] },
    { n: 5, title: 'Processing', sub: 'System Update', desc: 'Your contract renewal is being processed in the system.', docs: ['System update', 'Email notification', 'SMS confirmation'] },
    { n: 6, title: 'Renewal Complete', sub: 'Active', desc: 'Contract renewal complete. Service continues without interruption.', docs: ['New contract PDF', 'Mobile notification', 'Customer line: 187'] },
  ],
  2: [
    { n: 1, title: 'Cancellation Request', sub: 'Contract Cancellation', desc: 'Enter the contract number you wish to cancel.', docs: ['Contract number', 'National ID', 'Cancellation reason'] },
    { n: 2, title: 'Meter Reading', sub: 'Final Reading', desc: 'Report your last meter reading or book a technical team appointment.', docs: ['Meter photo', 'Reading value', 'Appointment date'] },
    { n: 3, title: 'Settlement', sub: 'Final Invoice', desc: 'Your final invoice is calculated and security deposit refund is initiated.', docs: ['Final invoice', 'Refund amount', 'Bank details'] },
    { n: 4, title: 'Disconnection', sub: 'Meter Removal', desc: 'Technical team removes the meter and disconnects the service.', docs: ['Disconnection report', 'Meter seal', 'Technical signature'] },
    { n: 5, title: 'Refund', sub: 'Deposit Return', desc: 'Security deposit is transferred to your account within 5 business days.', docs: ['IBAN verification', 'Transfer date', 'Receipt'] },
    { n: 6, title: 'Cancellation Complete', sub: 'Done', desc: 'Your contract has been cancelled. Reapplication is always possible.', docs: ['Cancellation PDF', 'Refund notification', 'Reapplication'] },
  ],
  3: [
    { n: 1, title: 'Application', sub: 'Special Subscription', desc: 'Share your veteran / disabled certificate and ID.', docs: ['Certificate', 'National ID', 'Phone verification'] },
    { n: 2, title: 'Verification', sub: 'Document Review', desc: 'Our team verifies your documents and determines the special tariff.', docs: ['Certificate verification', 'Tariff determination', 'Address check'] },
    { n: 3, title: 'Survey', sub: 'Field Work', desc: 'Our authorized team surveys your address.', docs: ['Address eligibility', 'Technical report', 'Project'] },
    { n: 4, title: 'Contract', sub: 'Special Terms', desc: 'Sign your special terms contract digitally.', docs: ['GDPR consent', 'Contract', 'Digital signature'] },
    { n: 5, title: 'Activation', sub: 'Meter & Gas', desc: 'Meter installation and gas activation.', docs: ['Meter installation', 'Pressure test', 'First activation'] },
    { n: 6, title: 'Service Active', sub: 'Congratulations', desc: 'Your discounted service has started. Support: 187', docs: ['Service active', 'Special support line', 'Mobile app'] },
  ],
}

const STEPS_BY_TAB: Record<number, { n: number; title: string; sub: string; desc: string; docs: string[] }[]> = {
  0: [
    { n: 1, title: 'Başvuru', sub: 'Yeni Abonelik', desc: 'Kimlik ve hizmet adresinizi bizimle paylaşın. Onaylı belgeleriniz dijital olarak kabul edilir.', docs: ['T.C. kimlik fotokopisi', 'İskan / tapu / kira sözleşmesi', 'Telefon doğrulaması'] },
    { n: 2, title: 'Keşif & Proje', sub: 'Saha Çalışması', desc: 'Yetkili ekibimiz adresinizde keşif yapar, projelendirme tamamlanır.', docs: ['Adres uygunluk raporu', 'Tesisat proje çizimi', 'Maliyet teklifi'] },
    { n: 3, title: 'Sözleşme', sub: 'Resmi Onay', desc: 'Doğal gaz hizmet sözleşmesi imzalanır, güvence bedeli alınır.', docs: ['Sözleşme imzası', 'Güvence bedeli', 'KVKK onayı'] },
    { n: 4, title: 'İç Tesisat', sub: 'Sertifikalı Firma', desc: 'Yetkili firma iç tesisat döşemesini yapar, sızdırmazlık testleri uygulanır.', docs: ['Boru döşeme', 'Sızdırmazlık testi', 'Baca kontrolü'] },
    { n: 5, title: 'Sayaç & Açma', sub: 'Devreye Alma', desc: 'Sayacınız takılır, sistem basınçlandırılır ve doğal gaz arzı başlatılır.', docs: ['Sayaç montajı', 'Basınç testi', 'İlk açma'] },
    { n: 6, title: 'Hizmet Aktif', sub: 'Tebrikler', desc: 'Doğal gaz hizmetiniz aktif. 7/24 destek hattımız: 187', docs: ['Kullanım kılavuzu', 'Acil hat: 187', 'Mobil uygulama'] },
  ],
  1: [
    { n: 1, title: 'Kimlik Doğrulama', sub: 'Sözleşme Yenileme', desc: 'Mevcut sözleşme numaranız ve T.C. kimliğiniz ile sisteme giriş yapın.', docs: ['Sözleşme numarası', 'T.C. kimlik', 'SMS doğrulama'] },
    { n: 2, title: 'Mevcut Sözleşme', sub: 'Bilgi Kontrolü', desc: 'Aktif sözleşme bilgilerinizi gözden geçirin, değişiklik gerekiyorsa belirtin.', docs: ['Tarife seçimi', 'Adres teyidi', 'İletişim bilgileri'] },
    { n: 3, title: 'Güncel Belgeler', sub: 'Evrak Yükleme', desc: 'Güncel ikametgah / tapu belgenizi yükleyin.', docs: ['Tapu/kira belgesi', 'İkametgah', 'Önceki sözleşme'] },
    { n: 4, title: 'Onay', sub: 'Dijital İmza', desc: 'Yeni dönem sözleşme şartlarını onaylayın.', docs: ['KVKK onayı', 'Sözleşme okundu', 'Dijital imza'] },
    { n: 5, title: 'Ödeme', sub: 'Güvence Bedeli', desc: 'Varsa güncel güvence bedeli farkını ödeyin.', docs: ['Kart ile ödeme', 'Havale/EFT', 'Fatura tercihi'] },
    { n: 6, title: 'Yenileme Tamam', sub: 'Aktif', desc: 'Sözleşme yenilemeniz tamamlandı. Hizmet kesintisiz devam ediyor.', docs: ['Yeni sözleşme PDF', 'Mobil bildirim', 'Müşteri hattı: 187'] },
  ],
  2: [
    { n: 1, title: 'İptal Talebi', sub: 'Sözleşme İptali', desc: 'İptal etmek istediğiniz sözleşme numarasını girin.', docs: ['Sözleşme numarası', 'T.C. kimlik', 'İptal sebebi'] },
    { n: 2, title: 'Sayaç Endeksi', sub: 'Son Okuma', desc: 'Son sayaç endeksinizi bildirin veya teknik ekip randevusu alın.', docs: ['Sayaç fotoğrafı', 'Endeks değeri', 'Randevu tarihi'] },
    { n: 3, title: 'Son Fatura', sub: 'Hesap Kapama', desc: 'Açık bakiyenizi görüntüleyin ve ödeyin.', docs: ['Açık fatura', 'Son tüketim', 'Ödeme'] },
    { n: 4, title: 'Gaz Kesimi', sub: 'Teknik Ziyaret', desc: 'Yetkili ekip adresinizde gaz kesim işlemini gerçekleştirir.', docs: ['Randevu', 'Mühürleme', 'Tutanak'] },
    { n: 5, title: 'Güvence İadesi', sub: 'IBAN', desc: 'Güvence bedeli iadesi için IBAN bilgilerinizi girin.', docs: ['IBAN', 'Ad/Soyad eşleşmesi', 'Onay'] },
    { n: 6, title: 'İptal Tamam', sub: 'Sonlandı', desc: 'Sözleşmeniz iptal edildi. Tekrar başvuru her zaman mümkün.', docs: ['İptal belgesi PDF', 'İade bildirimi', 'Tekrar başvuru'] },
  ],
  3: [
    { n: 1, title: 'Statü Beyanı', sub: 'Şehit/Gazi/Engelli', desc: 'Hak sahipliği durumunuzu seçin (Şehit yakını / Gazi / Engelli).', docs: ['Statü seçimi', 'T.C. kimlik', 'İletişim'] },
    { n: 2, title: 'Resmi Belgeler', sub: 'Doğrulama', desc: 'İlgili kuruma ait resmi belgenizi yükleyin.', docs: ['SGK / AÇSHB belgesi', 'Engelli sağlık kurulu raporu', 'Şehitlik belgesi'] },
    { n: 3, title: 'İndirim Tarifesi', sub: 'Özel Tarife', desc: 'Hak sahipliğinize uygun indirimli tarife otomatik atanır.', docs: ['Tarife karşılaştırma', 'EPDK onayı', 'Geriye dönük hak'] },
    { n: 4, title: 'Sözleşme', sub: 'Özel Şartlar', desc: 'Özel şartlı sözleşmenizi dijital olarak imzalayın.', docs: ['KVKK onayı', 'Sözleşme', 'Dijital imza'] },
    { n: 5, title: 'Kurulum', sub: 'Öncelikli', desc: 'Öncelikli kurulum sırasına alınırsınız.', docs: ['Randevu', 'Saha ekibi', 'Hızlı aktivasyon'] },
    { n: 6, title: 'Hizmet Aktif', sub: 'Tebrikler', desc: 'İndirimli hizmetiniz başladı. Destek hattı: 187', docs: ['Hizmet aktif', 'Özel destek hattı', 'Mobil uygulama'] },
  ],
}

function reTC(v: string) { return /^[1-9][0-9]{10}$/.test(v) }
function reTel(v: string) { return /^(\+90|0)?5[0-9]{9}$/.test(v.replace(/\s/g, '')) }

export function Protocol() {
  const { lang } = useI18n()
  const [tab, setTab] = useState(0)
  const [step, setStep] = useState(1)
  const [tel, setTel] = useState('')
  const [tc, setTc] = useState('')
  const [tip, setTip] = useState('Mülk Sahibi')
  const [adres, setAdres] = useState('')
  const okTel = reTel(tel); const okTc = reTC(tc)

  const STEPS = (lang === 'en' ? STEPS_BY_TAB_EN : STEPS_BY_TAB)[tab]; const cur = STEPS[step - 1]
  const valid = okTel && okTc && adres.length > 5

  return (
    <section id="protocol" className="bg-mist py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="font-mono text-sm uppercase tracking-widest text-emerald">{lang === 'en' ? '— Section 02 · Process' : '— Bölüm 02 · Süreç'}</p>
          <h2 className="mt-4 font-heading text-5xl font-bold tracking-tight text-navy md:text-6xl">
            Nasıl abone <span className="font-serif italic text-gradient">olurum?</span>
          </h2>
          <p className="mt-4 text-lg text-slate">{lang === 'en' ? 'Six elegant steps — with the discipline of a chronograph second hand.' : 'Altı zarif adımda — bir kronograf yelkovanının disiplini ile.'}</p>
        </div>

        {/* Tabs */}
        <div className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-2">
          {(lang === 'en' ? TABS_EN : TABS_TR).map((t, i) => (
            <button key={t} onClick={()=>setTab(i)} className={`rounded-lg border-2 px-5 py-3 font-mono text-sm font-bold uppercase tracking-widest transition-all ${tab===i?'border-navy bg-navy text-white':'border-slate-200 bg-white text-navy hover:border-navy/30'}`}>
              {t}
            </button>
          ))}
        </div>

        {/* Step indicator */}
        <div className="mx-auto mt-12 max-w-5xl">
          <div className="relative flex items-center justify-between">
            <div className="absolute left-0 right-0 top-1/2 h-0.5 -translate-y-1/2 bg-slate-200"/>
            <div className="absolute left-0 top-1/2 h-0.5 -translate-y-1/2 bg-emerald transition-all duration-500" style={{width:`${((step-1)/(STEPS.length-1))*100}%`}}/>
            {STEPS.map((s: {n:number;title:string;sub:string;desc:string;docs:string[]})=>(
              <button key={s.n} onClick={()=>setStep(s.n)} className="relative z-10 flex flex-col items-center">
                <span className={`flex h-16 w-16 items-center justify-center rounded-full border-4 font-serif text-2xl font-light transition-all ${step>=s.n?'border-emerald bg-white text-navy':'border-slate-200 bg-white text-slate'} ${step===s.n?'scale-110 shadow-xl shadow-emerald/30 ring-4 ring-emerald/20':''}`}>
                  {s.n}
                </span>
                <p className="mt-3 font-mono text-[11px] font-bold uppercase tracking-widest text-slate">{lang === 'en' ? 'Step' : 'Adım'} {s.n}</p>
                <p className="mt-1 font-serif text-base italic text-navy">{s.title}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Form panel */}
        <div className="mx-auto mt-14 max-w-6xl rounded-[2.5rem] border-2 border-slate-200 bg-white p-8 shadow-2xl shadow-sky-deep/10 md:p-12">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-emerald">{lang === 'en' ? 'Step' : 'Adım'} {cur.n} · {(lang === 'en' ? TABS_EN : TABS_TR)[tab]}</p>
              <h3 className="mt-3 font-serif text-4xl font-light italic text-navy">{cur.title}</h3>
              <p className="mt-4 text-lg leading-relaxed text-slate">{cur.desc}</p>
              <ul className="mt-6 space-y-3">
                {cur.docs.map((d: string)=>(
                  <li key={d} className="flex items-center gap-3 font-serif text-base italic text-navy">
                    <span className="h-2 w-2 rounded-full bg-emerald"/> {d}
                  </li>
                ))}
              </ul>

              {/* Tip seçimi */}
              <div className="mt-8">
                <label className="mb-3 block font-mono text-xs font-bold uppercase tracking-widest text-slate">{lang === 'en' ? 'APPLICATION TYPE' : 'BAŞVURU TİPİ'}</label>
                <div className="flex flex-wrap gap-3">
                  {(lang === 'en' ? ['Property Owner','Tenant','Foreign National'] : ['Mülk Sahibi','Kiracı','Yabancı Uyruklu']).map(o=>(
                    <label key={o} className={`cursor-pointer rounded-xl border-2 px-5 py-3 text-base font-semibold transition-all ${tip===o?'border-emerald bg-emerald/10 text-navy':'border-slate-200 bg-white text-slate hover:border-slate-300'}`}>
                      <input type="radio" name="tip" checked={tip===o} onChange={()=>setTip(o)} className="sr-only"/>
                      {o}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block font-mono text-xs font-bold uppercase tracking-widest text-slate">{lang === 'en' ? 'PHONE' : 'TELEFON'}</label>
                <input value={tel} onChange={(e)=>setTel(e.target.value)} placeholder="+90 5xx xxx xx xx"
                  className={`w-full rounded-xl border-2 px-5 py-4 text-lg text-navy outline-none transition-colors ${tel && !okTel ? 'border-red-500' : okTel ? 'border-emerald' : 'border-slate-200 focus:border-sky-deep'}`}/>
                {tel && !okTel && <p className="mt-2 flex items-center gap-1.5 text-sm text-red-600"><AlertCircle size={14}/> Geçerli bir telefon girin.</p>}
              </div>
              <div>
                <label className="mb-2 block font-mono text-xs font-bold uppercase tracking-widest text-slate">{lang === 'en' ? 'ID NUMBER' : 'T.C. KİMLİK'}</label>
                <input value={tc} onChange={(e)=>setTc(e.target.value.replace(/\D/g,'').slice(0,11))} placeholder={lang === "en" ? "11 digits" : "11 haneli"}
                  className={`w-full rounded-xl border-2 px-5 py-4 text-lg text-navy outline-none transition-colors ${tc && !okTc ? 'border-red-500' : okTc ? 'border-emerald' : 'border-slate-200 focus:border-sky-deep'}`}/>
                {tc && !okTc && <p className="mt-2 flex items-center gap-1.5 text-sm text-red-600"><AlertCircle size={14}/> Geçerli T.C. kimlik girin.</p>}
              </div>
              <div>
                <label className="mb-2 block font-mono text-xs font-bold uppercase tracking-widest text-slate">{lang === 'en' ? 'SERVICE ADDRESS' : 'HİZMET ADRESİ'}</label>
                <textarea value={adres} onChange={(e)=>setAdres(e.target.value)} rows={3} placeholder="Mahalle, sokak, kapı no"
                  className="w-full rounded-xl border-2 border-slate-200 px-5 py-4 text-lg text-navy outline-none focus:border-sky-deep"/>
              </div>
              {valid && <p className="flex items-center gap-2 rounded-xl bg-emerald/10 px-4 py-3 text-base font-semibold text-emerald"><CheckCircle2 size={18}/> Bilgileriniz doğrulandı.</p>}

              <div className="flex items-center justify-between border-t border-slate-200 pt-6">
                <button onClick={()=>setStep(Math.max(1,step-1))} disabled={step===1} className="inline-flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-widest text-slate disabled:opacity-40 hover:text-navy">
                  <ArrowLeft size={16}/> Önceki
                </button>
                <span className="font-serif text-sm italic text-slate">{step} / {STEPS.length}</span>
                <button onClick={()=>setStep(Math.min(STEPS.length,step+1))} disabled={!valid && step < STEPS.length}
                  className={`inline-flex items-center gap-2 rounded-xl px-6 py-3 font-mono text-sm font-bold uppercase tracking-widest transition-all ${valid || step===STEPS.length ? 'bg-emerald text-white hover:bg-emerald-glow' : 'cursor-not-allowed bg-slate-200 text-slate'}`}>
                  {step===STEPS.length?(lang === 'en' ? 'Complete' : 'Tamamla'):(lang === 'en' ? 'Next' : 'İlerle')} <ArrowRight size={16}/>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
