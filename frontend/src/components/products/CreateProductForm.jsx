import { X } from "lucide-react";
import Input from "../ui/Input";
import SelectInput from "../ui/Select";
import { useState, useEffect } from "react";
import CancelButton from "../ui/CancelButton";
import MainButton from "../ui/MainButton";
import useCategories from "../../hooks/useCategories";
import useSuppliers from "../../hooks/useSuppliers";
import useProducts from "../../hooks/useProducts";
import { GenerateErrorObject } from "../../utils/GenerateErrorObject";
import Toast from "react-hot-toast";

function CreateProductForm({ setOpenCreateForm }) {
  const { categories } = useCategories();
  const { suppliers } = useSuppliers();
  const { createProduct } = useProducts();
  const [validation, setValidation] = useState({});
  const [formState, setFormState] = useState({
    name: "",
    categoryId: "",
    supplierId: "",
    price: "",
    stock: "",
    description: "",
  });

   // remove the scrollbar.
    useEffect(() => {
      document.body.style.overflow = "hidden";
  
      return () => {
        document.body.style.overflow = "unset";
      };
    }, []);

  // create new product
  const handleCreateProduct = (e) => {
    e.preventDefault();
    const obj = GenerateErrorObject(formState)
    if (Object.keys(obj).length) {
      setValidation(obj);
      return;
    } else {
      setValidation(obj);
    }

    // find supplier by name and get the id
    const categoryObj = categories?.find(
      (category) => category.name === formState.categoryId,
    );
    const supplierObj = suppliers?.find(
      (supplier) => supplier.name === formState.supplierId,
    );

    if(!categoryObj || !supplierObj) {
      console.log("supplier or category not found or undefined")
    }

    const product = {
      ...formState,
      categoryId: categoryObj?._id,
      supplierId: supplierObj?._id
    };
    createProduct(product); // save the product
    Toast.success("Product created", {position: "top-right"})
    setOpenCreateForm(); // close the popup
  };
  return (
    <div className="min-h-100 dark:text-white bg-(--color-bg-main) overflow-hidden w-screen max-w-120 rounded-md">
      {/* form header */}
      <div className="py-1 px-3 flex border-b border-gray-300/90 items-center justify-between">
        <div>
          <h4 className="capitalize font-semibold text-[19px]">
            add new products
          </h4>
          <p className="text-xs text-gray-400/90">
            Enter product details to add to inventory
          </p>
        </div>
        <X
          onClick={setOpenCreateForm}
          className="cursor-pointer dark:text-white dark:hover:text-gray-300 text-gray-700 transition-colors hover:text-red-500"
        />
      </div>
      {/* == form header == */}

      {/* form body */}
      <div>
        <form onSubmit={handleCreateProduct}>
          <div className="p-5">
          {/* product name */}
            <div className="mb-1">
              <label className="space-y-1">
                <span className="block text-[13px]">Product Name</span>
                <Input
                  type="text"
                  value={formState.name}
                  onChange={(e) =>
                    setFormState({ ...formState, name: e.target.value })
                  }
                  placeholder={"e.g.,Wireless Ergonomic Mouse"}
                  className={"bg-(--color-bg-secondary)"}
                />
              </label>
              <div className="min-h-6">
                <span
                  className={`text-xs capitalize text-red-500 ${validation.name && formState.name.trim() === "" ? "opacity-100" : "opacity-0"}`}
                >
                  {validation?.name}
                </span>
              </div>
            </div>
            {/* == product name == */}

            {/* category && supplier */}
            <div className="flex mb-1 justify-between items-center gap-3">
              <div className="w-full">
                <label className="space-y-2 flex-1">
                  <span className="block text-[13px]">Category</span>
                  <SelectInput
                    state={formState.categoryId}
                    setState={(e) =>
                      setFormState({ ...formState, categoryId: e.target.value })
                    }
                    placeholder={"All"}
                    isDisabled={true}
                    className={"bg-(--color-bg-secondary)"}
                    options={categories}
                  />
                </label>
                <div className="min-h-6">
                  <span
                    className={`text-xs capitalize text-red-500 ${validation.categoryId && formState.categoryId.trim() === "" ? "opacity-100" : "opacity-0"}`}
                  >
                    {validation?.categoryId}
                  </span>
                </div>
              </div>
              <div className="w-full">
                <label className="space-y-2 flex-1">
                  <span className="block text-[13px]">Supplier</span>
                  <SelectInput
                    state={formState.supplierId}
                    setState={(e) =>
                      setFormState({ ...formState, supplierId: e.target.value })
                    }
                    placeholder={"All"}
                    isDisabled={true}
                    className={"bg-(--color-bg-secondary)"}
                    options={suppliers}
                  />
                </label>
                <div className="min-h-6">
                  <span
                    className={`text-xs capitalize text-red-500 ${validation.supplierId && formState.supplierId.trim() === "" ? "opacity-100" : "opacity-0"}`}
                  >
                    {validation?.supplierId}
                  </span>
                </div>
              </div>
            </div>

            {/* price && stock */}
            <div className="flex mb-1 justify-between items-center gap-3">
              <div>
                <label className="space-y-2 flex-1">
                  <span className="block text-[13px]">Initial Stock</span>
                  <Input
                    type="number"
                    value={formState.stock}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        stock: +e.target.value || "",
                      })
                    }
                    placeholder={"0"}
                    className={"bg-(--color-bg-secondary)"}
                  />
                </label>
                <div className="min-h-6">
                  <span
                    className={`text-xs capitalize text-red-500 ${validation.stock && formState.stock === "" ? "opacity-100" : "opacity-0"}`}
                  >
                    {validation?.stock}
                  </span>
                </div>
              </div>
              <div>
                <label className="space-y-2 flex-1">
                  <span className="block text-[13px]">Unit Price</span>
                  <Input
                    type="number"
                    value={formState.price}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        price: +e.target.value || "",
                      })
                    }
                    placeholder={"$ 0.00"}
                    className={"bg-(--color-bg-secondary)"}
                  />
                </label>
                <div className="min-h-6">
                  <span
                    className={`text-xs capitalize text-red-500 ${validation.price && formState.price === "" ? "opacity-100" : "opacity-0"}`}
                  >
                    {validation?.price}
                  </span>
                </div>
              </div>
            </div>
            {/* product description */}
            <div>
              <label className="space-y-2 flex-1">
                <span className="block text-[13px]">Product Description</span>
                <textarea
                  value={formState.description}
                  onChange={(e) =>
                    setFormState({ ...formState, description: e.target.value })
                  }
                  name="product-description"
                  rows={3}
                  className="ring w-full bg-(--color-bg-secondary) rounded-md text-md focus:outline-none p-2 ring-gray-200 resize-none"
                ></textarea>
              </label>
            </div>
          </div>

          {/* action */}
          <div className="py-2 text-end dark:bg-(--color-bg-secondary) bg-gray-200/50 space-x-3 px-3">
            <CancelButton onClick={setOpenCreateForm} className={"px-3"}>
              Cancel
            </CancelButton>
            <MainButton className={"px-3"}>Save Product</MainButton>
          </div>
        </form>
      </div>
      {/* == form body */}
    </div>
  );
}

export default CreateProductForm;
