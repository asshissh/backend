import mongoose,{Schema} from "mongoose";

const likeSchema =new Schema({
    video:{
        type:Schema.Types.ObjectId,
        ref:"Video",

    },
   movie:{
    type:Schema.Types.ObjectId,
    ref:"Movie",

   },
   Comment:{
    type:Schema.Types.ObjectId,
    ref:"Comment",
   },
    tweet:{
        type:Schema.Types.ObjectId,
        ref:"Tweet",
        required:true
    },
    likeBy:{
        type:Schema.Types.ObjectId,
        ref :" User"
   }
    

}, {
    timestamps:true
})

export const like = mongoose.model("like",likeSchema)