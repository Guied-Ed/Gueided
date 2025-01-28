import React from 'react'
interface CourseDetailProp {

}
interface CourseDetailBannerProps {
  singleCourseContainer: {
    _id: string
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
    <div className='bg-[#937ac6] w-full h-80 flex items-center justify-center relative'>
      <div>
        <h1 className='text-3xl text-white font-bold' >{singleCourseContainer?.tittle}</h1>
        <p></p>

        <div className="bg-white absolute top-60 h-[30rem] rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 w-96">
          <img className='w-full h-64' src={singleCourseContainer.thumbnail} />
          <p>{singleCourseContainer.instructor.firstName}</p>
          
        </div>
      </div>

    </div>
  )
}

export default CourseDetailBanner
