import {create} from 'zustand';
import {axiosInstance} from '../lib/axios'

interface Course {
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
    title: string;
    updatedAt: string;
    videos: any[];
    __v: number;
  }

interface CourseState {
    isFetchingData:boolean
    getCourses:()=> Promise<void>
    courseContainer:  Course[]
}
export const useCourseStore  = create<CourseState>((set)=>({
    courseContainer:[],
    isFetchingData:false,
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

    }
}))