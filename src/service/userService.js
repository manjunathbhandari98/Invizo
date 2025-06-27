import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getUsers = async () => {
  try {
    return await axios.get(`${BASE_URL}/admin/users`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const addUser = async (userData) => {
  try {
    return await axios.post(`${BASE_URL}/admin/register`, userData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  } catch (error) {
    console.error(error.message);
  }
};

export const deleteUser = async (userId) => {
  try {
    return axios.delete(`${BASE_URL}/admin/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  } catch (error) {
    console.error(error);
  }
};
