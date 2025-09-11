import React from 'react'
import { Route, Routes, useMatch} from 'react-router-dom'
import Home from './pages/learner/Home'
import CoursesList from './pages/learner/CoursesList'
import CourseDetails from './pages/learner/CourseDetails'
import MyEnrollments from './pages/learner/MyEnrollments'
import Player from './pages/learner/Player'
import Loading from './components/learner/Loading'
import Instructor from './pages/instructor/Instructor'
import Dashboard from './pages/instructor/Dashboard'
import AddCourse from './pages/instructor/AddCourse'
import MyCourses from './pages/instructor/MyCourses'
import LearnersEnrolled from './pages/instructor/LearnersEnrolled'
import Navbar from './components/learner/Navbar'
import "quill/dist/quill.snow.css";
import { ToastContainer} from 'react-toastify';
import ScrollToTop from './components/learner/ScrollToTop'

const App=()=>{

  const isInstructorRoute=useMatch('/instructor/*')

  return(
      <div className="text-default min-h-screen bg-white">
      <ToastContainer/>
      {!isInstructorRoute && <Navbar/>}
      <ScrollToTop/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/course-list' element={<CoursesList/>} />
        <Route path='/course-list/:input' element={<CoursesList/>} />
        <Route path='/course/:id' element={<CourseDetails/>} />
        <Route path='/my-enrollments' element={<MyEnrollments/>} />
        <Route path='/player/:courseId' element={<Player/>} />
        <Route path='/loading/:path' element={<Loading/>} />
        <Route path='/instructor' element={<Instructor/>}>
            <Route path='/instructor' element={<Dashboard/>}/>
            <Route path='add-course' element={<AddCourse/>}/>
            <Route path='my-courses' element={<MyCourses/>}/>
            <Route path='learner-enrolled' element={<LearnersEnrolled/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App