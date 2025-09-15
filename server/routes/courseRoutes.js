import express from 'express'
import { getAllCourse, getCourseId } from '../controllers/courseController.js'

const courseRouter = express.Router()

courseRouter.get('/all',getAllCourse)
courseRouter.get('/:id',getCourseId)

courseRouter.get('/test', (req, res) => {
  res.json({ message: "Courses router working " })
})


export default courseRouter;