// const KEY = 'rr_compare_v2'; 

// export function getCompareMap() {
//   try { return JSON.parse(localStorage.getItem(KEY) || '{}'); }
//   catch { return {}; }
// }

// export function setCompareMap(m) {
//   localStorage.setItem(KEY, JSON.stringify(m));
// }

// export function toggleCompareItem(item) {
//   const m = getCompareMap();
//   if (m[item.id]) delete m[item.id];
//   else m[item.id] = { id: item.id, data: item };
//   setCompareMap(m);
//   return m;
// }

// export function listCompareItems() {
//   const m = getCompareMap();
//   return Object.values(m).map(x => x.data);
// }

const KEY = 'rr_compare_v2'

export function getCompareMap() {
  try { return JSON.parse(localStorage.getItem(KEY) || '{}') }
  catch { return {} }
}

export function setCompareMap(m) {
  localStorage.setItem(KEY, JSON.stringify(m))
}

export function toggleCompareItem(item) {
  const m = getCompareMap()
  if (m[item.id]) delete m[item.id]
  else m[item.id] = { id: item.id, data: item }
  setCompareMap(m)
  return m
}

export function listCompareItems() {
  const m = getCompareMap()
  return Object.values(m).map(x => x.data)
}
