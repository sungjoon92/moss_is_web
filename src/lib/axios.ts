// src/lib/axios.ts
import axios from "axios";

const instance = axios.create({
  baseURL: "/api", // 공통 prefix
  withCredentials: true, // 쿠키 포함 필요 시
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
