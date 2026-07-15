// server.js Ã¢â‚¬â€ Ã„Â°ZMÃ„Â°RGAZ YENÃ„Â° WEB CMS BACKEND
// Konum: chat-to-web-migrator-main/server.js
// Ãƒâ€¡alÃ„Â±Ã…Å¸tÃ„Â±r: node server.js

import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import mysql from 'mysql2/promise'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const JWT_SECRET = process.env.JWT_SECRET || 'izmirgaz_ozel_anahtari_2026'
const ADMIN_USER = process.env.ADMIN_USERNAME || 'admin'
const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'admin123'

const pool = mysql.createPool({
  host: 'mysql-3126a32-saygin99.g.aivencloud.com',
  port: 25521,
  user: 'avnadmin',
  password: 'AVNS_V1KJmnJQUlmEaf5vPzG',
  database: 'defaultdb',
  waitForConnections: true,
  connectionLimit: 10,
  ssl: { rejectUnauthorized: false }
});

const app = express()
app.use(cors({ origin: '*', methods: ['GET','POST','PUT','DELETE','OPTIONS'], allowedHeaders: ['Content-Type','Authorization'] }))
app.use(express.json({ limit: '10mb' }))
app.use((req, _res, next) => { console.log(`[${req.method}] ${req.path}`); next() })

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ UPLOADS KLASÃƒâ€“RÃƒÅ“ Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
const UPLOADS_DIR = path.join(__dirname, 'uploads')
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true })
app.use('/uploads', express.static(UPLOADS_DIR))

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ MULTER AYARLARI Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOADS_DIR),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname)
    const base = path.basename(file.originalname, ext)
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .substring(0, 60)
    cb(null, `${Date.now()}-${base}${ext}`)
  }
})

const upload = multer({
  storage,
  limits: { fileSize: 25 * 1024 * 1024 }, // 25 MB
  fileFilter: (_req, file, cb) => {
    const allowed = [
      'application/pdf',
      'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/zip', 'application/x-rar-compressed',
    ]
    if (allowed.includes(file.mimetype)) cb(null, true)
    else cb(new Error(`Desteklenmeyen dosya tÃƒÂ¼rÃƒÂ¼: ${file.mimetype}`))
  }
})

