import axios from "axios";
import { BASE_URL } from "../../config/appConfig";

// get all orders
export const getAll = ({ page, limit, signal, search, status } = {}) =>
  axios.get(`${BASE_URL}/orders`, {
    params: { page, limit, search, status },
    signal,
  });

// create order
export const add = (order) => axios.post(`${BASE_URL}/orders`, order);


// get single order
export const getOrder = ({signal,id}) => axios.get(`${BASE_URL}/orders/${id}`,{signal})

// delete order
export const deleteOrder = (id) => axios.delete(`${BASE_URL}/orders/${id}`)
