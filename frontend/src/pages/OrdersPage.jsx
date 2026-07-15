import { useEffect, useState } from "react";
import {
  DataNotfound,
  DeleteConfirmationModal,
  OrdersTable,
  ModalFormContainer
} from "../components";
import { SearchX, TableOfContents, Grid2x2 } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import OrdersFilter from "../components/orders/OrdersFilter";
import useOrders from "../hooks/useOrders";
import OrdersCard from "../components/orders/OrdersCard";

function OrderPage() {
  // ====== navigation ======
  const navigate = useNavigate();
  // ====== URL params ======
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  const status = searchParams.get("status") || "";
  // ====== local states ======
  const [searchInput, setSearchInput] = useState(searchTerm);
  const [debounceSearch, setDebounceSearch] = useState(searchTerm);
  const [page, setPage] = useState(1);
  const [statusState, setStatusState] = useState(status);
  const [viewMode, setViewMode] = useState("table");
  const limit = 6;
  const [deleteOrd, setDeleteOrd] = useState({
    display: false,
    id: "",
  });
  // ======= fetch orders ======
  const { orders, isFetching, deleteOrder } = useOrders(
    page,
    debounceSearch,
    statusState,
    limit,
  );
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceSearch(searchInput);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  // ====== sync url when search or status change ======
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);

        if (debounceSearch) params.set("search", debounceSearch);
        else params.delete("search");
        if (statusState && statusState !== "all")
          params.set("status", statusState);
        else params.delete("status");

        return params;
      });

      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [debounceSearch, statusState, setSearchParams]);

  // ====== handle previous page ======
  const previousPage = () => orders.page > 1 && setPage((prev) => prev - 1);
  // ====== handle next page ======
  const nextPage = () =>
    orders.page < orders?.totalPage && setPage((prev) => prev + 1);

  // // ====== handle delete order =======
  const handleDeleteOrder = () => {
    deleteOrder(deleteOrd.id);
    setDeleteOrd({ display: false, id: ""});
    toast.success("Order Deleted", { position: "top-right" });
  };

  return (
    <div>
      {deleteOrd.display && (
        <ModalFormContainer>
          <DeleteConfirmationModal
            deleteAction={handleDeleteOrder}
            setCloseModal={() =>
              setDeleteOrd({ display: false, id: "" })
            }
          >
            Order
          </DeleteConfirmationModal>
        </ModalFormContainer>
      )}
      {/* /* order header */}
      <section className="space-y-1 mb-7">
        <h2 className="text-2xl font-semibold text-black dark:text-white">
          Order Management
        </h2>
        <p className="text-(--color-text) text-sm capitalize">
          Manage and track all customer orders efficiently.
        </p>
      </section>
      {/* == order header ==  */}

      {/* create order && filter */}

      <OrdersFilter
        state={{ input: searchInput, statusState }}
        setState={(e) => setSearchInput(e.target.value)}
        navigate={navigate}
        handleStatusChange={(status) => setStatusState(status)}
      />
      {/* == create order button && filter == */}

      {orders?.data?.length === 0 && !isFetching ? (
        <DataNotfound Icon={SearchX}>
          We couldn’t find any orders matching your search.
        </DataNotfound>
      ) : (
        <div>
          <div
            className={`${isFetching ? "opacity-0" : "opacity-100"} flex mb-4 items-center justify-end gap-3 my-3`}
          >
            <span className="px-1 py-1.5 flex items-center ring ring-gray-300/50 bg-(--color-bg-secondary) rounded">
              <span
                onClick={() => setViewMode("grid")}
                className={`${viewMode === "grid" ? "bg-blue-100 text-blue-400" : "text-(--color-text)"} px-2 py-0.5 rounded cursor-pointer`}
              >
                <Grid2x2 size={20} />
              </span>
              <span
                onClick={() => setViewMode("table")}
                className={`${viewMode === "table" ? "bg-blue-100 text-blue-400" : "text-(--color-text)"} px-2 py-0.5 rounded cursor-pointer`}
              >
                <TableOfContents size={20} />
              </span>
            </span>
            <span className="px-2 py-1.5 inline-block ring ring-gray-300/50 rounded text-(--color-text) text-sm bg-(--color-bg-secondary)">
              <span className="mr-2">Page :</span>
              <span>
                {page} / {orders?.totalPage}
              </span>
            </span>
          </div>

          {/* orders */}
          <div
            className={`${isFetching ? "opacity-0" : "opacity-100"} transition-opacity duration-200`}
          >
            {viewMode === "table" ? (
              <div className="rounded-lg overflow-x-auto bg-(--color-bg-secondary) ring shadow min-h-89 flex flex-col justify-between shadow-black/30 dark:shadow-white/20 ring-white/10">
                <OrdersTable
                  setDeleteOrder={(id) =>
                    setDeleteOrd({ display: true, id })
                  }
                  navigate={navigate}
                  orders={orders?.data || []}
                />
              </div>
            ) : (
              <OrdersCard
                setDeleteOrder={(id) =>
                  setDeleteOrd({ display: true, id })
                }
                navigate={navigate}
                orders={orders?.data || []}
              />
            )}
          </div>
          {/* === orders ==== */}

          {/* prev && next bottons */}
          {orders?.data?.length > 0 && (
            <div
              className={`${isFetching ? "opacity-60" : "opacity-100"} transition-opacity duration-200 flex items-center justify-between mt-3`}
            >
              <div className="text-sm text-(--color-text)">
                showing <span className="text-black dark:text-white">1</span> to{" "}
                <span className="text-black dark:text-white">
                  {orders?.limit}
                </span>{" "}
                of{" "}
                <span className="text-black dark:text-white">
                  {orders?.total}
                </span>{" "}
                results
              </div>
              <div className="space-x-3">
                <button
                  onClick={previousPage}
                  disabled={orders?.page === 1}
                  className="ring text-black dark:text-white disabled:text-gray-300 dark:disabled:text-gray-100/30 text-sm cursor-pointer not-disabled:ring-gray-300 border-none px-2 py-1 rounded"
                >
                  previous
                </button>
                <button
                  onClick={nextPage}
                  disabled={orders?.page >= orders?.totalPage}
                  className="ring text-black dark:text-white disabled:text-gray-300 dark:disabled:text-gray-100/30 text-sm cursor-pointer not-disabled:ring-gray-300 border-none px-2 py-1 rounded"
                >
                  next
                </button>
              </div>
            </div>
          )}

          {/* == pagination */}
        </div>
      )}

      {/* == orders */}
    </div>
  );
}

export default OrderPage;
