import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as apiSupplier from "../services/apiSupplier";

function useSuppliers() {
  const queryClient = useQueryClient()
  const { data: suppliers, isLoading,isFetching } = useQuery({
    queryKey: ["suppliers"],
    queryFn: ({ signal }) => apiSupplier.getAll({ signal }),
    select: (res) => res?.data?.data,
  });

  // create new supplier
  const {mutate:addSupplier} = useMutation({
    mutationFn: apiSupplier.add, 
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["suppliers"]})
    },
    
  })

  // delete supplier
   const {mutate:deleteSupplierMutation} = useMutation({
      mutationFn: apiSupplier.deleteSupplier,
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ["suppliers"]})
      }
    })

  return { suppliers, isLoading,isFetching, addSupplier, deleteSupplierMutation };
}

export default useSuppliers;
