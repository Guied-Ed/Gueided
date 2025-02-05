import { useCourseStore } from '../../../store/useCourseStore';
import { useState } from 'react';
import { useAuthStore } from '../../../store/useAuthStore';
import { useEffect, useMemo } from 'react';
import { useTable } from 'react-table';
import { Edit, DeleteIcon } from 'lucide-react';
const Courses = () => {
  const { isFetchingInstructorCourses, instructorCoursesContainer, getInstructorCourses, deleteACourse } = useCourseStore();
  const { authUser } = useAuthStore() as unknown as { authUser: { user: any } };
  const userId = authUser?.user._id;
  const [showModal, setShowModal] = useState(false);
  const [id,setId]= useState<string | null >(null);

  useEffect(() => {
    getInstructorCourses(userId);
  }, []);


  const updateModal = (courseId:string) =>{
    setShowModal(true);
    setId(courseId);
  }

  

  const finalDelete = () => {
    deleteACourse(id,userId);
    setShowModal(false);
  }
  console.log(instructorCoursesContainer);

  return (

    <div className="overflow-x-auto">

      <table className='w-full border-collapse border border-gray-600'>
        <thead>


          <tr className='bg-black text-white px-3 py-4'>

            <th className='border border-grey-300 px-4 py-2 text-left'>Course Tittle </th>
            <th className='border border-grey-300 px-4 py-2 text-left'>Category</th>
            <th className='border border-grey-300 px-4 py-2 text-left'>Level</th>
            <th className='border border-grey-300 px-4 py-2 text-left'>Price</th>
            <th className='border border-grey-300 px-4 py-2 text-left'></th>
          </tr>

        </thead>
        <tbody>
          {instructorCoursesContainer && instructorCoursesContainer.map((course) => (
            <tr key={course._id}

              className="bg-white text-black"
            >
              <td className='border-2 border-grey-300 px-4 py-2 text-left'>{course.tittle}</td>
              <td className='border-2 border-grey-300 px-4 py-2 text-left'>{course.category}</td>
              <td className='border-2 border-grey-300 px-4 py-2 text-left'>{course.level}</td>
              <td className='border-2 border-grey-300 px-4 py-2 text-left'>{course.price}</td>
              <td className='border-2 border-grey-300 px-4 py-2 text-left '><div className='flex gap-4'><Edit /> <DeleteIcon onClick={()=> updateModal(course._id)}/></div></td>
            </tr>
          ))}
        </tbody>
      </table>


      {showModal &&

        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
         <div className="bg-white p-6 rounded-lg shadow-lg text-center">
         <h2 className="text-lg font-semibold">Are you sure?</h2>
            <p className="text-gray-600 mb-4">Do you really want to delete this item?</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
           
              onClick={finalDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Yes, Delete
              </button>
          </div>
          </div>
        </div>
      }
    </div>

  );
};

export default Courses;
