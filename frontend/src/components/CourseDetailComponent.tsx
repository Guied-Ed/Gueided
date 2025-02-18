import React from 'react';

interface CourseDetailBannerProps {
  singleCourseContainer: {
    _id: string;
    category: string;
    createdAt: string;
    description: string;
    duration: number;
    instructor: {
      _id: string;
      firstName: string;
      lastName: string;
      email: string;
    };
    level: string;
    price: number;
    ratings: any[];
    thumbnail: string;
    tittle: string;
    updatedAt: string;
    videos: any[];
    __v: number;
  };
}

const CourseDetailBanner: React.FC<CourseDetailBannerProps> = ({ singleCourseContainer }) => {
  return (
    <>

    <div className="bg-[#937ac6] w-full h-96 flex items-center justify-center relative">
      <div className="w-10/12 flex flex-col md:flex-row items-center gap-8">
        
        {/* Course Thumbnail with  Background Color */}
        <div className="w-full md:w-1/3 bg-gray-200 p-4 rounded-lg shadow-lg">
          <img 
            className="w-full h-72 object-cover rounded-md" 
            src={singleCourseContainer.thumbnail} 
            alt="Course Thumbnail" 
          />
        </div>

        {/* Course Details */}
        <div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-gray-900">{singleCourseContainer?.tittle}</h1>
          <p className="text-lg text-gray-700 mt-2">{singleCourseContainer.description}</p>

          {/* Instructor & Meta Info */}
          <div className="mt-4 text-gray-600">
            <p className="text-lg font-semibold">Instructor: <span className="text-[#937ac6]">{singleCourseContainer.instructor.firstName} {singleCourseContainer.instructor.lastName}</span></p>
            <p className="mt-1">Level: <span className="font-medium">{singleCourseContainer.level}</span></p>
            <p className="mt-1">Duration: <span className="font-medium">{singleCourseContainer.duration} hours</span></p>
          </div>

          {/* Price & Ratings */}
          <div className="mt-6 flex justify-between items-center">
            <span className="text-xl font-bold text-[#937ac6]">${singleCourseContainer.price}</span>
            <button className="bg-[#937ac6] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#7a5cb3] transition">Enroll Now</button>
          </div>
        </div>
      </div>
    </div>
    <div className='flex flex-col items-center justify-center mt-12'>
      <h1 className='text-4xl font-bold'>Course Content</h1>
    </div>
    </>
  );
};

export default CourseDetailBanner;
