import { useMemo, useState } from "react";
import { bestListingImage, geoapifyStaticUrl, fallbackMapUrl } from "../lib/images.js";

export default function MapImage({
  lat,
  lon,
  zoom = 16,
  className = "",
  alt = "Map preview"
}) {
  const first = useMemo(
    () => bestListingImage(lat, lon, { zoom }),
    [lat, lon, zoom]
  );
  const second = useMemo(
    () => geoapifyStaticUrl(lat, lon, { zoom }),
    [lat, lon, zoom]
  );

  const [src, setSrc] = useState(first || second || fallbackMapUrl());

  function handleError() {
    if (src === first && second) setSrc(second);
    else if (src !== fallbackMapUrl()) setSrc(fallbackMapUrl());
  }

  return (
    <img
      src={src}
      onError={handleError}
      className={className}
      alt={alt}
      loading="lazy"
      width={640}
      height={360}
    />
  );
}
