import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://form-app-server.vercel.app",
});
