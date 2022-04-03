import ImagesModel from "../models/images.js";
import ProductModel from "../models/product.js";
export const createImages = async (req, res) => {
  const {
    product_id,
    width,
    position,
    height,
    src,
    admin_graphql_api_id,
    variant_ids,
    alt,
  } = req.body;
  try {
    const result = await ImagesModel.create({
      product_id,
      width,
      position,
      height,
      src,
      admin_graphql_api_id,
      variant_ids,
      alt,
    });
    await ProductModel.updateMany({
      _id: product_id,
      $push: { images: result._id },
    });
    res.status(200).json({ result });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateImage = async (req, res) => {
  const data = req.body;
  const { id } = req.params;

  try {
    await ImagesModel.findOneAndUpdate({ _id: id }, data, {
      upsert: true,
    });
    const result = await ImagesModel.findById({ _id: id });
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteImage = async (req, res) => {
  const { id } = req.params;
  try {
    const images = ImagesModel.find({ _id: id });
    await ProductModel.updateMany({
      _id: images.product_id,
      $pull: { images: id },
    });
    const result1 = await ImagesModel.deleteOne({ _id: id });
    res.status(200).json({ result: result1 });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
export const getAllImages = async (req, res) => {
  try {
    const result = await ImagesModel.find({});
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getImage = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await ImagesModel.findById({ _id: id });
    res.status(200).json({ result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
