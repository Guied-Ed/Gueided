import React, { useEffect } from 'react'
import { useEnrollStore } from '../../../store/useEnrollStore'
import { useAuthStore } from '../../../store/useAuthStore'
const Students = () => {
  const { enrolledStudents, getNoOfEnrollmentForInstructor } = useEnrollStore();
  const { authUser } = useAuthStore() as { authUser: { user: { _id: string, email: string, firstName: string, lastName: string, biography: string } } | null, checkAuth: () => void, isCheckingAuth: boolean };

  const userId = authUser?.user?._id
  useEffect(() => {
    if (userId) {
      getNoOfEnrollmentForInstructor(userId);
    }
  }, [])
  return (

    <div className="w-full w- p-4 md:p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <div className='mb-4'>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">Your Students</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm sm:text-xl">
          Manage and organize your course offerings
        </p>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  First Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Last Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Email
                </th>


                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Progress
                </th>

              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {enrolledStudents && enrolledStudents.map((es) => (
                <tr key={es._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {es.firstName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {es.lastName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {es.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    <button className='flex items-center bg-green-600 text-white px-4 py-2 rounded-md  '>
                      20%
                    </button>
                  </td>
                </tr>
              ))}

              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Students
