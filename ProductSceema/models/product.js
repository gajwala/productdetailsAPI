import mongoose from "mongoose";
var Schema = mongoose.Schema;
const productSchema = mongoose.Schema(
  {
    title: { type: String, required: false },
    description: { type: String, required: false },
    vendor: { type: String, required: false },
    product_type: { type: String, required: false },
    published_at: { type: Date, required: false },
    handle: { type: String, required: false },
    template_suffix: { type: String, required: false },
    published_scope: { type: String, required: false },
    tags: { type: String, required: false },
    admin_graphql_api_id: { type: String, required: false },
    variants: [
      { type: Schema.Types.ObjectId, ref: "Variants", required: true },
    ],
    options: [{ type: Schema.Types.ObjectId, ref: "Options" }],
    images: [{ type: Schema.Types.ObjectId, ref: "Images" }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", productSchema);
