import mongoose from "mongoose";
import { Tweet } from "../models/tweets.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { like } from "../models/likes.models.js";
import { Subscription } from "../models/subscription.model.js";
import { User } from "../models/user.models.js";

const createTweet = asyncHandler(async(req,res)=>{
    const {content} = req.body
    if(!content){
        throw new ApiError(400,"content is required")
    }
    const tweet = await Tweet.create({
        content:content,
        owner:req.author._id
    })
    if(!tweet){
        throw new ApiError(500,"tweet not created")
    }
    return res.status(201).json(
        new ApiResponse(201,"tweet created successfully",tweet)
    )
})
const getUserTweets = asyncHandler(async(req,res)=>{
    const{userId} = req.params
    if(!userId){
        throw new ApiError(400,"userId is required")
    }
    const userTweets = await Tweet.find({owner:userId})
    if(!userTweets){
        throw new ApiError(404,"No tweets found for this user")
    }
    return res.status(200).json(
        new ApiResponse(200,"User tweets fetched successfully",userTweets)
    )
})
const updateTweet = asyncHandler(async(req,res)=>{
    const {tweetId} = req.params
    if(!tweetId){
        throw new ApiError(400,"tweetId is required")
    }
    const {content} = req.body
    if(!content){
        throw new ApiError(400,"content is required")
    }
    const Updatetweet = await Tweet.findByIdAndUpdate(tweetId,
        {content:content},
        {new:true}
    )
    if(!tweetId){
        throw new ApiError(404,"tweet not found")
    }
    return res.status(200).json
    ( new ApiResponse(200,"tweet updated successfully",Updatetweet))
})
const deleteTweet = asyncHandler(async(req,res)=>{
    const { tweetId} = req.params
    if(!tweetId){
        throw new ApiError(400,"tweetId is required")
    }
    const deleteTweet = await Tweet.findByIdAndDelete(tweetId)
    if(!deleteTweet){
        throw new ApiError(404,"tweet not found")
    }
    return res.status(200).json(
        new ApiResponse(200,"tweet deleted successfully",deleteTweet)
    )
})
export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}