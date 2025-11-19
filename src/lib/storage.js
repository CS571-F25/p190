const KEY = 'rr_shortlist_v2'

export function getShortlist(){
  try { return JSON.parse(localStorage.getItem(KEY) || '{"items":[]}') }
  catch { return { items: [] } }
}
export function setShortlist(obj){
  localStorage.setItem(KEY, JSON.stringify(obj))
}
export function isShortlisted(id){
  return !!getShortlist().items.find(x => x.id === id)
}
export function toggleShortlist(item){
  const s = getShortlist()
  const idx = s.items.findIndex(x => x.id === item.id)
  let now
  if (idx >= 0) { s.items.splice(idx,1); now = false }
  else { s.items.push({ id: item.id, data: item }); now = true }
  setShortlist(s)
  return now
}
