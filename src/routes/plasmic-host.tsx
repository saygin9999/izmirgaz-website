import { createFileRoute } from "@tanstack/react-router"
import { PlasmicCanvasHost, registerComponent } from "@plasmicapp/host"
import { Navbar } from "../components/navbar"
import { SiteFooter } from "../components/site-footer"
import { HeroCarousel } from "../components/hero-carousel"
import { Hero } from "../components/hero"
import { Chatbox } from "../components/chatbox"
import { Features } from "../components/features"
import { GetStarted } from "../components/get-started"
import { Announcements } from "../components/announcements"
import { Philosophy } from "../components/philosophy"
import { Protocol } from "../components/protocol"
import { SideWidget } from "../components/side-widget"
import { StickyBar } from "../components/sticky-bar"
import { ThemeToggle } from "../components/theme-toggle"
import { Videos } from "../components/videos"
import { KvkkBanner } from "../components/kvkk-banner"

registerComponent(Navbar, { name: "Navbar", props: { className: "string" }, importPath: "../components/navbar" })
registerComponent(SiteFooter, { name: "SiteFooter", props: { className: "string" }, importPath: "../components/site-footer" })
registerComponent(HeroCarousel, { name: "HeroCarousel", props: { className: "string" }, importPath: "../components/hero-carousel" })
registerComponent(Hero, { name: "Hero", props: { className: "string" }, importPath: "../components/hero" })
registerComponent(Chatbox, { name: "Chatbox", props: { className: "string" }, importPath: "../components/chatbox" })
registerComponent(Features, { name: "Features", props: { className: "string" }, importPath: "../components/features" })
registerComponent(GetStarted, { name: "GetStarted", props: { className: "string" }, importPath: "../components/get-started" })
registerComponent(Announcements, { name: "Announcements", props: { className: "string" }, importPath: "../components/announcements" })
registerComponent(Philosophy, { name: "Philosophy", props: { className: "string" }, importPath: "../components/philosophy" })
registerComponent(Protocol, { name: "Protocol", props: { className: "string" }, importPath: "../components/protocol" })
registerComponent(SideWidget, { name: "SideWidget", props: { className: "string" }, importPath: "../components/side-widget" })
registerComponent(StickyBar, { name: "StickyBar", props: { className: "string" }, importPath: "../components/sticky-bar" })
registerComponent(ThemeToggle, { name: "ThemeToggle", props: { className: "string" }, importPath: "../components/theme-toggle" })
registerComponent(Videos, { name: "Videos", props: { className: "string" }, importPath: "../components/videos" })
registerComponent(KvkkBanner, { name: "KvkkBanner", props: { className: "string" }, importPath: "../components/kvkk-banner" })

export const Route = createFileRoute("/plasmic-host")({
  component: PlasmicHost,
})

function PlasmicHost() {
  return <PlasmicCanvasHost />
}