import { clerkClient} from "@clerk/express"
import {v2 as cloudinary} from 'cloudinary'
import Course from "../models/Course.js"
import Purchase from "../models/Purchase.js"; 
import User from "../models/User.js";

export const updateRoleToInstructor = async (req,res)=>{
    try{
        const userId = req.auth.userId
        await clerkClient.users.updateUserMetadata(userId, {
            publicMetadata:{
                role: 'instructor',
            }
        })
        res.json({ success: true, message: 'You can publish a course now'})
    }catch(error){
         res.json({ success : false, message: error.message })
    }

}


