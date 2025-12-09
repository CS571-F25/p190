const KEY = 'rr_compare_v2';

export function getCompareMap() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '{}');
  } catch {
    return {};
  }
}

export function setCompareMap(map) {
  localStorage.setItem(KEY, JSON.stringify(map || {}));
}

export function toggleCompareItem(item) {
  const map = getCompareMap();
  if (map[item.id]) {
    delete map[item.id];
  } else {
    map[item.id] = { id: item.id, data: item };
  }
  setCompareMap(map);
  return map;
}

export function listCompareItems() {
  const map = getCompareMap();
  return Object.values(map).map(x => x.data);
}

export function clearCompare() {
  localStorage.removeItem(KEY);
  return {};
}