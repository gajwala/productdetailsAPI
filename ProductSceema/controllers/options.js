import OptionsModel from "../models/options.js";
import ProductModel from "../models/product.js";
export const createOptions = async (req, res) => {
  const { product_id, name, position, values } = req.body;
  try {
    const result = await OptionsModel.create({
      product_id,
      name,
      position,
      values,
    });
    await ProductModel.updateMany({
      _id: product_id,
      $push: { options: result._id },
    });
    res.status(200).json({ result });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateOptions = async (req, res) => {
  const data = req.body;
  const { id } = req.params;

  try {
    await OptionsModel.findOneAndUpdate({ _id: id }, data, {
      upsert: true,
    });
    const result = await OptionsModel.findById({ _id: id });
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteOption = async (req, res) => {
  const { id } = req.params;
  try {
    const options = OptionsModel.find({ _id: id });
    await ProductModel.updateMany({
      _id: options.product_id,
      $pull: { options: id },
    });
    const result1 = await OptionsModel.deleteOne({ _id: id });
    res.status(200).json({ result: result1 });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
export const getAllOptions = async (req, res) => {
  try {
    const result = await OptionsModel.find({});
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getOption = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await OptionsModel.findById({ _id: id });
    res.status(200).json({ result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
