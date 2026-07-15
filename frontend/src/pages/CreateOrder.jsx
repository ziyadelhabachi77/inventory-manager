import {
  ChevronRight,
  User,
  ShoppingCart,
  Plus,
  Trash2,
  CircleCheckBig,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AddProductCart, Input, MainButton } from "../components";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import useProducts from "../hooks/useProducts";
import ModaFormContainer from "../components/ModalFormContainer";
import { STOCK_LEVEL } from "../../config/appConfig";
import CancelButton from "../components/ui/CancelButton";
import useOrders from "../hooks/useOrders";
import toast from "react-hot-toast";
function CreateOrder() {
  const navigate = useNavigate();
  // ====== generate an id for the order ======
  // const orderId = uuidv4().slice(-5);

  // ==== fetch product && orders =====
  const { products } = useProducts();
  const {createOrder} = useOrders()

  // ====== local states ======
  const [customerInfo, setCustomerInfo] = useState({ name: "", email: "" });
  const [addProductPopup, setAddProductPopup] = useState(false);
  const [orders, setOrders] = useState([]);
  const [orderId] = useState(uuidv4());
  // handle set the order
  const handleSetOrder = (order) => {
    const isOrderExist = orders.filter(
      (o) => o.product._id === order.product._id,
    );
    if (!isOrderExist?.length) {
      setOrders((prev) => [...prev, order]);
    } else {
      const newOrders = orders.map((ord) => {
        if (ord.product._id === order.product._id) {
          if (ord.product.stock < ord.quantity + order.quantity) {
            return ord;
          }
          return { ...ord, quantity: ord.quantity + order.quantity };
        }
        return ord;
      });
      setOrders(newOrders);
    }
  };

  // produc status
  const ProductStatus = ({ stock }) => {
    const status =
      stock <= STOCK_LEVEL.stock_critical
        ? "critical"
        : stock <= STOCK_LEVEL.stock_low
          ? "low"
          : "good";

    return (
      <div className="flex items-center gap-2">
        <span
          className={`px-1 text-xs rounded ${status === "critical" ? "bg-[#FEE2E2] text-[#991B1B]" : status === "low" ? "bg-[#FEF3C7] text-[#92400E]" : "bg-[#D1FAE5] text-[#065F46]"}`}
        >
          {status} stock
        </span>
      </div>
    );
  };

  // handle decreate the quantity
  const handleDecreaseQuantity = (currentOrder) => {
    if (currentOrder.quantity > 1) {
      setOrders((prevOrders) => {
        return prevOrders.map((p) =>
          p.product._id === currentOrder.product._id
            ? { ...p, quantity: p.quantity - 1 }
            : p,
        );
      });
    }
  };
  // handle decreate the quantity
  const handleIncreaseQuantity = (currentOrder) => {
    if (currentOrder.quantity < currentOrder.product.stock) {
      setOrders((prevOrders) => {
        return prevOrders.map((p) =>
          p.product._id === currentOrder.product._id
            ? { ...p, quantity: p.quantity + 1 }
            : p,
        );
      });
    }
  };

  // handle remove product from the order
  const handleRemoveProduct = (id) => {
    setOrders((prev) => prev.filter((p) => p.product._id !== id));
  };

  const totalAmout = orders?.reduce((acc, order) => {
    return acc + Math.ceil(order.quantity * order.product.price);
  }, 0);


  // hanlde submit order
  const handleSubmitOrder = () => {
    const {name,email} = customerInfo
    if (!orders?.length) return;
    if(!name.trim() || !email.trim()) return;
    const products = orders.map(({product,...o}) => ({ ...o, productId: product._id }));
    createOrder({name,email,products, status:'pending',orderId})
    toast.success("Order created",{position: 'top-right'})
    navigate("/orders")
  };
  return (
    <div>
      {addProductPopup && (
        <ModaFormContainer>
          <AddProductCart
            orders={orders}
            setOrders={handleSetOrder}
            products={products?.data || []}
            closePopup={() => setAddProductPopup(false)}
          />
        </ModaFormContainer>
      )}
      <div className="text-sm text-gray-400 mb-2 flex items-center gap-1">
        <span onClick={() => navigate("/orders")} className="cursor-pointer">
          Orders
        </span>
        <span>
          <ChevronRight size={14} />
        </span>
        <span className="text-black/80 font-semibold dark:text-white/90">
          Create New
        </span>
      </div>
      <div className="mb-7 flex items-center justify-between">
        <div>
          <h2 className="section-header">Create New Order</h2>
          <p className="text-gray-400 text-sm">
            Fill in the details below to create a new sales order.
          </p>
        </div>
        <span className="text-xs text-(--color-text) dark:bg-gray-200/10 p-1 bg-gray-200/70 rounded-lg">
          #ORD-{orderId.slice(-5)}
        </span>
      </div>

      {/* customer info */}
      <div className="p-3 ring mb-7 ring-gray-200 dark:ring-gray-200/50 rounded-md bg-(--color-bg-secondary)">
        <div className="flex items-center mb-4 gap-2">
          <User className="fill-blue-600 text-transparent" size={18} />
          <span className="dark:text-white font-medium">Customer Details</span>
        </div>
        <div className="flex gap-3 sm:gap-10 flex-col sm:flex-row items-center">
          <div className="w-full sm:w-[50%]">
            <label className="text-(--color-text)">Customer Name</label>
            <Input
              value={customerInfo.name}
              onChange={(e) =>
                setCustomerInfo({ ...customerInfo, name: e.target.value })
              }
              type={"text"}
              className={
                "mt-2 dark:placeholder:text-gray-200/20 bg-(--color-bg-main)"
              }
              placeholder={"Enter your name"}
            />
          </div>
          <div className="w-full sm:w-[50%]">
            <label className="text-(--color-text)">Email Address</label>
            <Input
              type={"text"}
              value={customerInfo.email}
              onChange={(e) =>
                setCustomerInfo({ ...customerInfo, email: e.target.value })
              }
              className={
                "mt-2 dark:placeholder:text-gray-200/20 bg-(--color-bg-main)"
              }
              placeholder={"Customer@example.com"}
            />
          </div>
        </div>
      </div>
      {/* customer info */}

      {/* total amount */}
      <div className="rounded-md p-3">
        <div className="text-xl dark:bg-(--color-bg-secondary) rounded bg-gray-300/60 ring-gray-200/40 p-2 ms-auto ring max-w-fit font-semibold dark:text-white">
          Total Amount: <span className="text-blue-500">${totalAmout}</span>
        </div>
      </div>
      {/* === total amount === */}

      {/* order items */}
      <div className="rounded-md min-w-0 pb-4 bg-(--color-bg-secondary) ring ring-gray-200 dark:ring-gray-200/50 overflow-hidden">
        {/* header && add product btn */}
        <div className="p-4 max-xs:flex-col flex max-xs:gap-2 xs:items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingCart className="fill-blue-600 text-blue-600" size={18} />
            <span className="dark:text-white font-medium">Order items</span>
          </div>
          <MainButton
            onClick={() => setAddProductPopup(true)}
            Icon={Plus}
            className={"px-5"}
          >
            Add Product
          </MainButton>
        </div>
        {/* ==== header && add product btn ==== */}

        {/* product table */}
        {orders?.length > 0 && (
          <div className="w-full overflow-x-auto">
            <div className="bg-(--color-bg-main) text-(--color-text) text-sm py-2 flex items-center">
              <div className=" w-[40%] pl-5">Product Details</div>
              <div className=" w-[25%] pl-5">Price</div>
              <div className=" w-[20%] pl-5">Quantity</div>
              <div className=" w-[10%] pl-5">Total</div>
              <div className=" w-[5%] ml-5 pl-5"></div>
            </div>
            {/* product of the order */}
            {orders.map((o) => (
              <div
                key={o.product?._id}
                className="flex items-center border-b dark:text-white border-gray-200 dark:border-gray-200/10 text-sm"
              >
                <div className="flex gap-1 flex-col w-[40%] pl-5 py-2">
                  {o.product?.name} <ProductStatus stock={o.product.stock} />
                </div>
                <div className=" w-[25%] pl-5  py-2">${o.product?.price}</div>
                <div className=" w-[20%] pl-5 flex items-center py-2">
                  <span className="ring max-sm:items-center max-w-fit flex select-none ring-gray-700 overflow-hidden rounded">
                    <span
                      onClick={() => handleDecreaseQuantity(o)}
                      className="lg:px-3 md:px-2 px-1 cursor-pointer  dark:hover:bg-(--color-bg-main) hover:bg-gray-200/60 transition-colors inline-block max-sm:mr-1 mr-3 lg:mr-4"
                    >
                      -
                    </span>
                    {o.quantity}
                    <span
                      onClick={() => handleIncreaseQuantity(o)}
                      className="lg:px-3 md:px-2 px-1 cursor-pointer lg:ml-4 max-sm:ml-1 ml-3 dark:hover:bg-(--color-bg-main) hover:bg-gray-200/60 transition-colors inline-block"
                    >
                      +
                    </span>
                  </span>
                </div>
                <div className=" w-[10%] font-semibold pl-5 py-2">
                  ${Math.ceil(o.product?.price * o.quantity)}
                </div>
                <div
                  onClick={() => handleRemoveProduct(o.product._id)}
                  className=" w-[5%] mr-5 ml-5 pl-5 text-gray-600 cursor-pointer transition-colors dark:text-gray-300 hover:text-red-500 py-2"
                >
                  <Trash2 size={19} />
                </div>
              </div>
            ))}
            {/* product of the order */}
          </div>
        )}
        {/* === product table */}
      </div>
      {/* ==== order items ==== */}

      <div className="text-end space-x-6 mt-5">
        <CancelButton onClick={() => navigate("/orders")} className={"px-4"}>
          Cancel
        </CancelButton>
        <MainButton
          onClick={handleSubmitOrder}
          Icon={CircleCheckBig}
          className={"w-40"}
        >
          Submit Order
        </MainButton>
      </div>
    </div>
  );
}

export default CreateOrder;
