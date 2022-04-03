import mongoose from "mongoose";
var Schema = mongoose.Schema;
const imagesSchema = mongoose.Schema(
  {
    product_id: { type: Schema.Types.ObjectId, ref: "Product" },
    position: { type: String, required: false },
    position: { type: String, required: false },
    alt: { type: String, required: false },
    width: { type: String, required: false },
    height: { type: String, required: false },
    src: { type: String, required: false },
    variant_ids: [],
    admin_graphql_api_id: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Images", imagesSchema);
