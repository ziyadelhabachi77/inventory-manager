import axios from "axios";
import { BASE_URL } from "../../config/appConfig";


// get gategories
export const getAll = () => axios.get(`${BASE_URL}/category`)


// create cateogry
export const add = (category) => axios.post(`${BASE_URL}/category`, category)

// update category
export const update = ({ id, category }) =>
  axios.put(`${BASE_URL}/category/${id}`, category);

// delete category
export const deleteCategory = ({ id }) =>
  {axios.delete(`${BASE_URL}/category/${id}`),console.log(id)};
