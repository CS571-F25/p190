export function getLocal(key, fallback) {
  try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback } catch { return fallback }
}
export function setLocal(key, value) { localStorage.setItem(key, JSON.stringify(value)) }

const KEY = 'rr_shortlist' 

export function getShortlist() { return getLocal(KEY, { items: [] }) }
export function isShortlisted(id) { return getShortlist().items.some(x => x.id === id) }
export function toggleShortlist(item) {
  const s = getShortlist()
  const i = s.items.findIndex(x => x.id === item.id)
  if (i >= 0) s.items.splice(i, 1); else s.items.push({ id: item.id, data: item, note: '' })
  setLocal(KEY, s); return s
}
export function updateNote(id, note) {
  const s = getShortlist(); const found = s.items.find(x => x.id === id)
  if (found) { found.note = note; setLocal(KEY, s) }
  return s
}