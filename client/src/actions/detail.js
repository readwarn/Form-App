import { redirect } from "react-router-dom";
import {
  getSectors,
  getUsers,
  getUserDetail,
  saveNewDetail,
  updateDetail,
} from "../services";

export const detailLoader = async ({ request }) => {
  const url = new URL(request.url);
  const detailId = url.searchParams.get("id");
  try {
    const [sectors, details] = await Promise.all([
      getSectors(),
      detailId && getUserDetail(detailId),
    ]);

    if (!sectors?.status === 200) throw new Error("Failed to load sectors");
    if (detailId && !details?.status === 200)
      throw new Error("Failed to load user datails");

    return [sectors?.data, details?.data];
  } catch (err) {
    throw new Error("Invalid request");
  }
};

export const saveOrEditUserDeatail = async ({ request }) => {
  const url = new URL(request.url);
  const detailId = url.searchParams.get("id");

  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  const sectors = JSON.parse(updates.sectors);

  const payload = {
    ...updates,
    agreed: true,
    sectors,
  };

  try {
    const response = detailId
      ? await updateDetail(detailId, payload)
      : await saveNewDetail(payload);

    if (response.status === 200) return redirect("/users");

    throw new Error(`Failed to ${detailId ? "Update" : "Save"}`);
  } catch (error) {
    throw error;
  }
};

export const usersLoader = async () => {
  try {
    const response = await getUsers();
    if (response.status === 200) return response.data;
    throw new Error("Failed to load users");
  } catch (error) {
    throw error;
  }
};
