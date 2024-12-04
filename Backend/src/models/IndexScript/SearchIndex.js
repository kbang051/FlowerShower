import mongoose from "mongoose";
import { Product } from "../Products.model.js";

const createProductIndex = async () => {
  try {
    console.log("Reached SearchIndex File");

    const existingIndexes = await Product.collection.indexes();
    const textIndex = existingIndexes.find(index =>
      index.name === "ProductTextIndex"
    );

    if (!textIndex) {
      await Product.collection.createIndex(
        {
          name: "text",
          brand: "text",
          color: "text",
          productType: "text",
          gender: "text",
        },
        { name: "ProductTextIndex" }
      );
      console.log("Indexes created successfully");
    } else {
      console.log("Text index already exists, skipping creation.");
    }
  } catch (error) {
    console.log("Error while creating SearchIndex: ", error);
    throw error;
  }
};

export default createProductIndex


