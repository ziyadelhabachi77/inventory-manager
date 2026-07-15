
import { STOCK_LEVEL } from "../../../config/appConfig";

function ProductsStatus({ stock }) {
  const status =
    stock <= STOCK_LEVEL.stock_critical
      ? "critical"
      : stock <= STOCK_LEVEL.stock_low
        ? "low"
        : "good";

  return (
    <div className="flex items-center gap-2">
      <span
        className={`h-2 w-2 ${status === "critical" ? "bg-red-500" : status === "low" ? "bg-orange-400" : "bg-green-500"} rounded-full`}
      ></span>
      <span className={`capitalize`}>{stock} in stock</span>
      <span
        className={`px-1 py-0.5 rounded ${status === "critical" ? "bg-[#FEE2E2] text-[#991B1B]" : status === "low" ? "bg-[#FEF3C7] text-[#92400E]" : "bg-[#D1FAE5] text-[#065F46]"}`}
      >{status}</span>
    </div>
  );
}

export default ProductsStatus;
