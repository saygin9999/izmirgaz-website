import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

type Lang = 'tr' | 'en'

const DICT: Record<Lang, Record<string, string>> = {
  tr: {
    // NAVBAR
    nav_corp: 'Kurumsal',
    nav_cs: 'Müşteri Hizmetleri',
    nav_kb: 'Bilgi Bankası',
    nav_contact: 'Bize Ulaşın',
    nav_search: 'Soru sorun veya arayın…',
    nav_edevlet: 'e-Devlet Girişi',
    nav_online: 'Online İşlemler',

    // HERO
    hero_chip: 'Doğal Gaz Uygarlığı',
    hero_title_1: "İzmir'in enerjisi,",
    hero_title_2: 'güvencesi.',
    hero_sub: "İzmirGaz olarak bir milyondan fazla hanenin doğal gaz hizmetini güvenle, kesintisiz ve sürdürülebilir bir şekilde sağlıyoruz.",
    explore: 'Hizmetleri İncele',
    subscribe: 'Abone Ol',
    online_ops: 'Online İşlemler',

    // HIZLI ERİŞİM
    quick_abone: 'Nasıl Abone Olurum?',
    quick_sozlesme: 'Sözleşme Sonlandırma',
    quick_odeme: 'Ödeme Noktaları',
    quick_randevu: 'Randevu Al',
    quick_sokak: 'Binamın Önünde Doğal Gaz Var mı?',

    // KARTLAR
    cs_title_a: 'Dört temel',
    cs_title_b: 'işlem',
    cs_title_c: ', tek bir atölye.',
    cs_intro: 'Aboneliğinizi açmaktan fatura ödemeye, kesinti sorgulamasından talep iletmeye — günlük ihtiyaçlarınız bir saat camı kadar berrak.',
    card_borcsorgu: 'Borç Sorgulama',
    card_abonelikdurumu: 'Abonelik Durumu',
    card_plankesildi: 'Planı Kesildi',
    card_talep: 'Talep & Öneri',

    // MANİFESTO
    philosophy_label: 'Kurumsal Manifesto',
    philosophy_pre: 'Çoğu enerji şirketi önceliği şuna verir:',
    philosophy_title: 'Biz önceliği şuna veriyoruz: güvenlik ve şeffaflık.',

    // CTA
    getstarted_title: 'Hemen abone olun, enerjinizi güvencede.',
    getstarted_cta1: 'Abone Ol',
    getstarted_cta2: '187 Acil Hat',

    // FOOTER
    footer_tagline: "Doğal Gaz Uygarlığı — İzmir'in enerjisini güvenle ve kesintisiz yönetiyoruz.",
    footer_gm: 'Genel Müdürlük',
    footer_abone_m: 'Abone Merkezleri',
    footer_ilce: '11 İlçe',
    footer_cagri: 'Çağrı Merkezi',
    footer_acil: 'Doğal Gaz Acil',
    footer_copy: '© 2026 İzmirGaz. Tüm hakları saklıdır.',

    // KURUMSAL SAYFA
    page_breadcrumb_kurumsal: 'Kurumsal',
    page_breadcrumb_musteri: 'Müşteri Hizmetleri',
    page_breadcrumb_bilgi: 'Bilgi Bankası',
    page_breadcrumb_bize: 'Bize Ulaşın',
    page_no_content: 'Bu bölüm için henüz içerik girilmemiş. Admin panelden ekleyebilirsiniz.',
    page_attachments: 'Ekli Dosyalar',
    page_download: 'İndir',
    page_pdf_download: 'PDF İndir',

    // İSTATİSTİKLER
    stat_abone: 'Mutlu Abone',
    stat_deneyim: 'Yıllık Deneyim',
    stat_bolge: 'Hizmet Bölgesi',

    // CHATBOX
    chat_title: 'İzmirGaz Asistan',
    chat_online: 'Çevrimiçi',
    chat_welcome: "Merhaba! 👋 İzmirGaz'a hoş geldiniz. Size nasıl yardımcı olabilirim?",
    chat_placeholder: 'Soru sorun...',
    chat_not_found: 'Bu konuda size yardımcı olmak için 📞 0850 222 3335 numaralı çağrı merkezimizi aramanızı öneririm.',
  },

  en: {
    // NAVBAR
    nav_corp: 'Corporate',
    nav_cs: 'Customer Services',
    nav_kb: 'Knowledge Bank',
    nav_contact: 'Contact Us',
    nav_search: 'Ask a question or search…',
    nav_edevlet: 'e-Government Login',
    nav_online: 'Online Services',

    // HERO
    hero_chip: 'Natural Gas Civilization',
    hero_title_1: "Izmir's energy,",
    hero_title_2: 'assured.',
    hero_sub: "We deliver natural gas to over one million homes — safely, reliably and sustainably.",
    explore: 'Explore Services',
    subscribe: 'Subscribe',
    online_ops: 'Online Services',

    // HIZLI ERİŞİM
    quick_abone: 'How to Subscribe?',
    quick_sozlesme: 'Contract Termination',
    quick_odeme: 'Payment Points',
    quick_randevu: 'Book Appointment',
    quick_sokak: 'Is Natural Gas Available at My Building?',

    // KARTLAR
    cs_title_a: 'Four essential',
    cs_title_b: 'actions',
    cs_title_c: ', one workshop.',
    cs_intro: 'From subscription to billing, from outage queries to requests — your daily needs as clear as a watch crystal.',
    card_borcsorgu: 'Debt Inquiry',
    card_abonelikdurumu: 'Subscription Status',
    card_plankesildi: 'Plan Suspended',
    card_talep: 'Request & Suggestion',

    // MANİFESTO
    philosophy_label: 'Corporate Manifesto',
    philosophy_pre: 'Most energy companies prioritize:',
    philosophy_title: 'We prioritize: safety and transparency.',

    // CTA
    getstarted_title: 'Subscribe now, keep your energy secured.',
    getstarted_cta1: 'Subscribe',
    getstarted_cta2: '187 Emergency Line',

    // FOOTER
    footer_tagline: "Natural Gas Civilization — Managing Izmir's energy safely and reliably.",
    footer_gm: 'Headquarters',
    footer_abone_m: 'Customer Centers',
    footer_ilce: '11 Districts',
    footer_cagri: 'Call Center',
    footer_acil: 'Natural Gas Emergency',
    footer_copy: '© 2026 İzmirGaz. All rights reserved.',

    // KURUMSAL SAYFA
    page_breadcrumb_kurumsal: 'Corporate',
    page_breadcrumb_musteri: 'Customer Services',
    page_breadcrumb_bilgi: 'Knowledge Bank',
    page_breadcrumb_bize: 'Contact Us',
    page_no_content: 'No content has been entered for this section yet. You can add it from the admin panel.',
    page_attachments: 'Attachments',
    page_download: 'Download',
    page_pdf_download: 'Download PDF',

    // İSTATİSTİKLER
    stat_abone: 'Happy Subscribers',
    stat_deneyim: 'Years of Experience',
    stat_bolge: 'Service Regions',

    // CHATBOX
    chat_title: 'IzmirGaz Assistant',
    chat_online: 'Online',
    chat_welcome: "Hello! 👋 Welcome to IzmirGaz. How can I help you?",
    chat_placeholder: 'Ask a question...',
    chat_not_found: 'For further assistance, please call our 24/7 call center at 0850 222 3335.',
  },
}

const Ctx = createContext<{ lang: Lang; t: (k: string) => string; setLang: (l: Lang) => void }>({
  lang: 'tr', t: (k) => k, setLang: () => {},
})

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('tr')
  useEffect(() => {
    try { const s = localStorage.getItem('izg-lang') as Lang | null; if (s === 'en' || s === 'tr') setLangState(s) } catch {}
  }, [])
  const setLang = (l: Lang) => {
    setLangState(l)
    try { localStorage.setItem('izg-lang', l) } catch {}
    document.documentElement.lang = l
  }
  const t = (k: string) => DICT[lang][k] ?? DICT.tr[k] ?? k
  return <Ctx.Provider value={{ lang, t, setLang }}>{children}</Ctx.Provider>
}

export const useI18n = () => useContext(Ctx)
