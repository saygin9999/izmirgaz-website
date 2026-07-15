// src/components/navbar.tsx
import { useEffect, useState, useRef } from 'react'
import { Menu, X, ChevronDown, Globe, Search, ExternalLink } from 'lucide-react'
import { useI18n } from '../lib/i18n'
import { trMenu } from '../lib/menu-i18n'
import { ThemeToggle } from './theme-toggle'
import { api, type MenuItem } from '../lib/api'
import logoUrl from '../assets/izmirgaz-logo-real.png'
import iconInstagram from '../assets/icon-instagram.png'
import iconLinkedin from '../assets/icon-linkedin.png'
import iconX from '../assets/icon-x.png'
import iconFacebook from '../assets/icon-facebook.png'


const SITE_PAGES = [
  // KURUMSAL
  { label: "İzmir Doğal Gaz", labelEn: "Izmir Natural Gas", url: "/kurumsal?s=izmir-dogal-gaz", category: "Kurumsal", categoryEn: "Corporate", keywords: ["hakkımızda","izmir","doğal gaz","şirket","tarihçe"], keywordsEn: ["about","izmir","natural gas","company","history"] },
  { label: "Vizyon & Misyon", labelEn: "Vision & Mission", url: "/kurumsal?s=vizyon-misyon", category: "Kurumsal", categoryEn: "Corporate", keywords: ["vizyon","misyon","değer","hedef"], keywordsEn: ["vision","mission","value","goal"] },
  { label: "Politikalarımız", labelEn: "Our Policies", url: "/kurumsal?s=politikalarimiz", category: "Kurumsal", categoryEn: "Corporate", keywords: ["politika","kalite","çevre"], keywordsEn: ["policy","quality","environment"] },
  { label: "Basın Odası", labelEn: "Press Room", url: "/kurumsal?s=basin-odasi", category: "Kurumsal", categoryEn: "Corporate", keywords: ["basın","haber","medya","oda"], keywordsEn: ["press","news","media","room"] },
  { label: "Basın Bültenleri", labelEn: "Press Releases", url: "/kurumsal?s=basin-bultenleri", category: "Kurumsal", categoryEn: "Corporate", keywords: ["bülten","basın","duyuru"], keywordsEn: ["release","press","announcement"] },
  { label: "Sosyal Sorumluluk", labelEn: "Social Responsibility", url: "/kurumsal?s=sosyal-sorumluluk", category: "Kurumsal", categoryEn: "Corporate", keywords: ["sosyal","sorumluluk","proje"], keywordsEn: ["social","responsibility","project"] },
  { label: "Logolarımız", labelEn: "Our Logos", url: "/kurumsal?s=logolarimiz", category: "Kurumsal", categoryEn: "Corporate", keywords: ["logo","kurumsal","kimlik"], keywordsEn: ["logo","corporate","identity"] },
  { label: "KVKK Aydınlatma Metni", labelEn: "GDPR Disclosure", url: "/kurumsal?s=aydinlatma-metni", category: "Kurumsal", categoryEn: "Corporate", keywords: ["kvkk","gizlilik","kişisel","veri"], keywordsEn: ["gdpr","privacy","personal","data"] },
  { label: "Kariyer", labelEn: "Career", url: "/kurumsal?s=kariyer", category: "İnsan Kaynakları", categoryEn: "Human Resources", keywords: ["kariyer","iş","çalışma","pozisyon"], keywordsEn: ["career","job","work","position"] },
  { label: "İş Başvurusu", labelEn: "Job Application", url: "/kurumsal?s=is-basvurusu", category: "İnsan Kaynakları", categoryEn: "Human Resources", keywords: ["iş","başvuru","cv","form"], keywordsEn: ["job","application","cv","form"] },
  { label: "Staj Başvurusu", labelEn: "Internship Application", url: "/kurumsal?s=staj-basvurusu", category: "İnsan Kaynakları", categoryEn: "Human Resources", keywords: ["staj","öğrenci","başvuru"], keywordsEn: ["internship","student","application"] },
  { label: "Leed Sertifikası", labelEn: "LEED Certificate", url: "/kurumsal?s=leed-sertifikasi", category: "Kurumsal", categoryEn: "Corporate", keywords: ["leed","sertifika","çevre","gold"], keywordsEn: ["leed","certificate","environment","gold"] },
  { label: "Bilgi Toplumu Hizmetleri", labelEn: "Information Society Services", url: "/kurumsal?s=bilgi-toplumu", category: "Kurumsal", categoryEn: "Corporate", keywords: ["bilgi","toplum","hizmet"], keywordsEn: ["information","society","service"] },
  // MÜ�?TERİ HİZMETLERİ
  { label: "Nasıl Abone Olurum", labelEn: "How to Subscribe", url: "/musteri-hizmetleri?s=nasil-abone", category: "Abonelik", categoryEn: "Subscription", keywords: ["abone","nasıl","başvuru","yeni","kayıt"], keywordsEn: ["subscribe","how","application","new","registration"] },
  { label: "Abonelik Sözleşmesi", labelEn: "Subscription Contract", url: "/musteri-hizmetleri?s=abonelik-sozlesmesi", category: "Abonelik", categoryEn: "Subscription", keywords: ["sözleşme","abonelik","kontrat"], keywordsEn: ["contract","subscription","agreement"] },
  { label: "Sözleşme Sonlandırma", labelEn: "Contract Termination", url: "/musteri-hizmetleri?s=sozlesme-sonlandirma", category: "Abonelik", categoryEn: "Subscription", keywords: ["sonlandırma","iptal","kapatma","çıkış"], keywordsEn: ["termination","cancel","close","exit"] },
  { label: "Abone Merkezlerimiz", labelEn: "Our Customer Centers", url: "/musteri-hizmetleri?s=abone-merkezleri", category: "Abonelik", categoryEn: "Subscription", keywords: ["merkez","adres","nerede","ofis"], keywordsEn: ["center","address","where","office"] },
  { label: "Faturematik", labelEn: "Faturematik", url: "/musteri-hizmetleri?s=faturematik", category: "Fatura & Ödeme", categoryEn: "Billing & Payment", keywords: ["faturematik","otomatik","ödeme","banka"], keywordsEn: ["faturematik","automatic","payment","bank"] },
  { label: "Ödeme Noktaları", labelEn: "Payment Points", url: "/musteri-hizmetleri?s=odeme-noktalari", category: "Fatura & Ödeme", categoryEn: "Billing & Payment", keywords: ["ödeme","nerede","nokta","atm","ptt"], keywordsEn: ["payment","where","point","atm","ptt"] },
  { label: "Kampanyalarımız", labelEn: "Our Campaigns", url: "/musteri-hizmetleri?s=kampanyalar", category: "Müşteri Hizmetleri", categoryEn: "Customer Services", keywords: ["kampanya","indirim","fırsat","promosyon"], keywordsEn: ["campaign","discount","offer","promotion"] },
  { label: "Proje Onay", labelEn: "Project Approval", url: "/musteri-hizmetleri?s=proje-onay", category: "İç Tesisat", categoryEn: "Interior Piping", keywords: ["proje","onay","tesisat","iç"], keywordsEn: ["project","approval","piping","interior"] },
  { label: "Gaz Açma", labelEn: "Gas Activation", url: "/musteri-hizmetleri?s=gaz-acma", category: "İç Tesisat", categoryEn: "Interior Piping", keywords: ["gaz","açma","randevu","bağlantı"], keywordsEn: ["gas","activation","appointment","connection"] },
  { label: "Sertifikalı Firmalar", labelEn: "Certified Companies", url: "/musteri-hizmetleri?s=sertifikali-firmalar", category: "İç Tesisat", categoryEn: "Interior Piping", keywords: ["sertifika","firma","list","tesisat"], keywordsEn: ["certificate","company","list","piping"] },
  { label: "7/24 İç Tesisat Yardım", labelEn: "24/7 Interior Piping Support", url: "/musteri-hizmetleri?s=ic-tesisat-yardim", category: "İç Tesisat", categoryEn: "Interior Piping", keywords: ["yardım","arıza","gece","acil","tesisat"], keywordsEn: ["support","malfunction","night","emergency","piping"] },
  { label: "Teknik Şartname", labelEn: "Technical Specification", url: "/musteri-hizmetleri?s=teknik-sartname", category: "İç Tesisat", categoryEn: "Interior Piping", keywords: ["teknik","şartname","belge"], keywordsEn: ["technical","specification","document"] },
  { label: "Serbest Tüketiciler", labelEn: "Eligible Customers", url: "/musteri-hizmetleri?s=serbest-tuketiciler", category: "Müşteri Hizmetleri", categoryEn: "Customer Services", keywords: ["serbest","tüketici","büyük","endüstri"], keywordsEn: ["eligible","customer","large","industry"] },
  { label: "Faturalandırma", labelEn: "Billing", url: "/musteri-hizmetleri?s=faturalandirma", category: "Fatura & Ödeme", categoryEn: "Billing & Payment", keywords: ["fatura","hesap","tutar","fiyat"], keywordsEn: ["bill","account","amount","price"] },
  { label: "Tarifeler", labelEn: "Tariffs", url: "/musteri-hizmetleri?s=tarifeler", category: "Fatura & Ödeme", categoryEn: "Billing & Payment", keywords: ["tarife","fiyat","ücret","birim"], keywordsEn: ["tariff","price","fee","unit"] },
  { label: "Güvence Bedeli", labelEn: "Security Deposit", url: "/musteri-hizmetleri?s=guvence-bedeli", category: "Fatura & Ödeme", categoryEn: "Billing & Payment", keywords: ["güvence","bedel","depozito","teminat"], keywordsEn: ["security","fee","deposit","guarantee"] },
  { label: "Dilekçe Örnekleri", labelEn: "Petition Templates", url: "/musteri-hizmetleri?s=dilekce-ornekleri", category: "Müşteri Hizmetleri", categoryEn: "Customer Services", keywords: ["dilekçe","örnek","form","belge"], keywordsEn: ["petition","template","form","document"] },
  { label: "Müşteri Memnuniyet Anketi", labelEn: "Customer Satisfaction Survey", url: "/musteri-hizmetleri?s=memnuniyet-anketi", category: "Müşteri Hizmetleri", categoryEn: "Customer Services", keywords: ["anket","memnuniyet","değerlendirme"], keywordsEn: ["survey","satisfaction","evaluation"] },
  { label: "Periyodik Bakım Programı", labelEn: "Periodic Maintenance Program", url: "/musteri-hizmetleri?s=periyodik-bakim", category: "Müşteri Hizmetleri", categoryEn: "Customer Services", keywords: ["bakım","periyodik","kontrol","program"], keywordsEn: ["maintenance","periodic","check","program"] },
  { label: "Yakıt Karşılaştırma", labelEn: "Fuel Comparison", url: "/musteri-hizmetleri?s=yakit-karsilastirma", category: "Müşteri Hizmetleri", categoryEn: "Customer Services", keywords: ["yakıt","karşılaştırma","tablo","ekonomi"], keywordsEn: ["fuel","comparison","table","economy"] },
  // BİLGİ BANKASI
  { label: "Doğal Gaz Nedir?", labelEn: "What is Natural Gas?", url: "/bilgi-bankasi?s=dogal-gaz-nedir", category: "Bilgi Bankası", categoryEn: "Knowledge Bank", keywords: ["nedir","doğal","gaz","bilgi"], keywordsEn: ["what","natural","gas","information"] },
  { label: "Acil Müdahale 187", labelEn: "Emergency Response 187", url: "/bilgi-bankasi?s=acil-187", category: "Bilgi Bankası", categoryEn: "Knowledge Bank", keywords: ["acil","187","müdahale","kaçak","tehlike"], keywordsEn: ["emergency","187","response","leak","danger"] },
  { label: "Sık Sorulan Sorular", labelEn: "FAQ", url: "/bilgi-bankasi?s=sss", category: "Bilgi Bankası", categoryEn: "Knowledge Bank", keywords: ["sss","soru","cevap","yardım"], keywordsEn: ["faq","question","answer","help"] },
  { label: "Verimli Kullanım", labelEn: "Efficient Use", url: "/bilgi-bankasi?s=verimli-kullanim", category: "Bilgi Bankası", categoryEn: "Knowledge Bank", keywords: ["verimli","tasarruf","ekonomi","kullanım"], keywordsEn: ["efficient","saving","economy","use"] },
  { label: "Güvenlik Önerileri", labelEn: "Safety Recommendations", url: "/bilgi-bankasi?s=yakma-cihazlari", category: "Bilgi Bankası", categoryEn: "Knowledge Bank", keywords: ["güvenlik","öneri","cihaz","yakma"], keywordsEn: ["safety","recommendation","appliance","combustion"] },
  { label: "�?ebeke Güvenliği", labelEn: "Network Safety", url: "/bilgi-bankasi?s=sebeke-guvenligi", category: "Bilgi Bankası", categoryEn: "Knowledge Bank", keywords: ["şebeke","güvenlik","boru","hat"], keywordsEn: ["network","safety","pipe","line"] },
  { label: "Kombi Kullanım Rehberi", labelEn: "Boiler User Guide", url: "/bilgi-bankasi?s=kombi-rehberi", category: "Bilgi Bankası", categoryEn: "Knowledge Bank", keywords: ["kombi","rehber","kullanım","ısınma"], keywordsEn: ["boiler","guide","use","heating"] },
  { label: "Faydalı Videolar", labelEn: "Useful Videos", url: "/bilgi-bankasi?s=faydali-videolar", category: "Bilgi Bankası", categoryEn: "Knowledge Bank", keywords: ["video","izle","faydalı","eğitim"], keywordsEn: ["video","watch","useful","training"] },
  { label: "Mevzuat", labelEn: "Legislation", url: "/bilgi-bankasi?s=mevzuat", category: "Bilgi Bankası", categoryEn: "Knowledge Bank", keywords: ["mevzuat","kanun","yönetmelik","hukuk"], keywordsEn: ["legislation","law","regulation","legal"] },
  // BİZE ULA�?IN
  { label: "Online Randevu", labelEn: "Online Appointment", url: "/bize-ulasin?s=online-randevu", category: "Bize Ulaşın", categoryEn: "Contact Us", keywords: ["randevu","online","ziyaret","gelmek"], keywordsEn: ["appointment","online","visit","come"] },
  { label: "Talep & �?ikayet", labelEn: "Request & Complaint", url: "/bize-ulasin?s=talep-sikayet", category: "Bize Ulaşın", categoryEn: "Contact Us", keywords: ["şikayet","talep","itiraz","sorun"], keywordsEn: ["complaint","request","objection","problem"] },
  { label: "Sokağımda Gaz Var mı?", labelEn: "Is Gas Available On My Street?", url: "/bize-ulasin?s=sokakta-gaz", category: "Bize Ulaşın", categoryEn: "Contact Us", keywords: ["sokak","gaz","var","altyapı","mahalle"], keywordsEn: ["street","gas","available","infrastructure","neighborhood"] },
  { label: "e-Devlet İşlemleri", labelEn: "e-Government Transactions", url: "/bize-ulasin?s=edevlet-abonelik", category: "Bize Ulaşın", categoryEn: "Contact Us", keywords: ["edevlet","devlet","online","dijital"], keywordsEn: ["egov","government","online","digital"] },
];


