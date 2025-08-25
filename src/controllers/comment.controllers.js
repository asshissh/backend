import mongoose from "mongoose"
import { Comment } from "../models/comment.models.js"
import { Video } from "../models/video.models.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"


const getVideosComment = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    if (!videoId) {
        throw new ApiError(400, "videoId is required")
    }
    const aggregate = Video.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(videoId)
            }
        },
        {
            $lookup: {
                from: "comments",
                Localfield: "_id",
                foreignField: "video",
                as: "commentss"
            }
        },
        {
            $unwind: "$commentsOnVideo"
        }
        ,{
            $replaceRoot:{newRoot:"$commentsOnVideo"}
        }

    ])
    const comments = await Video.aggregatePaginate(aggregate, { page, limit })
    return res.status(200).json(
        new ApiResponse(200, "Comments fetched successfully", comments)
    )

})
const addComment = asyncHandler(async(req,res)=>{
    const {videoId} = req.params
    const {text} = req.body
    if(!videoId){
        throw new ApiError(400,"video IId is required")
    }
    if(!text){
        throw new ApiError(400,"text is required")
    }
    const comment  = await Comment.create({
        video:videoId,
        content,
        owner:req.author._id
    })
    return res.status(201).json(
        new ApiResponse(201,"Comment added successfully",comment)
    )
})
 const updateComment = asyncHandler(async(req,res)=>{
    const {commentId} = req.params
    const {content} = req.body
    if(!commentId){
        throw new ApiError(400,"commentId is required")
    }
    if(!content){
        throw new ApiError(400,"content is required")
    }
    const commentUpdation = await Comment.findByIdAndUpdate(
        // {_id:commentId,owner:req.author._id},
        // {content},
        // {new:true}
        commentId,{
            $set:{
                content
            }
        },
        {new:true}
    
        
    );
    return res.status(200).json(
        new ApiResponse(200,"Comment updated successfully",commentUpdation)
    )
 })
 const deleteComment = asyncHandler(async(req,res)=>{
    const {commentId} = req.params
    if(!commentId){
        throw new ApiError(400,"commentId is required")
    }
    const comment = await Comment.findByIdAndDelete(commentId)
    return res.status(200).json(
        new ApiResponse(200,"Comment deleted successfully",comment
    ))
 })
export {
    getVideosComment,
    addComment,
    updateComment,
    deleteComment   
}


