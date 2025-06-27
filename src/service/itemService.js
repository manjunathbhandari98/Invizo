import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const addItems = async (itemData) => {
  try {
    return await axios.post(`${BASE_URL}/admin/items`, itemData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  } catch (e) {
    console.error(e.message);
    throw new Error(e);
  }
};

export const getItems = async () => {
  try {
    return await axios.get(`${BASE_URL}/items`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  } catch (e) {
    console.error(e.message);
    throw new Error(e);
  }
};

export const deleteItem = async (itemId) => {
  try {
    return await axios.delete(`${BASE_URL}/admin/item/${itemId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  } catch (e) {
    throw new Error(e.message);
  }
};
