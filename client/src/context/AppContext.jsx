import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";
import {useAuth, useUser} from "@clerk/clerk-react";
import axios from 'axios'
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = (props)=> {

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const currency = import.meta.env.VITE_CURRENCY
    const navigate = useNavigate()

    const {getToken} = useAuth()
    const {user} = useUser()

    const [allCourses, setAllCourses] = useState([])
    const [isInstructor, setIsInstructor] = useState(false)
    const [enrolledCourses, setEnrolledCourses] = useState([])
    const [userData, setUserData] = useState(null)

    const api = async (method, url, body = {}) => {
    try {
      const token = await getToken();
      const res = await axios({
        method,
        url: backendUrl + url,
        data: body,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      throw error;
    }
  };

    const fetchAllCourses = async()=> {
        try{
            const data = await api('get', '/api/courses/all')
            console.log("fetchAllCourses response:", data);
            if(data.success){
                setAllCourses(data.courses)
            }else{
                toast.error(data.message)
            }
        }catch(error){
            toast.error(error.message)
        }
    }

    const fetchUserData = async()=> {

        if(user.publicMetadata.role === 'instructor' ){
            setIsInstructor(true)
        }

        try{
            const data= await api('get', '/api/user/data');
            console.log("fetchUserData response:", data);

            if(data.success){
                setUserData(data.user)
            }else{
                toast.error(data.message)
            }
        }catch(error){
            toast.error(error.message)
        }
    }

    const calculateRating = (course)=> {
        if(course.courseRatings.length === 0){
            return 0;
        }
        const total = course.courseRatings.reduce((acc, r) => acc + r.rating, 0);
        return Math.floor(total / course.courseRatings.length);
    }

    const calculateChapterTime = (chapter)=> {
        let time=0
        chapter.chapterContent.map((lecture)=> time += lecture.lectureDuration)
        return humanizeDuration(time * 60 * 1000, {units: ["h", "m"]})
    }

    const calculateCourseDuration = (course)=> {
        let time = 0
        course.courseContent.map((chapter)=>( chapter.chapterContent.map((lecture)=> time += lecture.lectureDuration)))
        return humanizeDuration(time * 60 * 1000, {units: ["h", "m"]})
    }

    const calculateNoOfLectures=(course)=> {
        return course.courseContent.reduce(
            (acc,ch)=> acc + (Array.isArray(ch.chapterContent) ? ch.chapterContent.length : 0), 0
        );
    };

    const fetchUserEnrolledCourses = async ()=> {
        try{
            const data = await api('get', '/api/user/enrolled-courses')
            console.log("fetchUserEnrolledCourses response:", data);

            if(data.success){
                setEnrolledCourses(data.enrolledCourses.reverse())
            }else{
                toast.error(data.message)
            }
        }catch(error){
            toast.error(error.message)
        }
    }

    useEffect(()=> {
        fetchAllCourses()
        
    },[])

    useEffect(()=>{
        if(user){ 
            fetchUserData()
            fetchUserEnrolledCourses()
        }
       },[user])

    const value ={
        currency, allCourses, navigate, calculateRating, isInstructor, setIsInstructor, calculateNoOfLectures, calculateCourseDuration, calculateChapterTime, enrolledCourses, fetchUserEnrolledCourses, backendUrl, userData, setUserData, getToken, fetchAllCourses, api
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};