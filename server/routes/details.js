import { Router } from "express";
import { UserDetail } from "../models/index.js";
const details = Router();

details.post("/", async (req, res) => {
  try {
    const { name, agreed, sectors } = req.body;

    if (!name || typeof agreed !== "boolean" || !sectors?.length) {
      return res.status(400).json({ error: "Invalid request body" });
    }

    const newDetail = new UserDetail({ name, agreed, sectors });
    await newDetail.save();

    return res.status(200).json(newDetail);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

details.get("/", async (req, res) => {
  try {
    const details = await UserDetail.find().populate("sectors");
    return res.status(200).json(details);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

details.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const detail = await UserDetail.findById(id).populate("sectors");
    return detail
      ? res.status(200).json(detail)
      : res.status(404).json({ error: "Detail not found" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

details.put("/:detailId/update", async (req, res) => {
  try {
    const { name, agreed, sectors } = req.body;

    if (!name || typeof agreed !== "boolean" || !sectors?.length) {
      return res.status(400).json({ error: "Invalid request body" });
    }

    const details = await UserDetail.findByIdAndUpdate(
      req.params.detailId,
      req.body,
      { new: true }
    );
    if (!details) return res.status(404).json({ error: "Details not found" });
    return res.status(200).json(details);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export { details };
