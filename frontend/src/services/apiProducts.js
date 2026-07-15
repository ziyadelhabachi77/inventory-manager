import axios from "axios";
import { BASE_URL } from "../../config/appConfig";

// get all products
export const getAll = async ({
  page,
  limit,
  signal,
  search,
  category,
} = {}) => {
  const { data } = await axios.get(`${BASE_URL}/products`, {
    params: { page, limit, search, category },
    signal,
  });
  return data;
};

// get single product
export const single = async ({ signal, id }) => {
  const { data } = await axios.get(`${BASE_URL}/products/${id}`, { signal });
  return data;
};

// create product
export const add = (product) => axios.post(`${BASE_URL}/products`, product);

// udpate product
export const update = ({ product, id }) =>
  axios.put(`${BASE_URL}/products/${id}`, product);

// delete product
export const deleteProduct = ({id}) => axios.delete(`${BASE_URL}/products/${id}`)

// const delay = (time) => {
//   return new Promise((resolve) => setTimeout(resolve, time));
// };
