import { useQuery, useQueryClient } from "@tanstack/react-query";
import * as apiProducts from "../services/apiProducts";
import { useMutation } from "@tanstack/react-query";

const useProducts = ({page = 1, searchTerm="", category="", limit} = {}) => {
  const queryClient = useQueryClient();

  // get all product
  const {
    data: products,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["products", page, searchTerm, category, limit],
    queryFn: ({ signal }) =>
      apiProducts.getAll({ page, limit, signal, search: searchTerm, category }),
    keepPreviousData: true,
  });

  // create product
  const { mutate: createProduct } = useMutation({
    mutationFn: apiProducts.add,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  // update a product
  const {mutate: updateProduct} = useMutation({
    mutationFn: apiProducts.update,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["products"]})
    },
    onError: (error) => {
      console.error("error response: ", error.response?.data)
    }
  })

  // delete product
  const {mutate:deleteProd} = useMutation({
    mutationFn: apiProducts.deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["products"]})
    }
  })

  return { products, isLoading, createProduct, isFetching,updateProduct,deleteProd };
};
export default useProducts;


export const useProduct = (id) => {
    return useQuery({
      queryKey: ["products", id],
      queryFn: ({signal}) => apiProducts.single({signal,id}),
      select: (res) => res.data
    })
}
