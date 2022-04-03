import mongoose from "mongoose";
var Schema = mongoose.Schema;
const optionsSchema = mongoose.Schema(
  {
    product_id: { type: Schema.Types.ObjectId, ref: "Product" },
    name: { type: String, required: false },
    position: { type: String, required: false },
    values: [{ type: String, required: false }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Options", optionsSchema);
