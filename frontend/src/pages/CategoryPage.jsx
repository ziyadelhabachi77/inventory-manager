import {
  BookOpen,
  BriefcaseBusiness,
  Grid2X2,
  House,
  Layers,
  List,
  ListFilter,
  MonitorSmartphone,
  MoreHorizontal,
  Plus,
  Search,
  Shirt,
  ShoppingBag,
  Trophy,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  DeleteConfirmationModal,
  ModalFormContainer,
  SelectInput,
} from "../components";
import CreateCategoryModal from "../components/categories/CreateCategoryModal";
import useCategories from "../hooks/useCategories";
import useProducts from "../hooks/useProducts";
import toast from "react-hot-toast";

const categoryStyles = [
  {
    Icon: MonitorSmartphone,
    iconColor: "text-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-500/10",
  },
  {
    Icon: BriefcaseBusiness,
    iconColor: "text-amber-600",
    bgColor: "bg-amber-50 dark:bg-amber-500/10",
  },
  {
    Icon: Shirt,
    iconColor: "text-violet-600",
    bgColor: "bg-violet-50 dark:bg-violet-500/10",
  },
  {
    Icon: BookOpen,
    iconColor: "text-emerald-600",
    bgColor: "bg-emerald-50 dark:bg-emerald-500/10",
  },
  {
    Icon: Trophy,
    iconColor: "text-rose-500",
    bgColor: "bg-rose-50 dark:bg-rose-500/10",
  },
  {
    Icon: House,
    iconColor: "text-cyan-600",
    bgColor: "bg-cyan-50 dark:bg-cyan-500/10",
  },
];

