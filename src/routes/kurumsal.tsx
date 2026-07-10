import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "../components/navbar";
import { SiteFooter } from "../components/site-footer";
import { useI18n } from "../lib/i18n";
import {
  ChevronDown,
  ChevronRight,
  Menu as MenuIcon,
  X,
} from "lucide-react";

export const Route = createFileRoute("/kurumsal")({ component: KurumsalPage });

interface SubItem {
  label: string;
  labelEn?: string;
  key: string;
}
interface MenuGroup {
  label: string;
  labelEn?: string;
  key: string;
  children?: SubItem[];
}
interface TabData {
  id: string;
  label: string;
  labelEn?: string;
  groups: MenuGroup[];
}

const TABS: TabData[] = [
  {
    id: "kurumsal",
    label: "Kurumsal",
    labelEn: "Corporate",
    groups: [
      {
        label: "Hakkımızda",
        labelEn: "About Us",
        key: "hakkimizda",
        children: [
          { label: "İzmir Doğal Gaz", labelEn: "Izmir Natural Gas", key: "izmir-dogal-gaz" },
          { label: "Vizyon, Misyon ve Ortak Değerlerimiz", labelEn: "Vision, Mission and Shared Values", key: "vizyon-misyon" },
          { label: "Politikalarımız", labelEn: "Our Policies", key: "politikalarimiz" },
          { label: "Entegre Yönetim Sistemleri", labelEn: "Integrated Management Systems", key: "entegre-yonetim" },
          { label: "Yatırımlarımız", labelEn: "Our Investments", key: "yatirimlarimiz" },
          { label: "İlk Gaz Verme Tarihleri", labelEn: "First Gas Supply Dates", key: "ilk-gaz-tarihleri" },
        ],
      },
      {
        label: "Basın Odası",
        labelEn: "Press Room",
        key: "basin-odasi",
        children: [
          { label: "Basında İzmir Doğal Gaz", labelEn: "Izmir Natural Gas in the Press", key: "basinda-izmirgaz" },
          { label: "Basın Bültenleri", labelEn: "Press Releases", key: "basin-bultenleri" },
          { label: "Sosyal Sorumluluk", labelEn: "Social Responsibility", key: "sosyal-sorumluluk" },
        ],
      },
      { label: "Logolarımız", labelEn: "Our Logos", key: "logolarimiz" },
      {
        label: "KVKK",
        labelEn: "GDPR",
        key: "kvkk",
        children: [
          { label: "Aydınlatma Metni", labelEn: "GDPR Disclosure", key: "aydinlatma-metni" },
        ],
      },
      {
        label: "İnsan Kaynakları",
        labelEn: "Human Resources",
        key: "insan-kaynaklari",
        children: [
          { label: "Kariyer / Demografik Bilgiler", labelEn: "Career / Demographics", key: "kariyer" },
          { label: "İş Başvurusu", labelEn: "Job Application", key: "is-basvurusu" },
          { label: "Staj Başvurusu", labelEn: "Internship Application", key: "staj-basvurusu" },
        ],
      },
      { label: "Leed Sertifikası", labelEn: "LEED Certificate", key: "leed-sertifikasi" },
      { label: "Çerez (COOKIE) Politikası", labelEn: "Cookie Policy", key: "cerez-politikasi" },
      { label: "İzmir İl Risk Azaltma Planı (İRAP)", labelEn: "Izmir Risk Reduction Plan", key: "irap" },
      { label: "Bilgi Toplumu Hizmetleri", labelEn: "Information Society Services", key: "bilgi-toplumu" },
    ],
  },
  {
    id: "musteri",
    label: "Müşteri Hizmetleri",
    labelEn: "Customer Services",
    groups: [
      {
        label: "Abonelik İşlemleri",
        labelEn: "Subscription Transactions",
        key: "abonelik-islemleri",
        children: [
          { label: "Nasıl Abone Olurum", labelEn: "How to Subscribe", key: "nasil-abone-olurum" },
          { label: "Abonelik Sözleşmesi", labelEn: "Subscription Contract", key: "abonelik-sozlesmesi" },
          { label: "Sözleşme Örnekleri", labelEn: "Contract Samples", key: "sozlesme-ornekleri" },
          { label: "Sözleşme Sonlandırma İşlemleri", labelEn: "Contract Termination", key: "sozlesme-sonlandirma" },
          { label: "Abone Merkezlerimiz", labelEn: "Our Customer Centers", key: "abone-merkezleri" },
          { label: "Faturematik", labelEn: "Faturematik", key: "faturematik" },
          { label: "Ödeme Noktaları", labelEn: "Payment Points", key: "odeme-noktalari" },
        ],
      },
      { label: "Kampanyalarımız", labelEn: "Our Campaigns", key: "kampanyalarimiz" },
      {
        label: "İç Tesisat",
        labelEn: "Interior Piping",
        key: "ic-tesisat",
        children: [
          { label: "Proje Onay", labelEn: "Project Approval", key: "proje-onay" },
          { label: "Gaz Açma", labelEn: "Gas Activation", key: "gaz-acma" },
          { label: "Sertifikalı Firmalar", labelEn: "Certified Companies", key: "sertifikali-firmalar" },
          { label: "7/24 İç Tesisat Yardım Servisi", labelEn: "24/7 Interior Piping Support", key: "ic-tesisat-yardim" },
          { label: "Sertifikalı Firma İşlemleri", labelEn: "Certified Company Transactions", key: "sertifikali-firma-islemleri" },
          { label: "Yetkili Baca Firmaları", labelEn: "Authorized Chimney Companies", key: "yetkili-baca" },
          { label: "Teknik Şartname", labelEn: "Technical Specification", key: "teknik-sartname" },
        ],
      },
      {
        label: "Serbest Tüketiciler",
        labelEn: "Eligible Customers",
        key: "serbest-tuketiciler",
        children: [
          { label: "Nasıl Abone Olurum", labelEn: "How to Subscribe", key: "serbest-nasil-abone" },
          { label: "Ön Değerlendirme", labelEn: "Preliminary Assessment", key: "on-degerlendirme" },
          { label: "Etüt", labelEn: "Study", key: "etut" },
          { label: "Sözleşme", labelEn: "Contract", key: "serbest-sozlesme" },
          { label: "Dönüşüm", labelEn: "Conversion", key: "donusum" },
          { label: "Kimdir", labelEn: "Who is Eligible", key: "serbest-kimdir" },
          { label: "Sorgulama", labelEn: "Inquiry", key: "serbest-sorgulama" },
        ],
      },
      {
        label: "Faturalandırma",
        labelEn: "Billing",
        key: "faturalandirma",
        children: [
          { label: "Fatura Hesaplama", labelEn: "Bill Calculation", key: "fatura-hesaplama" },
          { label: "K Katsayısı", labelEn: "K Coefficient", key: "k-katsayisi" },
          { label: "Fiili Üst Isıl Değer", labelEn: "Actual Upper Calorific Value", key: "fiili-ust-isil" },
        ],
      },
      {
        label: "Tarifeler",
        labelEn: "Tariffs",
        key: "tarifeler",
        children: [
          { label: "Bağlantı Bedeli", labelEn: "Connection Fee", key: "baglanti-bedeli" },
          { label: "Güvence Bedeli", labelEn: "Security Deposit", key: "guvence-bedeli" },
          { label: "Sayaç Bedeli", labelEn: "Meter Fee", key: "sayac-bedeli" },
          { label: "İç Tesisat Bedeli", labelEn: "Interior Piping Fee", key: "ic-tesisat-bedeli" },
          { label: "Konut Bedeli", labelEn: "Residential Fee", key: "konut-bedeli" },
        ],
      },
      { label: "Dilekçe Örnekleri", labelEn: "Petition Templates", key: "dilekce-ornekleri" },
      { label: "Müşteri Memnuniyet Anketi", labelEn: "Customer Satisfaction Survey", key: "musteri-memnuniyet" },
      { label: "Periyodik Bakım Programı", labelEn: "Periodic Maintenance Program", key: "periyodik-bakim" },
      { label: "Yakıt Karşılaştırma Tablosu", labelEn: "Fuel Comparison Table", key: "yakit-karsilastirma" },
      {
        label: "Bedel Hesaplama",
        labelEn: "Fee Calculation",
        key: "bedel-hesaplama",
        children: [
          { label: "Bağlantı Bedeli Hesapla", labelEn: "Calculate Connection Fee", key: "baglanti-hesapla" },
          { label: "Güvence Bedeli Hesapla", labelEn: "Calculate Security Deposit", key: "guvence-hesapla" },
        ],
      },
      { label: "CNG İhale İlanları", labelEn: "CNG Tender Announcements", key: "cng-ihale" },
    ],
  },
  {
    id: "bilgi",
    label: "Bilgi Bankası",
    labelEn: "Knowledge Bank",
    groups: [
      {
        label: "Doğal Gaz",
        labelEn: "Natural Gas",
        key: "dogal-gaz",
        children: [
          { label: "Doğal Gaz Nedir?", labelEn: "What Is Natural Gas?", key: "dogal-gaz-nedir" },
          { label: "Doğal Gaz Zehirli midir?", labelEn: "Is Natural Gas Toxic?", key: "dogal-gaz-zehirli" },
          { label: "Doğal Gazın Üstünlükleri", labelEn: "Advantages Of Natural Gas", key: "dogal-gaz-ustunlukleri" },
          { label: "Dünyada Doğal Gaz", labelEn: "Natural Gas In The World", key: "dunyada-dogal-gaz" },
          { label: "Ülkemizde Doğal Gaz", labelEn: "Natural Gas In Our Country", key: "ulkemizde-dogal-gaz" },
        ],
      },
      { label: "Doğal Gaz Acil Müdahale 187", labelEn: "Natural Gas Emergency 187", key: "acil-mudahale-187" },
      { label: "Sık Sorulan Sorular (SSS)", labelEn: "Frequently Asked Questions (FAQ)", key: "sss" },
      { label: "Doğal Gazın Verimli Kullanımı", labelEn: "Efficient Use Of Natural Gas", key: "verimli-kullanim" },
      { label: "Yakma Cihazları Güvenlik Önerileri", labelEn: "Safety Recommendations For Gas Appliances", key: "yakma-cihazlari" },
      { label: "Doğal Gaz Şebeke Güvenliği", labelEn: "Natural Gas Network Safety", key: "sebeke-guvenligi" },
      { label: "Kombi Kullanım Rehberi", labelEn: "Boiler User Guide", key: "kombi-rehberi" },
      { label: "Hava Kirliliği Raporu", labelEn: "Air Pollution Report", key: "hava-kirliligi" },
      { label: "Mevzuat", labelEn: "Legislation", key: "mevzuat" },
      { label: "Faydalı Videolar", labelEn: "Useful Videos", key: "faydali-videolar" },
      { label: "Mobil Uygulama", labelEn: "Mobile App", key: "mobil-uygulama" },
    ],
  },
  {
    id: "iletisim",
    label: "Bize Ulaşın",
    labelEn: "Contact Us",
    groups: [
      { label: "Online Randevu", labelEn: "Online Appointment", key: "online-randevu" },
      { label: "Talep / Şikayet Bildirimi", labelEn: "Request / Complaint", key: "talep-sikayet" },
      { label: "Sokağımda Gaz Var mı?", labelEn: "Is Gas Available On My Street?", key: "sokagimda-gaz" },
      {
        label: "e-Devlet İşlemleri",
        labelEn: "e-Government Transactions",
        key: "edevlet",
        children: [
          { label: "Abonelik Sözleşmesi Başvurusu", labelEn: "Subscription Contract Application", key: "edevlet-abonelik" },
          { label: "Sözleşme Yenileme", labelEn: "Contract Renewal", key: "edevlet-yenileme" },
          { label: "Sözleşme Sonlandırma", labelEn: "Contract Termination", key: "edevlet-sonlandirma" },
          { label: "Fatura Sorgulama", labelEn: "Bill Inquiry", key: "edevlet-fatura" },
        ],
      },
      {
        label: "Abone Merkezleri",
        labelEn: "Customer Centers",
        key: "abone-merkezleri-iletisim",
        children: [
          { label: "Genel Müdürlük", labelEn: "Headquarters", key: "genel-mudurluk" },
          { label: "Aliağa Abone Merkezi", labelEn: "Aliağa Customer Center", key: "aliaga" },
          { label: "Bayraklı Abone Merkezi", labelEn: "Bayraklı Customer Center", key: "bayrakli" },
          { label: "Buca Abone Merkezi", labelEn: "Buca Customer Center", key: "buca" },
          { label: "Çiğli Abone Merkezi", labelEn: "Çiğli Customer Center", key: "cigli" },
          { label: "Gaziemir Abone Merkezi", labelEn: "Gaziemir Customer Center", key: "gaziemir" },
          { label: "Karabağlar Abone Merkezi", labelEn: "Karabağlar Customer Center", key: "karabaglar" },
          { label: "Karşıyaka Abone Merkezi", labelEn: "Karşıyaka Customer Center", key: "karsiyaka" },
          { label: "Kemalpaşa Abone Merkezi", labelEn: "Kemalpaşa Customer Center", key: "kemalpasa" },
          { label: "Menemen Abone Merkezi", labelEn: "Menemen Customer Center", key: "menemen" },
          { label: "Ödemiş Abone Merkezi", labelEn: "Ödemiş Customer Center", key: "odemis" },
          { label: "Torbalı Abone Merkezi", labelEn: "Torbalı Customer Center", key: "torbali" },
          { label: "Urla Abone Merkezi", labelEn: "Urla Customer Center", key: "urla" },
        ],
      },
    ],
  },
];

