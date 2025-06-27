import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const addCategory = async (categoryData) => {
  return await axios.post(`${BASE_URL}/admin/categories`, categoryData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const deleteCategory = async (categoryId) => {
  return await axios.delete(`${BASE_URL}/${categoryId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const getCategories = async () => {
  const response = await axios.get(`${BASE_URL}/categories`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};
