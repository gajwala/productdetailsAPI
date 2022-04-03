import mongoose from "mongoose";
var Schema = mongoose.Schema;
const variantsSchema = mongoose.Schema(
  {
    product_id: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    title: { type: String, required: false },
    price: { type: String, required: false },
    sku: { type: String, required: false },
    position: { type: String, required: false },
    inventory_policy: { type: String, required: false },
    compare_at_price: { type: String, required: false },
    fulfillment_service: { type: String, required: false },
    inventory_management: { type: String, required: false },
    option1: { type: String, required: false },
    option2: { type: String, required: false },
    option3: { type: String, required: false },
    taxable: { type: String, required: false },
    barcode: { type: String, required: false },
    grams: { type: String, required: false },
    image_id: { type: String, required: false },
    weight: { type: String, required: false },
    weight_unit: { type: String, required: false },
    inventory_item_id: { type: String, required: false },
    inventory_quantity: { type: String, required: false },
    old_inventory_quantity: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Variants", variantsSchema);
