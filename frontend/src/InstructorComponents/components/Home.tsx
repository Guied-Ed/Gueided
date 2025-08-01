import React, { useEffect } from 'react'
import { useCourseStore } from '../../../store/useCourseStore'
import PieChart from '../DashboardVisuals/PieChart';
import BarChat from '../DashboardVisuals/BarChat';
import { useAuthStore } from '../../../store/useAuthStore';
import { useEnrollStore } from '../../../store/useEnrollStore';

const Home = () => {
    const { courseContainer, getCourses, instructorCoursesContainer, getInstructorCourses } = useCourseStore();
    const { authUser, } = useAuthStore() as { authUser: { user: { _id: string, email: string, firstName: string, lastName: string, biography: string } } | null, checkAuth: () => void, isCheckingAuth: boolean };
    const { getNoOfEnrollmentForInstructor, instructorStudentCount } = useEnrollStore()
    console.log(authUser)
    const userId = authUser?.user._id

    useEffect(() => {
        if (userId) {
            getNoOfEnrollmentForInstructor(userId);
            getInstructorCourses(userId);
        }

    }, []);

 const totalComments = instructorCoursesContainer?.reduce((acc: number, course: any) => {
  return acc + (course.comments?.length || 0);
}, 0);


    

    const stats = [
        {
            title: "Courses",
            value: instructorCoursesContainer?.length || 0,
            bg: "bg-green-500",
            border: "border-green-500"
        },
        {
            title: "Students",
            value: instructorStudentCount && instructorStudentCount,
            bg: "bg-blue-800",
            border: "border-blue-800"
        },
        {
            title: "Reviews",
            value: totalComments,
            bg: "bg-purple-600",
            border: "border-purple-600"
        }
    ];

    return (
        <div className="p-4 md:p-6">
            {/* Stats Cards */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8'>
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className={`${stat.bg} ${stat.border} border-2 rounded-lg p-6 flex flex-col items-center justify-center gap-3 text-white transition-all hover:scale-[1.02]`}
                    >
                        <p className='text-xl md:text-2xl font-medium'>{stat.title}</p>
                        <p className='text-3xl md:text-4xl font-bold'>{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Course Analytics</h2>
                    <div className="h-80 md:h-96">
                        <BarChat
                            courseLength={instructorCoursesContainer?.length || 0}
                            totalReviews={  totalComments}
                            totalStudents={instructorStudentCount && instructorStudentCount}
                        />
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Distribution</h2>
                    <div className="h-80 md:h-96">
                        <PieChart
                            courseLength={instructorCoursesContainer?.length || 0}
                           totalReviews={  totalComments}
                            totalStudents={instructorStudentCount && instructorStudentCount}
                        />
                    </div>
                </div>
            </div>

            {/* Additional Content Area */}
            <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Recent Activity</h2>
                <p className="text-gray-600 dark:text-gray-300">
                    Dashboard overview and quick statistics. Add your recent activities or notifications here.
                </p>
            </div>
        </div>
    )
}

export default Home