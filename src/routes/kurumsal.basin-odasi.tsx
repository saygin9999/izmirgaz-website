import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "../components/navbar";
import { SiteFooter } from "../components/site-footer";
import { I18nProvider } from "../lib/i18n";

export const Route = createFileRoute("/kurumsal/basin-odasi")({ component: BasinOdasi });

const MENU = [
  { label: "Hakkımızda", to: "/kurumsal/hakkimizda" },
  { label: "Basın Odası", to: "/kurumsal/basin-odasi" },
  { label: "Logolarımız", to: "/kurumsal/logolarimiz" },
  { label: "KVKK", to: "/kurumsal/kvkk" },
  { label: "İnsan Kaynakları", to: "/kurumsal/insan-kaynaklari" },
  { label: "Leed Sertifikası", to: "/kurumsal/leed-sertifikasi" },
  { label: "Bilgi Toplumu Hizmetleri", to: "/kurumsal/bilgi-toplumu" },
]

function BasinOdasi() {
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
              <Link key={m.to} to={m.to} style={{ display: 'block', padding: '12px 20px', borderBottom: '1px solid #eee', background: m.to === '/kurumsal/basin-odasi' ? '#3aa8ce' : '#fff', color: m.to === '/kurumsal/basin-odasi' ? '#fff' : '#0d2b4e', textDecoration: 'none', fontWeight: 500 }}>
                {m.label}
              </Link>
            ))}
          </aside>
          <main>
            <h2 style={{ color: '#0d2b4e', fontSize: 28, marginBottom: 16 }}>Basın Odası</h2>
            <p style={{ color: '#64748b', marginBottom: 24 }}>İzmirgaz'a ilişkin basın bültenleri, haberler ve medya kaynakları.</p>
            {[
              { tarih: '12 Haziran 2026', baslik: 'Çiğli-Menemen hattında kapasite artırımı tamamlandı', ozet: 'Yeni basınç düşürme istasyonlarıyla bölgedeki arz güvenliği güçlendirildi.' },
              { tarih: '4 Haziran 2026', baslik: 'Online abonelik başvurularında kimlik doğrulama yenilendi', ozet: 'e-Devlet entegrasyonu ile başvurular artık dakikalar içinde onaylanıyor.' },
              { tarih: '28 Mayıs 2026', baslik: 'Doğal gaz güvenli kullanım eğitimleri sahada başladı', ozet: 'Mahalle bazlı bilgilendirme programı yıl boyunca devam edecek.' },
            ].map((h, i) => (
              <div key={i} style={{ borderBottom: '1px solid #eef1f4', paddingBottom: 20, marginBottom: 20 }}>
                <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 6 }}>{h.tarih}</div>
                <h3 style={{ color: '#0d2b4e', fontSize: 16, marginBottom: 6 }}>{h.baslik}</h3>
                <p style={{ color: '#64748b', fontSize: 14 }}>{h.ozet}</p>
              </div>
            ))}
          </main>
        </div>
      </div>
      <SiteFooter />
    </I18nProvider>
  )
}