function getFirstKey(tab: TabData): string {
  const first = tab.groups[0];
  if (first?.children?.length) return first.children[0].key;
  return first?.key ?? "";
}

function findLabelByKey(tab: TabData, key: string, lang: string): string {
  for (const g of tab.groups) {
    if (g.key === key) return (lang === 'en' ? g.labelEn : g.label) || g.label;
    if (g.children) {
      const c = g.children.find((c) => c.key === key);
      if (c) return (lang === 'en' ? c.labelEn : c.label) || c.label;
    }
  }
  return "";
}

function findParentLabel(tab: TabData, key: string, lang: string): string | null {
  for (const g of tab.groups) {
    if (g.children?.some((c) => c.key === key)) return (lang === 'en' ? g.labelEn : g.label) || g.label;
  }
  return null;
}

function KurumsalPage() {
  const { lang } = useI18n();
  const [activeTabId, setActiveTabId] = useState("kurumsal");
  const activeTab = TABS.find((t) => t.id === activeTabId)!;

  const [activeKey, setActiveKey] = useState(() => getFirstKey(TABS[0]));
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    if (TABS[0].groups[0]?.children?.length) {
      init[TABS[0].groups[0].key] = true;
    }
    return init;
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleGroup = (key: string) =>
    setOpenGroups((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleTabChange = (tabId: string) => {
    const tab = TABS.find((t) => t.id === tabId)!;
    setActiveTabId(tabId);
    const firstKey = getFirstKey(tab);
    setActiveKey(firstKey);
    const init: Record<string, boolean> = {};
    if (tab.groups[0]?.children?.length) {
      init[tab.groups[0].key] = true;
    }
    setOpenGroups(init);
    setMobileMenuOpen(false);
  };

  const handleItemClick = (key: string) => {
    setActiveKey(key);
    setMobileMenuOpen(false);
  };

  const activeLabel = findLabelByKey(activeTab, activeKey, lang);

  return (
    <>
      <Navbar />
      <div className="pt-28">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a9cb8] via-[#2aafcc] to-[#3abfda]" />
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.15\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
            }}
          />
          <div className="relative px-6 py-16 text-center md:py-20">
            <h1 className="font-heading text-4xl font-extrabold text-white md:text-5xl">
              {(lang === 'en' ? activeTab.labelEn : activeTab.label) || activeTab.label}
            </h1>
          </div>
        </div>

        <div className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-[1200px] overflow-x-auto px-4">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`whitespace-nowrap border-b-3 px-6 py-4 text-sm font-bold transition-colors md:text-base ${
                  activeTabId === tab.id
                    ? "border-sky-deep text-sky-deep"
                    : "border-transparent text-slate hover:text-navy"
                }`}
              >
                {(lang === 'en' ? tab.labelEn : tab.label) || tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-[1200px] px-4 py-8 md:px-6 lg:px-8">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mb-4 flex w-full items-center justify-between rounded-xl border-2 border-sky/30 bg-white px-5 py-3.5 text-left text-base font-bold text-navy shadow-sm md:hidden"
          >
            <span className="flex items-center gap-2">
              <MenuIcon size={18} className="text-sky-deep" />
              {activeLabel || "Menü Seçin"}
            </span>
            {mobileMenuOpen ? <X size={18} /> : <ChevronDown size={18} />}
          </button>

          <div className="grid gap-8 md:grid-cols-[280px_1fr]">
            <aside className={`${mobileMenuOpen ? "block" : "hidden"} md:block`}>
              <div className="overflow-hidden rounded-2xl border-2 border-sky/20 bg-white shadow-lg">
                <div className="bg-[#0d2b4e] px-5 py-4">
                  <h3 className="font-heading text-lg font-bold text-white">
                    {(lang === 'en' ? activeTab.labelEn : activeTab.label) || activeTab.label}
                  </h3>
                </div>

                <nav className="max-h-[calc(100vh-220px)] overflow-y-auto">
                  {activeTab.groups.map((group) => {
                    const hasChildren = group.children && group.children.length > 0;
                    const isGroupOpen = openGroups[group.key] ?? false;

                    if (!hasChildren) {
                      const isActive = activeKey === group.key;
                      return (
                        <button
                          key={group.key}
                          onClick={() => handleItemClick(group.key)}
                          className={`flex w-full items-center gap-2 border-b border-slate-100 px-5 py-3.5 text-left text-[15px] font-medium transition-colors ${
                            isActive
                              ? "bg-sky-deep text-white font-bold"
                              : "text-[#0d2b4e] hover:bg-sky/10"
                          }`}
                        >
                          <ChevronRight
                            size={14}
                            className={isActive ? "text-white" : "text-sky-deep"}
                          />
                          {(lang === 'en' ? group.labelEn : group.label) || group.label}
                        </button>
                      );
                    }

                    return (
                      <div key={group.key}>
                        <button
                          onClick={() => toggleGroup(group.key)}
                          className="flex w-full items-center justify-between border-b border-slate-100 px-5 py-3.5 text-left text-[15px] font-bold text-[#0d2b4e] transition-colors hover:bg-sky/5"
                        >
                          <span>{(lang === 'en' ? group.labelEn : group.label) || group.label}</span>
                          <ChevronDown
                            size={16}
                            className={`text-sky-deep transition-transform duration-200 ${
                              isGroupOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        <div
                          className="overflow-hidden transition-all duration-200"
                          style={{
                            maxHeight: isGroupOpen
                              ? `${(group.children?.length ?? 0) * 48}px`
                              : "0px",
                          }}
                        >
                          {group.children?.map((child) => {
                            const isActive = activeKey === child.key;
                            return (
                              <button
                                key={child.key}
                                onClick={() => handleItemClick(child.key)}
                                className={`flex w-full items-center gap-2 border-b border-slate-50 py-3 pl-10 pr-5 text-left text-[14px] transition-colors ${
                                  isActive
                                    ? "bg-sky-deep font-bold text-white"
                                    : "text-slate hover:bg-sky/10 hover:text-navy"
                                }`}
                              >
                                <span
                                  className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                                    isActive ? "bg-white" : "bg-sky-deep/50"
                                  }`}
                                />
                                {(lang === 'en' ? child.labelEn : child.label) || child.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </nav>
              </div>
            </aside>

            <main>
              <div className="mt-2 overflow-hidden rounded-2xl border-2 border-sky/20 bg-gradient-to-br from-sky/5 to-emerald/5 shadow-lg">
                <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-[#0d2b4e] via-[#1a4a6e] to-[#2aa5cd] p-8 text-center">
                  <div>
                    <div className="mb-4 text-5xl">🏢</div>
                    <h3 className="font-heading text-2xl font-bold text-white">
                      İzmirGaz Genel Müdürlük
                    </h3>
                    <p className="mt-2 text-base text-white/70">
                      LEED Gold Sertifikalı Bina — İzmir, Türkiye
                    </p>
                    <div className="mx-auto mt-6 flex max-w-md flex-wrap justify-center gap-4">
                      {[
                        ["1M+", "Mutlu Abone"],
                        ["30+", "Yıllık Deneyim"],
                        ["11", "İlçe"],
                      ].map(([v, l]) => (
                        <div
                          key={l}
                          className="rounded-xl bg-white/15 px-5 py-3 text-center backdrop-blur-sm"
                        >
                          <div className="text-2xl font-extrabold text-white">{v}</div>
                          <div className="text-xs text-white/70">{l}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-2 font-mono text-xs font-bold uppercase tracking-widest text-sky-deep">
                    İletişim
                  </div>
                  <p className="text-sm text-slate">
                    Çağrı Merkezi: <strong className="text-navy">0850 222 3335</strong>
                  </p>
                  <p className="mt-1 text-sm text-slate">
                    Acil Hat: <strong className="text-red-600">187</strong>
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-2 font-mono text-xs font-bold uppercase tracking-widest text-emerald">
                    Sertifikalar
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["ISO 9001", "ISO 14001", "ISO 45001", "ISO 27001", "LEED Gold"].map((cert) => (
                      <span
                        key={cert}
                        className="rounded-full bg-emerald/10 px-3 py-1 text-xs font-bold text-emerald"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
