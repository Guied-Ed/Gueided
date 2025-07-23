
import { Code, Database, Monitor, TrendingUp, BarChart, Shield, Lock, Layers, Smartphone } from 'lucide-react';
import { useCourseStore } from '../../store/useCourseStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const CourseCategories = () => {
const navigate = useNavigate();
const {categoriesContainer, getCategories} = useCourseStore();

useEffect(()=>{
  getCategories()
},[]);

// Handle Course CategoryRouter;

const handleCourseCategoryRouter = (category:string) => {
  navigate(`/all-courses?category=${encodeURIComponent(category)}`);
}

  const courseCategories = [
    {  icon: <Code size={36} className="text-blue-500" /> },
    {  icon: <Database size={36} className="text-green-500" /> },
    {  icon: <Monitor size={36} className="text-purple-500" /> },
    {  icon: <TrendingUp size={36} className="text-teal-500" /> },
    {  icon: <BarChart size={36} className="text-yellow-500" /> },
    {  icon: <Shield size={36} className="text-indigo-500" /> },
    {  icon: <Lock size={36} className="text-red-500" /> },
    { icon: <Layers size={36} className="text-pink-500" /> },
    {  icon: <Smartphone size={36} className="text-orange-500" /> }
  ];

  return (
    <div className="container mx-auto mt-8 px-6">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoriesContainer["Tech Courses After Graduation"]?.map((category: string, index: number) => {
          return (
            <div
              key={index}
              className="border-2 border-gray-300 p-6 w-full h-40 rounded-md shadow-lg hover:bg-gray-100 transition hover:text-black duration-300 flex flex-col items-center justify-center gap-4"
            >
              {/* Icon and Text */}
              <div className="text-center flex flex-col items-center justify-center" onClick={()=>handleCourseCategoryRouter(category)}>
                {/* <div className="mb-2 flex items-center justify-center">{category}</div> */}
                {courseCategories[index]?.icon}
                <p className="text-lg font-semibold">{category}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CourseCategories;
