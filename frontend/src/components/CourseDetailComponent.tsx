import { video } from 'framer-motion/client';
import React, { useState } from 'react';
import { X } from 'lucide-react';

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

interface Video {
  _id: string;
  duration: number;
  tittle: string; // Consider renaming to "title" if possible
  videoFilePath: string;
}




const CourseDetailBanner: React.FC<CourseDetailBannerProps> = ({ singleCourseContainer }) => {

  // const [videos, setVideos] = useState<Video[]>([]);
  // console.log(videos)
  const [loading, setLoading] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const openModal = (video: Video) => {
    setSelectedVideo(video);
  }

  const closeModal = () => {
    setSelectedVideo(null);
  }

  console.log(singleCourseContainer)
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
      <div className="flex flex-col items-center justify-center mt-12 px-4">
        <h1 className="text-4xl font-bold mb-6">Course Content</h1>
        <div className="overflow-x-auto w-full max-w-4xl">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-900 text-white">
                <th className="py-3 px-6 text-left font-medium uppercase tracking-wider border border-gray-800">
                  Tittle
                </th>
                <th className="py-3 px-6 text-left font-medium uppercase tracking-wider border border-gray-800">
                  Duration
                </th>
                <th className="py-3 px-6 text-left font-medium uppercase tracking-wider border border-gray-800">
                  Video
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {singleCourseContainer.videos.length > 0 &&
                singleCourseContainer.videos.map((v) => (
                  <tr key={v._id} className="hover:bg-gray-100">
                    <td className="py-4 px-6 border border-gray-200 text-gray-900">
                      {v.tittle}
                    </td>
                    <td className="py-4 px-6 border border-gray-200 text-gray-900">
                      {v.duration} sec
                    </td>
                    <td className="py-4 px-6 border border-gray-200"

                    >
                      <button className="bg-[#937ac6] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#7a5cb3] transition" onClick={() => openModal(v)}>Try the Video Here</button>
                      {/* <video controls className="w-48">
                        <source src={v.videoFilePath} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video> */}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          <div className="mt-8 text-center">
            <p className="text-xl font-semibold text-gray-800 mb-4">
              Want more? Enroll Now!
            </p>
            <button className="px-6 py-3 bg-black text-white font-medium rounded hover:bg-gray-800 transition">
              Enroll Now
            </button>
          </div>


          {selectedVideo && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
              <div className="relative bg-white rounded-lg p-4 w-11/12 max-w-3xl">
                <button
                  className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                  onClick={closeModal}
                >
                  <X size={24} />
                </button>
                <h2 className="text-2xl font-bold mb-4">{selectedVideo?.tittle}</h2>
                <video controls autoPlay className="w-full px-16 h-44">
                  <source src={selectedVideo?.videoFilePath} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          )}
        </div>
 
     
      </div>
      <div className='flex border-[1px] border-gray-900 mt-10 mx-4 items-center justify-center'>
          <div>
            <h1 className='font-bold text-3xl'>About the Instructor</h1>
              <p>{singleCourseContainer?.instructor.firstName} </p>
          </div>
          <div>

          </div>
        </div>
    </>
  );
};

export default CourseDetailBanner;
