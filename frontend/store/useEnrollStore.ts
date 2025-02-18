import {create} from 'zustand';
import {axiosInstance} from '../lib/axios';
import {toast} from 'react-hot-toast'
interface EnrolledService{
    isEnrolled?:boolean
    authUrl?:string[]
    enrollUser?:(userId:string, courseId:string, payload: {email: string, amount: number}) => Promise<void>
}

export const useEnrollStore = create<EnrolledService>((set)=>({
    enrollUser:async(userId:string, courseId:string, {email, amount}: {email: string, amount: number})=>{
        set({isEnrolled:false})
        try {
            const response = await axiosInstance.post(`/enroll/enroll-student/${userId}/${courseId}`, {
                email,
                amount

            });
            console.log(response.data);
            set({authUrl:response.data.authorizationUrls.length > 0 ? response.data.authorizationUrls : null})
            // set({isEnrolled:true});
            // toast.success(response.data);
            
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error('An unknown error occurred');
            }
        }
    }
}))