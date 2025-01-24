import React from 'react'
import InstructorBanner from '../assets/Teacher-removebg-preview.png'
import { Link } from 'react-router-dom'
import {motion} from 'framer-motion'
const InstructorHero = () => {
    return (
        <div className='bg-gray-100  grid grid-cols-2 w-full h-screen items-center '>

            <motion.div 
           initial={{opacity:0, x:-20}}
           animate={{opacity:1, x:0}}
           exit={{opacity:0,x:-20}}
           transition={{duration:0.8, delay:0.3}}
            className='flex flex-col gap-6 items-center'>
                <p className='text-[3rem] font-bold'>Share Your Knowledge, </p>
                <p>Inspire the Future!</p>
                <p>Join Us as an Instructor and Make a Difference Today.</p>
                <p>💡 Flexible Hours | 💻 Teach What You Love | 🌟 Empower Learners </p>
                <Link to="" className='w-72 text-center bg-blue-900 px-5 py-3 text-white border-2 border-blue-900 hover:bg-white  hover:text-blue-900 transition duration-300'>Get Started</Link>
            </motion.div>
            <motion.div 
                   initial={{opacity:0, y:-30}}
                   animate={{opacity:1, y:0}}
                   exit={{opacity:0,y:-30}}
                   transition={{duration:0.8, delay:0.3}}
            className=''>
                <img className='w-full' src={InstructorBanner} />
            </motion.div>
        </div>
    )
}

export default InstructorHero
