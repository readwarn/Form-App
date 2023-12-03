import { apiClient } from "../apiClient";

export const getUsers = async () => {
  return await apiClient.get("/details");
};

export const getUserDetail = async (id) => {
  return await apiClient.get(`/details/${id}`);
};

export const saveNewDetail = async ({ name, sectors, agreed }) => {
  return await apiClient.post("/details", { name, sectors, agreed });
};

export const updateDetail = async (id, { name, sectors, agreed }) => {
  return await apiClient.put(`/details/${id}/update`, {
    name,
    sectors,
    agreed,
  });
};
