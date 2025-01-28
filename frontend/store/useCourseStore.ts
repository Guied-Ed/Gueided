import {create} from 'zustand';
import {axiosInstance} from '../lib/axios'
import axios from 'axios';

interface Course {
    _id:string
    category: string;
    createdAt: string;
    description: string;
    duration: number;
    instructor: {
      _id: string;
      firstName: string;
      lastName: string;
      email: string;
    };
    level: string;
    price: number;
    ratings: any[];
    thumbnail: string;
    tittle: string;
    updatedAt: string;
    videos: any[];
    __v: number;
  }

interface CourseState {
    isFetchingData:boolean
    isFetchingSingleData:boolean 
    getCourses:()=> Promise<void>
    courseContainer:  Course[]
    singleCourseContainer:Course | null
    getCourse:(couseId:string | undefined) => Promise<void>
}
export const useCourseStore  = create<CourseState>((set)=>({
    courseContainer:[],
    singleCourseContainer:null,
    isFetchingData:false,
    isFetchingSingleData:false,
    getCourses:async () =>{
        set({isFetchingData:true})
        try{
            const resonse = await axiosInstance.get('/course/get-courses');
            console.log(resonse.data.data);
            set({courseContainer:resonse.data.data})
            set({isFetchingData:false})
        }catch(err){
            console.log(err);
            set({isFetchingData:false})
        }

    },
    getCourse:async(couseId:string | undefined) =>{
        set({isFetchingSingleData:true})
        try {
            const response = await axiosInstance.get(`/course/get-single-course/${couseId}`);
            console.log(response);
            set({singleCourseContainer:response.data.data});
            set({isFetchingSingleData:false});
        } catch (error) {
            console.log(error);
            set({isFetchingSingleData:false});
        }
     

    }
}))