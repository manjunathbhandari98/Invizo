import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const login = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, data);

    return response;
  } catch (error) {
    throw new error();
  }
};
