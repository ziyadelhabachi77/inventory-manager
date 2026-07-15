import { Eye, Trash, EllipsisVertical } from "lucide-react";
import { formatDateForOrder } from "../../utils/formateDate";
import OrdersStatus from "./OrderStatus";

function OrdersTable({ orders, navigate, setDeleteOrder }) {
  return (
    <table className="min-w-full  rounded-t-lg border-collapse text-left">
      <thead className="bg-(--color-bg-main) dark:bg-(--color-bg-secondary) ">
        <tr>
          <th className="p-3 text-sm text-(--color-text)">ORDER ID</th>
          <th className="p-3 text-sm text-(--color-text)">PRODUCT</th>
          <th className="p-3 text-sm text-(--color-text)">CUSTOMER</th>
          <th className="p-3 text-sm text-(--color-text)">DATE</th>
          <th className="p-3 text-sm text-(--color-text)">STATUS</th>
          <th className="p-3 text-sm text-(--color-text)">AMOUNT</th>
          <th className="p-3 text-sm text-(--color-text)">ACTION</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-500/20">
        {orders?.map((item) => (
          <tr key={item._id}>
            <td className="py-3 text-sm dark:text-white/90 text-blue-500 px-3">
              #ORD-{item.orderId.slice(-5)}
            </td>
            <td className="py-3 text-sm dark:text-white/90 px-3">
              {item?.products.length > 1 ? (
                <div className="truncate w-15">
                  {item?.products[0].productId.name}...
                </div>
              ) : (
                <div className="truncate w-15">
                  {item?.products[0].productId.name}
                </div>
              )}
            </td>
            <td className="py-3 text-sm dark:text-white/90 px-3">
              {item?.name}
            </td>
            <td className="py-3 text-sm dark:text-white/90 px-3">
              {formatDateForOrder(item?.createdAt)}
            </td>
            <td className="py-3 text-sm dark:text-white/90 px-3">
              <OrdersStatus status={item?.status} />
            </td>
            <td className="py-3 text-sm font-bold dark:text-white/90 px-3 text-center">
              ${item?.totalPrice}
            </td>
            <td className="py-3 text-sm dark:text-white/90 px-3">
              <div className="flex w-fit relative group justify-center">
                <EllipsisVertical size={17} className="cursor-pointer" />

                <div className="rounded-md group-hover:flex w-20 bg-white hidden flex-col shadow absolute right-3 z-10 top-0 py-2 px-1">
                  <button onClick={() => navigate(`view-order/${item._id}`)} className="py-1 cursor-pointer hover:bg-gray-200/40 text-gray-500 transition-colors hover:text-orange-300 flex items-center justify-center gap-2">
                    <Eye size={14} />
                    View
                  </button>
                  <button onClick={() => setDeleteOrder(item._id)} className="py-1 cursor-pointer hover:bg-gray-200/40 text-gray-500 transition-colors hover:text-red-500 flex items-center justify-center gap-2">
                    <Trash size={14} />
                    Delete
                  </button>
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default OrdersTable;
