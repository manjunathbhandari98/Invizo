import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const createRazorpayOrder = async (data) => {
  try {
    return await axios.post(`${BASE_URL}/payments/create-order`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const verifyOrder = async (data) => {
  try {
    return await axios.post(`${BASE_URL}/payments/verify`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  } catch (error) {
    console.error(error);
  }
};
