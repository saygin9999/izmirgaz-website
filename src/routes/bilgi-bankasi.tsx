import { createFileRoute } from "@tanstack/react-router";
import { KurumsalLayout, type MenuGroup } from "../components/kurumsal-layout";

export const Route = createFileRoute("/bilgi-bankasi")({ component: () => (
  <KurumsalLayout pageTitle="Bilgi Bankası" pageTitleEn="Knowledge Bank" defaultKey="dogal-gaz-nedir" groups={GROUPS} />
) });

const GROUPS: MenuGroup[] = [
  { label: "Doğal Gaz", labelEn: "Natural Gas", key: "dogal-gaz", children: [
    { label: "Doğal Gaz Nedir?", labelEn: "What Is Natural Gas?", key: "dogal-gaz-nedir" },
    { label: "Doğal Gaz Zehirli midir?", labelEn: "Is Natural Gas Toxic?", key: "dogal-gaz-zehirli" },
    { label: "Doğal Gazın Üstünlükleri", labelEn: "Advantages Of Natural Gas", key: "dogal-gaz-ustunlukleri" },
    { label: "Dünyada Doğal Gaz", labelEn: "Natural Gas In The World", key: "dunyada-dogal-gaz" },
    { label: "Ülkemizde Doğal Gaz", labelEn: "Natural Gas In Our Country", key: "ulkemizde-dogal-gaz" },
  ]},
  { label: "Doğal Gaz Acil Müdahale 187", labelEn: "Natural Gas Emergency 187", key: "acil-187" },
  { label: "Sık Sorulan Sorular (SSS)", labelEn: "Frequently Asked Questions (FAQ)", key: "sss" },
  { label: "Doğal Gazın Verimli Kullanımı", labelEn: "Efficient Use Of Natural Gas", key: "verimli-kullanim" },
  { label: "Doğal Gaz Yakma Cihazlarıyla İlgili Güvenlik Önerileri", labelEn: "Safety Recommendations For Gas Appliances", key: "yakma-cihazlari" },
  { label: "Doğal Gaz Şebeke Güvenliği", labelEn: "Natural Gas Network Safety", key: "sebeke-guvenligi" },
  { label: "Kombi Kullanım Rehberi", labelEn: "Boiler User Guide", key: "kombi-rehberi" },
  { label: "Hava Kirliliği Raporu", labelEn: "Air Pollution Report", key: "hava-kirliligi" },
  { label: "Mevzuat", labelEn: "Legislation", key: "mevzuat" },
  { label: "Faydalı Videolar", labelEn: "Useful Videos", key: "faydali-videolar", children: [
    { label: "Doğal Gazın Açılmasında İzlenecek Yol", labelEn: "Natural Gas Activation Guide", key: "video-gaz-acilisi" },
    { label: "Abonelik Sözleşmesi Yenileme", labelEn: "Contract Renewal", key: "video-sozlesme-yenileme" },
    { label: "Doğal Gazı Nasıl Verimli Kullanırsınız?", labelEn: "How To Use Natural Gas Efficiently?", key: "video-verimli-kullanim" },
    { label: "Ya Doğal Gaz Kokusu Hissederseniz?", labelEn: "What If You Smell Gas?", key: "video-gaz-kokusu" },
  ]},
  { label: "Mobil Uygulama", labelEn: "Mobile App", key: "mobil-uygulama" },
];
