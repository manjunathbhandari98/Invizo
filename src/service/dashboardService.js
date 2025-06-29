import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getDashboardData = async () => {
  try {
    return axios.get(`${BASE_URL}/dashboard`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  } catch (error) {
    console.error(error);
  }
};
