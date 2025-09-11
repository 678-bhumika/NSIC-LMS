import express from 'express'
import { addCourse, instructorDashboardData, getInstructorCourses, getEnrolledLearnersData, updateRoleToInstructor } from '../controllers/instructorController.js';
import upload from '../configs/multer.js';
import { protectInstructor } from '../middlewares/authMiddleware.js';
const instructorRouter = express.Router()

instructorRouter.get('/update-role',updateRoleToInstructor)
instructorRouter.post('/add-course',upload.single('image'),protectInstructor, addCourse)
instructorRouter.get('/courses',protectInstructor,getInstructorCourses)
instructorRouter.get('/dashboard',protectInstructor,instructorDashboardData)
instructorRouter.get('/enrolled-learners',protectInstructor,getEnrolledLearnersData)

export default instructorRouter