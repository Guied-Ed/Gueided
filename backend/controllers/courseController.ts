// controllers/courseController.ts

import { Request, Response } from 'express';
import { uploadToCloudinary } from '../middleware/multerMiddleWare';
import Course from '../models/courseSchema';

interface multerFile {
  buffer: Buffer;
  originalName: string
}

 export interface CustomRequest extends Request {
  userId?: string;
  files?: { [fieldname: string]: Express.Multer.File[] } | undefined;
  body: {
    tittle: string;
    description: string;
    duration: number;
    category: string;
    price: number;
    level: string;
    videoDetails?: string; // Add this line
  }
}

type Video = {
  tittle: string;
  videoFilePath: string;
  duration?: number;
  description?: string;
};

const uploadFilesAndCreateCourse = async (req: CustomRequest, res: Response):Promise<void> => {

  const {userId} =  req.params
  const { thumbnail, videos } = req.files || {};
  const { tittle, description, duration, category, price, level } = req.body;

  if (!thumbnail || thumbnail.length === 0 || !videos || videos.length === 0) {
    res.status(400).json({ error: 'Thumbnail and videos are required' });
    return;
  }

  if(!userId){
    res.status(403).json({message:"User Not Found"});
    return;
  }

  console.log('Files:', req.files);


  console.log('Uploading Thumbnail:', { buffer: thumbnail[0].buffer, folder: 'guided/thumbnails', type: 'image' });
  console.log('Uploading Video:', { buffer: videos[0].buffer, folder: 'guided/videos', type: 'video' });
  

  try {
    const thumbnailUpload = await uploadToCloudinary(
      thumbnail[0].buffer,
      'guided/thumbnails',
      'image'
    );

    const videoDetails = JSON.parse(req.body.videoDetails || '[]');

    const videoData: Video[] = await Promise.all(
      videos.map(async (v,index) => {
        const videoUpload = await uploadToCloudinary(
          v.buffer,
          'guided/videos',
          'video'
        );

        return {
          tittle: videoDetails[index]?.tittle || v.originalname,
          videoFilePath: videoUpload.secure_url,
          duration: videoDetails[index]?.duration,
          description: videoDetails[index]?.description,
        };
      })
    );

    const newCourse = new Course({
      tittle,
      description,
      duration,
      category,
      price,
      level,
      instructor: userId,
      thumbnail: thumbnailUpload.secure_url,
      videos: videoData, // Store video data in the appropriate format
    });

    await newCourse.save();

    // Respond with success message and the created course
    res.status(201).json({
      message: 'Course created successfully!',
      course: newCourse,
    });
  } catch (error) {
    console.error('Error uploading files and creating course:', error);
    console.log(error)
    res.status(500).json({ error: 'File upload or course creation failed' });
  }
};



const getAllCourses = async(req:Request,res:Response) =>{
  try{
    const courses = await Course.find().populate("instructor","firstName lastName email");
    if(!courses){
      res.status(500).json({message:"Courses not found"})
      return 
    }
    res.status(200).json({succcess:true,data:courses})
  }catch(err){
    console.log(err)
    res.status(500).json({message:"Error Fetch Courses"})
  }
}


const getASingleCourse  = async(req:Request,res:Response) =>{

  const {courseId} = req.params;

  try {
    const course = await Course.findById(courseId).populate("instructor","firstName lastName email");
    if(!course){
      res.status(404).json({message:"Course not found"})
    }
    res.status(200).json({success:true,data:course})
  } catch (error) {
    console.log(error)
    res.status(500).json({message:"Error Fetch Courses"})
  }
}


const updateCourse = async (req: CustomRequest, res: Response):Promise<void>=>{
  const {courseId} = req.params;
  const {userId} = req.params;
  const { thumbnail, videos } = req.files || {};
  const { tittle, description, duration, category, price, level } = req.body;
  try{
      const course = await Course.findById(courseId);
      if(!course){
        res.status(401).json({message:"Course Not Found"})
      }

      // Check if the user is an instructor before updating a course 

      if(course?.instructor.toString() !== userId){
        res.status(401).json({message:"Only Course Instrutor can update his/her course"})
        return;
      }

      if (course) {
        if(tittle) course.tittle = tittle;
        if(description) course.description = description;
        if(duration) course.duration = duration;
        if(category) course.category = category;
        if(price) course.price = price;
        if(level) course.level = level;
      }


      if(thumbnail && thumbnail.length > 0) {
        const thumbnailUpload = await uploadToCloudinary(
          thumbnail[0].buffer,
          'guided/thumbnails',
          'image'
        );
        if(course)
        course.thumbnail = thumbnailUpload.secure_url
      }


      if(videos && videos.length > 0) {

        const videoData = await Promise.all(
        videos.map(async(v)=>{
          const videoUpload = await uploadToCloudinary(v.buffer, 'guided/videos',
            'video')
            return {
              tittle: v.originalname, // Using the original file name as the title
              videoFilePath: videoUpload.secure_url, // Cloudinary URL
              duration: undefined, // Optional field, set as needed
              description: undefined,
            }
        })
      )
        if(course){
          course.videos = [...course.videos, ...videoData]
        }
         
      }

      await course?.save();
      res.status(200).json({ message: 'Course updated successfully', course });
  }catch(error){
    console.error('Error updating course:', error);
    res.status(500).json({ message: 'Error updating course', error });
  }
}


const deleteCourse = async(req:Request,res:Response) =>{
  const {userId,courseId } = req.params;

  try {
    const course = await Course.findById(courseId);
    if(!course){
      res.status(401).json({message:"Course Not Found"})
    }

    // Check if the user is an instructor before updating a course 

    if(course?.instructor.toString() !== userId){
      res.status(401).json({message:"Only Course Instrutor can update his/her course"})
      return;
    }

  // Delete the course
  await course.deleteOne();

  // Respond with success
  res.status(200).json({ message: "Course deleted successfully",course });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while trying to delete the course", error });
  }
  
}



export { uploadFilesAndCreateCourse,getAllCourses,updateCourse,deleteCourse,getASingleCourse };
