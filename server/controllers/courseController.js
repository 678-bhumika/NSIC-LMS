import Course from "../models/Course.js";

export const getAllCourse = async(req,res)=>{
    try{
const courses = await Course.find({ isPublished: true })
  .select('-courseContent -enrolledLearners')
  .populate({ path: 'instructor' })

          res.json({success: true, courses})
    } catch(error){
          res.json({success: false, message: error.message}) 
    }
}

export const getCourseId = async(req,res)=>{
    const {id} = req.params
    try { 
        const courseData = await Course.findById(id).populate({path: 'instructor'})
        courseData.courseContent.forEach(chapter =>{
            chapter.chapterContent.forEach(lecture=>{
                if(!lecture.isPreviewFree){
                    lecture.lectureUrl = "";
                }
            })
        })
        res.json({success:true, courseData})

    } catch (error) {
        res.json({success:false, message:error.message})
    }
}
