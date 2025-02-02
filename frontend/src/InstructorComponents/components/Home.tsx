import React, { useEffect } from 'react'
import { useCourseStore } from '../../../store/useCourseStore'
import PieChart from '../DashboardVisuals/PieChart';
import BarChat from '../DashboardVisuals/BarChat';
const Home = () => {

    const { courseContainer, getCourses } = useCourseStore();
    useEffect(() => {
        getCourses()
    }, [])
    console.log(courseContainer.length)

    let courseLength = courseContainer.length;
    let totalStudents = 26;
    let totalReviews = 1000;
    return (

        <div>


            <div className='mt-8 flex gap-4'>


                <div className='bg-green-500 w-64 border-2 border-green-500 rounded-md h-40 px-8 py-8 flex flex-col items-center justify-center gap-4 text-white '>
                    <p className='text-2xl'>Courses</p>
                    <p className='text-2xl'>{courseContainer.length}</p>
                </div>

                <div className='bg-black border-2 border-black w-64 rounded-md h-40 px-8 py-8 flex flex-col items-center justify-center gap-4 text-white '>
                    <p className='text-2xl'>Courses</p>
                    <p className='text-2xl'>{courseContainer.length}</p>
                </div>

                {/* <div className='bg-white border-2 border-black w-64 rounded-md h-40 px-8 py-8 flex flex-col items-center justify-center gap-4 text-black '>
                <p className='text-2xl'>Reviews</p>
                <p className='text-2xl'>3000</p>
            </div> */}

                <div className='bg-blue-800 w-64 border-2 border-blue-800 rounded-md h-40 px-8 py-8 flex flex-col items-center justify-center gap-4 text-white '>
                    <p className='text-2xl'>Students</p>
                    <p className='text-2xl'>26</p>
                </div>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full px-12 mt-8">
       

                <div className="w-full flex justify-center h-96">
                    <BarChat
                        courseLength={courseLength}
                        totalReviews={totalReviews}
                        totalStudents={totalStudents}
                    />
                </div>

                <div className="w-full flex justify-center">
                    <PieChart
                        courseLength={courseLength}
                        totalReviews={totalReviews}
                        totalStudents={totalStudents}
                    />
                </div>
            </div>

        </div>
    )
}

export default Home
