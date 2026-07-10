import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "../components/navbar";
import { SiteFooter } from "../components/site-footer";
import { I18nProvider } from "../lib/i18n";

export const Route = createFileRoute("/kurumsal/hakkimizda")({ component: Hakkimizda });

const MENU = [
  { label: "Hakkımızda", to: "/kurumsal/hakkimizda" },
  { label: "Basın Odası", to: "/kurumsal/basin-odasi" },
  { label: "Logolarımız", to: "/kurumsal/logolarimiz" },
  { label: "KVKK", to: "/kurumsal/kvkk" },
  { label: "İnsan Kaynakları", to: "/kurumsal/insan-kaynaklari" },
  { label: "Leed Sertifikası", to: "/kurumsal/leed-sertifikasi" },
  { label: "Bilgi Toplumu Hizmetleri", to: "/kurumsal/bilgi-toplumu" },
]

function Hakkimizda() {
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
              <Link key={m.to} to={m.to} style={{ display: 'block', padding: '12px 20px', borderBottom: '1px solid #eee', background: m.to === '/kurumsal/hakkimizda' ? '#3aa8ce' : '#fff', color: m.to === '/kurumsal/hakkimizda' ? '#fff' : '#0d2b4e', textDecoration: 'none', fontWeight: 500 }}>
                {m.label}
              </Link>
            ))}
          </aside>
          <main>
            <h2 style={{ color: '#0d2b4e', fontSize: 28, marginBottom: 16 }}>Hakkımızda</h2>
            <p style={{ color: '#334155', lineHeight: 1.8, fontSize: 15 }}>
              İzmir Doğalgaz Dağıtım A.Ş. (İzmirgaz), İzmir ili ve çevre bölgelerinde doğal gaz dağıtım hizmetleri sunan köklü bir kuruluştur. Şirketimiz, milyonlarca aboneye kesintisiz, güvenli ve şeffaf bir hizmet anlayışıyla doğal gaz ulaştırmaktadır.
            </p>
            <p style={{ color: '#334155', lineHeight: 1.8, fontSize: 15, marginTop: 16 }}>
              Doğal gaz uygarlığı mottosuyla hareket eden İzmirgaz, İzmir'in enerji altyapısını sürekli güçlendirerek bölgenin kalkınmasına katkı sağlamaktadır. Modern teknolojiler ve yetkin insan kaynağıyla hizmet veren şirketimiz, çevresel sürdürülebilirlik ilkelerine bağlı kalarak faaliyetlerini sürdürmektedir.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, marginTop: 32 }}>
              {[['1M+','Mutlu Abone'],['30+','Yıllık Deneyim'],['11','Aktif İlçe']].map(([v,l]) => (
                <div key={l} style={{ background: '#f0f9ff', borderRadius: 12, padding: 24, textAlign: 'center' }}>
                  <div style={{ fontSize: 36, fontWeight: 800, color: '#3aa8ce' }}>{v}</div>
                  <div style={{ fontSize: 14, color: '#64748b', marginTop: 4 }}>{l}</div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
      <SiteFooter />
    </I18nProvider>
  )
}
