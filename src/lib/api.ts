// src/lib/api.ts
// TÃ¼m CMS API Ã§aÄŸrÄ±larÄ± buradan yapÄ±lÄ±r

const API_BASE = 'http://localhost:5001'

// â”€â”€â”€ LANG HELPER â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export function getLang(): string {
  try { return localStorage.getItem('izg-lang') || 'tr' } catch { return 'tr' }
}

function langParam(): string {
  const l = getLang()
  return l === 'en' ? '?lang=en' : ''
}

// â”€â”€â”€ TYPES â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export interface Slide {
  id: number; tag: string; tag_en?: string; title: string; title_en?: string; subtitle: string; subtitle_en?: string
  image_url: string; href: string; order_no: number; is_active: number
}
export interface MenuItem {
  id: number; parent_id: number | null; menu_group: string | null
  group_header: string | null; label: string; href: string
  order_no: number; is_active: number; children?: MenuItem[]
}
export interface NewsItem {
  id: number; tag: string; date: string; title: string
  description: string; image_url: string; href: string
  order_no: number; is_active: number
}
export interface Card {
  id: number; card_key: string; number: string; title: string
  description: string; cta_label: string; tag: string
  order_no: number; is_active: number
}
export interface ProtocolTab { id: number; label: string; order_no: number; is_active: number }
export interface ProtocolStep {
  id: number; tab_id: number; step_number: number; title: string
  subtitle: string; description: string; docs: string[]; order_no: number
}
export interface FooterCol { id: number; title: string; order_no: number; is_active: number }
export interface FooterLink { id: number; col_id: number; label: string; href: string; order_no: number; is_active: number }
export interface FooterServiceLink { id: number; label: string; href: string; icon: string; order_no: number; is_active: number }
export interface StickyItem { id: number; label: string; href: string; icon: string; order_no: number; is_active: number }
export interface Popup {
  id: number; title: string; content: string; image_url: string; href: string
  popup_type: 'popup' | 'banner' | 'notification'; is_active: number
  start_date: string | null; end_date: string | null; order_no: number
}
export interface Section { id: number; section_key: string; label: string; is_active: number; order_no: number }
export type Settings = Record<string, string>

// â”€â”€â”€ FETCH HELPER â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(options?.headers || {}) },
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }))
    throw new Error(err.error || res.statusText)
  }
  return res.json()
}

function authHeaders(token: string) {
  return { Authorization: `Bearer ${token}` }
}

// â”€â”€â”€ PUBLIC API â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export const api = {
  getSettings: () => apiFetch<Settings>('/api/settings'),
  getSlides:   () => apiFetch<Slide[]>(`/api/slides${langParam()}`),
  getMenu:     () => apiFetch<MenuItem[]>(`/api/menu${langParam()}`),
  getNews:     () => apiFetch<NewsItem[]>(`/api/news${langParam()}`),
  getCards:    () => apiFetch<Card[]>(`/api/cards${langParam()}`),
  getProtocol: () => apiFetch<{ tabs: ProtocolTab[]; steps: ProtocolStep[] }>('/api/protocol'),
  getFooter:   () => apiFetch<{ cols: FooterCol[]; links: FooterLink[]; serviceLinks: FooterServiceLink[] }>(`/api/footer${langParam()}`),
  getSticky:   () => apiFetch<StickyItem[]>(`/api/sticky${langParam()}`),
  getPopups:   () => apiFetch<Popup[]>('/api/popups'),
  getSections: () => apiFetch<Section[]>('/api/sections'),
  health:      () => apiFetch<{ ok: boolean; db: string }>('/api/health'),
}

