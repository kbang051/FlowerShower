import mongoose from "mongoose";
import { Product } from "../Products.model.js";

const createProductIndex = async () => {
  try {
    console.log("Reached SearchIndex File");
    await Product.createIndexes({
      name: "text",
      brand: "text",
      color: "text",
      productType: "text",
      gender: "text",
    });
    console.log("Indexes created successfully");
  } catch (error) {
    console.log("Error while creating SearchIndex: ", error);
    throw error
  }
};

export default createProductIndex


