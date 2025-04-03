import React from 'react'
import Learn from '../../src/assets/team-meeting-report-success-manager-invest (1).jpg'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
const Form = () => {
    return (
        <main className='w-full sm:flex-row  flex-col flex justify-between items-center gap-10 p-10' >

            <div className='w-full sm:hidden'>
                <img src={Learn} className='border-2 border-blue-900 rounded-r-full' />
            </div>

            <div className='w-full'>
                <h1 className='text-2xl font-bold mb-3'>Join Our Team of Developers </h1>
                <ul className='flex flex-col gap-4'>
                    <li>Gain Insights onto our to create best Products</li>
                    <li>Real life Experience and Cheaping of products fasts</li>
                    <li>Explore Our Open Source Projects</li>
                </ul>

                <div className='flex gap-4 mt-3'>
                    <Link to="/" className='flex items-center gap-2 bg-orange-600 rounded-md  px-4 py-3 text-white transition duration-300 hover:bg-neutral-900'>Join Our Community <ArrowRight /></Link>
                    <Link to="/" className='flex items-center gap-2 bg-blue-800 rounded-md  px-4 py-3 text-white transition duration-300 hover:bg-neutral-900'>Contact Us <ArrowRight /> </Link>
                </div>
            </div>


            <div className='w-full hidden sm:block'>
                <img src={Learn} className='border-2 border-blue-900 rounded-r-full' />
            </div>


        </main>
    )
}

export default Form
