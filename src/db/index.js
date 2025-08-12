import mongoose from "mongoose";
import { db_name } from "../constants.js";

export const connectDB = async()=>{

    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${db_name}`)
        console.log(`Database connected successfully!! Host name: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.error('mongodb connection error: ',error)
        process.exit(1)
    }

}