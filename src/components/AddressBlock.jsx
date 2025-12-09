export default function AddressBlock({ title, address, titleClass="fs-6", addrClass="text-muted small mb-2" }) {
  return (
    <>
      {title && <div className={`${titleClass} text-wrap`}>{title}</div>}
      {address && <div className={`${addrClass} text-wrap`}>{address}</div>}
    </>
  );
}
