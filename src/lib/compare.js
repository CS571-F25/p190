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
//   if (m[item.id]) {
//     delete m[item.id];
//   } else {
//     m[item.id] = { id: item.id, data: item, ts: Date.now() };

//     const entries = Object.values(m).sort((a, b) => a.ts - b.ts);
//     while (entries.length > 2) {
//       const oldest = entries.shift();
//       delete m[oldest.id];
//     }
//   }
//   setCompareMap(m);
//   return m;
// }

// export function removeCompare(id) {
//   const m = getCompareMap();
//   if (m[id]) {
//     delete m[id];
//     setCompareMap(m);
//   }
//   return m;
// }

// export function isCompared(id) {
//   return !!getCompareMap()[id];
// }


// export function listCompareItems() {
//   const arr = Object.values(getCompareMap()).sort((a, b) => a.ts - b.ts);
//   return arr.map(x => x.data);
// }

// export function swapCompare() {
//   const arr = Object.values(getCompareMap()).sort((a, b) => a.ts - b.ts);
//   if (arr.length !== 2) return getCompareMap();
//   const now = Date.now();
//   const m = {};
//   m[arr[1].id] = { ...arr[1], ts: now - 1 };
//   m[arr[0].id] = { ...arr[0], ts: now };
//   setCompareMap(m);
//   return m;
// }
