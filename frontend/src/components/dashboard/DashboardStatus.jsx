import { Package, ShoppingBag, Clock, TriangleAlert } from "lucide-react";

function DashboardStatus({stats}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {/* total product */}
      <div className="rounded-lg overflow-hidden px-4 py-3 relative bg-(--color-bg-secondary)/60 backdrop-blur-lg ring ring-gray-500/10">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <span className="text-(--color-text)">Total Products</span>
            <span className="text-black text-xl font-semibold dark:text-white">
              {stats.totalProducts || 0}
            </span>
          </div>
          <div>
            <span className="p-1.5 rounded bg-[#EFF6FF] text-[#607AFB] dark:bg-[#223557] ring ring-blue-700/40 backdrop-blur-lg dark:text-[#3B82F6] flex items-center justify-items-center">
              <Package size={28} />
            </span>
          </div>
        </div>
        <div className="absolute hidden dark:block inset-0 bg-linear-to-b from-blue-800/10 to-blue-950/5 h-full overflow-hidden -z-1"></div>
      </div>
      {/* total orders */}
      <div className="rounded-lg overflow-hidden px-4 py-3 ring ring-violet-500/10 relative bg-(--color-bg-secondary)/60 backdrop-blur-lg">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <span className="text-(--color-text)">Total Orders</span>
            <span className="text-black text-xl font-semibold dark:text-white">
              {stats.totalOrders || 0}
            </span>
          </div>
          <div>
            <span className="p-1.5 rounded ring ring-violet-600/40 bg-[#FAF5FF] text-[#9333EA] dark:bg-[#253357] dark:text-[#7E8BF8] backdrop-blur-lg flex items-center justify-items-center">
              <ShoppingBag size={28} />
            </span>
          </div>
        </div>
        <div className="absolute hidden dark:block inset-0 bg-linear-to-b from-violet-500/3 to-violet-950/5 h-full overflow-hidden -z-1"></div>
      </div>
      {/* pending orders */}
      <div className="rounded-lg overflow-hidden px-4 py-3 ring ring-[#F3BC2D]/10 relative bg-(--color-bg-secondary)/60 backdrop-blur-lg">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <span className="text-(--color-text)">Pending Orders</span>
            <span className="text-black text-xl font-semibold dark:text-white">
              {stats.pendingOrders || 0}
            </span>
          </div>
          <div>
            <span className="p-1.5 rounded ring ring-[#F3BC2D]/40 bg-[#FFF7ED] dark:ring-[#F3BC2D]/20 text-[#F97316] dark:bg-[#333840] dark:text-[#F3BC2D] backdrop-blur-lg flex items-center justify-items-center">
              <Clock size={28} />
            </span>
          </div>
        </div>
        <div className="absolute hidden dark:block inset-0 bg-linear-to-b from-[#F3BC2D]/2 to-[#F3BC2D]/3 h-full overflow-hidden -z-1"></div>
      </div>{" "}
      {/* low stock alert */}
      <div className="rounded-lg overflow-hidden px-4 py-3 ring ring-[#F3BC2D]/10 relative bg-(--color-bg-secondary)/60 backdrop-blur-lg">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <span className="text-(--color-text)">Low Stock Items</span>
            <span className="text-black text-xl font-semibold dark:text-white">
              {stats.lowStockProducts || 0}
            </span>
          </div>
          <div>
            <span className="p-1.5 rounded ring ring-red-500/40 dark:ring-red-500/20 bg-[#FEF2F2] text-[#EF4444] dark:bg-[#3A2C3C] dark:text-[#F87171] backdrop-blur-lg flex items-center justify-items-center">
              <TriangleAlert size={28} />
            </span>
          </div>
        </div>
        <div className="absolute hidden dark:block inset-0 bg-linear-to-b from-red-500/5 to-red-500/2 h-full overflow-hidden -z-1"></div>
      </div>
    </div>
  );
}

export default DashboardStatus;
