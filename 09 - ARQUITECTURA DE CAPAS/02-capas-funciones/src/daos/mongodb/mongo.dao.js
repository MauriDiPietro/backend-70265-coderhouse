import { ProductModel } from "./models/product.model.js";

export const getAll = async () => {
  try {
    return await ProductModel.find({});
  } catch (error) {
    throw new Error(error);
  }
};

export const create = async (obj) => {
  try {
    return await ProductModel.create(obj);
  } catch (error) {
    throw new Error(error);
  }
};


