function hashCode(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

export function getDataSpecs(id) {
  const h = hashCode(String(id ?? 'seed'));
  const bedrooms  = (h % 4) + 1;                  
  const bathrooms = ((Math.floor(h / 7) % 3) + 1);  
  const base = 900 + (h % 1200);                  
  const price = Math.round((base + bedrooms * 250) / 10) * 10; 
  return { bedrooms, bathrooms, price };
}

export function money(n) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}