// â”€â”€â”€ ADMIN API â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export const adminApi = {
  login: (username: string, password: string) =>
    apiFetch<{ token: string; user: { username: string; role: string } }>('/api/auth/login', {
      method: 'POST', body: JSON.stringify({ username, password }),
    }),
  setSetting: (token: string, key: string, value: string, group?: string) =>
    apiFetch('/api/settings', { method: 'POST', headers: authHeaders(token), body: JSON.stringify({ key, value, group }) }),
  bulkSettings: (token: string, data: Record<string, string>) =>
    apiFetch('/api/settings/bulk', { method: 'POST', headers: authHeaders(token), body: JSON.stringify({ data }) }),
  getAllSlides: (token: string) => apiFetch<Slide[]>('/api/slides/all', { headers: authHeaders(token) }),
  createSlide: (token: string, slide: Partial<Slide>) =>
    apiFetch('/api/slides', { method: 'POST', headers: authHeaders(token), body: JSON.stringify(slide) }),
  updateSlide: (token: string, id: number, slide: Partial<Slide>) =>
    apiFetch(`/api/slides/${id}`, { method: 'PUT', headers: authHeaders(token), body: JSON.stringify(slide) }),
  reorderSlides: (token: string, items: { id: number; order_no: number }[]) =>
    apiFetch('/api/slides/reorder', { method: 'PUT', headers: authHeaders(token), body: JSON.stringify({ items }) }),
  deleteSlide: (token: string, id: number) =>
    apiFetch(`/api/slides/${id}`, { method: 'DELETE', headers: authHeaders(token) }),
  getAllMenu: (token: string) => apiFetch<MenuItem[]>('/api/menu/all', { headers: authHeaders(token) }),
  createMenuItem: (token: string, item: Partial<MenuItem>) =>
    apiFetch('/api/menu', { method: 'POST', headers: authHeaders(token), body: JSON.stringify(item) }),
  updateMenuItem: (token: string, id: number, item: Partial<MenuItem>) =>
    apiFetch(`/api/menu/${id}`, { method: 'PUT', headers: authHeaders(token), body: JSON.stringify(item) }),
  reorderMenu: (token: string, items: { id: number; order_no: number; parent_id: number | null }[]) =>
    apiFetch('/api/menu/reorder', { method: 'PUT', headers: authHeaders(token), body: JSON.stringify({ items }) }),
  deleteMenuItem: (token: string, id: number) =>
    apiFetch(`/api/menu/${id}`, { method: 'DELETE', headers: authHeaders(token) }),
  getAllNews: (token: string) => apiFetch<NewsItem[]>('/api/news/all', { headers: authHeaders(token) }),
  createNews: (token: string, item: Partial<NewsItem>) =>
    apiFetch('/api/news', { method: 'POST', headers: authHeaders(token), body: JSON.stringify(item) }),
  updateNews: (token: string, id: number, item: Partial<NewsItem>) =>
    apiFetch(`/api/news/${id}`, { method: 'PUT', headers: authHeaders(token), body: JSON.stringify(item) }),
  reorderNews: (token: string, items: { id: number; order_no: number }[]) =>
    apiFetch('/api/news/reorder', { method: 'PUT', headers: authHeaders(token), body: JSON.stringify({ items }) }),
  deleteNews: (token: string, id: number) =>
    apiFetch(`/api/news/${id}`, { method: 'DELETE', headers: authHeaders(token) }),
  updateCard: (token: string, id: number, card: Partial<Card>) =>
    apiFetch(`/api/cards/${id}`, { method: 'PUT', headers: authHeaders(token), body: JSON.stringify(card) }),
  createTab: (token: string, tab: Partial<ProtocolTab>) =>
    apiFetch('/api/protocol/tabs', { method: 'POST', headers: authHeaders(token), body: JSON.stringify(tab) }),
  updateTab: (token: string, id: number, tab: Partial<ProtocolTab>) =>
    apiFetch(`/api/protocol/tabs/${id}`, { method: 'PUT', headers: authHeaders(token), body: JSON.stringify(tab) }),
  deleteTab: (token: string, id: number) =>
    apiFetch(`/api/protocol/tabs/${id}`, { method: 'DELETE', headers: authHeaders(token) }),
  createStep: (token: string, step: Partial<ProtocolStep>) =>
    apiFetch('/api/protocol/steps', { method: 'POST', headers: authHeaders(token), body: JSON.stringify(step) }),
  updateStep: (token: string, id: number, step: Partial<ProtocolStep>) =>
    apiFetch(`/api/protocol/steps/${id}`, { method: 'PUT', headers: authHeaders(token), body: JSON.stringify(step) }),
  deleteStep: (token: string, id: number) =>
    apiFetch(`/api/protocol/steps/${id}`, { method: 'DELETE', headers: authHeaders(token) }),
  createFooterCol: (token: string, col: Partial<FooterCol>) =>
    apiFetch('/api/footer/cols', { method: 'POST', headers: authHeaders(token), body: JSON.stringify(col) }),
  updateFooterCol: (token: string, id: number, col: Partial<FooterCol>) =>
    apiFetch(`/api/footer/cols/${id}`, { method: 'PUT', headers: authHeaders(token), body: JSON.stringify(col) }),
  deleteFooterCol: (token: string, id: number) =>
    apiFetch(`/api/footer/cols/${id}`, { method: 'DELETE', headers: authHeaders(token) }),
  createFooterLink: (token: string, link: Partial<FooterLink>) =>
    apiFetch('/api/footer/links', { method: 'POST', headers: authHeaders(token), body: JSON.stringify(link) }),
  updateFooterLink: (token: string, id: number, link: Partial<FooterLink>) =>
    apiFetch(`/api/footer/links/${id}`, { method: 'PUT', headers: authHeaders(token), body: JSON.stringify(link) }),
  deleteFooterLink: (token: string, id: number) =>
    apiFetch(`/api/footer/links/${id}`, { method: 'DELETE', headers: authHeaders(token) }),
  createStickyItem: (token: string, item: Partial<StickyItem>) =>
    apiFetch('/api/sticky', { method: 'POST', headers: authHeaders(token), body: JSON.stringify(item) }),
  updateStickyItem: (token: string, id: number, item: Partial<StickyItem>) =>
    apiFetch(`/api/sticky/${id}`, { method: 'PUT', headers: authHeaders(token), body: JSON.stringify(item) }),
  deleteStickyItem: (token: string, id: number) =>
    apiFetch(`/api/sticky/${id}`, { method: 'DELETE', headers: authHeaders(token) }),
  getAllPopups: (token: string) => apiFetch<Popup[]>('/api/popups/all', { headers: authHeaders(token) }),
  createPopup: (token: string, popup: Partial<Popup>) =>
    apiFetch('/api/popups', { method: 'POST', headers: authHeaders(token), body: JSON.stringify(popup) }),
  updatePopup: (token: string, id: number, popup: Partial<Popup>) =>
    apiFetch(`/api/popups/${id}`, { method: 'PUT', headers: authHeaders(token), body: JSON.stringify(popup) }),
  deletePopup: (token: string, id: number) =>
    apiFetch(`/api/popups/${id}`, { method: 'DELETE', headers: authHeaders(token) }),
  updateSection: (token: string, id: number, data: { is_active: number; order_no: number }) =>
    apiFetch(`/api/sections/${id}`, { method: 'PUT', headers: authHeaders(token), body: JSON.stringify(data) }),
  reorderSections: (token: string, items: { id: number; order_no: number; is_active: number }[]) =>
    apiFetch('/api/sections/reorder', { method: 'PUT', headers: authHeaders(token), body: JSON.stringify({ items }) }),
}

