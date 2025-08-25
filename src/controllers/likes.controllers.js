import mongoose from "mongoose";
import { like } from "../models/likes.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Tweet } from "../models/tweets.models.js";
import { User } from "../models/user.models.js";

const toggleVideoLikes = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    if (!videoId) {
        throw new ApiError(400, "videoId is required")
    }
    const existingLike = await like.findOne({
        video: videoId,
        likeBy: req.author._id
    })
    if (existingLike) {
        await existingLike.remove()
        return res.status(200).json(
            new ApiResponse(200, "like removed successfully")
        )
    }
    else {
        const newLike = await like.create({
            video: videoId,
            likeBy: req.author._id
        })
        return res.status(201).json(
            new ApiResponse(201, "like added successfully", newLike)
        )
    }
})
const toggleCommentlikes = asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    if (!commentId) {
        throw new ApiError(400, "commentId is required")
    }
    const existingLike = await like.findOne({
        Comment: commentId,
        likeBy: req.author._id
    })
    if (existingLike) {
        await existingLike.remove()
        return res.status(200).json(
            new ApiResponse(200, "like removed successfully")
        )
    }
    else {
        const newLike = await like.create({
            Comment: commentId,
            likeBy: req.author._id
        })
        return res.status(201).json(
            new ApiResponse(201, "like added successfully", newLike)
        )
    }
})
const toggleTweetlikes = asyncHandler(async (req, res) => {
    const { tweetId } = req.params;
    if (!tweetId) {
        throw new ApiError(400, "tweetId is required")
    }
    const existingLike = await like.findOne({
        tweet: tweetId,
        likeBy: req.author._Id
    })
    if (existingLike) {
        await existingLike.remove()
        return res.status(200).json(
            new ApiResponse(200, "like removed successfully")
        )
    }
    else {
        const newLike = await like.create({
            tweet: tweetId,
            likeBy: req.author._id
        })
        return res.status(201).json(
            new ApiResponse(201, "like added successfully", newLike)
        )
    }
})

const getVideoLikes = asyncHandler(async (req, res) => {
    const likedVideosByUser = await like.aggregate([
        { $match: { likeBy: mongoose.Types.ObjectId(req.author._id) } },
        {
            $lookup: {
                from: "videos",
                localField: "video",
                foreignField: "_id",
                as: "videoDetails",
                pipeline: [{
                    $lookup: {
                        from: "users",
                        localField: "owner",
                        foreignField: "_id",
                        as: "ownerDetails",
                        pipeline: [
                            { $project: { fullName: 1, avatar: 1, username: 1 } }
                        ]
                    }
                },
                {$unwind:{path:"$ownerDetails",preserveNullAndEmptyArrays:true}},
                {
                    $project: {
                        title: 1,
                        description: 1,
                        videoUrl: 1,
                        owner: "$ownerDetails",
                        createdAt: 1,
                        updatedAt: 1
                    }
                }

                ]
            }
        },
        { $unwind: "$videoDetails" },
        {
            $project: {
                _id: 0,
                video: "$videoDetails"
            }
        }

    ])
})
    return res.status(200).json(
        new ApiResponse(200, "Liked videos fetched successfully", likedVideosByUser)
    )
export {
    toggleVideoLikes,
    toggleCommentlikes,
    toggleTweetlikes,
    getVideoLikes
}