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

export const addCourse = async (req,res)=>{
    try{
        const {courseData} = req.body
        const imageFile = req.file
        const instructorId = req.auth.userId

         if(!imageFile){
            return res.json({success : false, message: 'Thumbnail Not Attached'})
         }

         const parsedCourseData = await JSON.parse(courseData)
         parsedCourseData.educator = instructorId
         const newCourse = await Course.create(parsedCourseData)
         const imageUpload=await cloudinary.uploader.upload(imageFile.path)
         newCourse.courseThumbnail=imageUpload.secure_url
         await newCourse.save()
         res.json({success: true, message:'Course Added'})
    } catch(error){
         res.json({success: false, message: error.message})
    }
}

export const getInstructorCourses = async (req,res)=>{
    try{
        const instructor = req.auth.userId;
        const courses = await Course.find({instructor})
        res.json({success : true, courses})
    }catch(error){
        res.json({success: false, message: error.message})
    }
}

export const instructorDashboardData = async(req,res)=>{
  try{
    const instructor = req.auth.userId;

    const courses = await Course.find({instructor});
    const totalCourses = courses.length;
    const courseIds = courses.map(course => course._id);

    const purchases = await Purchase.find({
      courseId: { $in: courseIds },
      status: 'completed'
    });

    const totalEarnings = purchases.reduce((sum, purchase) => sum + purchase.amount, 0);
    const totalEnrolments = purchases.length;
    const populatedPurchases = await Purchase.find({
      courseId: { $in: courseIds },
      status: 'completed'
    }).populate('userId', 'name imageUrl').populate('courseId', 'courseTitle');

    const enrolledLearnersData = populatedPurchases.map(purchase => ({
      student: purchase.userId,
      courseTitle: purchase.courseId.courseTitle
    }));

    res.json({
      success: true,
      dashboardData: {
        totalCourses,
        totalEarnings,
        totalEnrolments,
        enrolledLearnersData
      }
    });
  } catch(error){
    res.json({success: false, message: error.message});
  }
};

export const getEnrolledLearnersData = async(req,res)=>{
    try{
        const instructor = req.auth.userId;
        const courses = await Course.find({instructor});
        const courseIds = courses.map(course=> course._id);

        const purchases = await Purchase.find({
            courseId:{$in: courseIds},
            status:'completed'
        }).populate('userId','name imageUrl').populate('courseId','courseTitle')
        const enrolledLearners = purchases.map(purchase =>({
            learner: purchase.userId,
            courseTitle:purchase.courseId.courseTitle,
            purchaseData:purchase.createdAt
        }));
        res.json({success:true, enrolledLearners})
    } catch(error){
          res.json({success: false, message: error.message});
    }
}


