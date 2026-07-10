import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "../components/navbar";
import { SiteFooter } from "../components/site-footer";
import { I18nProvider } from "../lib/i18n";

export const Route = createFileRoute("/kurumsal/leed-sertifikasi")({ component: LeedSertifikasi });

const MENU = [
  { label: "Hakkımızda", to: "/kurumsal/hakkimizda" },
  { label: "Basın Odası", to: "/kurumsal/basin-odasi" },
  { label: "Logolarımız", to: "/kurumsal/logolarimiz" },
  { label: "KVKK", to: "/kurumsal/kvkk" },
  { label: "İnsan Kaynakları", to: "/kurumsal/insan-kaynaklari" },
  { label: "Leed Sertifikası", to: "/kurumsal/leed-sertifikasi" },
  { label: "Bilgi Toplumu Hizmetleri", to: "/kurumsal/bilgi-toplumu" },
]

function LeedSertifikasi() {
  return (
    <I18nProvider>
      <Navbar />
      <div style={{ paddingTop: 120 }}>
        <div style={{ background: 'linear-gradient(135deg,#0d2b4e,#3aa8ce)', padding: '60px 24px', textAlign: 'center' }}>
          <h1 style={{ color: '#fff', fontSize: 48, fontWeight: 800, margin: 0 }}>Kurumsal</h1>
        </div>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px', display: 'grid', gridTemplateColumns: '260px 1fr', gap: 32 }}>
          <aside>
            <div style={{ background: '#0d2b4e', color: '#fff', padding: '14px 20px', fontWeight: 800, fontSize: 18, borderRadius: '8px 8px 0 0' }}>Kurumsal</div>
            {MENU.map(m => (
              <Link key={m.to} to={m.to} style={{ display: 'block', padding: '12px 20px', borderBottom: '1px solid #eee', background: m.to === '/kurumsal/leed-sertifikasi' ? '#3aa8ce' : '#fff', color: m.to === '/kurumsal/leed-sertifikasi' ? '#fff' : '#0d2b4e', textDecoration: 'none', fontWeight: 500 }}>
                {m.label}
              </Link>
            ))}
          </aside>
          <main>
            <h2 style={{ color: '#0d2b4e', fontSize: 28, marginBottom: 16 }}>Leed Sertifikası</h2>
            <p style={{ color: '#334155', lineHeight: 1.8 }}>İzmirgaz Genel Müdürlük binası, çevre dostu tasarımı ve enerji verimliliğiyle LEED (Leadership in Energy and Environmental Design) sertifikasına layık görülmüştür.</p>
            <p style={{ color: '#334155', lineHeight: 1.8, marginTop: 16 }}>LEED sertifikası, binaların çevresel performansını değerlendiren uluslararası bir sertifikasyon sistemidir. Bu sertifika, kurumsal sürdürülebilirlik taahhüdümüzün somut bir göstergesidir.</p>
          </main>
        </div>
      </div>
      <SiteFooter />
    </I18nProvider>
  )
}
