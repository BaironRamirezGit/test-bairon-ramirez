import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://nest-backend:3001"; 

export const registerUser = async (userData: {
  name: string;
  login: string;
  password: string;
  role: string;
}) => {
  try {
    const response = await axios.post(`${API_URL}/api/v1/auth/register`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return { success: true, message: response.data.message };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Error al conectar con el servidor",
    };
  }
};

export const loginUser = async (credentials: { login: string; password: string }) => {
  try {
    const response = await axios.post(`${API_URL}/api/v1/auth/login`, credentials);
    return { success: true, token: response.data.token };
  } catch (error: any) {
    return { success: false, message: error.response?.data?.message || "Error al iniciar sesión" };
  }
};
