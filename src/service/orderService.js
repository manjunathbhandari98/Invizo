import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const latestOrders = async () => {
  try {
    return await axios.get(`${BASE_URL}/orders/latest`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  } catch (e) {
    console.error(e);
  }
};

export const createOrder = async (orderData) => {
  try {
    return await axios.post(`${BASE_URL}/orders`, orderData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const deleteOrder = async (orderId) => {
  try {
    return await axios.delete(`${BASE_URL}/${orderId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  } catch (error) {
    console.error(error);
  }
};
