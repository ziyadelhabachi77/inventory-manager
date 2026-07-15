import { Ellipsis, PackageCheck, TriangleAlert, X } from "lucide-react";
import { STOCK_LEVEL } from "../../../config/appConfig";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ModalFormContainer from "../ModalFormContainer";

function LowStockAlert({ lowStockProducts }) {
  const navigate = useNavigate();
  const [showAlertsModal, setShowAlertsModal] = useState(false);
  const previewAlerts = lowStockProducts?.slice(0, 5) ?? [];

  return (
    <section className="w-full md:w-[80%] lg:w-[30%]  flex flex-col gap-4 overflow-hidden">
      {showAlertsModal && (
        <ModalFormContainer>
          <div className="max-h-[85vh] w-screen max-w-170 overflow-hidden rounded-lg bg-(--color-bg-secondary) shadow-lg">
            <div className="flex items-center justify-between border-b border-gray-500/20 px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-red-50 p-2 text-red-500 dark:bg-red-500/10">
                  <TriangleAlert size={22} />
                </span>
                <div>
                  <h3 className="text-xl font-bold text-black dark:text-white">
                    Low Stock Alerts
                  </h3>
                  <p className="text-sm text-(--color-text)">
                    {lowStockProducts?.length ?? 0} products need attention.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowAlertsModal(false)}
                className="rounded-md p-2 text-(--color-text) transition-colors hover:bg-gray-500/10 hover:text-black dark:hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto custom-scroll divide-y divide-gray-500/20">
              {lowStockProducts?.length > 0 ? (
                lowStockProducts.map((item) => {
                  const isCritical =
                    item.stock <= STOCK_LEVEL.stock_critical;

                  return (
                    <div
                      key={item._id}
                      className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-black dark:text-white">
                            {item.name}
                          </span>
                          <span
                            className={`rounded-full px-2 py-0.5 text-xs ${
                              isCritical
                                ? "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400"
                                : "bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-300"
                            }`}
                          >
                            {isCritical ? "Critical" : "Low"}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-(--color-text)">
                          {item.stock} items remaining
                          {item?.categoryId?.name
                            ? ` in ${item.categoryId.name}`
                            : ""}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setShowAlertsModal(false);
                          navigate(`/products/edit-product/${item?._id}`);
                        }}
                        className="rounded-md border border-blue-500 px-3 py-2 text-sm font-medium text-blue-500 transition-colors hover:bg-blue-500 hover:text-white"
                      >
                        Restock
                      </button>
                    </div>
                  );
                })
              ) : (
                <div className="flex min-h-60 flex-col items-center justify-center gap-3 px-5 py-8 text-center">
                  <span className="rounded-full bg-green-50 p-4 text-green-600 dark:bg-green-500/10">
                    <PackageCheck size={44} strokeWidth={1.4} />
                  </span>
                  <div>
                    <h4 className="font-semibold text-black dark:text-white">
                      No stock alerts
                    </h4>
                    <p className="text-sm text-(--color-text)">
                      All products are above the low stock threshold.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </ModalFormContainer>
      )}

      {/* low stock header */}
      <div className="flex items-center justify-between">
        <h2 className="section-header-2">Low Stock Alerts :</h2>
        <button className="text-md capitalize text-gray-600 dark:text-gray-400 cursor-pointer">
          <Ellipsis />
        </button>
      </div>
      {/* == low stock header == */}

      {/* low stock body */}
      <div className="flex bg-(--color-bg-secondary) rounded-lg flex-col justify-between">
        <div className="divide-y divide-gray-500/20">
          {/* stock items */}
          {previewAlerts?.map((item) => (
            <div key={item._id} className="px-4 py-3 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-black dark:text-white max-w-35 truncate">
                  {item.name}
                </span>
                <span className={`text-sm ${item.stock <= STOCK_LEVEL.stock_critical ? "text-red-500/80  dark:text-red-500" : "text-orange-400 dark:text-orange-400/90"} `}>
                  {item.stock} items remaining
                </span>
              </div>
              <button onClick={() => navigate(`products/edit-product/${item?._id}`)} className="text-sm text-blue-500 hover:text-blue-700 transition-colors cursor-pointer">
                Restock
              </button>
            </div>
          ))}
          {lowStockProducts?.length === 0 && (
            <div className="px-4 py-10 text-center text-sm text-(--color-text)">
              No low stock alerts right now.
            </div>
          )}
          {/* == stock items == */}
        </div>
        {/* view all alers button*/}
        <div className="px-4 border-t border-gray-500/30 py-3">
          <button
            onClick={() => setShowAlertsModal(true)}
            className="w-full rounded border capitalize hover:text-black dark:hover:text-white border-dashed cursor-pointer py-2 text-(--color-text)"
          >
            view all alerts
          </button>
        </div>
      </div>
      {/* == low stock body == */}
    </section>
  );
}

export default LowStockAlert;
