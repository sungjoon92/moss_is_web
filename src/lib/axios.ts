// src/lib/axios.ts
import axios from "axios";

const baseURL =
  typeof window === "undefined"
    ? process.env.API_BASE_URL || "http://localhost:3000/api" // 서버 환경
    : "/api"; // 클라이언트 환경

console.log(process.env.API_BASE_URL);

const instance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
