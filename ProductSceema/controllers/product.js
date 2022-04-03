import ProductModel from "../models/product.js";
import Variants from "../models/variants.js";
import ImagesModel from "../models/images.js";
import OptionsModel from "../models/options.js";

export const createProduct = async (req, res) => {
  const {
    title,
    description,
    vendor,
    product_type,
    handle,
    template_suffix,
    published_scope,
    tags,
    admin_graphql_api_id,
    variants,
    images,
    options,
  } = req.body;
  try {
    const product = new ProductModel({
      title,
      description,
      vendor,
      product_type,
      handle,
      template_suffix,
      published_scope,
      tags,
      admin_graphql_api_id,
    });
    await product.save();

    const variantsData = new Variants({ ...variants, product_id: product._id });
    await variantsData.save();

    const imagesModel = new ImagesModel({ ...images, product_id: product._id });
    await imagesModel.save();

    const optionsModel = new OptionsModel({
      ...options,
      product_id: product._id,
    });
    await optionsModel.save();

    product.variants.push(variantsData);
    product.images.push(imagesModel);
    product.options.push(optionsModel);

    await product.save();

    res.status(200).json({ result: product });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateProduct = async (req, res) => {
  const data = req.body;
  const { id } = req.params;

  try {
    await ProductModel.findOneAndUpdate({ _id: id }, data, {
      upsert: true,
    });
    const result = await ProductModel.findById({ _id: id })
      .populate("images")
      .populate("variants")
      .populate("options");
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await ProductModel.findById({ _id: id });
    const { options, variants, images } = result;
    for (let i = 0; i < options.length; i++) {
      await OptionsModel.findByIdAndRemove(options[i]);
    }
    for (let i = 0; i < variants.length; i++) {
      await Variants.findByIdAndRemove(variants[i]);
    }
    for (let i = 0; i < images.length; i++) {
      await ImagesModel.findByIdAndRemove(images[i]);
    }
    const result1 = await ProductModel.deleteOne({ _id: id });
    res.status(200).json({ result: result1 });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
export const getAlProducts = async (req, res) => {
  try {
    // const result = await ProductModel.find({}).populate("variants").exec();

    const result = await ProductModel.find({})
      .populate("images")
      .populate("variants")
      .populate("options");
    res.status(200).json({ result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await ProductModel.findById({ _id: id })
      .populate("images")
      .populate("variants")
      .populate("options");
    res.status(200).json({ result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
