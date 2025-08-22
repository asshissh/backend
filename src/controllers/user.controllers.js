import mongoose from 'mongoose';
import { asyncHandler } from '../utils/asysncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import {User}  from '../models/user.models.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const  registerUser = asyncHandler(async(req,res)=>{

    //get user details from frontend
    //validation-not empty
    // check if user already exists
    //cheak if images ,check for avatar
    //upload them to cloudinary,avtar
    //creat user object =create db entry
    // remove password and refresh token field from response
    //return response

   const {fullName,email,username,password}= req.body 
   console.log("email",email);

   if([fullName,email,username,password].some((field)=>field?.trim() ==="")){
    throw new ApiError(400,"All fields are required")
   }

   const existedUser=User.findOne({
    $or: [{email},{username}]
   })

   if(existedUser){
    throw new ApiError(409,"User with already exists")
   }

  const avatarLocalPath= req.files?.avatar[0]?.path;
 const converImageLocalPath= req.files?.coverPhoto[0]?.path;          //if cover photo is not uploaded, it will be undefined

 if(!avatarLocalPath){
    throw new ApiError(400,"Avatar is required")
 }

 const avatar = await uploadOnCloudinary(avatarLocalPath) 
 const coverImange = await uploadOnCloudinary(converImageLocalPath)

 if(!avatar){
    throw new ApiError(500,"Failed to upload avatar")
 }

 const user = await User.create({
    fullName,
    avtar:avatar.url,
    coverImange:coverImange?.url || "",
    email,
    password,
    username :username.tolowerCase()
  })
  const createdUser=await User.findByIdAndUpdate(user._id).select(
    "-password -refreshToken"  //excluding password and refreshToken from response
  )

  if(!createdUser){
    throw new ApiError(500,"bagwan jane error")
  }

  return res.status(201).json(
    new ApiResponse(200,createdUser,"Hogya guru registration")
  )

})

export {registerUser};