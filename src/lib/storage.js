// const KEY = 'rr_shortlist_v2'

// export function getShortlist(){
//   try { return JSON.parse(localStorage.getItem(KEY) || '{"items":[]}') }
//   catch { return { items: [] } }
// }
// export function setShortlist(obj){
//   localStorage.setItem(KEY, JSON.stringify(obj))
// }
// export function isShortlisted(id){
//   return !!getShortlist().items.find(x => x.id === id)
// }
// export function toggleShortlist(item){
//   const s = getShortlist()
//   const idx = s.items.findIndex(x => x.id === item.id)
//   let now
//   if (idx >= 0) { s.items.splice(idx,1); now = false }
//   else { s.items.push({ id: item.id, data: item }); now = true }
//   setShortlist(s)
//   return now
// }


const KEY = 'rr_shortlist_v1';

function read() {
  try { return JSON.parse(localStorage.getItem(KEY) || '[]'); }
  catch { return []; }
}

function write(arr) {
  localStorage.setItem(KEY, JSON.stringify(arr));
}

export function listShortlist() {
  return read();
}
export const getShortlist = listShortlist;   
export const getShortList = listShortlist;  

export function isShortlisted(id) {
  return read().some(x => x.id === id);
}

export function toggleShortlist(item) {
  const arr = read();
  const i = arr.findIndex(x => x.id === item.id);
  if (i >= 0) {
    arr.splice(i, 1);
    write(arr);
    return false; 
  }
  arr.push(item);
  write(arr);
  return true;
}

export function removeFromShortlist(id) {
  write(read().filter(x => x.id !== id));
}

export function clearShortlist() {
  write([]);
}
