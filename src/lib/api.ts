import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const api = axios.create({
  baseURL: `${API_URL}`,
  // withCredentials: true,
});
