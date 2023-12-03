import { apiClient } from "../apiClient";

export const getSectors = async () => {
  return await apiClient.get("/categories/sectors");
};
