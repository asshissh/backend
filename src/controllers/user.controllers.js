import mongoose from 'mongoose';
import { asyncHandler } from '../utils/asysncHandler.js';


const  registerUser = asyncHandler(async(req,res)=>{

    res.status(200).json({
        message:"ok"
    })
})

export {registerUser};