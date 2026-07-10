import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "../components/navbar";
import { SiteFooter } from "../components/site-footer";
import { I18nProvider } from "../lib/i18n";

export const Route = createFileRoute("/kurumsal/insan-kaynaklari")({ component: InsanKaynaklari });

const MENU = [
  { label: "Hakkımızda", to: "/kurumsal/hakkimizda" },
  { label: "Basın Odası", to: "/kurumsal/basin-odasi" },
  { label: "Logolarımız", to: "/kurumsal/logolarimiz" },
  { label: "KVKK", to: "/kurumsal/kvkk" },
  { label: "İnsan Kaynakları", to: "/kurumsal/insan-kaynaklari" },
  { label: "Leed Sertifikası", to: "/kurumsal/leed-sertifikasi" },
  { label: "Bilgi Toplumu Hizmetleri", to: "/kurumsal/bilgi-toplumu" },
]

function InsanKaynaklari() {
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
              <Link key={m.to} to={m.to} style={{ display: 'block', padding: '12px 20px', borderBottom: '1px solid #eee', background: m.to === '/kurumsal/insan-kaynaklari' ? '#3aa8ce' : '#fff', color: m.to === '/kurumsal/insan-kaynaklari' ? '#fff' : '#0d2b4e', textDecoration: 'none', fontWeight: 500 }}>
                {m.label}
              </Link>
            ))}
          </aside>
          <main>
            <h2 style={{ color: '#0d2b4e', fontSize: 28, marginBottom: 16 }}>İnsan Kaynakları</h2>
            <p style={{ color: '#334155', lineHeight: 1.8 }}>İzmirgaz olarak çalışanlarımızı en değerli varlığımız olarak görüyoruz. Kariyer fırsatları için başvurunuzu yapabilirsiniz.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 24 }}>
              {[['Kariyer','Açık pozisyonlar için başvurun'],['İş Başvurusu','Online başvuru formu'],['Staj Başvurusu','Öğrenci staj programları']].map(([t,d]) => (
                <div key={t} style={{ background: '#f0f9ff', borderRadius: 12, padding: 20 }}>
                  <h3 style={{ color: '#0d2b4e', margin: '0 0 8px' }}>{t}</h3>
                  <p style={{ color: '#64748b', fontSize: 14, margin: 0 }}>{d}</p>
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
