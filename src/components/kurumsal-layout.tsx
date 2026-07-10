import { useState, useEffect, type ReactNode } from "react";
import { Navbar } from "./navbar";
import { SiteFooter } from "./site-footer";
import { useI18n } from "../lib/i18n";
import { ChevronDown, ChevronRight, Menu as MenuIcon, FileText, Download } from "lucide-react";

const API = "http://localhost:5001";

export interface SubItem { label: string; labelEn?: string; key: string; }
export interface MenuGroup { label: string; labelEn?: string; key: string; children?: SubItem[]; }

interface CorporatePage {
  id: number; section_key: string; title: string; content: string;
  attachments: Array<{ filename: string; originalname: string; url: string; }>;
  is_active: number;
}

interface Props { pageTitle: string; pageTitleEn?: string; groups: MenuGroup[]; defaultKey: string; }

export function KurumsalLayout({ pageTitle, pageTitleEn, groups, defaultKey }: Props) {
  const { lang } = useI18n()
  const getInitialKey = () => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const s = params.get('s')
      if (s) return s
    }
    return defaultKey
  }
  const [activeKey, setActiveKey] = useState(getInitialKey);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() => {
    const first = groups.find(g => g.children?.some(c => c.key === defaultKey));
    return first ? { [first.key]: true } : (groups[0]?.children ? { [groups[0].key]: true } : {});
  });
  const [page, setPage] = useState<CorporatePage | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href)
      url.searchParams.set('s', activeKey)
      window.history.replaceState({}, '', url.toString())
    }
    fetch(`${API}/api/pages/${activeKey}?lang=${lang}`)
      .then(r => r.json())
      .then(data => { setPage(data); setLoading(false); })
      .catch(() => { setPage(null); setLoading(false); });
  }, [activeKey]);

  const toggle = (key: string) => setOpenGroups(p => ({ ...p, [key]: !p[key] }));

  const findLabel = (key: string): string => {
    for (const g of groups) {
      if (g.key === key) return (lang === 'en' ? g.labelEn : g.label) || g.label;
      const c = g.children?.find(c => c.key === key);
      if (c) return (lang === 'en' ? c.labelEn : c.label) || c.label;
    }
    return "";
  };
  const findParent = (key: string): string => {
    for (const g of groups) {
      if (g.children?.some(c => c.key === key)) return g.label;
    }
    return "";
  };

  const label = findLabel(activeKey);
  const parent = findParent(activeKey);
  const attachments = page?.attachments ? (typeof page.attachments === 'string' ? JSON.parse(page.attachments) : page.attachments) : [];

  return (
      <div className="bg-white dark:bg-slate-900" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Navbar />
        <div style={{ paddingTop: 112, flex: 1, display: "flex", flexDirection: "column" }}>

          {/* HERO */}
          <div style={{ background: "linear-gradient(120deg,#0d2b4e 0%,#1a7fa8 55%,#2ba9cc 100%)", padding: "70px 0", textAlign: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, opacity: .12, backgroundImage: "radial-gradient(circle at 20% 30%, #fff 0, transparent 40%), radial-gradient(circle at 80% 60%, #fff 0, transparent 35%)" }} />
            <h1 style={{ color: "#fff", fontSize: 56, fontWeight: 900, margin: 0, letterSpacing: -1.5, position: "relative" }}>{(lang === 'en' ? pageTitleEn : pageTitle) || pageTitle}</h1>
            <p style={{ color: "rgba(255,255,255,.75)", marginTop: 14, fontSize: 15, position: "relative" }}>
              {(lang === 'en' ? pageTitleEn : pageTitle) || pageTitle}{parent ? ` / ${parent}` : ""} / {label}
            </p>
          </div>

          <div style={{ flex: 1, display: "grid", gridTemplateColumns: "340px 1fr", width: "100%" }}>

            {/* SOL MENÃœ */}
            <aside className="dark:bg-slate-800 dark:border-slate-700" style={{ borderRight: "1px solid #e2e8f0", background: "#fafcfe", minHeight: "150vh" }}>
              <div style={{ position: "sticky", top: 112, maxHeight: "none", overflowY: "auto" }}>
                <div style={{ background: "linear-gradient(135deg,#0d2b4e,#1a7fa8)", color: "#fff", padding: "22px 28px", fontSize: 19, fontWeight: 800 }}>
                  {(lang === 'en' ? pageTitleEn : pageTitle) || pageTitle}
                </div>
                {groups.map(g => {
                  const hasChildren = g.children && g.children.length > 0;
                  const isOpen = openGroups[g.key];
                  if (!hasChildren) {
                    const isActive = activeKey === g.key;
                    return (
                      <button key={g.key} onClick={() => setActiveKey(g.key)} style={{
                        display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "16px 28px",
                        borderBottom: "1px solid #eef2f6", textAlign: "left", cursor: "pointer", border: "none",
                        background: isActive ? "#1a7fa8" : "transparent", color: isActive ? "#fff" : "#0d2b4e",
                        fontWeight: isActive ? 700 : 500, fontSize: 16, transition: "all .18s"
                      }}>
                        <ChevronRight size={15} style={{ color: isActive ? "#fff" : "#1a7fa8", flexShrink: 0 }} />
                        {(lang === 'en' ? g.labelEn : g.label) || g.label}
                      </button>
                    );
                  }
                  return (
                    <div key={g.key}>
                      <button onClick={() => toggle(g.key)} style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%",
                        padding: "16px 28px", borderBottom: "1px solid #eef2f6", textAlign: "left", cursor: "pointer",
                        border: "none", background: "transparent", color: "#0d2b4e", fontWeight: 700, fontSize: 16, transition: "all .18s"
                      }}>
                        <span>{(lang === 'en' ? g.labelEn : g.label) || g.label}</span>
                        <ChevronDown size={17} style={{ color: "#1a7fa8", transform: isOpen ? "rotate(180deg)" : "none", transition: ".2s" }} />
                      </button>
                      <div style={{ overflow: "hidden", maxHeight: isOpen ? `${(g.children?.length ?? 0) * 52}px` : "0px", transition: "max-height .3s ease" }}>
                        {g.children?.map(c => {
                          const isActive = activeKey === c.key;
                          return (
                            <button key={c.key} onClick={() => setActiveKey(c.key)} style={{
                              display: "flex", alignItems: "center", gap: 10, width: "100%",
                              padding: "13px 28px 13px 46px", borderBottom: "1px solid #f4f8fb",
                              textAlign: "left", cursor: "pointer", border: "none",
                              background: isActive ? "#1a7fa8" : "#f4f9fc", color: isActive ? "#fff" : "#475569",
                              fontWeight: isActive ? 700 : 400, fontSize: 14.5, transition: "all .18s"
                            }}>
                              <span style={{ width: 7, height: 7, borderRadius: "50%", background: isActive ? "#fff" : "#1a7fa8", flexShrink: 0 }} />
                              {(lang === 'en' ? c.labelEn : c.label) || c.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </aside>

            {/* SAÄ Ä°Ã‡ERÄ°K */}
            <main className="dark:bg-slate-900" style={{ padding: "52px 72px", background: "#ffffff", display: "flex", flexDirection: "column", alignItems: "center", minHeight: "150vh" }}>
              <div style={{ width: "100%", maxWidth: 900 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 28, padding: "12px 20px", background: "#f0f9ff", borderRadius: 10, border: "1px solid #bae6fd", width: "fit-content" }}>
                  <MenuIcon size={15} style={{ color: "#0284c7" }} />
                  <span className="dark:text-slate-300" style={{ fontSize: 13.5, color: "#475569", fontWeight: 500 }}>
                    {(lang === 'en' ? pageTitleEn : pageTitle) || pageTitle} {parent ? `/ ${parent}` : ""} / {label}
                  </span>
                </div>

                <h2 className="dark:text-white" style={{ fontSize: 40, fontWeight: 900, color: "#0d2b4e", marginBottom: 28, lineHeight: 1.15, letterSpacing: -1 }}>
                  {(lang === 'en' ? page?.title_en : page?.title) || page?.title || label}
                </h2>

                {loading && <p style={{ color: "#94a3b8" }}>YÃ¼kleniyor...</p>}

                {!loading && page?.content && (
                  <div
                    className="dark:text-slate-100 prose max-w-none"
                    style={{ fontSize: 16.5, lineHeight: 1.9, color: "#334155" }}
                    dangerouslySetInnerHTML={{ __html: (lang === 'en' ? page.content_en : page.content) || page.content }}
                  />
                )}

                {!loading && !page?.content && (
                  <>
                    <div className="dark:text-slate-200" style={{ fontSize: 16.5, lineHeight: 1.9, color: "#334155" }}>
                      <p>Bu bÃ¶lÃ¼m iÃ§in henÃ¼z iÃ§erik girilmemiÅŸ. Admin panelden ekleyebilirsiniz.</p>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginTop: 40 }}>
                      {[["1M+","Mutlu Abone"],["30+","YÄ±llÄ±k Deneyim"],["28","Hizmet BÃ¶lgesi"]].map(([v,l]) => (
                        <div key={l} style={{ background: "linear-gradient(135deg,#f0f9ff,#e0f2fe)", borderRadius: 16, padding: "28px 24px", textAlign: "center", border: "1px solid #bae6fd" }}>
                          <div style={{ fontSize: 38, fontWeight: 900, color: "#0284c7" }}>{v}</div>
                          <div style={{ fontSize: 14, color: "#64748b", marginTop: 6 }}>{l}</div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {attachments.length > 0 && (
                  <div style={{ marginTop: 40 }}>
                    <h3 style={{ fontSize: 18, fontWeight: 700, color: "#0d2b4e", marginBottom: 16 }}>Ekli Dosyalar</h3>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
                      {attachments.map((a: any, i: number) => {
                        const isImage = /\.(png|jpg|jpeg|gif|webp)$/i.test(a.url || '')
                        const isPDF = /\.pdf$/i.test(a.url || '')
                        const url = `${API}${a.url}`
                        if (isImage) {
                          return (
                            <a key={i} href={url} target="_blank" rel="noreferrer" style={{ display: "block", borderRadius: 12, overflow: "hidden", border: "1px solid #e2e8f0", transition: "transform .2s" }}
                              onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"}
                              onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = "none"}>
                              <img src={url} alt={a.originalname || a.filename} style={{ width: "100%", height: 160, objectFit: "cover", display: "block" }} />
                              <div style={{ padding: "8px 12px", background: "#f8fafc", fontSize: 12, color: "#64748b", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                {a.originalname || a.filename}
                              </div>
                            </a>
                          )
                        }
                        if (isPDF) {
                          return (
                            <a key={i} href={url} target="_blank" rel="noreferrer" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, padding: "24px 16px", background: "linear-gradient(135deg,#fef3f2,#fee2e2)", borderRadius: 12, border: "1px solid #fecaca", textDecoration: "none", color: "#dc2626", fontWeight: 600, textAlign: "center", transition: "transform .2s", cursor: "pointer" }}
                              onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"}
                              onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = "none"}>
                              <span style={{ fontSize: 36 }}>ğŸ“„</span>
                              <span style={{ fontSize: 13, color: "#0d2b4e" }}>{a.originalname || a.filename}</span>
                              <span style={{ fontSize: 12, padding: "4px 12px", borderRadius: 20, background: "#dc2626", color: "#fff" }}>PDF Ä°ndir</span>
                            </a>
                          )
                        }
                        return (
                          <a key={i} href={url} target="_blank" rel="noreferrer" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, padding: "24px 16px", background: "#f0f9ff", borderRadius: 12, border: "1px solid #bae6fd", textDecoration: "none", textAlign: "center", transition: "transform .2s" }}
                            onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"}
                            onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = "none"}>
                            <span style={{ fontSize: 36 }}>ğŸ“</span>
                            <span style={{ fontSize: 13, color: "#0d2b4e", fontWeight: 600 }}>{a.originalname || a.filename}</span>
                            <span style={{ fontSize: 12, padding: "4px 12px", borderRadius: 20, background: "#0284c7", color: "#fff" }}>Ä°ndir</span>
                          </a>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            </main>
          </div>
        </div>
        <SiteFooter hideServiceBar />
      </div>
  );
}









