import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import { toast } from 'react-hot-toast'


interface enrolledStudents {
    _id: string
    email: string
    firstName: string
    lastName: string 
}
interface EnrolledService {
    isEnrolled?: boolean

    enrollments?: [],
    failedCourses?: [],
    enrollUser?: (userId: string, courseId: string, payload: { email: string, amount: number }) => Promise<void>
    verifyPayment?: (reference: any) => Promise<void>
    getAllEnrollCourses?: (userId: string) => Promise<void>
    fetchingEnrollments: boolean
    getNoOfEnrollmentForInstructor:(instructorId :string) => Promise<void>
  instructorStudentCount:number
  enrolledStudents : enrolledStudents[]
  
}

export const useEnrollStore = create<EnrolledService>((set) => ({
    enrolledStudents: [],
   instructorStudentCount:0,
    isEnrolled: false,
    fetchingEnrollments: false,
    enrollUser: async (userId: string, courseId: string, { email, amount }: { email: string, amount: number }) => {
        set({ isEnrolled: true });
        console.log( courseId)
        try {
            const response = await axiosInstance.post(`/enroll/enroll-student/${userId}/${courseId}`, {
                email,
                amount

            });
            console.log(response.data);
            const { enrollments, failedCourses, authorizationUrls } = response.data;
            if (authorizationUrls.length > 0) {
                window.location.href = authorizationUrls[0].authorization_url;
            }
            set({ enrollments, failedCourses, isEnrolled: false });
            set({ isEnrolled: false })
            console.log("enrollments", enrollments);
            console.log("failedCourses", failedCourses);
            console.log(response.data)
            // toast.success(response.data);
            // return response.data
        } catch (error: any) {
            console.log(error)
            const message = error?.response?.data?.message ?? error?.message ?? "An unknown error occurred";
            toast.error(message);
            set({ isEnrolled: false });
        }
        finally {
            set({ isEnrolled: false })
        }
    },

    getNoOfEnrollmentForInstructor : async (instructorId:string) => {
        try {
            const response = await axiosInstance.get(`/enroll/student-count-single-instructor/${instructorId}`);
            console.log(response.data.students);
                        
            set((state)=> ({
                ...state,  instructorStudentCount: response.data.numberOfStudents, enrolledStudents:response.data.students 
            }));
        } catch (error) {
            console.log(error)
        }
    },

    getAllEnrollCourses: async (userId: string) => {
        set({ fetchingEnrollments: true })
        try {
            const response = await axiosInstance.get(`/enroll/enrolled-courses/${userId}`)
            console.log("enrollment", response.data);
            set({ enrollments: response.data.courses, fetchingEnrollments: false })

        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error('An unknown error occurred');
            }
            set({ fetchingEnrollments: false })
        }
    },
    verifyPayment: async (reference: any) => {
        try {
            const response = await axiosInstance.get(`enroll/payment-success?reference=${reference}`)
            return response.data
        } catch (error) {
            console.error(error);
            return { message: "Payment verification failed" };
        }
    }
}))