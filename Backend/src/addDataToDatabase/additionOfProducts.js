import { Product } from "../models/Products.model.js"
import xlsx from "xlsx"

const additionOfProducts = async (req, res) => {
    try {
        const workbook =  xlsx.readFile("./src/Ecommerce_dataset.xlsx")
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        const jsonData =  xlsx.utils.sheet_to_json(worksheet) 

        const recordMap = jsonData.map(record => ({
            name:   record.ProductTitle,
            productID: record.ProductId,
            parentCategory: record.Category,
            subCategory: record.SubCategory,
            imagePath: record.Category + "/" + record.SubCategory + "/" + record.Image,
            productType: record.ProductType,
            color: record.Colour,
            gender: record.Gender,
            price:  record.Price,
            image:  record.Image,
            brand:  record.Brand      
        }))

        const insertData = await Product.insertMany(recordMap)
        res.status(201).json({ message: "Data Inserted Successfully" });
    } catch (error) {
        res.status(500).json({ message: "Data insertion failed", error });
    }
}

export default additionOfProducts

