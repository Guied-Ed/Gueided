
import Course from "../models/courseSchema"
import { Request, Response } from "express"
import Enrollment from "../models/enrollMentSchema"
import axios from 'axios';
import dotenv from 'dotenv'
import User from "../models/userSchema";
import Cart from "../models/courseCartSchema";
import mongoose from "mongoose";
dotenv.config();

interface EnrollReq {

    email: string;
    amount: number;

}

interface ResBody {
    status: boolean
    message: string

}

interface Params {
    userId: string
    courseIds: string[]
}

const PAYSTACK_KEY = process.env.PAYSTACK_API_KEY
const enrollStudent = async (req: Request, res: Response) => {
    try {
        const { email, amount } = req.body;
        const { userId, courseIds } = req.params;

        console.log("userId", userId);
        console.log("courseIds", courseIds);
        console.log("email", email);
        console.log("amount", amount);
        if (!userId || !courseIds) {
            res.status(400).json({ message: "userId and courseIds are required" });
            return
        }

        const courseIDArray = courseIds.split(",");
        const enrollments: any[] = [];
        const failedCourses: { courseId: string; error: string }[] = [];
        const authorizationUrls: { courseId: string; authorization_url: string }[] = [];

        for (const courseId of courseIDArray) {
            const course = await Course.findById(courseId);
            if (!course) {
                failedCourses.push({ courseId, error: "Course not found" });
                continue;
            }

            const existingEnrollment = await Enrollment.findOne({ courseId, userId });
            // console.log(existingEnrollment)
            // if(existingEnrollment){
            //   res.status(404).json({message: "Your are Already Enrolled"});
            //     return 
            // }
            if (existingEnrollment) {
                failedCourses.push({ courseId, error: "Already enrolled" });
                continue;
            }



            // Create new enrollment
            const newEnrollment = new Enrollment({ courseId, userId });
            console.log(newEnrollment)
            await newEnrollment.save();
            enrollments.push(newEnrollment);

            // Payment processing
            const data = {
                email,
                amount: amount * 100,
                reference: `enroll_${newEnrollment._id}`,
                callback_url: 'http://localhost:5000/api/enroll/payment-success'
            };

            const response = await axios.post(
                "https://api.paystack.co/transaction/initialize",
                data,
                {
                    headers: {
                        Authorization: `Bearer ${PAYSTACK_KEY}`
                    }
                }
            );
            // Save payment reference
            newEnrollment.paymentReference = response.data.data.reference;
            await newEnrollment.save();

            // Update user's enrolled courses
            await User.findByIdAndUpdate(userId, {
                $addToSet: { enrolledCourses: courseId }
            });

            // Collect authorization URL
            authorizationUrls.push({
                courseId,
                authorization_url: response.data.data.authorization_url
            });
        }

        res.json({
            enrollments,
            failedCourses,
            authorizationUrls
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ err });
    }
};

const getStudentsPerInstructors = async (req: Request, res: Response) => {
    try {
        const result = await Enrollment.aggregate([
            {
                $lookup: {
                    from: "courses",
                    localField: "courseId",
                    foreignField: "_id",
                    as: "courseDetails"
                }
            },
            {
                $unwind: "$courseDetails"
            },
            {
                $group: {
                    _id: "$courseDetails.instructor",
                    totalStudents: { $addToSet: "$userId" }
                }
            },
            {
                $project: {
                    instructorId: "$_id",
                    numberOfStudents: { $size: "$totalStudents" },
                    _id: 0
                }
            }

        ]);
         res.status(200).json(result);
    } catch (error) {
        res.status(500).json({message:error, success:false})
    }
}

