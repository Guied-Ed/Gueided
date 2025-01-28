import React, { useEffect } from 'react'
import { useCourseStore } from '../../store/useCourseStore'
import { useParams } from 'react-router-dom';
import CourseDetailBanner from '../components/CourseDetailComponent';
const CourseDetail = () => {

  const { courseId } = useParams();
  console.log(courseId)
  const { getCourse, isFetchingSingleData,singleCourseContainer} = useCourseStore();
  useEffect(() => {
    getCourse(courseId)
  }, [getCourse])

  console.log(singleCourseContainer)
  return (
    <div>

      {singleCourseContainer && (
        <CourseDetailBanner
          singleCourseContainer={singleCourseContainer}
        />
      )}
    
    </div>
  )
}

export default CourseDetail
