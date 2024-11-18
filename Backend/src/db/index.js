import mongoose from "mongoose"

const connectDB = async () => {
    try {
        const response = await mongoose.connect(process.env.MONGO_URI)
        console.log(`\nMongoDB Connected!! DB Host: ${response.connection.host}`)
    } catch (error) {
        console.log("MongoDB Error", error)
        process.exit(1)
    }
}

export default connectDB
