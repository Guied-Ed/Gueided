import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

interface AuthState {
    authUser: null | string
    isLoggingIn: boolean,
    isSigningUp: boolean,
    isCheckingAuth: boolean,
    isVerifyingEmail: boolean,
    checkAuth: () => Promise<void>,
    signIn: (formData: object) => Promise<void>,
    signUp: (formData: object) => Promise<void>,
    logout: () => Promise<void>,
    result: boolean,
    editingProfile: boolean
    editProfile: (userId: string, formData: object) => Promise<void>
    userProfileData: null | string
    verifyEmail: (code: object) => Promise<void>
    showForgotPasswordText: boolean
    forgotPassword: (email: string) => Promise<boolean>
    sendingEmailToUser: boolean
    resetPassword: (password: string, token: string) => Promise<boolean>
    resetingPassword:boolean
}


export const useAuthStore = create<AuthState>((set) => ({
    resetingPassword: false,
    sendingEmailToUser: false,
    showForgotPasswordText: false,
    authUser: null,
    isLoggingIn: false,
    isSigningUp: false,
    isCheckingAuth: true,
    result: false,
    editingProfile: false,
    userProfileData: null,
    isVerifyingEmail: false,
    checkAuth: async () => {
        try {
            const response = await axiosInstance.get('/check-auth');
            set({ authUser: response.data });

        } catch (error) {
            console.log(error);
            set({ authUser: null })
        } finally {
            set({ isCheckingAuth: false })
        }
    },
    signUp: async (formData: object) => {
        set({ isSigningUp: true });
        try {
            const response = await axiosInstance.post('/signup', formData)
            set({ authUser: response.data })
            window.location.href = "/verify-email";
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

    verifyEmail: async (code: object) => {
        set({ isVerifyingEmail: true });
        try {
            console.log(code)
            const response = await axiosInstance.post('/verify-email', code);
            console.log(response.data);

            window.location.href = "/";
            set({ isVerifyingEmail: false });

        } catch (error) {
            if (error instanceof Error) {
                toast.error((error as any).response.data.message);
            }
        }
        finally {
            set({ isVerifyingEmail: false })
        }

    },


    signIn: async (formData: object) => {
        set({ isLoggingIn: true, showForgotPasswordText: false })
        try {
            const response = await axiosInstance.post('/login', formData);
            set({ authUser: response.data })
            toast.success("Successfully logged in")
            set({ result: true, showForgotPasswordText: false });


        } catch (err) {
            set({ isLoggingIn: false })
            if (err instanceof Error) {
                toast.error((err as any).response.data.message);
            } else {
                toast.error("Something went wrong")
            }
            set({ result: false, showForgotPasswordText: true })

        } finally {
            set({ isLoggingIn: false })
        }
    },

    forgotPassword: async (email: string) => {
        set({ sendingEmailToUser: true })
        try {
            const response = await axiosInstance.post("/forgot-password", { email });
            console.log(response)
            set({ sendingEmailToUser: false })
            toast.success("Email sent successfully, please check your inbox");
            set({ showForgotPasswordText: false });
            return true
        } catch (error) {
            set({ sendingEmailToUser: false });
            set({ showForgotPasswordText: true });
            if (error instanceof Error) {
                console.log(error)
                toast.error((error as any).response.data.message);
            }
            return false
        } finally {
            set({ sendingEmailToUser: false })
        }
    },

    resetPassword: async (password:string, token:string) => {
        set({resetingPassword: true})
        try {
            const response = await axiosInstance.post(`/reset-password/${token}`, {password});
            set({resetingPassword:false});
            console.log(response.data);
            return true
        } catch (error) {
            console.log(error);
            set({resetingPassword:false});
            return false
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/logout");

            set({ authUser: null });
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
    },
    editProfile: async (userId: string, formData: object) => {
        set({ editingProfile: true })
        try {
            const response = await axiosInstance.put(`/edit-profile/${userId}`, formData);
            set({ editingProfile: false })
            set({ userProfileData: response.data });
            toast.success(response.data.message);
        } catch (error) {
            set({ editingProfile: false })
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("Unexpected Error Occured")
            }
        }
    }
}))