import { clerkClient } from "@clerk/express";

export const protectInstructor = async(req, res, next)=>{
    try{
         const userId = "user_2xgpzpbfybiTOZsPnL7DMpyOPEi"
         const response = await clerkClient.users.getUser(userId)

         if(response.publicMetadata.role !== 'instructor'){
            return res.json({success: false, message:'Unauthorized Access'})
         }
         next()
    } catch (error){
        res.json({success: false, message: error.message})
    }
}