function CategoryPage() {
  const { categories, isLoading, deleteCategoryMutation } = useCategories();
  const { products } = useProducts();

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [category, setCategory] = useState("");
  const [isCreateCategoryModalActive, setIsCreateCategoryModalActive] =
    useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [deleteCategory, setDeleteCategory] = useState(null);

  const productsData = products?.data;
  const totalProducts = products?.total ?? productsData?.length ?? 0;

  const totalProductsForCategory = (categoryId) => {
    return (
      productsData?.filter((p) => p?.categoryId?._id === categoryId)?.length ??
      0
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const filterCategories = categories?.filter((c) => {
    if (category && c?.name !== category) return false;

    if (debouncedSearch.trim()) {
      return c?.name
        ?.toLowerCase()
        .includes(debouncedSearch.trim().toLowerCase());
    }

    return true;
  });

  const closeCategoryModal = () => {
    setIsCreateCategoryModalActive(false);
    setEditCategory(null);
  };

  const handleDeleteCategory = async () => {
    try {
      await deleteCategoryMutation({ id: deleteCategory._id });
      toast.success("Category deleted", { position: "top-right" });
      setDeleteCategory(null);
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Failed to delete category",
        { position: "top-right" },
      );
    }
  };

  return (
    <div className="space-y-8">
      {isCreateCategoryModalActive && (
        <ModalFormContainer>
          <CreateCategoryModal
            closeModal={closeCategoryModal}
            category={editCategory}
          />
        </ModalFormContainer>
      )}
      {deleteCategory && (
        <ModalFormContainer>
          <DeleteConfirmationModal
            deleteAction={handleDeleteCategory}
            itemName={deleteCategory.name}
            setCloseModal={() => setDeleteCategory(null)}
          >
            Category
          </DeleteConfirmationModal>
        </ModalFormContainer>
      )}

      <section className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-sm text-(--color-text)">
            <span>Home</span>
            <span>/</span>
            <span>Inventory</span>
            <span>/</span>
            <span className="text-black dark:text-white">Categories</span>
          </div>
          <div className="space-y-1">
            <h2 className="text-3xl font-bold text-black dark:text-white">
              Product Categories
            </h2>
            <p className="text-base text-(--color-text)">
              Manage your product taxonomy and organization.
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsCreateCategoryModalActive(true)}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-500 px-5 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-blue-600"
        >
          <Plus size={20} />
          Add Category
        </button>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 lg:w-[50%]">
        <div className="rounded-lg border border-gray-200 bg-(--color-bg-secondary) p-6 shadow-sm dark:border-gray-700/60">
          <div className="flex items-center gap-3">
            <span className="rounded-md bg-[#EBF2FE] p-3 dark:bg-[#3B82F6]">
              <Layers size={23} className="text-[#3C83F6] dark:text-white" />
            </span>
            <span className="text-lg text-(--color-text) dark:text-white">
              Total Categories
            </span>
          </div>
          <div className="mt-4">
            <span className="text-2xl font-bold dark:text-white">
              {categories?.length ?? 0}
            </span>
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-(--color-bg-secondary) p-6 shadow-sm dark:border-gray-700/60">
          <div className="flex items-center gap-3">
            <span className="rounded-md bg-green-100 p-3 dark:bg-green-500/10">
              <ShoppingBag size={23} className="text-green-600" />
            </span>
            <span className="text-lg text-(--color-text) dark:text-white">
              Total Products
            </span>
          </div>
          <div className="mt-4">
            <span className="text-2xl font-bold dark:text-white">
              {totalProducts}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-(--color-bg-secondary) p-4 shadow-sm dark:border-gray-700/60 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-xl">
          <input
            type="text"
            value={search}
            name="input"
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-md border border-gray-200 bg-gray-50 p-3 pl-11 text-sm text-black outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800/40 dark:text-white"
            placeholder="Search categories by name..."
          />
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-lg border border-gray-200 bg-gray-50 p-1 dark:border-gray-700 dark:bg-gray-800/40">
            <button className="rounded-md bg-white p-2 text-blue-500 shadow-sm dark:bg-gray-700">
              <Grid2X2 size={20} />
            </button>
            <button className="rounded-md p-2 text-(--color-text)">
              <List size={20} />
            </button>
          </div>
          <div className="relative">
            <SelectInput
              isLoading={isLoading}
              className="bg-gray-50 pl-8 text-center dark:bg-gray-800/40"
              placeholder="Filter"
              options={categories || []}
              state={category}
              setState={(e) => setCategory(e.target.value)}
            />
            <ListFilter
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-black dark:text-white"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {filterCategories?.map((category, index) => {
          const { Icon, iconColor, bgColor } =
            categoryStyles[index % categoryStyles.length];
          const productCount = totalProductsForCategory(category?._id);

          return (
            <div
              key={category?._id}
              className="flex min-h-80 flex-col justify-between overflow-hidden rounded-lg border border-gray-200 bg-(--color-bg-secondary) shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-gray-700/60"
            >
              <div className="p-8 text-center">
                <div className="text-right">
                  <button className="text-gray-400 transition-colors hover:text-gray-700 dark:hover:text-white">
                    <MoreHorizontal size={22} />
                  </button>
                </div>
                <span
                  className={`mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full ${bgColor}`}
                >
                  <Icon size={28} className={iconColor} />
                </span>
                <h3 className="mb-3 text-xl font-bold text-black dark:text-white">
                  {category?.name}
                </h3>
                <p className="mx-auto min-h-12 max-w-48 text-sm leading-6 text-(--color-text)">
                  {category?.description ||
                    "Organize and manage products in this category."}
                </p>
                <span className="mt-6 inline-block rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700 dark:bg-gray-700 dark:text-white/80">
                  {productCount} Products
                </span>
              </div>
              <div className="grid grid-cols-2 divide-x divide-gray-200 border-t border-gray-200 dark:divide-gray-700 dark:border-gray-700">
                <button
                  onClick={() => {
                    setEditCategory(category);
                    setIsCreateCategoryModalActive(true);
                  }}
                  className="py-3 text-sm text-gray-600 transition-colors hover:text-black dark:text-gray-300 dark:hover:text-white"
                >
                  Edit
                </button>
                <button
                  onClick={() => setDeleteCategory(category)}
                  className="py-3 text-sm text-gray-600 transition-colors hover:text-red-500 dark:text-gray-300"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}

        <div
          onClick={() => setIsCreateCategoryModalActive(true)}
          className="flex min-h-80 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 transition-colors hover:bg-(--color-bg-secondary) dark:border-gray-300/50"
        >
          <div className="flex flex-col items-center justify-center gap-3">
            <span className="rounded-full bg-white p-4 shadow-sm ring ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
              <Plus />
            </span>
            <span className="text-sm text-(--color-text)">
              Create New Category
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;
