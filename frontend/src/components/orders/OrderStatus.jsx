export default function OrdersStatus({ status }) {
  const statuStyle =
    status.toLowerCase() === "completed"
      ? "bg-[#DCFCE7] text-[#1C6939]"
      : status.toLowerCase() === "pending"
        ? "bg-[#FFEDD5] text-[#9A3412]"
        : "bg[#FEE2E2] text-[#9A1D1D]";
  return (
    <span className={`${statuStyle} rounded-lg text-xs  py-0.5 px-2`}>{status}</span>
  );
}