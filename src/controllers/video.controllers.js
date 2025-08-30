import mongoose from "mongoose"
import { Video } from "../models/video.models.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const createVideo = asyncHandler(async(req,res)=>{
    let{
        page=1,limit=10,
        sortby="createdAt",
        userId,
        search_fields,
        search_values,
        sortType="desc"
    } = req.query

    let match = {};
    if(userId){
        match.owner = new mongoose.Types.ObjectId(userId)
    }
    if(search_fields && search_values){
        match[search_fields] = {
            $regex:search_values,
            $options:"i"
        }
    }
})