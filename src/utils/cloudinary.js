import { v2 as cloudinary } from 'cloudinary';
import { assert } from 'console';
import fs from 'fs';



    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME , // Replace with your Cloudinary cloud name
        api_key: process.env.CLOUDINARY_API_KEY, // Replace with your Cloudinary API key
        api_secret: process.env.CLOUDINARY_API_SECRET// Click 'View API Keys' above to copy your API secret
    });
    
   const uploadOnCloudinary = async(localfilePath)=>{
    try{
        if(!localfilePath){
            return null;
        }
      const response = await  cloudinary.uploader.upload
      (localfilePath, {
            resource_type: 'auto'
        } )

        console.log("Image uploaded successfully:", response.url);
        return response;

    }
    catch(error){
        fs.unlinkSync(localfilePath);
        return null

    }
   }

   export {uploadOnCloudinary };