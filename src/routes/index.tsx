import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "../components/navbar";
import { Features } from "../components/features";
import { Announcements } from "../components/announcements";
import { Philosophy } from "../components/philosophy";
import { Protocol } from "../components/protocol";
import { GetStarted } from "../components/get-started";
import { SiteFooter } from "../components/site-footer";
import { StickyBar } from "../components/sticky-bar";
import { SideWidget } from "../components/side-widget";
import { KvkkBanner } from "../components/kvkk-banner";
import { AIChatbox } from "../components/ai-chatbox";
import { Videos } from "../components/videos";
import { HeroCarousel } from "../components/hero-carousel";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="relative overflow-x-hidden bg-white">
        <Navbar />
        <div className="w-full pt-28">
          <HeroCarousel />
        </div>
        <Features />
        <Protocol />
        <Announcements />
        <Videos />
        <Philosophy />
        <GetStarted />
        <SiteFooter />
        <StickyBar />
        <SideWidget />
        <KvkkBanner />
        <AIChatbox />
      </main>
  );
}
