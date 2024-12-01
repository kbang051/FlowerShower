import { app } from "../src/app.js";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import createProductIndex from "./models/IndexScript/SearchIndex.js";
//import { listFilesInBucket } from "./controllers/products.controller.js";

dotenv.config({
  path: "./env",
});

// listFilesInBucket("fullstack-ecom")

connectDB()
  .then(() => {
    return createProductIndex();
  })
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("Failed to connect to mongoDB", error);
  });
