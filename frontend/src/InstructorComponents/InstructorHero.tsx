import  { useState } from 'react'
import InstructorBanner from '../assets/Teacher-removebg-preview.png'
import { motion } from 'framer-motion'
import { X } from 'lucide-react';
import InstructorSignUp from './InstructorSignUp';
import InstructorSignIn from './InstructorSignIn';

const InstructorHero = () => {

    const [showModal, setShowModal] = useState(false);
   const [isSignUp,setIssignUp] = useState(true);
    const toggleModal = () => {
        setShowModal(!showModal);
    }



    // interface FormData {
    //     email: string;
    //     password: string;
    //     fullName: string;
    //     role: string;
    //     confirmPassword: string;
    // }



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
                            {/* <p className="text-lg font-semibold text-gray-700 my-4">
                                🌟 Share your knowledge, inspire others, and earn on your terms. Sign up now! 🚀
                            </p> */}

                            {
                                isSignUp ? 
                            <InstructorSignUp
                            setShowModal={setShowModal}
                            /> : 
                            <InstructorSignIn
                            setShowModal={setShowModal}
                            />
                            }
                        <button className='' onClick={()=>setIssignUp(!isSignUp)}>
                                {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                        </button>
                        </motion.div>
                    </div>
                )
            }
        </div>
    )
}

export default InstructorHero
