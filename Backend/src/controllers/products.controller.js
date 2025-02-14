import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { Product } from "../models/Products.model.js";
import { s3 } from "../aws.config.js";
import { generateSignedUrl } from "../aws.config.js";

const fetchProducts = asyncHandler(async (req, res) => {
  console.log("Fetch product request received")
  const {
    page = 1,
    limit = 30,
    parentCategory,
    subCategory,
    color,
    productType,
    gender,
    brand,
    minPrice,
    maxPrice
  } = req.query;

  const filter = {};
  const skip = (Number(page) - 1) * Number(limit);

  try {
    if (parentCategory)
      filter.parentCategory = Array.isArray(parentCategory) ? { $in: parentCategory } : parentCategory
    if (subCategory) 
      filter.subCategory = Array.isArray(subCategory) ? { $in: subCategory } : subCategory 
    if (color) 
      filter.color = Array.isArray(color) ? { $in: color } : color
    if (productType) 
      filter.productType = Array.isArray(productType) ? { $in: productType } : productType
    if (gender) 
      filter.gender = Array.isArray(gender) ? { $in: gender } : gender
    if (brand) 
      filter.brand = Array.isArray(brand) ? { $in: brand } : brand
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice)
      if (maxPrice) filter.price.$lte = Number(maxPrice)
    }

    const totalProducts = await Product.countDocuments(filter)
    const products = await Product.find(filter).skip(skip).limit(Number(limit))
    const totalPages = Math.ceil(totalProducts/limit)

    const productsFetched = await Promise.all(
      products.map(async (product) => ({
        ...product.toObject(),
        imageURL: await generateSignedUrl(
          product.parentCategory,
          product.gender,
          product.image
        ),
      }))
    );

    return res.status(200).json({
      TotalProducts: totalProducts,
      TotalPages: totalPages,
      CurrentPage: Number(page),
      ProductDetails: Array.from(productsFetched)
    })
  } catch (error) {
    console.log("Unable to find products: ", error)
  }
});

const fetchFilters = asyncHandler(async (req, res) => {
  console.log("Fetch filters request received")
  const {
    parentCategory,
    subCategory,
    color,
    productType,
    gender,
    brand,
    minPrice,
    maxPrice,
    // keyword,
  } = req.query;

  // console.log("Filters sent by frontend:")
  // console.log(req.query)
  
  const filter = {}
  try {
    if (parentCategory) {
      filter.parentCategory = Array.isArray(parentCategory) ? { $in: parentCategory } : parentCategory
    }
    if (subCategory) {
      filter.subCategory = Array.isArray(subCategory) ? { $in: subCategory } : subCategory
    }
    if (color) {
      filter.color = Array.isArray(color) ? { $in: color } : color
    }
    if (productType) {
      filter.productType = Array.isArray(productType) ? { $in: productType } : productType
    }
    if (gender) {
      filter.gender = Array.isArray(gender) ? { $in: gender } : gender
    }
    if (brand) {
      filter.brand = Array.isArray(brand) ? { $in: brand } : brand
    }
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice)
      if (maxPrice) filter.price.$lte = Number(maxPrice)
    }

    const products = await Product.find(filter)
    // const products = await Product.find(filter).sort({ score: { $meta: "textScore" } })

    const filtered_parentCategory = new Set()
    products.forEach((item) => filtered_parentCategory.add(item.parentCategory))

    const filtered_subCategory = new Set()
    products.forEach((item) => filtered_subCategory.add(item.subCategory))

    const filtered_brand = new Set()
    products.forEach((item) => filtered_brand.add(item.brand))

    const filtered_color = new Set()
    products.forEach((item) => filtered_color.add(item.color))

    const filtered_productType = new Set()
    products.forEach((item) => filtered_productType.add(item.productType))

    const filtered_gender = new Set()
    products.forEach((item) => filtered_gender.add(item.gender))

    const prices = products.map((p) => p.price)
    const filtered_maxPrice = prices.length > 0 ? Math.max(...prices) : 0
    const filtered_minPrice = prices.length > 0 ? Math.min(...prices) : 0

    const fetchedFilterResponse = {
      ParentCategory: Array.from(filtered_parentCategory),
      SubCategory: Array.from(filtered_subCategory),
      Brand: Array.from(filtered_brand),
      Color: Array.from(filtered_color),
      ProductType: Array.from(filtered_productType),
      Gender: Array.from(filtered_gender),
      MaxPrice: Array.from(filtered_maxPrice),
      MinPrice: Array.from(filtered_minPrice)
    }

    return res.status(200).json(fetchedFilterResponse);

  } catch (error) {
    throw new ApiError(500, "Unable to fetch details of the filters: ", error);
  }
});

export { fetchProducts, fetchFilters };









// {
//   ratings: { averageRating: 0, totalReviews: 0 },
//   _id: new ObjectId('67312f5af5a0118fc3414d48'),
//   name: 'Gini and Jony Boys Washed Blue Jeans',
//   productID: '33278',
//   parentCategory: 'Apparel',
//   subCategory: 'Bottomwear',
//   imagePath: 'Apparel/Bottomwear/33278.jpg',
//   color: 'Blue',
//   productType: 'Jeans',
//   gender: 'Boys',
//   price: 55,
//   stock: 100,
//   image: '33278.jpg',
//   brand: 'Gini',
//   createdAt: 2024-11-10T22:10:34.197Z,
//   updatedAt: 2024-11-10T22:10:34.197Z,
//   __v: 0
// }













































//code under try {} to fetch filters applicable to respective searches 

// const brands = await Product.distinct("brand");
// const subcategories = await Product.distinct("subCategory");
// const colors = await Product.distinct("color");
// const gender = await Product.distinct("gender");

// const priceData = await Product.aggregate([
//   {
//     $group: {
//       _id: null,
//       maxPrice: { $max: "$price" },
//       minPrice: { $min: "$price" },
//     },
//   },
// ])

// const maxPrice = priceData.length > 0 ? priceData[0].maxPrice : 0
// const minPrice = priceData.length > 0 ? priceData[0].minPrice : 0

// return res.status(200).json({
//   brands,
//   subcategories,
//   colors,
//   gender,
//   maxPrice,
//   minPrice,
// });


























// const bucketUrl = "https://<your-bucket-name>.s3.<region>.amazonaws.com/"
// https://fullstack-ecom.s3.us-east-1.amazonaws.com/data/
// https://fullstack-ecom.s3.us-east-1.amazonaws.com/data/Apparel/
// https://fullstack-ecom.s3.us-east-1.amazonaws.com/data/Apparel/Boys/
// https://fullstack-ecom.s3.us-east-1.amazonaws.com/data/Apparel/Boys/10054.jpg
