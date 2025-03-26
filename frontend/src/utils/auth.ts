import { jwtDecode } from "jwt-decode";
import { User } from "../types/user";

/*export const getUser = (): User | null => {
  const token = localStorage.getItem("token");
  return token ? jwtDecode<User>(token) : null;
};*/

export const getUser = (): { role: string; token: string } | null => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  
  const decodedUser = jwtDecode<{ role: string }>(token);
  return { ...decodedUser, token };
};
  
export const logout = (): void => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};
