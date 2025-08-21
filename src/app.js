import express from 'express';
import cors from "cors"
import cokieParser from "cookie-parser";    

const app = express();
app.use(cors({
    origin:process.env.CORS_ORIGIN ,
    credentials:true,
}))
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extentded:true,limit:"16kb"}))
app.use(express.static("pulic"))
app.use(cookieParser())

export {app}