import axios from "axios";
import { BASE_URL } from "../../config/appConfig";

// get all supplier
export const getAll = ({ signal }) =>
  axios.get(`${BASE_URL}/suppliers`, { signal });

// create supplier
export const add = (supplier) => axios.post(`${BASE_URL}/suppliers`, supplier);



// delete supplier

export const deleteSupplier = (id) => axios.delete(`${BASE_URL}/suppliers/${id}`)
