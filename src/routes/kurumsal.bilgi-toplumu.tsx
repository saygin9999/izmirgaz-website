import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "../components/navbar";
import { SiteFooter } from "../components/site-footer";
import { I18nProvider } from "../lib/i18n";

export const Route = createFileRoute("/kurumsal/bilgi-toplumu")({ component: BilgiToplumu });

const MENU = [
  { label: "Hakkımızda", to: "/kurumsal/hakkimizda" },
  { label: "Basın Odası", to: "/kurumsal/basin-odasi" },
  { label: "Logolarımız", to: "/kurumsal/logolarimiz" },
  { label: "KVKK", to: "/kurumsal/kvkk" },
  { label: "İnsan Kaynakları", to: "/kurumsal/insan-kaynaklari" },
  { label: "Leed Sertifikası", to: "/kurumsal/leed-sertifikasi" },
  { label: "Bilgi Toplumu Hizmetleri", to: "/kurumsal/bilgi-toplumu" },
]

function BilgiToplumu() {
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
              <Link key={m.to} to={m.to} style={{ display: 'block', padding: '12px 20px', borderBottom: '1px solid #eee', background: m.to === '/kurumsal/bilgi-toplumu' ? '#3aa8ce' : '#fff', color: m.to === '/kurumsal/bilgi-toplumu' ? '#fff' : '#0d2b4e', textDecoration: 'none', fontWeight: 500 }}>
                {m.label}
              </Link>
            ))}
          </aside>
          <main>
            <h2 style={{ color: '#0d2b4e', fontSize: 28, marginBottom: 16 }}>Bilgi Toplumu Hizmetleri</h2>
            <p style={{ color: '#334155', lineHeight: 1.8 }}>5651 sayılı Kanun kapsamında şirketimize ait bilgi toplumu hizmetlerine ilişkin bilgiler aşağıda yer almaktadır.</p>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 24 }}>
              {[['Ticaret Unvanı','İzmir Doğalgaz Dağıtım A.Ş.'],['Merkez Adresi','İzmir, Türkiye'],['Telefon','0850 222 3335'],['E-posta','info@izmirgaz.com.tr'],['Vergi Dairesi','İzmir']].map(([k,v]) => (
                <tr key={k} style={{ borderBottom: '1px solid #eef1f4' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: '#0d2b4e', width: 200 }}>{k}</td>
                  <td style={{ padding: '12px 16px', color: '#334155' }}>{v}</td>
                </tr>
              ))}
            </table>
          </main>
        </div>
      </div>
      <SiteFooter />
    </I18nProvider>
  )
}
