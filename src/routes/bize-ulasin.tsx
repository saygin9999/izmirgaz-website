import { createFileRoute } from "@tanstack/react-router";
import { KurumsalLayout, type MenuGroup } from "../components/kurumsal-layout";

export const Route = createFileRoute("/bize-ulasin")({
  component: () => (
    <KurumsalLayout
      pageTitle="Bize Ulaşın"
      pageTitleEn="Contact Us"
      defaultKey="online-randevu"
      groups={GROUPS}
    />
  ),
});

const GROUPS: MenuGroup[] = [
  { label: "Online Randevu", labelEn: "Online Appointment", key: "online-randevu" },
  { label: "Talep / Şikayet Bildirimi", labelEn: "Request / Complaint", key: "talep-sikayet" },
  { label: "Binamın Önünde Doğal Gaz Var mı?", labelEn: "Is Natural Gas Available In Front Of My Building?", key: "sokakta-gaz" },
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
    key: "abone-merkezleri",
    children: [
      { label: "Genel Müdürlük", labelEn: "Headquarters", key: "am-genel-mudurluk" },
      { label: "Aliağa", labelEn: "Aliağa", key: "am-aliaga" },
      { label: "Bayraklı", labelEn: "Bayraklı", key: "am-bayrakli" },
      { label: "Buca", labelEn: "Buca", key: "am-buca" },
      { label: "Çiğli", labelEn: "Çiğli", key: "am-cigli" },
      { label: "Gaziemir", labelEn: "Gaziemir", key: "am-gaziemir" },
      { label: "Karşıyaka", labelEn: "Karşıyaka", key: "am-karsiyaka" },
      { label: "Kemalpaşa", labelEn: "Kemalpaşa", key: "am-kemalpasa" },
      { label: "Menemen", labelEn: "Menemen", key: "am-menemen" },
      { label: "Ödemiş", labelEn: "Ödemiş", key: "am-odemis" },
      { label: "Torbalı", labelEn: "Torbalı", key: "am-torbali" },
      { label: "Urla", labelEn: "Urla", key: "am-urla" },
    ],
  },
];
