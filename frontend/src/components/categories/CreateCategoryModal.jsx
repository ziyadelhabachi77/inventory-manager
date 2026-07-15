import { X } from "lucide-react";
import { useState } from "react";
import useCategories from "../../hooks/useCategories";
import CancelButton from "../ui/CancelButton";
import Input from "../ui/Input";
import MainButton from "../ui/MainButton";
import toast from "react-hot-toast";

function CreateCategoryModal({ closeModal, category }) {
  // =========== fetch category ==============
  const { createCategoryAsync, updateCategoryAsync } = useCategories();
  const isEditing = Boolean(category?._id);

  // ================= local state ===============
  const [categoryName, setCategoryName] = useState(category?.name || "");
  const [categoryDescription, setCategoryDescription] = useState(
    category?.description || "",
  );
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // handle submit category
  const handleSumitCategory = async (e) => {
    e.preventDefault();
    if (!categoryName.trim()) {
      setError("Name is required");
      return;
    }

    const categoryPayload = {
      name: categoryName,
      description: categoryDescription,
    };

    try {
      setIsSubmitting(true);
      if (isEditing) {
        await updateCategoryAsync({
          id: category._id,
          category: categoryPayload,
        });
        toast.success("Category updated", { position: "top-right" });
      } else {
        await createCategoryAsync(categoryPayload);
        toast.success("Category created", { position: "top-right" });
      }

      setCategoryName("");
      setCategoryDescription("");
      closeModal();
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          `Failed to ${isEditing ? "update" : "create"} category`,
        { position: "top-right" },
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded overflow-y-auto min-h-90 shadow-md w-screen max-w-100 bg-(--color-bg-main)">
      <div className="p-4 border-b border-gray-300/50 flex items-center justify-between">
        <h3 className="font-semibold text-xl dark:text-white">
          {isEditing ? "Edit Category" : "Create New Category"}
        </h3>
        <X
          onClick={closeModal}
          className="text-(--color-text) cursor-pointer"
          size={18}
        />
      </div>

      {/* ------------------------------ */}
      <form onSubmit={handleSumitCategory}>
        <div className="p-4">
          {/* category name */}
          <div className="mb-1">
            <label className="space-y-1">
              <span className="block text-[15px] dark:text-white mb-3">
                Category Name
              </span>
              <Input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder={"e.g.,Electronics, Office Supplies"}
                className={"bg-(--color-bg-secondary)"}
              />
            </label>
            <div className="min-h-6">
              <span
                className={`text-xs capitalize text-red-500 ${error && categoryName.trim() === "" ? "opacity-100" : "opacity-0"}`}
              >
                {error}
              </span>
            </div>
          </div>
          {/* === category name ==== */}
          {/* category description */}
          <div>
            <label className="space-y-2 flex-1">
              <span className="block text-[15px] dark:text-white">
                Category Description
              </span>
              <textarea
                value={categoryDescription}
                onChange={(e) => setCategoryDescription(e.target.value)}
                name="product-description"
                rows={3}
                className="ring w-full placeholder-gray-300 dark:placeholder-white/50 placeholder:text-sm bg-(--color-bg-secondary) rounded-md text-md focus:outline-none p-2 ring-gray-400 resize-none"
                placeholder="Add a short description for this cateogry..."
              ></textarea>
            </label>
          </div>
          {/* ==== category description ==== */}
        </div>
        {/* action */}
        <div className="bg-(--color-bg-secondary) space-x-4 px-3 py-3 text-end">
          <CancelButton onClick={closeModal} className={"px-2"}>
            Cancel
          </CancelButton>
          <MainButton disabled={isSubmitting} className={"px-4"}>
            {isSubmitting
              ? "Saving..."
              : isEditing
                ? "Save Changes"
                : "Create Category"}
          </MainButton>
        </div>
        {/* === action === */}
      </form>
      {/* ------------------------------ */}
    </div>
  );
}

export default CreateCategoryModal;
