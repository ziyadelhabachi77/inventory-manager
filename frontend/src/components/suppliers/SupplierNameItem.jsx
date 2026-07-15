function SupplierNameItem({ supplierName, supplierBadgeColor }) {
  const splitedName = supplierName.split(" ");
  const fLetter = splitedName[0][0];
  const sLetter = splitedName.length > 1 ? splitedName[1][0] : "";

  return (
    <div className="flex items-center gap-2">
      <span
        className={`rounded-md ${splitedName.length > 1 ? "p-1" : "px-3 py-1"} ${supplierBadgeColor}`}
      >
        {sLetter !== ""
          ? fLetter.toUpperCase() + sLetter.toUpperCase()
          : fLetter}
      </span>
      <span>{supplierName}</span>
    </div>
  );
}

export default SupplierNameItem;
