import { Router } from "express";
import { Category } from "../models/index.js";

const categories = Router();

categories.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

categories.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = new Category({
      name,
    });
    await newCategory.save();
    return res.status(200).json(newCategory);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

categories.put("/:id/update-categories", async (req, res) => {
  try {
    const categoryId = req.params.id;
    const { categories } = req.body;

    if (!categories || !Array.isArray(categories)) {
      return res.status(400).json({ error: "Invalid request body" });
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { categories },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    return res.status(200).json(updatedCategory);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

categories.get("/sectors", async (req, res) => {
  try {
    const sectors = await Category.findById("65689b786a5c54b35593e628")
      .populate({
        path: "categories",
        populate: {
          path: "categories",
          populate: {
            path: "categories",
            populate: {
              path: "categories",
            },
          },
        },
      })
      .exec();
    return res.status(200).json(sectors);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export { categories };
