import { ChevronDown, Save, ArrowLeft } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Input, Loading, MainButton } from "../components";
import CancelButton from "../components/ui/CancelButton";
import useCategories from "../hooks/useCategories";
import useProducts, { useProduct } from "../hooks/useProducts";
import useSuppliers from "../hooks/useSuppliers";
import { GenerateErrorObject } from "../utils/GenerateErrorObject";
function EditProduct() {
  // ====== navigation =======
  const navigate = useNavigate();
  // ====== get product id  ======
  const { id } = useParams();
  // ===== fetch categories && suppliers && product =====
  const { categories } = useCategories();
  const { suppliers } = useSuppliers();
  const { data: product, isLoading } = useProduct(id);
  const { updateProduct } = useProducts();

  // ====== local state ======
  const [isCategoryActive, setIsCategoryActive] = useState(false);
  const [isSupplierActive, setIsSupplierActive] = useState(false);
  const [validation, setValidation] = useState({});
  const categoryRef = useRef(null);
  const supplierRef = useRef(null);
  const [editProductState, setEditProductState] = useState({
    name: "",
    stock: "",
    price: "",
    categoryId: "",
    supplierId: "",
  });
  const [currentCategory, setCurrentCategory] = useState("");
  const [currentSupplier, setCurrentSupplier] = useState("");

  // ===== handle show category && supplier ======
  const handleChangeCategory = (e) => {
    const { value, name } = e.target.dataset;
    setCurrentCategory(name);
    setEditProductState({ ...editProductState, categoryId: value });
    setIsCategoryActive(false);
  };
  const handleChangeSupplier = (e) => {
    const { value, name } = e.target.dataset;
    setCurrentSupplier(name);
    setEditProductState({ ...editProductState, supplierId: value });
    setIsSupplierActive(false);
  };

  // ====== handle display category && supplier dropdown
  const handleDisplayCateogry = () => {
    setIsCategoryActive(!isCategoryActive);
    if (isSupplierActive) {
      setIsSupplierActive(false);
    }
  };
  const handleDisplaySupplier = () => {
    setIsSupplierActive(!isSupplierActive);
    if (isCategoryActive) {
      setIsCategoryActive(false);
    }
  };

  // ===== set the product data in the state after the render
  useEffect(() => {
    if (product) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setEditProductState({
        name: product?.name ?? "",
        stock: product?.stock ?? "",
        price: product?.price ?? "",
        categoryId: product?.categoryId?._id ?? "",
        supplierId: product?.supplierId._id ?? "",
      });
      setCurrentCategory(product?.categoryId?.name);
      setCurrentSupplier(product?.supplierId?.name);
    }
  }, [product]);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    const closeDropdown = (e) => {
      if (
        e.target !== categoryRef.current &&
        e.target !== supplierRef.current
      ) {
        setIsCategoryActive(false);
        setIsSupplierActive(false);
      }
    };
    document.addEventListener("click", closeDropdown, { signal });

    return () => controller.abort();
  }, []);

  // ====== save the product change ======
  const handleSaveProductChange = () => {
    const obj = GenerateErrorObject(editProductState);
    if (Object.keys(obj).length) {
      setValidation(obj);
      return;
    }
    setValidation({});
    updateProduct({ product: editProductState, id });
    Toast.success("Product updated successfully", { position: "top-right" });
    navigate("/products");
  };

  if (isLoading) return <Loading />;
  return (
    <div>
      <Link
        onClick={() => navigate(-1)}
        className="text-(--color-text) w-max
       text-sm flex items-center group gap-1 dark:text-white font-bold"
      >
        <ArrowLeft
          size={19}
          className="group-hover:-translate-x-1 transition-transform"
        />{" "}
        Back to Products
      </Link>
      <section className="mb-7 mt-8">
        <h2 className="section-header-2">Edit Product</h2>
        <p className="text-(--color-text) text-sm capitalize">
          Modify the core details, stock levels, and pricing for this item.
        </p>
      </section>

      {/* product details */}
      <div className="rounded-md overflow-hidden mb-7">
        <div className="px-3 py-5 bg-[#FAFBFC] dark:bg-(--color-bg-secondary)/80">
          <h3 className="text-sm text-gray-800 font-semibold dark:text-white">
            Product Details
          </h3>
        </div>

        <div className="p-3 bg-(--color-bg-secondary)">
          {/* product name */}
          <div className="mb-1">
            <label className="space-y-1">
              <span className="block text-[13px] dark:text-white/80">
                Product Name
              </span>
              <Input
                type="text"
                value={editProductState.name}
                onChange={(e) =>
                  setEditProductState({
                    ...editProductState,
                    name: e.target.value,
                  })
                }
                className={`bg-gray-300/20 ${validation.name && !editProductState.name ? "ring ring-red-500 focus:ring-red-500" : ""}`}
              />
            </label>
            <div className="min-h-6">
              <span
                className={`text-xs capitalize text-red-500 ${validation.name && editProductState.name.trim() === "" ? "opacity-100" : "opacity-0"}`}
              >
                {validation?.name}
              </span>
            </div>
          </div>
          {/* === product name === */}

          {/* ---------------------------------------------------------------------- */}

          {/* stock && price */}
          <div className="flex items-center gap-8">
            {/* stock */}
            <div className="w-full">
              <label>
                <span className="text-[13px] dark:text-white/80 select-none">
                  Current Stock
                </span>
                <div className="flex w-full">
                  <span
                    onClick={() =>
                      setEditProductState({
                        ...editProductState,
                        stock:
                          editProductState.stock > 0
                            ? editProductState.stock - 1
                            : 0,
                      })
                    }
                    className="text-center border-l border-t border-b not-peer-focus:border-r dark:text-white h-7 w-7 rounded-l border border-gray-600  cursor-pointer "
                  >
                    -
                  </span>
                  <input
                    type="text"
                    value={editProductState?.stock}
                    onChange={(e) => {
                      const onlyNumbers = e.target.value.replace(/\D/g, '');
                      setEditProductState({
                        ...editProductState,
                        stock: onlyNumbers,
                      })
                    }
                    }
                    className={`text-center bg-gray-300/20 peer focus:border-none focus:ring focus:ring-blue-500 ${validation.stock && !editProductState.stock ? " ring-red-500 focus:ring-red-500" : ""} w-full focus:outline-none border-t border-b border-gray-600 dark:text-white`}
                  />
                  <span
                    onClick={() =>
                      setEditProductState({
                        ...editProductState,
                        stock: editProductState.stock + 1,
                      })
                    }
                    className="text-center select-none dark:text-white h-7 w-7 pt-0.5 rounded-r border-r border-t border-b not-peer-focus:border-l  border-gray-600  cursor-pointer "
                  >
                    +
                  </span>
                </div>
              </label>
              <div className="min-h-6">
                <span
                  className={`text-xs capitalize text-red-500 ${validation.stock && (editProductState.stock === "" || +editProductState.stock === 0) ? "opacity-100" : "opacity-0"}`}
                >
                  {validation?.stock}
                </span>
              </div>
            </div>
            {/* price */}
            <div className="w-full pt-1">
              <label>
                <span className="block text-[13px] dark:text-white/80  ">
                  Current Price
                </span>
                <input
                  type="number"
                  value={editProductState?.price}
                  onChange={(e) =>
                    setEditProductState({
                      ...editProductState,
                      price: e.target.value,
                    })
                  }
                  className={`rounded bg-gray-300/20 focus:ring focus:border-none focus:ring-blue-500 pl-2 w-full dark:text-white py-0.5 border border-gray-600 focus:outline-none ${validation.price && !editProductState.price ? "ring ring-red-500 focus:ring-red-500" : ""}`}
                />
              </label>
              <div className="min-h-6">
                <span
                  className={`text-xs capitalize text-red-500 ${validation.price && (editProductState.price === "" || +editProductState.price === 0) ? "opacity-100" : "opacity-0"}`}
                >
                  {validation?.price}
                </span>
              </div>
            </div>
          </div>
          {/* === stock && price === */}
        </div>
      </div>
      {/* === product details === */}

      {/* categorization */}
      <div className="rounded-md mb-10">
        <div className="px-3 py-5 bg-[#FAFBFC] dark:bg-(--color-bg-secondary)/80">
          <h3 className="text-sm text-gray-800 font-semibold dark:text-white">
            Categorization
          </h3>
        </div>

        <div className="p-3 bg-(--color-bg-secondary) pb-9 flex gap-8">
          {/* cateogry */}
          <div className="w-[50%] ">
            <label>
              <span className="block mb-1 text-[13px] dark:text-white/80">
                Category
              </span>
              <div className="relative cursor-pointer rounded-t ring ring-gray-400">
                <div
                  ref={categoryRef}
                  onClick={handleDisplayCateogry}
                  className={`pl-1 dark:text-white text-sm p-1 bg-gray-300/20`}
                >
                  {currentCategory}
                </div>
                {isCategoryActive && (
                  <div className="absolute ring ring-gray-500 overflow-y-auto bg-white top-[109%] max-h-17 rounded-b w-full ">
                    {categories?.map((c, index) => (
                      <div
                        onClick={handleChangeCategory}
                        key={index}
                        data-value={c._id}
                        data-name={c.name}
                        className=" p-1 hover:bg-gray-500/10 "
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
              </div>
            </label>
          </div>
          {/* === category === */}

          {/* supplier */}
          <div className="w-[50%] ">
            <label>
              <span className="block mb-1 text-[13px] dark:text-white/80">
                Supplier
              </span>
              <div className="relative cursor-pointer rounded-t ring ring-gray-400">
                <div
                  onClick={handleDisplaySupplier}
                  ref={supplierRef}
                  className={`pl-1 dark:text-white bg-gray-300/20 text-sm p-1`}
                >
                  {currentSupplier}
                </div>
                {isSupplierActive && (
                  <div className="absolute ring ring-gray-500 overflow-y-auto bg-white top-[109%] max-h-17 rounded-b w-full ">
                    {suppliers?.map((c, index) => (
                      <div
                        onClick={handleChangeSupplier}
                        key={index}
                        data-value={c._id}
                        data-name={c.name}
                        className=" p-1 hover:bg-gray-500/10 "
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
              </div>
            </label>
          </div>
          {/* === supplier === */}
        </div>
      </div>
      {/* === categorization === */}

      {/* save and cancel action */}
      <div className="p-2 space-x-3 flex items-center justify-end">
        <CancelButton
          onClick={() => navigate(-1)}
          className={"px-3 max-sm:w-full"}
        >
          Cancel Changes
        </CancelButton>
        <MainButton
          onClick={handleSaveProductChange}
          Icon={Save}
          className="w-full px-8 max-lg:self-end xs:w-auto"
        >
          Save Change
        </MainButton>
      </div>
    </div>
  );
}

export default EditProduct;
