import { User, Calendar, Package, Eye, Edit, Trash } from "lucide-react";

import OrdersStatus from "./OrderStatus";
import { formatDateForOrder } from "../../utils/formateDate";

function OrdersCard({ orders,navigate,setDeleteOrder }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {orders?.map((order) => (
        <div
          key={order._id}
          className="rounded-md bg-(--color-bg-secondary) ring ring-gray-300/50 p-2"
        >
          {/* order status && id */}
          <div className="flex items-center justify-between">
            <span className="rounded p-1 text-gray-500 text-xs bg-gray-300/30 dark:bg-gray-300/80">
              #{order.orderId.slice(-5)}
            </span>
            <OrdersStatus status={order.status} />
          </div>
          {/* === order status && id */}
          {/* order info */}
          <div className="py-5 flex items-center">
            <div className="text-center gap-2 border-b pb-3 w-full border-gray-300/50 flex justify-center items-center flex-col">
              <span className="text-lg text-black/70 dark:text-white/70">
                {order.name}
              </span>
              <span className="text-3xl font-semibold text-black dark:text-white">
                ${order.totalPrice}
              </span>
              <span className="text-sm text-(--color-text)">
                Placed on {formatDateForOrder(order.createdAt)}
              </span>
            </div>
          </div>
          {/* ==== order info ====*/}

          {/* order action */}
          <div className="flex max-xs:flex-wrap py-3 mb-1 gap-5 items-center justify-between">
            <button onClick={() => navigate(`view-order/${order._id}`)} className="rounded px- flex items-center text-blue-500 ring-blue-500 dark:text-white/70 dark:ring-white/70 hover:text-blue-900 hover:ring-blue-800 dark:hover:text-white dark:hover:ring-white justify-center gap-2 py-1 cursor-pointer text-xs w-full ring">
              <Eye size={16} />
              View
            </button>
            <button onClick={() => setDeleteOrder(order._id)} className="rounded px- flex items-center text-red-500 ring-red-500 dark:ring-red-900 dark:text-red-800 dark:hover:text-red-600 transition-colors dark:hover:ring-red-600 hover:text-red-700 hover:ring-red-700 justify-center gap-2 py-1 cursor-pointer text-xs w-full ring">
              <Trash size={16} />
              Delete
            </button>
            
          </div>
          {/* === order action */}
        </div>
      ))}
    </div>
  );
}

export default OrdersCard;
