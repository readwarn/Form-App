import mongoose from "mongoose";

const UserDetailSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sectors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
  agreed: { type: Boolean, required: true },
});

const UserDetail = mongoose.model("UserDetail", UserDetailSchema);

export { UserDetailSchema, UserDetail };
