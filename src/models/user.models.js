import mongoose, { Schema } from "mongoose"
import jwt from "jsonwebtoken"     //jsonwebtoken is used for creating and verifying tokens
import bcrypt from "bcryptjs"    //bcryptjs is used for hashing passwords

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    watchHistory: [{
        type: Schema.Types.ObjectId,
        ref: 'Video'
    }],
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avatar: {
        type: String, //cloudanary url
        required: true

    },
    coverImange: {
        type: String,

    },
    password: {
        type: String,
        requird:[ true,"Password is required"],
       
    },
    refreshToken: {
        type: String,
        default: ""
    }



},
    {
        timestamps: true,
    }
)
userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        return next()  //if password is not modified, skip hashing
    }
    this.password = await bcrypt.hash(this.password,10)     //encrypting password
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)  //comparing password with hashed password
}
userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id :this._id,
        username: this.username,
        email: this.email,
        fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "1d"  //default expiry is 1 day
    })
}
userSchema.methods.generaterefreshToken = function(){
    return jwt.sign({
        _id :this._id,
        username: this.username,
        email: this.email,
        fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "1d"  //default expiry is 1 day
    })
}


export const User = mongoose.model("User", userSchema)
