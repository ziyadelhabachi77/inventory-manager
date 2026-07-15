import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as apiCategory from "../services/apiCategory";

const useCategories = () => {
    const queryClient = useQueryClient();


  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: apiCategory.getAll,
    select: (res) => res?.data?.data,
  });

  // create new category
  const { mutate: createCategoryMutation, mutateAsync: createCategoryAsync } = useMutation({
    mutationFn: apiCategory.add,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  // update category
  const { mutate: updateCategoryMutation, mutateAsync: updateCategoryAsync } = useMutation({
    mutationFn: apiCategory.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  // delete category
  const { mutate: deleteCategoryMutation, mutateAsync: deleteCategoryAsync } = useMutation({
    mutationFn: apiCategory.deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return {
    categories,
    isLoading,
    createCategoryMutation,
    createCategoryAsync,
    updateCategoryMutation,
    updateCategoryAsync,
    deleteCategoryMutation,
    deleteCategoryAsync,
  };
};

export default useCategories;
