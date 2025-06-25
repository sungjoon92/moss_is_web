import axios from "@/lib/axios";

export const login = (email: string, password: string) => {
  return axios.post(
    "/auth/login",
    { email, password },
    { withCredentials: true }
  );
};

export const checkAuth = () => {
  return axios.get("/auth/check", { withCredentials: true });
};

export const logout = () => {
  return axios.post("/auth/logout", {}, { withCredentials: true });
};

export const refreshToken = () => {
  return axios.post("/auth/refresh", {}, { withCredentials: true });
};
