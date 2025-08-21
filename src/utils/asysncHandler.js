const asyncHandler=(fn)=>async(req,res,next)=>{
    try{
        await fn(req,res,next);

    }catch(error){
        res.status(err.code || 500).jsom({
            success:false,
            message:error.messag
        })
    }
}
export default asyncHandler;


