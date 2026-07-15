import { useEffect, useState } from "react";
import {
  ProductsTable,
  CreateProductForm,
  DataNotfound,
  ViewProduct,
  DeleteConfirmationModal,
} from "../components";
import useProducts from "../hooks/useProducts";
import ProductsFilter from "../components/products/ProductsFilter";
import { ModalFormContainer } from "../components";
import { SearchX } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { STOCK_LEVEL } from "../../config/appConfig";

function ProductsPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const alertFilter = searchParams.get("alert") || "";
  const isLowStockAlert = alertFilter === "low-stock";

  const [searchInput, setSearchInput] = useState(searchTerm);
  const [debounceSearch, setDebounceSearch] = useState(searchTerm);
  const [page, setPage] = useState(1);
  const [openCreateForm, setOpenCreateForm] = useState(false);
  const [categoryState, setCategoryState] = useState(category);
  const [viewProduct, setViewProduct] = useState({ display: false, id: "" });
  const [deleteProduct, setDeleteProduct] = useState({
    display: false,
    id: "",
    name: "",
  });

  const limit = isLowStockAlert ? undefined : 6;
  const { products, isFetching, deleteProd } = useProducts({
    page,
    searchTerm: debounceSearch,
    category: categoryState,
    limit,
  });
  const visibleProducts = isLowStockAlert
    ? products?.data?.filter((item) => item.stock <= STOCK_LEVEL.stock_low)
    : products?.data;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceSearch(searchInput);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);

        if (debounceSearch) params.set("search", debounceSearch);
        else params.delete("search");

        if (categoryState) params.set("category", categoryState);
        else params.delete("category");

        return params;
      });

      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [debounceSearch, categoryState, setSearchParams]);

  const handleChangeOpenCreateForm = () => {
    setOpenCreateForm(!openCreateForm);
  };

  const previousPage = () => products.page > 1 && setPage((prev) => prev - 1);
  const nextPage = () =>
    products.page < products?.totalPage && setPage((prev) => prev + 1);

  const handleDeleteProduct = () => {
    deleteProd({ id: deleteProduct.id });
    setDeleteProduct({ display: false, id: "", name: "" });
    toast.success("Product Deleted", { position: "top-right" });
  };

  return (
    <div>
      {openCreateForm && (
        <ModalFormContainer>
          <CreateProductForm setOpenCreateForm={handleChangeOpenCreateForm} />
        </ModalFormContainer>
      )}
      {viewProduct.display && (
        <ModalFormContainer>
          <ViewProduct
            productId={viewProduct.id}
            setViewProduct={() => setViewProduct({ display: false, id: "" })}
          />
        </ModalFormContainer>
      )}
      {deleteProduct.display && (
        <ModalFormContainer>
          <DeleteConfirmationModal
            deleteAction={handleDeleteProduct}
            itemName={deleteProduct.name}
            setCloseModal={() =>
              setDeleteProduct({ display: false, id: "", name: "" })
            }
          >
            Product
          </DeleteConfirmationModal>
        </ModalFormContainer>
      )}

      <section className="space-y-1 mb-7">
        <h2 className="text-2xl font-semibold text-black dark:text-white">
          Products Management
        </h2>
        <p className="text-(--color-text) text-sm capitalize">
          manage your products inventory, track stock levels in real-time, and
          update pricing .
        </p>
      </section>

      <ProductsFilter
        state={{ input: searchInput, category: categoryState }}
        setState={(e) => setSearchInput(e.target.value)}
        handleFilterChange={(e) => setCategoryState(e.target.value)}
        setOpenCreateForm={handleChangeOpenCreateForm}
      />

      {isLowStockAlert && (
        <div className="mb-4 mt-4 rounded-md border border-orange-200 bg-orange-50 px-4 py-3 text-sm text-orange-700 dark:border-orange-500/20 dark:bg-orange-500/10 dark:text-orange-300">
          Showing all products that need stock attention.
        </div>
      )}

      {visibleProducts?.length === 0 && !isFetching ? (
        <DataNotfound Icon={SearchX}>
          We couldn't find any products matching your search.
        </DataNotfound>
      ) : (
        <>
          {!isLowStockAlert && (
            <div className="text-end my-3">
              <span className="p-2 inline-block rounded text-(--color-text) text-sm bg-(--color-bg-secondary)">
                <span className="mr-2">Page :</span>
                <span>
                  {page} / {products?.totalPage}
                </span>
              </span>
            </div>
          )}

          <div className="rounded-lg overflow-x-auto bg-(--color-bg-secondary) ring shadow min-h-100 flex flex-col justify-between shadow-black/30 dark:shadow-white/20 ring-white/10 ">
            {visibleProducts?.length > 0 && (
              <ProductsTable
                setDeleteProduct={(id, name) =>
                  setDeleteProduct({ display: true, id, name })
                }
                setViewProduct={(id) => setViewProduct({ display: true, id })}
                navigate={navigate}
                products={visibleProducts}
              />
            )}

            {!isLowStockAlert && (
              <div className="border-t flex items-center justify-between dark:border-gray-300/40 border-gray-800/30 px-2 py-3">
                <div className="text-sm text-(--color-text)">
                  showing{" "}
                  <span className="text-black dark:text-white">1</span> to{" "}
                  <span className="text-black dark:text-white">
                    {products?.limit}
                  </span>{" "}
                  of{" "}
                  <span className="text-black dark:text-white">
                    {products?.total}
                  </span>{" "}
                  results
                </div>
                <div className="space-x-3">
                  <button
                    onClick={previousPage}
                    disabled={products?.page === 1}
                    className="ring text-black dark:text-white disabled:text-gray-300 dark:disabled:text-gray-100/30 text-sm cursor-pointer not-disabled:ring-gray-300 border-none px-2 py-1 rounded"
                  >
                    previous
                  </button>
                  <button
                    onClick={nextPage}
                    disabled={products?.page >= products?.totalPage}
                    className="ring text-black dark:text-white disabled:text-gray-300 dark:disabled:text-gray-100/30 text-sm cursor-pointer not-disabled:ring-gray-300 border-none px-2 py-1 rounded"
                  >
                    next
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default ProductsPage;
