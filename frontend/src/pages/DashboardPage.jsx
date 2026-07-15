import { Link } from "react-router-dom";
import {
  Loading,
  DashboardStatus,
  LowStockAlert,
  RecentOrders,
} from "../components";
import useProducts from "../hooks/useProducts";
import { STOCK_LEVEL } from "../../config/appConfig";
import useOrders from "../hooks/useOrders";

function Dashboard() {
  const { products, isLoading } = useProducts();
  const { orders, isLoading: isOrdersLoading } = useOrders();

  // filter the low stock for the alert
  const lowStockProducts =
    products?.data?.filter(
      (item) =>
        item.stock <= STOCK_LEVEL.stock_critical ||
        item.stock <= STOCK_LEVEL.stock_low,
    ) ?? [];

  // status for the dashboardStatus
  const stats = {
    totalProducts: products?.data?.length,
    lowStockProducts: lowStockProducts.length,
    totalOrders: orders?.data?.length,
    pendingOrders: orders?.data?.filter((item) => item.status === "pending").length,
  };

  return (
    <>
      {isLoading && <Loading />}

      <div className="space-y-10">
        {/* dashboard status */}
        <DashboardStatus stats={stats} />

        {/* recent orders && low stock product alert */}
        <div className="flex max-lg:flex-col gap-8">
          {/* rencent orders */}
          <section className="flex flex-1 gap-4 flex-col">
            <div className="flex items-center justify-between">
              <h2 className="section-header-2">Recent Orders :</h2>
              <Link
                to={"/orders"}
                className="text-md capitalize hover:text-blue-700 transition-colors text-blue-500 cursor-pointer"
              >
                view all
              </Link>
            </div>
            <div className="rounded-lg overflow-x-auto ring shadow shadow-black/30 dark:shadow-white/20 ring-white/10 ">
              <RecentOrders orders={orders} isLoading={isOrdersLoading} />
            </div>
          </section>
          {/* == recent orders == */}

          {/* low stock alert section*/}
          <LowStockAlert lowStockProducts={lowStockProducts} />
          {/* == low stock aler section == */}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
