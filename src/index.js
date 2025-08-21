import dotenv from 'dotenv';
dotenv.config();

import connectDB from "./db/index.js";
import express from "express";
const app = express();

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`\nServer is running on port ${process.env.PORT}`)
    })
})
.catch((error)=>{
    console.log("Mongo DB connection failed!!!!",error)
})





















































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