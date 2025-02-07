import { create } from 'zustand';
import { axiosInstance } from '../lib/axios'
import axios from 'axios';
import toast from 'react-hot-toast';
interface Course {
    _id: string
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
    isFetchingData: boolean
    isFetchingSingleData: boolean
    getCourses: () => Promise<void>
    courseContainer: Course[]
    instructorCoursesContainer: Course[] | null
    singleCourseContainer: Course | null
    getCourse: (couseId: string | undefined) => Promise<void>
    creatingCourse: boolean
    createCourses: (formData: Course, userId: string) => Promise<void>
    isFetchingInstructorCourses: boolean
    getInstructorCourses: (userId: string) => Promise<void>
    isDeletingACourse: boolean
    deleteACourse: (courseId: string | null, userId: string) => Promise<void>
    courseCarts: Course[]
    isFetchingCarts: boolean
    getCarts: (userId: string) => Promise<void>
}
export const useCourseStore = create<CourseState>((set) => ({
    courseCarts: [],
    courseContainer: [],
    singleCourseContainer: null,
    isFetchingData: false,
    isFetchingSingleData: false,
    creatingCourse: false,
    instructorCoursesContainer: null,
    isFetchingInstructorCourses: false,
    isDeletingACourse: false,
    isFetchingCarts: false,
    createCourses: async (formData: Course, userId: string) => {
        try {
            const response = await axiosInstance.post(`/course/upload-course/${userId}`, formData);
            set((state) => ({
                instructorCoursesContainer: state.instructorCoursesContainer ? [...state.instructorCoursesContainer, formData] : [formData]
            }))
            set({ creatingCourse: true });
            toast.success(response.data.message);
        } catch (err) {
            if (err instanceof Error) {
                console.log(err)
                toast.error((err as any).response.data.message);
            } else {
                toast.error("Something went wrong")
            }

        }
    },
    getCourses: async () => {
        set({ isFetchingData: true })
        try {
            const resonse = await axiosInstance.get('/course/get-courses');
            console.log(resonse.data.data);
            set({ courseContainer: resonse.data.data })
            set({ isFetchingData: false })
        } catch (err) {
            console.log(err);
            set({ isFetchingData: false })
        }

    },

    getInstructorCourses: async (userId: string) => {
        set({ isFetchingInstructorCourses: true });
        try {
            const response = await axiosInstance.get(`/course/get-instructor-courses/${userId}`)
            console.log(response.data);
            set({ instructorCoursesContainer: response.data.courses });
            set({ isFetchingInstructorCourses: false });
        } catch (error) {
            set({ isFetchingInstructorCourses: false })
        }
    },
    getCourse: async (couseId: string | undefined) => {
        set({ isFetchingSingleData: true })
        try {
            const response = await axiosInstance.get(`/course/get-single-course/${couseId}`);
            console.log(response);
            set({ singleCourseContainer: response.data.data });
            set({ isFetchingSingleData: false });
        } catch (error) {
            console.log(error);
            set({ isFetchingSingleData: false });
        }


    },

    deleteACourse: async (courseId: string | null, userId: string) => {
        try {
            const response = await axiosInstance.delete(`/course/delete-course/${courseId}/${userId}`);
            set({ isDeletingACourse: true });
            set((state) => ({
                instructorCoursesContainer: state.instructorCoursesContainer ? state.instructorCoursesContainer?.filter(c => c._id !== courseId) : null
            }))
            toast.success(response.data.message);
        } catch (err) {
            if (err instanceof Error) {
                console.log(err)
                toast.error((err as any).response.data.message);
            } else {
                toast.error("Something went wrong")
            }

        }

    },

    //Cart Functionality Here

    getCarts: async (userId: string) => {
        set({ isFetchingCarts: true });
        try {
            const response = await axiosInstance.get(`/carts/${userId}`);
            console.log(response)
            set({ courseCarts: response.data.carts });
        } catch (err) {
            if (err instanceof Error) {
                console.log(err)
                toast.error((err as any).response.data.message);
            } else {
                toast.error("Something went wrong")
            }

        }
    }

}))