import { ArrowLeft, Trash, UserRound } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import useOrders, { useOrder } from "../hooks/useOrders";
import { formatDate } from "../utils/formateDate";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  DeleteConfirmationModal,
  ModalFormContainer
} from "../components";

function ViewOrderPage() {
  const navigate = useNavigate();
  const [deleteOrd, setDeleteOrd] = useState(false);
  const { id } = useParams();

  // ====== fetch single order by id ======
  const { data: order } = useOrder(id);

  // ===== fetch orders =====
  const {deleteOrder} = useOrders()

  const getInitials = () => {
    const firstL = order?.name.split(" ")[0][0].toUpperCase();
    const secondL = order?.name?.split(" ")?.[1]?.[0]?.toUpperCase();
    if (firstL && secondL) {
      return firstL + secondL;
    }
    return firstL;
  };

  // // ====== handle delete product =======
  const handleDeleteOrder = () => {
    deleteOrder(order?._id);
    setDeleteOrd(false);
    toast.success("Order Deleted", { position: "top-right" });
  };

  return (
    <div>
      {deleteOrd && (
        <ModalFormContainer>
          <DeleteConfirmationModal
            deleteAction={handleDeleteOrder}
            setCloseModal={() =>
              setDeleteOrd(false)
            }
          >
            Order
          </DeleteConfirmationModal>
        </ModalFormContainer>
      )}
      <div className="mb-4">
        <span
          onClick={() => navigate("/orders")}
          className="flex text-(--color-text) dark:text-white font-bold text-sm cursor-pointer group items-center gap-1"
        >
          <ArrowLeft
            className="group-hover:-translate-x-1 transition-transform"
            size={16}
          />{" "}
          Back to Orders
        </span>
      </div>
      <div className="flex mb-7 items-center justify-between">
        <div className="space-y-1">
          <h4 className="text-2xl font-bold dark:text-white">
            Order #832y3-10
          </h4>
          <p className="text-[13px] text-(--color-text)">
            Placed on {formatDate(order?.createdAt)}
          </p>
        </div>
        <button onClick={() => setDeleteOrd(true)} className="rounded-md dark:bg-red-500 dark:text-white dark:hover:bg-red-600 transition-colors hover:bg-red-100/70 text-sm text-red-500  ring ring-red-500 shadow cursor-pointer py-1 w-30 flex items-center justify-center gap-2">
          <Trash size={14} />
          Delete Order
        </button>
      </div>

      {/* view page content */}
      <div className="grid gap-6 grid-cols-2 lg:grid-cols-3">
        <div className="rounded-md col-span-2 bg-(--color-bg-secondary) ring ring-gray-300/40">
          <div className="p-4 flex items-center border-b border-gray-200 justify-between">
            <h5 className="font-semibold dark:text-white">Order Item</h5>
            <span className="text-xs text-(--color-text)">
              {order?.products?.length} Items
            </span>
          </div>
          {/* product order */}
          {order?.products?.map(({ productId, quantity }) => (
            <div
              key={productId._id}
              className="py-3 px-8 border-b border-gray-200 dark:border-gray-200/40 flex items-center justify-between"
            >
              <div className="flex text-(--color-text) flex-col gap-2">
                <span className="font-semibold dark:text-white">
                  {productId.name}
                </span>
                <div className="flex text-sm items-center gap-8">
                  <span className="flex gap-3">
                    Qty:{" "}
                    <span className="font-semibold dark:text-white">
                      {quantity}
                    </span>
                  </span>
                  <span className="flex gap-3">
                    Price:{" "}
                    <span className="font-semibold dark:text-white">
                      ${productId.price}
                    </span>
                  </span>
                </div>
              </div>
              <span className="font-semibold dark:text-white">
                ${Math.ceil(productId.price * quantity)}
              </span>
            </div>
          ))}
          {/* === product order === */}
        </div>
        {/* customer info */}
        <div className="rounded-md min-w-70 max-lg:-order-1 col-span-1 self-start ring p-5 ring-gray-300/40 bg-(--color-bg-secondary)">
          <div className="flex mb-3 items-center gap-2">
            <span className="p-2 rounded bg-blue-300/50 flex items-center justify-center">
              <UserRound
                className="fill-blue-600 dark:fill-blue-950 dark:text-blue-950 text-blue-600"
                size={14}
              />
            </span>
            <span className="font-semibold dark:text-white">Customer</span>
          </div>
          <div className="flex mb-3 items-center gap-2">
            <span
              className={`rounded-full font-semibold ${order?.name?.split(" ").length === 1 ? "px-2.5" : "px-1.5"} py-1 bg-blue-300/60 flex dark:text-blue-950 items-center center text-blue-500`}
            >
              {getInitials()}
            </span>
            <div className="flex flex-col">
              <span className="font-semibold dark:text-white">
                {order?.name}
              </span>
              <span className="text-sm text-(--color-text)">
                Customer since 2026
              </span>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-sm text-(--color-text)">Email</span>
            <span className="text-blue-500 text-[15px]">{order?.email}</span>
          </div>
        </div>
        {/* === customer info === */}
        {/* order summary */}
        <div className="bg-(--color-bg-secondary) px-4 rounded-md ring ring-gray-300/40 py-4 col-span-2 ">
          <h5 className="font-semibold mb-3 dark:text-white">Order Summary</h5>

          <div className="flex px-4 items-center justify-between">
            <span className="font-bold dark:text-white">Total Amount</span>
            <span className="text-xl text-blue-500 font-bold">
              ${order?.totalPrice}
            </span>
          </div>
        </div>
        {/* === order summary === */}
      </div>
      {/* ==== view page content ==== */}
    </div>
  );
}

export default ViewOrderPage;
