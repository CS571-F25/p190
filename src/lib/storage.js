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
