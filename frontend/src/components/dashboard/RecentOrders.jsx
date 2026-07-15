import { ClipboardList } from "lucide-react";

function RecentOrders({ orders, isLoading }) {
  const data = Array.isArray(orders?.data) ? orders.data : [];

  const sortedRecenteOrders = data
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const checkProductName = (order) => {
    if (order?.products?.length > 1) {
      return <span>{order?.products[0]?.productId?.name}...</span>;
    }
    return <span>{order?.products[0]?.productId?.name}</span>;
  };

  if (isLoading && !sortedRecenteOrders.length) {
    return (
      <div className="flex min-h-80 items-center justify-center bg-(--color-bg-secondary)/80 px-6">
        <p className="text-sm text-(--color-text)">Loading recent orders...</p>
      </div>
    );
  }

  if (!sortedRecenteOrders.length) {
    return (
      <div className="flex min-h-80 items-center justify-center bg-(--color-bg-secondary)/80 px-6">
        <div className="flex max-w-80 flex-col items-center gap-3 text-center">
          <span className="rounded-full bg-blue-50 p-5 text-blue-500 ring-1 ring-blue-100 dark:bg-blue-500/10 dark:ring-blue-500/20">
            <ClipboardList size={56} strokeWidth={1.2} />
          </span>
          <div>
            <h3 className="text-lg font-semibold text-black dark:text-white">
              No orders yet
            </h3>
            <p className="text-sm text-(--color-text)">
              New customer orders will appear here as soon as they are created.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <table className="min-w-full bg-(--color-bg-secondary)/80 rounded-lg border-collapse text-left">
      <thead className="bg-(--color-bg-main) dark:bg-(--color-bg-secondary)">
        <tr>
          <th className="p-3 text-sm text-(--color-text)">ORDER ID</th>
          <th className="p-3 text-sm text-(--color-text)">PRODUCTS</th>
          <th className="p-3 text-sm text-(--color-text)">CUSTOMER</th>
          <th className="p-3 text-sm text-(--color-text)">STATUS</th>
          <th className="p-3 text-sm text-(--color-text)">AMOUNT</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-500/20">
        {sortedRecenteOrders?.map((o) => (
          <tr key={o._id}>
            <td className="py-3 text-sm dark:text-white/90 px-3 font-bold">
              <span className="text-blue-500">ORD:</span>{" "}
              {o.orderId?.slice(0, 4)}
            </td>
            <td className="py-3 text-sm dark:text-white/90 px-3">
              {checkProductName(o)}
            </td>
            <td className="py-3 text-sm dark:text-white/90 px-3">{o.name}</td>
            <td className="py-3 text-sm dark:text-white/90 px-3">{o.status}</td>
            <td className="py-3 text-sm  dark:text-white/90 px-3 font-bold">
              ${o.totalPrice}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default RecentOrders;
