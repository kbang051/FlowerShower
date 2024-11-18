// import { Category } from "../models/Category.model.js";
// import xlsx from "xlsx";

// const additionOfCategories = async (req, res) => {
//   try {
//     const workbook = xlsx.readFile("./src/Ecommerce_dataset.xlsx");
//     const sheetName = workbook.SheetNames[0];
//     const worksheet = workbook.Sheets[sheetName];
//     const jsonData = xlsx.utils.sheet_to_json(worksheet);
//     console.log(jsonData[0]);

//     const recordMap = jsonData.map((record) => ({
//       parentCategory: record.Category,
//       subCategory: record.SubCategory,
//       productType: record.ProductType,
//       color: record.Colour,
//     }));

//     const insertData = await Category.insertMany(recordMap);
//     console.log("Data Inserted Successfully");
//     res.status(201).json({ message: "Data Inserted Successfully" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Data insertion failed", error });
//   }
// };

// export default additionOfCategories;
