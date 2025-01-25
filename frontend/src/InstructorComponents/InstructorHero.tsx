import React, { useState } from 'react'
import InstructorBanner from '../assets/Teacher-removebg-preview.png'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Loader, Lock, Mail, MessageSquare, User , X } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
const InstructorHero = () => {
    const {  isLoggingIn,signIn } = useAuthStore();
    const [showModal, setShowModal] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "",fullName:"" });
    const toggleModal = () => {
        setShowModal(!showModal);
    }
    return (
        <div className='bg-gray-100  grid grid-cols-2 w-full h-screen items-center '>

            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className='flex flex-col gap-6 items-center'>
                <p className='text-[3rem] font-bold'>Share Your Knowledge, </p>
                <p>Inspire the Future!</p>
                <p>Join Us as an Instructor and Make a Difference Today.</p>
                <p>💡 Flexible Hours | 💻 Teach What You Love | 🌟 Empower Learners </p>
                <button
                    onClick={toggleModal}
                    className='w-72 text-center bg-blue-900 px-5 py-3 text-white border-2 border-blue-900 hover:bg-white hover:text-blue-900 transition duration-300'
                >
                    Get Started
                </button>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className=''>
                <img className='w-full' src={InstructorBanner} />
            </motion.div>


            {
                showModal && (
                    <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center'>
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                            transition={{ duration: 0.5, ease: 'easeInOut' }}
                            className='bg-white p-6 rounded-lg shadow-lg w-[32rem] relative z-50'>
                            <button className='absolute top-3 right-3 text-gray-500 hover:text-gray-800' onClick={toggleModal}>
                            <X size={20} className='hover:text-red-700' />
                            </button>
                            <h2 className='text-2xl font-bold mb-4'>Sign Up as an Instructor</h2>
                            <p className="text-lg font-semibold text-gray-700 my-4">
                                🌟 Share your knowledge, inspire others, and earn on your terms. Sign up now! 🚀
                            </p>
                            <form className="space-y-6" >
                                {/* User Name Field */}
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
                                            placeholder="Enter your Full Name"
                                            className="input input-bordered w-full bg-white border border-gray-300 focus:ring-2 focus:ring-primary pl-10 py-3 rounded-md"
                                            name="email"
                                            value={formData.fullName}
                                       
                                        />
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
                                    className={`bg-[#9185de] w-full py-3 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary ${isLoggingIn ? "flex items-center justify-center" : ""}`}
                                    disabled={isLoggingIn}
                                >
                                    {isLoggingIn ? (
                                        <>
                                            <Loader className="w-5 h-5 animate-spin" />

                                        </>
                                    ) : (
                                        'Create Account'
                                    )}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )
            }
        </div>
    )
}

export default InstructorHero
