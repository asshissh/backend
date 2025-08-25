import mongoose,{Schema} from "mongoose"


const movieSchema = new Schema({
    title :{
        type:String,
        required:true,
    
    },
    description:{
        type:String,
        required:true,
    
    },
    releaseDate:{
        type:Date,
        required:true,
    
    },
    genre:{
        type:[String],
        required:true,
    
    },
    director:{
        type:String,
        required:true,
    
    },
    duration:{
        type:Number,
        required:true,
    
    },
    rating:{
        type:Number,
        min:0,
        max:10,
    
    },
    movieUrl:{
        type:String,
        required:true,
    
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    movieThumbnail:{
        type:String,
        required:true,
    }
}, {timestamps:true})

export const Movie = mongoose.model("Movie",movieSchema)