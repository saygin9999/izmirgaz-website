import { createFileRoute } from "@tanstack/react-router";
import { KurumsalLayout, type MenuGroup } from "../components/kurumsal-layout";

export const Route = createFileRoute("/musteri-hizmetleri")({
  component: () => (
    <KurumsalLayout
      pageTitle="Müşteri Hizmetleri"
      pageTitleEn="Customer Services"
      defaultKey="nasil-abone"
      groups={GROUPS}
    />
  ),
});

const GROUPS: MenuGroup[] = [
  {
    label: "Abonelik İşlemleri",
    labelEn: "Subscription Transactions",
    key: "abonelik",
    children: [
      { label: "Nasıl Abone Olurum", labelEn: "How to Subscribe", key: "nasil-abone" },
      { label: "Abonelik Sözleşmesi", labelEn: "Subscription Contract", key: "abonelik-sozlesmesi" },
      { label: "Sözleşme Örnekleri", labelEn: "Contract Samples", key: "sozlesme-ornekleri" },
      { label: "Sözleşme Sonlandırma", labelEn: "Contract Termination", key: "sozlesme-sonlandirma" },
      { label: "Abone Merkezlerimiz", labelEn: "Our Customer Centers", key: "abone-merkezleri" },
      { label: "Faturematik", labelEn: "Faturematik", key: "faturematik" },
      { label: "Ödeme Noktaları", labelEn: "Payment Points", key: "odeme-noktalari" },
    ],
  },
  { label: "Kampanyalarımız", labelEn: "Our Campaigns", key: "kampanyalar" },
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
      { label: "Teknik Şartname", labelEn: "Technical Specification", key: "teknik-sartname" },
    ],
  },
  {
    label: "Serbest Tüketiciler",
    labelEn: "Eligible Customers",
    key: "serbest-tuketiciler",
    children: [
      { label: "Nasıl Abone Olurum", labelEn: "How to Subscribe", key: "st-nasil-abone" },
      { label: "Ön Değerlendirme", labelEn: "Preliminary Assessment", key: "st-on-degerlendirme" },
      { label: "Etüt", labelEn: "Study", key: "st-etut" },
      { label: "Sözleşme", labelEn: "Contract", key: "st-sozlesme" },
      { label: "Serbest Tüketici Kimdir", labelEn: "Who is an Eligible Customer", key: "st-kimdir" },
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
      { label: "Konut Bedeli", labelEn: "Residential Fee", key: "konut-bedeli" },
    ],
  },
  { label: "Dilekçe Örnekleri", labelEn: "Petition Templates", key: "dilekce-ornekleri" },
  { label: "Müşteri Memnuniyet Anketi", labelEn: "Customer Satisfaction Survey", key: "memnuniyet-anketi" },
  { label: "Periyodik Bakım Programı", labelEn: "Periodic Maintenance Program", key: "periyodik-bakim" },
  { label: "Yakıt Karşılaştırma Tablosu", labelEn: "Fuel Comparison Table", key: "yakit-karsilastirma" },
];
