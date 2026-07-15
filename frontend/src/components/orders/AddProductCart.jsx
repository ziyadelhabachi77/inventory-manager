import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { X, ChevronDown, Search, CircleAlert, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import CancelButton from "../ui/CancelButton";
function AddProductCart({ closePopup, products, setOrders, orders }) {
  // ===== local state =====
  const [isSelectProductOpen, setIsSelectProductOpen] = useState(false);
  const [productSelected, setProductSelected] = useState({});
  const [selectMode, setSelectMode] = useState(false);
  const inputRef = useRef(null);
  const [searchProduct, setSearchProduct] = useState("");
  const [quantity, setQuantity] = useState(1);

  const filterProduct =
    searchProduct.trim().length > 0 && selectMode
      ? products?.filter((p) =>
          p.name.toLowerCase().includes(searchProduct.trim().toLowerCase()),
        )
      : products;

  // ===== click outside to close the product dropdow =====
  useEffect(() => {
    const controller = new AbortController();
    document.addEventListener(
      "click",
      (e) => {
        if (inputRef && e.target === inputRef.current && !isSelectProductOpen)
          return;
        setIsSelectProductOpen(false);
      },
      { signal: controller.signal },
    );

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ==== check if the product is selected from the dropdown and the name match the options =====
  const isProductMatch = productSelected?.name
    ? searchProduct.trim() === "" ||
      searchProduct.toLowerCase() !== productSelected?.name.toLowerCase()
      ? false
      : true
    : false;

  // calc the available stock
  const calcStock = () => {
    if (orders?.length > 0 && isProductMatch) {
      const ord = orders.find((o) => o.product._id === productSelected._id);
      if (ord) {
        return productSelected.stock - ord.quantity;
      }
    }
    return productSelected.stock;
  };
  const availableStock = calcStock();

  // handle add the order
  const addOrder = () => {
    if (!isProductMatch)
      return alert("Please select the product from the dropdow options");
    if (availableStock < quantity || quantity === 0) return;
    setOrders({ product: productSelected, quantity });
    closePopup();
  };

  // check if the stock is not empty to show all the product that their stock available more than 0
  const isStockEmpty = (product) => {
    if (orders?.length > 0) {
      const isOrderExist = orders.find((o) => o.product._id === product._id);
      if (isOrderExist) {
        return product.stock - isOrderExist.quantity;
      }
    }
    return product.stock;
  };
  return (
    <div className="rounded-md bg-(--color-bg-secondary) w-screen max-w-120">
      <div className="flex items-center border-b border-gray-200 justify-between px-4 py-2">
        <div className="flex dark:text-white items-center gap-2 font-medium">
          <AddShoppingCartIcon style={{ fontSize: "18px", color: "blue" }} />{" "}
          Add Product to Order
        </div>
        <X
          size={17}
          onClick={closePopup}
          className="text-(--color-text) cursor-pointer"
        />
      </div>

      <div className="p-3 ">
        {/* search product */}
        <div className="mb-3">
          <span className="text-sm mb-3 inline-block text-(--color-text)">
            Search Product
          </span>
          <div
            className={`relative cursor-pointer rounded-t ${isSelectProductOpen ? "" : "rounded-b"} ring ring-gray-400`}
          >
            <input
              type="text"
              value={searchProduct}
              onClick={() => {
                setIsSelectProductOpen(!isSelectProductOpen);
                isSelectProductOpen ? setSelectMode(false) : null;
              }}
              onChange={(e) => {
                setSearchProduct(e.target.value);
                setIsSelectProductOpen(true)
                setSelectMode(true);
              }}
              ref={inputRef}
              className={`pl-6 dark:text-white w-full focus:outline-none text-sm p-1`}
              placeholder="Select product or search it by name"
            />

            {isSelectProductOpen && (
              <div className="absolute ring ring-gray-500 overflow-y-auto bg-white top-[109%] max-h-37 rounded-b w-full ">
                {filterProduct
                  ?.filter((p) => isStockEmpty(p) >= 1)
                  ?.map((c, index) => (
                    <div
                      onClick={() => {
                        setProductSelected(c);
                        setIsSelectProductOpen(false);
                        setSearchProduct(c.name);
                        setSelectMode(false);
                      }}
                      key={index}
                      // data-value={c._id}
                      // data-name={c.name}
                      className=" p-1 pl-5 hover:bg-gray-500/10 "
                    >
                      {c.name}
                    </div>
                  ))}
              </div>
            )}
            <ChevronDown
              size={16}
              className="absolute dark:text-white right-1 top-1.5"
            />
            <Search
              size={16}
              className="absolute dark:text-white left-1 top-1.5"
            />
          </div>
          <span className="text-[13px] text-(--color-text)">
            Please select a product from the dropdown.
          </span>
        </div>
        {/* ==== search product ==== */}

        {/* price && quantity */}
        <div className="flex gap-5 mb-5">
          <div className="space-y-3 w-full">
            <span className="text-sm inline-block text-(--color-text)">
              Unit Price
            </span>
            <div className="bg-gray-200 dark:bg-gray-700 dark:text-white text-gray-700 px-3 py-2 rounded">
              ${isProductMatch ? productSelected?.price : "0.00"}
            </div>
          </div>
          <div className="w-full flex flex-col">
            <span className="text-sm mb-3.5 inline-block text-(--color-text)">
              Quantity
            </span>
            <input
              value={quantity}
              onChange={(e) =>
                setQuantity(e.target.value !== "" ? e.target.valueAsNumber : "")
              }
              min="1"
              type="number"
              className="focus:outline-none peer dark:text-white  invalid:ring-red-500/40 ring ring-gray-300 pl-3 py-2 rounded"
            />
            <span className="text-sm text-red-500 peer-invalid:block hidden">
              Quantity must be greater than 0
            </span>
            {isProductMatch && quantity > availableStock && (
              <span className="text-sm text-red-500">
                Max quantity available is <span>{availableStock}</span>
              </span>
            )}
          </div>
        </div>
        {/* === price && quantity === */}
        {isProductMatch && availableStock >= quantity && (
          <div className="rounded-md flex items-center mb-4 justify-between px-4 py-3 ring ring-sky-400/30 bg-sky-50">
            <div className="flex flex-col">
              <span className="text-blue-400">CALCULATION SUBTOTAL</span>
              <span className="text-[13px] text-(--color-text)">
                {quantity
                  ? quantity > availableStock
                    ? availableStock
                    : quantity
                  : 0}{" "}
                Units @ ${productSelected?.price} each
              </span>
            </div>
            <span className="text-2xl text-blue-500">
              $
              {Math.ceil(
                productSelected?.price *
                  (quantity > availableStock ? availableStock : quantity),
              )}
            </span>
          </div>
        )}
        {isProductMatch && availableStock <= 15 && (
          <div className="p-3 mb-4 flex items-center rounded-md ring ring-amber-300/90 bg-amber-100 text-orange-400 gap-2">
            <CircleAlert size={14} />
            <p className="text-sm">
              Stock alert: Only{" "}
              <span className="text-orange-600 font-semibold">
                {availableStock}
              </span>{" "}
              units remaining.
            </p>
          </div>
        )}
      </div>
      <div className="py-4 px-6 gap-3 flex items-center">
        <CancelButton onClick={closePopup} className={"px-3 text-lg w-[40%]"}>
          Cancel
        </CancelButton>
        <button
          onClick={addOrder}
          className="w-[60%] text-lg rounded-md flex items-center justify-center gap-2 py-1.5 bg-black hover:bg-black/90 cursor-pointer dark:ring-black dark:bg-white dark:text-black dark:hover:bg-white/90 transition-colors text-white ring ring-white "
        >
          <Plus size={20} /> Add to Order
        </button>
      </div>
    </div>
  );
}

export default AddProductCart;