// JWT middleware
const auth = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]
  if (!token) return res.status(401).json({ error: 'Token yok' })
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'GeÃƒÂ§ersiz token' })
    req.user = user; next()
  })
}

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ AUTH Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body || {}
  try {
    const [rows] = await pool.query('SELECT * FROM admins WHERE username = ? LIMIT 1', [username])
    const admin = rows[0]
    if (!admin || admin.password_hash !== password) {
      return res.status(401).json({ error: 'HatalÃ„Â± giriÃ…Å¸' })
    }
    const token = jwt.sign({ username, role: admin.role }, JWT_SECRET, { expiresIn: '1d' })
    res.json({ token, user: { username, role: admin.role } })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ SETTINGS Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
app.get('/api/settings', async (_req, res) => {
  try {
    const [rows] = await pool.query('SELECT setting_key, setting_value, setting_group FROM cms_settings')
    const result = {}
    rows.forEach(r => { result[r.setting_key] = r.setting_value })
    res.json(result)
  } catch (err) { res.status(500).json({ error: err.message }) }
})

app.post('/api/settings', auth, async (req, res) => {
  const { key, value, group } = req.body || {}
  if (!key) return res.status(400).json({ error: 'key zorunlu' })
  try {
    await pool.query(
      'INSERT INTO cms_settings (setting_key, setting_value, setting_group) VALUES (?,?,?) ON DUPLICATE KEY UPDATE setting_value=VALUES(setting_value)',
      [key, value, group || 'genel']
    )
    res.json({ ok: true })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

app.post('/api/settings/bulk', auth, async (req, res) => {
  const { data } = req.body || {}
  if (!data || typeof data !== 'object') return res.status(400).json({ error: 'data objesi gerekli' })
  const conn = await pool.getConnection()
  try {
    await conn.beginTransaction()
    for (const [key, value] of Object.entries(data)) {
      await conn.query(
        'INSERT INTO cms_settings (setting_key, setting_value, setting_group) VALUES (?,?,?) ON DUPLICATE KEY UPDATE setting_value=VALUES(setting_value)',
        [key, value, 'genel']
      )
    }
    await conn.commit()
    res.json({ ok: true })
  } catch (err) {
    await conn.rollback()
    res.status(500).json({ error: err.message })
  } finally { conn.release() }
})

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ SLIDES Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
app.get('/api/slides', async (req, res) => {
  try {
    const lang = req.query.lang === 'en' ? 'en' : 'tr'
    const [rows] = await pool.query('SELECT * FROM cms_slides WHERE is_active=1 ORDER BY order_no ASC')
    if (lang === 'en') {
      rows.forEach(r => {
        if (r.title_en) r.title = r.title_en
        if (r.subtitle_en) r.subtitle = r.subtitle_en
        if (r.tag_en) r.tag = r.tag_en
      })
    }
    res.json(rows)
  } catch (err) { res.status(500).json({ error: err.message }) }
})

app.get('/api/slides/all', auth, async (_req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM slides ORDER BY order_no ASC')
    res.json(rows)
  } catch (err) { res.status(500).json({ error: err.message }) }
})

app.post('/api/slides', auth, async (req, res) => {
  const { tag, title, subtitle, image_url, href } = req.body || {}
  try {
    const [maxRow] = await pool.query('SELECT COALESCE(MAX(order_no),0)+1 as next FROM slides')
    const [result] = await pool.query(
      'INSERT INTO slides (tag,title,subtitle,image_url,href,order_no) VALUES (?,?,?,?,?,?)',
      [tag||'', title||'', subtitle||'', image_url||'', href||'#', maxRow[0].next]
    )
    res.json({ ok: true, id: result.insertId })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

app.put('/api/slides/:id', auth, async (req, res) => {
  const { tag, title, subtitle, image_url, href, is_active } = req.body || {}
  try {
    await pool.query('UPDATE slides SET tag=?,title=?,subtitle=?,image_url=?,href=?,is_active=? WHERE id=?',
      [tag, title, subtitle, image_url, href, is_active??1, req.params.id])
    res.json({ ok: true })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

app.put('/api/slides/reorder', auth, async (req, res) => {
  const { items } = req.body || {}
  if (!Array.isArray(items)) return res.status(400).json({ error: 'items dizisi gerekli' })
  const conn = await pool.getConnection()
  try {
    await conn.beginTransaction()
    for (const item of items) {
      await conn.query('UPDATE slides SET order_no=? WHERE id=?', [item.order_no, item.id])
    }
    await conn.commit()
    res.json({ ok: true })
  } catch (err) {
    await conn.rollback()
    res.status(500).json({ error: err.message })
  } finally { conn.release() }
})

app.delete('/api/slides/:id', auth, async (req, res) => {
  try {
    await pool.query('DELETE FROM slides WHERE id=?', [req.params.id])
    res.json({ ok: true })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ MENU Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
app.get('/api/menu', async (req, res) => {
  try {
    const lang = req.query.lang === 'en' ? 'en' : 'tr'
    const [rows] = await pool.query('SELECT * FROM cms_menu_items WHERE is_active=1 ORDER BY COALESCE(parent_id,0), order_no ASC')
    if (lang === 'en') {
      rows.forEach(r => {
        if (r.label_en) r.label = r.label_en
        if (r.group_header_en) r.group_header = r.group_header_en
      })
    }
    res.json(rows)
  } catch (err) { res.status(500).json({ error: err.message }) }
})

app.get('/api/menu/all', auth, async (_req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM menu_items ORDER BY COALESCE(parent_id,0), order_no ASC')
    res.json(rows)
  } catch (err) { res.status(500).json({ error: err.message }) }
})

app.post('/api/menu', auth, async (req, res) => {
  const { label, href, parent_id, menu_group, group_header } = req.body || {}
  try {
    const [maxRow] = await pool.query('SELECT COALESCE(MAX(order_no),0)+1 as next FROM menu_items')
    const [result] = await pool.query(
      'INSERT INTO menu_items (label,href,parent_id,menu_group,group_header,order_no) VALUES (?,?,?,?,?,?)',
      [label||'', href||'#', parent_id||null, menu_group||null, group_header||null, maxRow[0].next]
    )
    res.json({ ok: true, id: result.insertId })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

app.put('/api/menu/:id', auth, async (req, res) => {
  const { label, href, parent_id, menu_group, group_header, is_active } = req.body || {}
  try {
    await pool.query('UPDATE menu_items SET label=?,href=?,parent_id=?,menu_group=?,group_header=?,is_active=? WHERE id=?',
      [label, href, parent_id||null, menu_group||null, group_header||null, is_active??1, req.params.id])
    res.json({ ok: true })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

app.put('/api/menu/reorder', auth, async (req, res) => {
  const { items } = req.body || {}
  if (!Array.isArray(items)) return res.status(400).json({ error: 'items dizisi gerekli' })
  const conn = await pool.getConnection()
  try {
    await conn.beginTransaction()
    for (const item of items) {
      await conn.query('UPDATE menu_items SET order_no=?,parent_id=? WHERE id=?',
        [item.order_no, item.parent_id ?? null, item.id])
    }
    await conn.commit()
    res.json({ ok: true })
  } catch (err) {
    await conn.rollback()
    res.status(500).json({ error: err.message })
  } finally { conn.release() }
})

app.delete('/api/menu/:id', auth, async (req, res) => {
  try {
    await pool.query('DELETE FROM menu_items WHERE id=?', [req.params.id])
    res.json({ ok: true })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ NEWS Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
app.get('/api/news', async (req, res) => {
  try {
    const lang = req.query.lang === 'en' ? 'en' : 'tr'
    const [rows] = await pool.query('SELECT * FROM cms_news WHERE is_active=1 ORDER BY order_no ASC')
    if (lang === 'en') {
      rows.forEach(r => {
        if (r.title_en) r.title = r.title_en
        if (r.description_en) r.description = r.description_en
        if (r.tag_en) r.tag = r.tag_en
      })
    }
    res.json(rows)
  } catch (err) { res.status(500).json({ error: err.message }) }
})

app.get('/api/news/all', auth, async (_req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM news ORDER BY order_no ASC')
    res.json(rows)
  } catch (err) { res.status(500).json({ error: err.message }) }
})

app.post('/api/news', auth, async (req, res) => {
  const { tag, date, title, description, image_url, href } = req.body || {}
  try {
    const [maxRow] = await pool.query('SELECT COALESCE(MAX(order_no),0)+1 as next FROM news')
    const [result] = await pool.query(
      'INSERT INTO news (tag,date,title,description,image_url,href,order_no) VALUES (?,?,?,?,?,?,?)',
      [tag||'', date||new Date().toISOString().split('T')[0], title||'', description||'', image_url||'', href||'#', maxRow[0].next]
    )
    res.json({ ok: true, id: result.insertId })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

app.put('/api/news/:id', auth, async (req, res) => {
  const { tag, date, title, description, image_url, href, is_active } = req.body || {}
  try {
    await pool.query('UPDATE news SET tag=?,date=?,title=?,description=?,image_url=?,href=?,is_active=? WHERE id=?',
      [tag, date, title, description, image_url, href, is_active??1, req.params.id])
    res.json({ ok: true })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

app.put('/api/news/reorder', auth, async (req, res) => {
  const { items } = req.body || {}
  if (!Array.isArray(items)) return res.status(400).json({ error: 'items dizisi gerekli' })
  const conn = await pool.getConnection()
  try {
    await conn.beginTransaction()
    for (const item of items) {
      await conn.query('UPDATE news SET order_no=? WHERE id=?', [item.order_no, item.id])
    }
    await conn.commit()
    res.json({ ok: true })
  } catch (err) {
    await conn.rollback()
    res.status(500).json({ error: err.message })
  } finally { conn.release() }
})

app.delete('/api/news/:id', auth, async (req, res) => {
  try {
    await pool.query('DELETE FROM news WHERE id=?', [req.params.id])
    res.json({ ok: true })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ CARDS Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
app.get('/api/cards', async (req, res) => {
  try {
    const lang = req.query.lang === 'en' ? 'en' : 'tr'
    const [rows] = await pool.query('SELECT * FROM cms_cards ORDER BY order_no ASC')
    if (lang === 'en') {
      rows.forEach(r => {
        if (r.title_en) r.title = r.title_en
        if (r.description_en) r.description = r.description_en
        if (r.cta_label_en) r.cta_label = r.cta_label_en
      })
    }
    res.json(rows)
  } catch (err) { res.status(500).json({ error: err.message }) }
})

app.put('/api/cards/:id', auth, async (req, res) => {
  const { number, title, description, cta_label, tag, is_active } = req.body || {}
  try {
    await pool.query('UPDATE cards SET number=?,title=?,description=?,cta_label=?,tag=?,is_active=? WHERE id=?',
      [number, title, description, cta_label, tag, is_active??1, req.params.id])
    res.json({ ok: true })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ PROTOCOL Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
app.get('/api/protocol', async (_req, res) => {
  try {
    const [tabs] = await pool.query('SELECT * FROM protocol_tabs WHERE is_active=1 ORDER BY order_no ASC')
    const [steps] = await pool.query('SELECT * FROM protocol_steps ORDER BY order_no ASC')
    res.json({ tabs, steps })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

app.post('/api/protocol/tabs', auth, async (req, res) => {
  const { label } = req.body || {}
  try {
    const [result] = await pool.query('INSERT INTO protocol_tabs (label) VALUES (?)', [label||''])
    res.json({ ok: true, id: result.insertId })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

app.put('/api/protocol/tabs/:id', auth, async (req, res) => {
  const { label, is_active } = req.body || {}
  try {
    await pool.query('UPDATE protocol_tabs SET label=?,is_active=? WHERE id=?', [label, is_active??1, req.params.id])
    res.json({ ok: true })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

app.delete('/api/protocol/tabs/:id', auth, async (req, res) => {
  try {
    await pool.query('DELETE FROM protocol_tabs WHERE id=?', [req.params.id])
    res.json({ ok: true })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

app.post('/api/protocol/steps', auth, async (req, res) => {
  const { tab_id, step_number, title, subtitle, description, docs } = req.body || {}
  try {
    const [maxRow] = await pool.query('SELECT COALESCE(MAX(order_no),0)+1 as next FROM protocol_steps')
    const [result] = await pool.query(
      'INSERT INTO protocol_steps (tab_id,step_number,title,subtitle,description,docs,order_no) VALUES (?,?,?,?,?,?,?)',
      [tab_id, step_number||1, title||'', subtitle||'', description||'', JSON.stringify(docs||[]), maxRow[0].next]
    )
    res.json({ ok: true, id: result.insertId })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

app.put('/api/protocol/steps/:id', auth, async (req, res) => {
  const { tab_id, step_number, title, subtitle, description, docs } = req.body || {}
  try {
    await pool.query(
      'UPDATE protocol_steps SET tab_id=?,step_number=?,title=?,subtitle=?,description=?,docs=? WHERE id=?',
      [tab_id, step_number, title, subtitle, description, JSON.stringify(docs||[]), req.params.id]
    )
    res.json({ ok: true })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

app.delete('/api/protocol/steps/:id', auth, async (req, res) => {
  try {
    await pool.query('DELETE FROM protocol_steps WHERE id=?', [req.params.id])
    res.json({ ok: true })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ FOOTER Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
app.get('/api/footer', async (req, res) => {
  try {
    const lang = req.query.lang === 'en' ? 'en' : 'tr'
    const [cols] = await pool.query('SELECT * FROM cms_footer_cols WHERE is_active=1 ORDER BY order_no ASC')
    const [links] = await pool.query('SELECT * FROM cms_footer_links WHERE is_active=1 ORDER BY order_no ASC')
    const [serviceLinks] = await pool.query('SELECT * FROM footer_service_links WHERE is_active=1 ORDER BY order_no ASC')
    if (lang === 'en') {
      cols.forEach(r => { if (r.title_en) r.title = r.title_en })
      links.forEach(r => { if (r.label_en) r.label = r.label_en })
    }
    res.json({ cols, links, serviceLinks })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

app.post('/api/footer/cols', auth, async (req, res) => {
  const { title } = req.body || {}
  try {
    const [result] = await pool.query('INSERT INTO footer_cols (title) VALUES (?)', [title||''])
    res.json({ ok: true, id: result.insertId })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

app.put('/api/footer/cols/:id', auth, async (req, res) => {
  const { title, is_active } = req.body || {}
  try {
    await pool.query('UPDATE footer_cols SET title=?,is_active=? WHERE id=?', [title, is_active??1, req.params.id])
    res.json({ ok: true })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

app.delete('/api/footer/cols/:id', auth, async (req, res) => {
  try {
    await pool.query('DELETE FROM footer_cols WHERE id=?', [req.params.id])
    res.json({ ok: true })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

app.post('/api/footer/links', auth, async (req, res) => {
  const { col_id, label, href } = req.body || {}
  try {
    const [result] = await pool.query('INSERT INTO footer_links (col_id,label,href) VALUES (?,?,?)', [col_id, label||'', href||'#'])
    res.json({ ok: true, id: result.insertId })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

app.put('/api/footer/links/:id', auth, async (req, res) => {
  const { label, href, is_active } = req.body || {}
  try {
    await pool.query('UPDATE footer_links SET label=?,href=?,is_active=? WHERE id=?', [label, href, is_active??1, req.params.id])
    res.json({ ok: true })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

app.delete('/api/footer/links/:id', auth, async (req, res) => {
  try {
    await pool.query('DELETE FROM footer_links WHERE id=?', [req.params.id])
    res.json({ ok: true })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

app.put('/api/footer/links/reorder', auth, async (req, res) => {
  const { items } = req.body || {}
  if (!Array.isArray(items)) return res.status(400).json({ error: 'items dizisi gerekli' })
  const conn = await pool.getConnection()
  try {
    await conn.beginTransaction()
    for (const item of items) {
      await conn.query('UPDATE footer_links SET order_no=? WHERE id=?', [item.order_no, item.id])
    }
    await conn.commit()
    res.json({ ok: true })
  } catch (err) {
    await conn.rollback()
    res.status(500).json({ error: err.message })
  } finally { conn.release() }
})

app.put('/api/footer/service-links/:id', auth, async (req, res) => {
  const { label, href, icon, is_active } = req.body || {}
  try {
    await pool.query('UPDATE footer_service_links SET label=?,href=?,icon=?,is_active=? WHERE id=?', [label, href, icon, is_active??1, req.params.id])
    res.json({ ok: true })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

app.post('/api/footer/service-links', auth, async (req, res) => {
  const { label, href, icon } = req.body || {}
  try {
    const [result] = await pool.query('INSERT INTO footer_service_links (label,href,icon) VALUES (?,?,?)', [label||'', href||'#', icon||''])
    res.json({ ok: true, id: result.insertId })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

app.delete('/api/footer/service-links/:id', auth, async (req, res) => {
  try {
    await pool.query('DELETE FROM footer_service_links WHERE id=?', [req.params.id])
    res.json({ ok: true })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ STICKY Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
app.get('/api/sticky', async (req, res) => {
  try {
    const lang = req.query.lang === 'en' ? 'en' : 'tr'
    const [rows] = await pool.query('SELECT * FROM cms_sticky_items WHERE is_active=1 ORDER BY order_no ASC')
    if (lang === 'en') {
      rows.forEach(r => { if (r.label_en) r.label = r.label_en })
    }
    res.json(rows)
  } catch (err) { res.status(500).json({ error: err.message }) }
})

app.post('/api/sticky', auth, async (req, res) => {
  const { label, href, icon } = req.body || {}
  try {
    const [result] = await pool.query('INSERT INTO sticky_items (label,href,icon) VALUES (?,?,?)', [label||'', href||'#', icon||''])
    res.json({ ok: true, id: result.insertId })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

app.put('/api/sticky/:id', auth, async (req, res) => {
  const { label, href, icon, is_active } = req.body || {}
  try {
    await pool.query('UPDATE sticky_items SET label=?,href=?,icon=?,is_active=? WHERE id=?', [label, href, icon, is_active??1, req.params.id])
    res.json({ ok: true })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

app.delete('/api/sticky/:id', auth, async (req, res) => {
  try {
    await pool.query('DELETE FROM sticky_items WHERE id=?', [req.params.id])
    res.json({ ok: true })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ POPUPS Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
app.get('/api/popups', async (_req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM popups WHERE is_active=1 AND (start_date IS NULL OR start_date <= NOW()) AND (end_date IS NULL OR end_date >= NOW()) ORDER BY order_no ASC")
    res.json(rows)
  } catch (err) { res.status(500).json({ error: err.message }) }
})

app.get('/api/popups/all', auth, async (_req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM popups ORDER BY order_no ASC')
    res.json(rows)
  } catch (err) { res.status(500).json({ error: err.message }) }
})

app.post('/api/popups', auth, async (req, res) => {
  const { title, content, image_url, href, popup_type, start_date, end_date } = req.body || {}
  try {
    const [result] = await pool.query(
      'INSERT INTO popups (title,content,image_url,href,popup_type,start_date,end_date) VALUES (?,?,?,?,?,?,?)',
      [title||'', content||'', image_url||'', href||'', popup_type||'popup', start_date||null, end_date||null]
    )
    res.json({ ok: true, id: result.insertId })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

app.put('/api/popups/:id', auth, async (req, res) => {
  const { title, content, image_url, href, popup_type, is_active, start_date, end_date } = req.body || {}
  try {
    await pool.query(
      'UPDATE popups SET title=?,content=?,image_url=?,href=?,popup_type=?,is_active=?,start_date=?,end_date=? WHERE id=?',
      [title, content, image_url, href, popup_type, is_active??1, start_date||null, end_date||null, req.params.id]
    )
    res.json({ ok: true })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

app.delete('/api/popups/:id', auth, async (req, res) => {
  try {
    await pool.query('DELETE FROM popups WHERE id=?', [req.params.id])
    res.json({ ok: true })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ SECTIONS Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
app.get('/api/sections', async (_req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM cms_sections ORDER BY order_no ASC')
    res.json(rows)
  } catch (err) { res.status(500).json({ error: err.message }) }
})

app.put('/api/sections/:id', auth, async (req, res) => {
  const { is_active, order_no } = req.body || {}
  try {
    await pool.query('UPDATE cms_sections SET is_active=?,order_no=? WHERE id=?', [is_active??1, order_no||0, req.params.id])
    res.json({ ok: true })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

app.put('/api/sections/reorder', auth, async (req, res) => {
  const { items } = req.body || {}
  if (!Array.isArray(items)) return res.status(400).json({ error: 'items dizisi gerekli' })
  const conn = await pool.getConnection()
  try {
    await conn.beginTransaction()
    for (const item of items) {
      await conn.query('UPDATE cms_sections SET order_no=?,is_active=? WHERE id=?', [item.order_no, item.is_active??1, item.id])
    }
    await conn.commit()
    res.json({ ok: true })
  } catch (err) {
    await conn.rollback()
    res.status(500).json({ error: err.message })
  } finally { conn.release() }
})

// Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â
// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ CORPORATE PAGES (Kurumsal Sayfa Ã„Â°ÃƒÂ§erikleri) Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
// Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â

// Public: TÃƒÂ¼m sayfalarÃ„Â± getir (type filtresiyle)
app.get('/api/pages', async (req, res) => {
  try {
    const { type } = req.query
    let q = 'SELECT * FROM corporate_pages WHERE is_active=1'
    const params = []
    if (type) { q += ' AND page_type=?'; params.push(type) }
    q += ' ORDER BY order_no ASC'
    const [rows] = await pool.query(q, params)
    // attachments JSON parse
    rows.forEach(r => {
      try { r.attachments = JSON.parse(r.attachments || '[]') } catch { r.attachments = [] }
    })
    res.json(rows)
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// Public: Tek sayfa getir (key ile)
app.get('/api/pages/:key', async (req, res) => {
  try {
    const lang = req.query.lang === 'en' ? 'en' : 'tr'
    const [rows] = await pool.query('SELECT * FROM corporate_pages WHERE section_key=? LIMIT 1', [req.params.key])
    if (rows.length === 0) return res.json(null)
    const row = rows[0]
    try { row.attachments = JSON.parse(row.attachments || '[]') } catch { row.attachments = [] }
    if (lang === 'en') {
      if (row.title_en) row.title = row.title_en
      if (row.content_en) row.content = row.content_en
    }
    res.json(row)
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// Admin: TÃƒÂ¼m sayfalar (aktif + pasif)
app.get('/api/pages/admin/all', auth, async (req, res) => {
  try {
    const { type } = req.query
    let q = 'SELECT * FROM corporate_pages'
    const params = []
    if (type) { q += ' WHERE page_type=?'; params.push(type) }
    q += ' ORDER BY page_type, order_no ASC'
    const [rows] = await pool.query(q, params)
    rows.forEach(r => {
      try { r.attachments = JSON.parse(r.attachments || '[]') } catch { r.attachments = [] }
    })
    res.json(rows)
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// Admin: Sayfa oluÃ…Å¸tur
app.post('/api/pages', auth, async (req, res) => {
  const { page_type, section_key, title, content, attachments } = req.body || {}
  if (!section_key) return res.status(400).json({ error: 'section_key zorunlu' })
  try {
    const [maxRow] = await pool.query('SELECT COALESCE(MAX(order_no),0)+1 as next FROM corporate_pages WHERE page_type=?', [page_type || 'kurumsal'])
    const [result] = await pool.query(
      'INSERT INTO corporate_pages (page_type,section_key,title,content,attachments,order_no) VALUES (?,?,?,?,?,?)',
      [page_type||'kurumsal', section_key, title||'', content||'', JSON.stringify(attachments||[]), maxRow[0].next]
    )
    res.json({ ok: true, id: result.insertId })
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ error: 'Bu section_key zaten mevcut' })
    res.status(500).json({ error: err.message })
  }
})

// Admin: Sayfa gÃƒÂ¼ncelle (ID ile)
app.put('/api/pages/:id', auth, async (req, res) => {
  const { page_type, section_key, title, content, attachments, is_active } = req.body || {}
  try {
    await pool.query(
      'UPDATE corporate_pages SET page_type=?,section_key=?,title=?,content=?,attachments=?,is_active=? WHERE id=?',
      [page_type, section_key, title, content, JSON.stringify(attachments||[]), is_active??1, req.params.id]
    )
    res.json({ ok: true })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// Admin: Sayfa gÃƒÂ¼ncelle (key ile Ã¢â‚¬â€ upsert)
app.put('/api/pages/by-key/:key', auth, async (req, res) => {
  const { page_type, title, content, attachments, is_active } = req.body || {}
  try {
    const [existing] = await pool.query('SELECT id FROM corporate_pages WHERE section_key=?', [req.params.key])
    if (existing.length > 0) {
      await pool.query(
        'UPDATE corporate_pages SET title=?,content=?,attachments=?,is_active=? WHERE section_key=?',
        [title, content, JSON.stringify(attachments||[]), is_active??1, req.params.key]
      )
      res.json({ ok: true, id: existing[0].id })
    } else {
      const [maxRow] = await pool.query('SELECT COALESCE(MAX(order_no),0)+1 as next FROM corporate_pages WHERE page_type=?', [page_type || 'kurumsal'])
      const [result] = await pool.query(
        'INSERT INTO corporate_pages (page_type,section_key,title,content,attachments,order_no) VALUES (?,?,?,?,?,?)',
        [page_type||'kurumsal', req.params.key, title||'', content||'', JSON.stringify(attachments||[]), maxRow[0].next]
      )
      res.json({ ok: true, id: result.insertId, created: true })
    }
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// Admin: Sayfa sil
app.delete('/api/pages/:id', auth, async (req, res) => {
  try {
    await pool.query('DELETE FROM corporate_pages WHERE id=?', [req.params.id])
    res.json({ ok: true })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â
// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ FILE UPLOAD (Multer) Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
// Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â

// Tek dosya yÃƒÂ¼kle
app.post('/api/upload', auth, upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Dosya yÃƒÂ¼klenemedi' })
  res.json({
    ok: true,
    file: {
      filename: req.file.filename,
      originalName: req.file.originalname,
      url: `/uploads/${req.file.filename}`,
      size: req.file.size,
      mimeType: req.file.mimetype,
    }
  })
})

// Ãƒâ€¡oklu dosya yÃƒÂ¼kle (max 10)
app.post('/api/upload/multi', auth, upload.array('files', 10), (req, res) => {
  if (!req.files || req.files.length === 0) return res.status(400).json({ error: 'Dosya yÃƒÂ¼klenemedi' })
  const files = req.files.map(f => ({
    filename: f.filename,
    originalName: f.originalname,
    url: `/uploads/${f.filename}`,
    size: f.size,
    mimeType: f.mimetype,
  }))
  res.json({ ok: true, files })
})

// Dosya sil
app.delete('/api/upload/:filename', auth, (req, res) => {
  const filePath = path.join(UPLOADS_DIR, req.params.filename)
  if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'Dosya bulunamadÃ„Â±' })
  try {
    fs.unlinkSync(filePath)
    res.json({ ok: true })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// Multer error handler
app.use((err, _req, res, _next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') return res.status(413).json({ error: 'Dosya boyutu 25MB limitini aÃ…Å¸Ã„Â±yor' })
    return res.status(400).json({ error: err.message })
  }
  if (err) return res.status(500).json({ error: err.message })
})

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ SAÃ„ÂLIK Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
app.get('/api/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1')
    res.json({ ok: true, db: 'baÃ„Å¸lÃ„Â±' })
  } catch (err) {
    res.status(500).json({ ok: false, db: 'baÃ„Å¸lÃ„Â± deÃ„Å¸il', error: err.message })
  }
})

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ BAÃ…ÂLAT Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
app.get('/api/pages/type/:type', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM corporate_pages WHERE page_type=? ORDER BY order_no ASC', [req.params.type]);
    res.json(rows);
  } catch(err) { res.status(500).json({error:err.message}); }
});

app.listen(5001, async () => {
  console.log('YENÃ„Â° WEB CMS Backend: http://localhost:5001')
  // Admin yoksa oluÃ…Å¸tur
  try {
    const [rows] = await pool.query('SELECT id FROM admins LIMIT 1')
    if (rows.length === 0) {
      await pool.query('INSERT INTO admins (username, password_hash, role) VALUES (?,?,?)', [ADMIN_USER, ADMIN_PASS, 'admin'])
      console.log(`[KURULUM] Admin oluÃ…Å¸turuldu: ${ADMIN_USER} / ${ADMIN_PASS}`)
    }
  } catch (err) {
    console.error('[KURULUM HATASI]', err.message)
  }
})
  ssl: { rejectUnauthorized: false }

