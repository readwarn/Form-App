import { Schema, model } from "mongoose";

const CategorySchema = new Schema({
  name: { type: String, required: true },
  categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
});

const Category = model("Category", CategorySchema);

export { CategorySchema, Category };
