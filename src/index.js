import dotenv from 'dotenv';
dotenv.config();

import connectDB from "./db/index.js";

connectDB()





















































/*
(async () => {
    try {
     mongoose.connnect(p`${process.env.MONGODB_URI}/${DB_NAME}`)             //IFE IS USED
    } catch (error) {
        console.error("Error connection to :", error)
        throw error
    }
}) ()       

*/