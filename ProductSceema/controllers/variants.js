import VariantModel from "../models/variants.js";
import ProductModel from "../models/product.js";
export const createVariant = async (req, res) => {
  const {
    product_id,
    title,
    price,
    sku,
    position,
    inventory_policy,
    compare_at_price,
    fulfillment_service,
    inventory_management,
    option1,
    option2,
    option3,
    taxable,
    barcode,
    grams,
    image_id,
    weight,
    weight_unit,
    inventory_item_id,
    inventory_quantity,
    old_inventory_quantity,
  } = req.body;
  try {
    const result = await VariantModel.create({
      product_id,
      title,
      price,
      sku,
      position,
      inventory_policy,
      compare_at_price,
      fulfillment_service,
      inventory_management,
      option1,
      option2,
      option3,
      taxable,
      barcode,
      grams,
      image_id,
      weight,
      weight_unit,
      inventory_item_id,
      inventory_quantity,
      old_inventory_quantity,
    });
    await ProductModel.updateMany({
      _id: product_id,
      $push: { variants: result._id },
    });
    res.status(200).json({ result });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateVariant = async (req, res) => {
  const data = req.body;
  const { id } = req.params;

  try {
    await VariantModel.findOneAndUpdate({ _id: id }, data, {
      upsert: true,
    });
    const result = await VariantModel.findById({ _id: id });
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteVariant = async (req, res) => {
  const { id } = req.params;
  try {
    const variants = VariantModel.find({ _id: id });
    await ProductModel.updateMany({
      _id: variants.product_id,
      $pull: { variants: id },
    });
    const result1 = await VariantModel.deleteOne({ _id: id });
    res.status(200).json({ result: result1 });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
export const getAlVariants = async (req, res) => {
  try {
    const result = await VariantModel.find({});
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getVariant = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await VariantModel.findById({ _id: id });
    res.status(200).json({ result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
