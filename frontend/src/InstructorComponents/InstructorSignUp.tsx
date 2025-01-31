
import React, { useState } from 'react'
import InstructorBanner from '../assets/Teacher-removebg-preview.png'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Loader, Lock, Mail, MessageSquare, User , X } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';



interface ChangeEvent {
    target:{
        name:string
        value:string
    }
}

interface showModal {
    setShowModal:(value:boolean)=> void;
}
const InstructorSignUp:React.FC<showModal> = ({setShowModal}) => {


    const navigate = useNavigate();

    const {  isSigningUp,signIn ,  signUp } = useAuthStore();

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "",firstName:"",lastName:"",role:"instructor", confirmPassword: "",});
  
    const handleChange = (evt:ChangeEvent) =>{
        const {name,value} = evt.target;
        setFormData((prev)=>{
            return {
                ...prev,[name]:value
            }
        })
    }

    // interface FormData {
    //     email: string;
    //     password: string;
    //     fullName: string;
    //     role: string;
    //     confirmPassword: string;
    // }

    interface SubmitEvent {
        preventDefault: () => void;
    }

    const validateUser = () => {
        if(!formData.firstName) return toast.error("firstName is required");
        if(!formData.lastName) return toast.error("lastName is required");
        if(!formData.email) return toast.error("Email is required");
        if(!formData.password) return toast.error("Password is required");
        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return toast.error("Invalid email format")
        if(formData.password.length < 5 ) return toast.error("Password must be at least 6 characters");
        if(formData.password !== formData.confirmPassword) return toast.error("Passwords Do not Match ");
        return true;
      }

    const handleSubmit = (e: SubmitEvent) => {
        e.preventDefault();

        const success = validateUser();
        if(success === true){
            signUp(formData);
            setShowModal(false);
            navigate("/course/set-up");
        }

    }
    return (
        <form className="space-y-6" onSubmit={handleSubmit} >
            {/* User Name Field */}

            <div className='flex gap-3'>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-medium text-gray-700">Full Name</span>
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <User className="w-5 h-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Enter your First Name"
                            className="input input-bordered w-full bg-white border border-gray-300 focus:ring-2 focus:ring-primary pl-10 py-3 rounded-md"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}

                        />
                    </div>
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-medium text-gray-700">Full Name</span>
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <User className="w-5 h-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Enter your Last Name"
                            className="input input-bordered w-full bg-white border border-gray-300 focus:ring-2 focus:ring-primary pl-10 py-3 rounded-md"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}

                        />
                    </div>
                </div>

            </div>
            {/* Email Field */}
            <div className="form-control">
                <label className="label">
                    <span className="label-text font-medium text-gray-700">Email</span>
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Mail className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                        type="email"
                        placeholder="Enter your Email"
                        className="input input-bordered w-full bg-white border border-gray-300 focus:ring-2 focus:ring-primary pl-10 py-3 rounded-md"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
            </div>

            {/* Password Field */}
            <div className="form-control">
                <label className="label">
                    <span className="label-text font-medium text-gray-700">Password</span>
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Lock className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="********"
                        className="input input-bordered w-full bg-white border border-gray-300 focus:ring-2 focus:ring-primary pl-10 py-3 rounded-md"
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? (
                            <EyeOff className="w-5 h-5 text-gray-400" />
                        ) : (
                            <Eye className="w-5 h-5 text-gray-400" />
                        )}
                    </button>
                </div>
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text font-medium text-gray-700">Confirm Password</span>
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Lock className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="********"
                        className="input input-bordered w-full bg-white border border-gray-300 focus:ring-2 focus:ring-primary pl-10 py-3 rounded-md"
                        name='confirmPassword'
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                    <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? (
                            <EyeOff className="w-5 h-5 text-gray-400" />
                        ) : (
                            <Eye className="w-5 h-5 text-gray-400" />
                        )}
                    </button>
                </div>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className={`bg-[#9185de] w-full py-3 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary ${isSigningUp ? "flex items-center justify-center" : ""}`}
                disabled={isSigningUp}
            >
                {isSigningUp ? (
                    <>
                        <Loader className="w-5 h-5 animate-spin" />

                    </>
                ) : (
                    'Become an Instructor'
                )}
            </button>
        </form>
    )
}

export default InstructorSignUp