const getStudentCountForSingleInstructor = async (req: Request, res: Response) => {
  try {
    const { instructorId } = req.params;

    const result = await Enrollment.aggregate([
      {
        $lookup: {
          from: "courses",
          localField: "courseId",
          foreignField: "_id",
          as: "courseDetails"
        }
      },
      { $unwind: "$courseDetails" },
      {
        $match: {
          "courseDetails.instructor": new mongoose.Types.ObjectId(instructorId)
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userDetails"
        }
      },
      { $unwind: "$userDetails" },
      {
        $group: {
          _id: "$courseDetails.instructor",
          students: {
            $addToSet: {
              _id: "$userDetails._id",
              firstName: "$userDetails.firstName",
              lastName: "$userDetails.lastName",
              email:"$userDetails.email"
            }
          }
        }
      },
      {
        $project: {
          instructorId: "$_id",
          numberOfStudents: { $size: "$students" },
          students: 1,
          _id: 0
        }
      }
    ]);

    if (result.length === 0) {
      res.status(404).json({ message: "Instructor not found or no enrollments." });
      return;
    }

    res.status(200).json(result[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to get student count." });
  }
};


const verifyPayment = async (req: Request, res: Response) => {
    const { reference } = req.query;
    if (!reference) {
        res.status(404).json({ message: "reference or status not found " });
        return;
    }

    try {
        const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
            headers: {
                Authorization: `Bearer ${PAYSTACK_KEY}`
            }
        });

        const paymentData = response.data.data;

        if (paymentData.status === 'success') {
            // Find all enrollments that match the given payment reference
            const enrollments = await Enrollment.find({ paymentReference: reference });
            if (enrollments && enrollments.length > 0) {
                // Update each enrollment to "paid"
                for (const enrollment of enrollments) {
                    enrollment.status = "paid";
                    await enrollment.save();

                    // Update user's enrolled courses for each enrollment (if not already added)
                    await User.findByIdAndUpdate(enrollment.userId, {
                        $addToSet: { enrolledCourses: enrollment.courseId }
                    });
                }

                await Cart.findByIdAndDelete(enrollments[0].userId, { courses: [] });


                res.redirect(`http://localhost:5173/payment-success?reference=${reference}`);
                return;
            } else {
                res.status(404).json({ message: 'Enrollment not found for this reference' });
                return;
            }
        } else {
            res.status(400).json({ message: 'Payment failed or invalid status' });
            return;
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error verifying payment' });
        return;
    }
};

const getAllEnrolledCourses = async (req: Request<{ userId: string }>, res: Response) => {
    try {
        let { userId } = req.params;
        userId = userId.trim();



        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        const paidEnrolledCourses = await Enrollment.find({ userId, status: "paid" });

        if (!paidEnrolledCourses.length) {
            res.status(200).json({ message: "No paid enrolled courses available", courses: [] });
            return;
        }

        const enrolledCousesIds = paidEnrolledCourses.map(enrollment => enrollment.courseId);

        // Fetch the enrolled courses
        const courses = await Course.find({ _id: { $in: enrolledCousesIds } })
            .populate("instructor", "firstName lastName") // Populate instructor details
            .select("tittle description videos.tittle videos.videoFilePath comments _id");

        res.status(200).json({ courses });

    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ message: "Error retrieving enrolled courses" });
    }
};


const getSingleEnrolledCourse = async (req: Request<{ userId: string, courseId: string }>, res: Response) => {

    try {

        const { userId, courseId } = req.params;
        if (!userId || !courseId) {
            res.status(404).json({ message: "user or course not found" })
        }


        const enrollment = await Enrollment.findOne({ userId, courseId, status: "paid" });
        if (!enrollment) {
            res.status(404).json({ message: "User has not enrolled in this course or payment is pending" });
            return;
        }

        const course = await Course.findById(courseId).populate("instructor", "firstName lastName") // Populate instructor details
            .select("tittle description videos.tittle videos.videoFilePath");
        if (!course) {
            res.status(404).json({ message: "Course not found" });
            return
        }

        res.status(200).json({ course });

    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ message: "Error retrieving course details" });
    }
}

export { enrollStudent, verifyPayment, getAllEnrolledCourses, getSingleEnrolledCourse, getStudentCountForSingleInstructor, getStudentsPerInstructors }