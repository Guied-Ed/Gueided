import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';


interface AuthState {
    authUser: null | string
    isLoggingIn: boolean,
    isSigningUp: boolean,
    isCheckingAuth: boolean,
    checkAuth: () => Promise<void>,
    signIn: (formData: object) => Promise<void>,
    signUp: (formData: object) => Promise<void>,
    logout:()=> Promise<void>,
    result:boolean
}


export const useAuthStore = create<AuthState>((set) => ({
    authUser: null,
    isLoggingIn: false,
    isSigningUp: false,
    isCheckingAuth: true,
    result:false,
    checkAuth: async () => {
        try {
            const response = await axiosInstance.get('/check-auth');
            set({ authUser: response.data });

        } catch (error) {
            console.log(error);
            set({ authUser: null })
        }finally{
            set({isCheckingAuth:false})
        }
    },
    signUp: async (formData: object) => {
        set({ isSigningUp: true });
        try {
            const response = await axiosInstance.post('/signup', formData)
            set({ authUser: response.data})
            toast.success("Account created successfully");

        } catch (error) {
            set({ isSigningUp: false })
            if (error instanceof Error) {
                toast.error((error as any).response.data.message);
            } else {
                toast.error('An unknown error occurred');
            }
            console.log(error)
        } finally {
            set({ isSigningUp: false })
        }
    },


    signIn: async (formData: object) => {
        set({ isLoggingIn: true })
        try {
            const response = await axiosInstance.post('/login', formData);
            set({ authUser: response.data })
            toast.success("Successfully logged in")
            set({result:true});

        } catch (err) {
            set({ isLoggingIn: false })
            if (err instanceof Error) {
                toast.error((err as any).response.data.message);
            } else {
                toast.error("Something went wrong")
            }
            set({result:false})
        } finally {
            set({ isLoggingIn: false })
        }
    },
    logout:async()=>{
        try{
             await axiosInstance.post("/logout");
            set({authUser:null});
            toast.success("Logged out successfully");
        } catch (err) {
          
            if (err instanceof Error) {
                toast.error(err.message)
            } else {
                toast.error("Something went wrong")
            }
        } finally {
            set({ isLoggingIn: false })
        }
    }
}))