export function Navbar({ className }: { className?: string }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { lang, setLang, t } = useI18n()
  const [menuTree, setMenuTree] = useState<MenuItem[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<typeof NAVBAR_QA>([])
  const [searchAnswer, setSearchAnswer] = useState('')
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch('http://localhost:5001/api/menu')
      .then(r => r.json())
      .then(data => {
        // API'den gelen flat array'i tree'ye çevir
        const parents = data.filter((item: any) => !item.parent_id)
        const children = data.filter((item: any) => item.parent_id)
        const tree = parents.map((p: any) => ({
          ...p,
          children: children.filter((c: any) => c.parent_id === p.id)
        }))
        setMenuTree(tree)
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Ana menü (parent_id = null)
  const topItems = menuTree.filter(m => !m.parent_id)

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className={`w-full transition-all duration-300 ${scrolled ? 'bg-white/95 shadow-md shadow-sky-deep/10 backdrop-blur-xl' : 'bg-white/80 backdrop-blur-md'} border-b border-slate-200/70`}>
        <nav className="mx-auto flex h-28 w-full max-w-[1600px] items-center justify-between gap-6 px-4 md:px-8 lg:px-12">
          <a href="/" className="flex shrink-0 items-center gap-3 lift-hover">
            <img src={logoUrl} alt="İzmirGaz — Doğal Gaz Uygarlığı" className="h-24 w-auto object-contain md:h-28" />          </a>

          <div className="hidden flex-1 items-center justify-center gap-10 lg:flex">
            {topItems.map((item) => {
              const children = item.children || []
              // Alt başlıkları group_header'a göre grupla
              const grouped = children.reduce<Record<string, MenuItem[]>>((acc, child) => {
                const header = child.group_header || 'Diğer'
                if (!acc[header]) acc[header] = []
                acc[header].push(child)
                return acc
              }, {})
              const groups = Object.entries(grouped)

              return (
                <div key={item.id} className="mega-trigger group relative">
                  <button onClick={() => { if(item.href && item.href !== '#') window.location.href = item.href }} className="flex items-center gap-1.5 rounded-full border-2 border-sky-deep/30 bg-gradient-to-b from-white to-sky/10 px-9 py-5 text-lg font-bold text-navy shadow-sm transition-all hover:-translate-y-0.5 hover:border-sky-deep hover:bg-sky-deep hover:text-white hover:shadow-lg hover:shadow-sky-deep/30">
                    {trMenu(item.label, lang)}
                    {groups.length > 0 && <ChevronDown size={16} className="transition-transform group-hover:rotate-180" />}
                  </button>

                  {groups.length > 0 && (
                    <div className="mega-panel absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3">
                      <div
                        className="rounded-2xl border border-slate-200 bg-white p-7 shadow-2xl shadow-sky-deep/15"
                        style={{ width: groups.length >= 4 ? '900px' : '680px' }}
                      >
                        <div className={`grid gap-7 grid-cols-${Math.min(groups.length, 4)}`}
                          style={{ gridTemplateColumns: `repeat(${Math.min(groups.length, 4)}, 1fr)` }}
                        >
                          {groups.map(([header, items]) => (
                            <div key={trMenu(header, lang)}>
                              <h4 className="mb-3 border-b border-sky/30 pb-2 font-mono text-xs font-bold uppercase tracking-widest text-sky-deep">
                                {trMenu(header, lang)}
                              </h4>
                              <ul className="space-y-2">
                                {items.map((child) => (
                                  <li key={child.id}>
                                    <a href={child.href || '#'} className="block rounded-md px-2 py-1.5 text-[15px] font-medium text-ink transition-colors hover:bg-sky/10 hover:text-sky-deep">
                                      {trMenu(child.label, lang)}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
            <a href="/bize-ulasin" className="rounded-full border-2 border-emerald/40 bg-emerald/5 px-9 py-5 text-lg font-bold text-navy shadow-sm transition-all hover:-translate-y-0.5 hover:border-emerald hover:bg-emerald hover:text-white hover:shadow-lg hover:shadow-emerald/30">
              {t('nav_contact')}
            </a>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden items-center md:flex">
              <div className="relative" ref={searchRef}>
                <Search size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={e => {
                    setSearchQuery(e.target.value)
                    setSearchAnswer('')
                    if (e.target.value.length > 1) {
                      const norm = (s) => s.toLowerCase().replace(/ğ/g,'g').replace(/ü/g,'u').replace(/ş/g,'s').replace(/ı/g,'i').replace(/ö/g,'o').replace(/ç/g,'c')
                      const q = norm(e.target.value)
                      const swq = (str) => norm(str).split(' ').some(w => w.startsWith(q))
                      const r = SITE_PAGES.filter(item =>
                        lang === 'en' ? (swq(item.labelEn || item.label) || swq(item.categoryEn || item.category) || (item.keywordsEn || item.keywords).some(k => norm(k).startsWith(q))) : (swq(item.label) || swq(item.category) || item.keywords.some(k => norm(k).startsWith(q)))
                      ).slice(0, 6)
                      setSearchResults(r)
                    } else { setSearchResults([]) }
                  }}
                  placeholder={t('nav_search')}
                  className="h-11 w-72 rounded-full border-2 border-sky/30 bg-white pl-10 pr-4 text-sm font-medium text-navy placeholder:text-slate focus:border-sky-deep focus:outline-none"
                />
                {(searchResults.length > 0 || searchAnswer) && (
                  <div style={{ position:'absolute', top:'100%', left:0, right:0, marginTop:8, background:'#fff', borderRadius:16, boxShadow:'0 8px 32px rgba(0,0,0,.15)', border:'1px solid #e2e8f0', zIndex:999, overflow:'hidden' }}>
                    {searchResults.map((r, i) => (
                      <button key={i} onClick={() => { window.location.href = r.url; setSearchQuery(''); setSearchResults([]) }}
                        style={{ display:'block', width:'100%', textAlign:'left', padding:'12px 16px', border:'none', borderBottom:'1px solid #f1f5f9', background:'#fff', cursor:'pointer' }}
                        onMouseEnter={e => (e.currentTarget.style.background='#f0f9ff')}
                        onMouseLeave={e => (e.currentTarget.style.background='#fff')}>
                        <div style={{ fontSize:13.5, fontWeight:600, color:'#0d2b4e' }}>{(lang === 'en' ? r.labelEn : r.label) || r.label}</div>
                        <div style={{ fontSize:11.5, color:'#94a3b8', marginTop:2 }}>{(lang === 'en' ? r.categoryEn : r.category) || r.category}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
                        <div className="hidden items-center gap-3 md:flex">
              <a href="https://instagram.com/izmirgaz" target="_blank" rel="noreferrer"><img src={iconInstagram} alt="Instagram" className="h-16 w-16 object-contain hover:opacity-70 transition-opacity" /></a>
              <a href="https://linkedin.com/company/izmirgaz" target="_blank" rel="noreferrer"><img src={iconLinkedin} alt="LinkedIn" className="h-16 w-16 object-contain hover:opacity-70 transition-opacity" /></a>
              <a href="https://x.com/izmirgaz" target="_blank" rel="noreferrer"><img src={iconX} alt="X" className="h-16 w-16 object-contain hover:opacity-70 transition-opacity" /></a>
              <a href="https://facebook.com/izmirgaz" target="_blank" rel="noreferrer"><img src={iconFacebook} alt="Facebook" className="h-16 w-16 object-contain hover:opacity-70 transition-opacity" /></a>
            </div>
<a href="https://www.turkiye.gov.tr" target="_blank" rel="noreferrer"
              className="hidden items-center gap-1.5 rounded-full border-2 border-emerald/50 bg-emerald/10 px-4 py-2.5 text-sm font-bold text-emerald transition-colors hover:bg-emerald hover:text-white md:inline-flex">
              <ExternalLink size={15} /> {t('nav_edevlet')}
            </a>
            <ThemeToggle />
            <button onClick={() => setLang(lang === 'tr' ? 'en' : 'tr')}
              className="hidden items-center rounded-md border border-sky/30 bg-white px-0 py-1.5 text-sm font-bold sm:flex" aria-label="Dil değiştir">
              <span className={`px-2.5 ${lang === 'tr' ? 'text-navy' : 'text-slate/50'}`}>TR</span>
              <span className="text-slate/40">/</span>
              <span className={`px-2.5 ${lang === 'en' ? 'text-navy' : 'text-slate/50'}`}>EN</span>
            </button>
            <a href="#get-started" className="magnetic-btn hidden rounded-full bg-gradient-to-r from-emerald to-emerald-glow px-6 py-3 text-base font-bold text-white shadow-lg shadow-emerald/30 sm:inline-block">{t('online_ops')}</a>
            <button onClick={() => setOpen((v) => !v)} aria-label="Menü"
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 text-navy lg:hidden">
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </div>

      {open && (
        <div className="absolute inset-x-3 top-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl lg:hidden">
          <div className="flex flex-col gap-1">
            {topItems.map((item) => (
              <a key={item.id} href={item.href || '#'} onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-lg font-semibold text-navy hover:bg-sky/10">
                {trMenu(item.label, lang)}
              </a>
            ))}
            <a href="/bize-ulasin" onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-lg font-semibold text-navy hover:bg-sky/10">
              {t('nav_contact')}
            </a>
            <button onClick={() => setLang(lang === 'tr' ? 'en' : 'tr')} className="mt-2 rounded-lg border border-sky/40 px-3 py-2.5 text-base font-bold text-navy">
              <Globe size={16} className="mr-2 inline" /> {lang.toUpperCase()}
            </button>
            <a href="#get-started" onClick={() => setOpen(false)} className="mt-2 rounded-full bg-gradient-to-r from-emerald to-emerald-glow px-5 py-3 text-center text-base font-bold text-white">{t('online_ops')}</a>
          </div>
        </div>
      )}
    </header>
  )
}





















