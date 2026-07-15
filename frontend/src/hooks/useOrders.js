import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as apiOrders from "../services/apiOrders";
import { useNavigate } from "react-router-dom";

const useOrders = (page, searchTerm, statusState, limit) => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  // get orders
  const {
    data: orders,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["orders", page, searchTerm, statusState],
    queryFn: ({ signal }) =>
      apiOrders.getAll({
        page,
        search: searchTerm,
        status: statusState,
        signal,
        limit,
      }),
    select: (res) => res?.data,
    keepPreviousData: true,
    placeholderData: (prev) => {
      if (prev) {
        return prev?.data; 
      }
      return prev;
    },
  });

  // create order 
  const {mutate:createOrder} = useMutation({
    mutationFn: apiOrders.add
  })

  const {mutate:deleteOrder} = useMutation({
    mutationFn: apiOrders.deleteOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["orders"]})
      navigate("/orders")
    }
  })
  return { orders, isLoading, isFetching, createOrder, deleteOrder};
};


export const useOrder = (id) => {
  return useQuery({queryKey: ["order", id],
    queryFn: ({signal}) => apiOrders.getOrder({signal,id}),
    select: (res) => res?.data?.data
  })
}

export default useOrders;
