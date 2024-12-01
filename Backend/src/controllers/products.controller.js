import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import AWS from "aws-sdk";
import { Product } from "../models/Products.model.js";

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_AWS,
  secretAccessKey: process.env.SECRET_KEY_AWS,
  region: process.env.AWS_BUCKET_REGION,
});

const s3 = new AWS.S3();

const generateSignedUrl = async (parentCategory, gender, image) => {
  const bucketName = process.env.AWS_BUCKET_NAME;
  const objectKey = `data/${parentCategory}/${gender}/${image}`;
  const params = {
    Bucket: bucketName,
    Key: objectKey,
    Expires: 300,
  };
  try {
    const signedUrl = s3.getSignedUrl("getObject", params);
    return signedUrl;
  } catch (error) {
    throw new ApiError(500, "Error while generating signed url ", error);
  }
};

const fetchProducts = asyncHandler(async (req, res) => {
  console.log("Request received from the frontend:")
  const {
    page = 1,
    limit = 30,
    parentCategory,
    subCategory,
    productID,
    color,
    productType,
    image,
    gender,
    brand,
    minPrice,
    maxPrice,
    keyword,
  } = req.query;

  const filter = {};
  const skip = (Number(page) - 1) * Number(limit);

  try {
    if (parentCategory && gender && image) {
      //Case 1: to fetch info of a particular product
      const product = await Product.findOne({ image: image });
      if (!product) {
        throw new ApiError(400, "Product not found in the database ", error);
      }

      const productUrl = await generateSignedUrl(parentCategory, gender, image);

      return res.status(200).json({ product, imageUrl: productUrl });
    }

    if (parentCategory && !gender) {
      //Case 2: Only parentCategory is present
      filter.parentCategory = parentCategory;
    }

    if (parentCategory && gender) {
      //Case 3: Both parentCategory and gender are present
      filter.parentCategory = parentCategory;
      filter.gender = gender;
    }

    if (color) filter.color = color;
    if (brand) filter.brand = brand;
    if (subCategory) filter.subCategory = subCategory;
    if (productType) filter.productType = productType;

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    if (keyword) {
      filter.$or = [
        { name: { $regex: keyword, $options: "i" } },
        { brand: { $regex: keyword, $options: "i" } },
        { color: { $regex: keyword, $options: "i" } },
        { productType: { $regex: keyword, $options: "i" } },
        { gender: { $regex: keyword, $options: "i" } },
      ];
    }

    const totalProducts = await Product.countDocuments(filter);
    const products = await Product.find(filter).skip(skip).limit(Number(limit));

    const productsFetched = await Promise.all(
      products.map(async (product) => ({
        ...product.toObject(),
        imageUrl: await generateSignedUrl(
          product.parentCategory,
          product.gender,
          product.image
        ),
      }))
    );
    console.log("Response sent to the frontend:")
    console.log({totalProducts: totalProducts,
      products: productsFetched,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: Number(page)})

    return res.status(200).json({
      totalProducts: totalProducts,
      products: productsFetched,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    throw new ApiError(500, "Unable to fech product details from the backend", error);
  }
});

const fetchFilters = asyncHandler(async (req, res) => {
  try {
    const brands = await Product.distinct("brand");
    const subcategories = await Product.distinct("subCategory");
    const colors = await Product.distinct("color");
    const gender = await Product.distinct("gender");

    const priceData = await Product.aggregate([
      {
        $group: {
          _id: null,
          maxPrice: { $max: "$price" },
          minPrice: { $min: "$price" },
        },
      },
    ])

    const maxPrice = priceData.length > 0 ? priceData[0].maxPrice : 0
    const minPrice = priceData.length > 0 ? priceData[0].minPrice : 0

    return res.status(200).json({
      brands,
      subcategories,
      colors,
      gender,
      maxPrice,
      minPrice,
    });
  } catch (error) {
    throw new ApiError(500, "Unable to fetch details of the filters: ", error);
  }
});

export { generateSignedUrl, fetchProducts, fetchFilters };

// const bucketUrl = "https://<your-bucket-name>.s3.<region>.amazonaws.com/"
// https://fullstack-ecom.s3.us-east-1.amazonaws.com/data/
// https://fullstack-ecom.s3.us-east-1.amazonaws.com/data/Apparel/
// https://fullstack-ecom.s3.us-east-1.amazonaws.com/data/Apparel/Boys/
// https://fullstack-ecom.s3.us-east-1.amazonaws.com/data/Apparel/Boys/10054.jpg
