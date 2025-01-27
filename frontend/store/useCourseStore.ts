import {create} from 'zustand';
import {axiosInstance} from '../lib/axios'
export const useCourseStore  = create((set)=>({
    isFetchingData:false,
    getCourses:async () =>{
        set({isFetchingData:true})
        try{
            const resonse = await axiosInstance.get('/course/get-courses');
            console.log(resonse);
        }catch(err){
            
        }

    }
}))