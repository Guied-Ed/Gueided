
import Course from "../models/courseSchema"
import { Request, Response } from "express"
import Enrollment from "../models/enrollMentSchema"
import axios from 'axios';
import dotenv from 'dotenv'
import User from "../models/userSchema";
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

        if (!userId || !courseIds) {
           res.status(400).json({ message: "userId and courseIds are required" });
           return 
        }

        const courseIDArray = courseIds.split(",");
        const enrollments = [];
        const failedCourses = [];
        const authorizationUrls = [];

        for (const courseId of courseIDArray) {
            const course = await Course.findById(courseId);
            if (!course) {
                failedCourses.push({ courseId, error: "Course not found" });
                continue;
            }

            const existingEnrollment = await Enrollment.findOne({ courseId, userId });
            if (existingEnrollment) {
                failedCourses.push({ courseId, error: "Already enrolled" });
                continue;
            }

            // Create new enrollment
            const newEnrollment = new Enrollment({ courseId, userId });
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


const verifyPayment = async (req: Request, res: Response) => {
    const { reference, status } = req.query;
    if (!reference && !status) {
        res.status(404).json({ message: "reference or status not found " });
        return
    }

    try {
        const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
            headers: {
                Authorization: `Bearer ${PAYSTACK_KEY}`
            }
        })

        const paymentData = response.data.data;

        if (paymentData.status === 'success') {
            const enrollment = await Enrollment.findOne({ paymentReference: reference });
            if (enrollment) {
                enrollment.status = "paid"
                await enrollment.save();

                await User.findByIdAndUpdate(enrollment.userId, {
                    $addToSet: { enrolledCourses: enrollment.courseId }
                })
                res.status(200).json({ message: "Payment Successful, enrollment updated!" });
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
        return
    }
}
const getAllEnrolledCourses = async (req: Request<{ userId: string }>, res: Response) => {
    try {
        let { userId } = req.params;
        userId = userId.trim(); // Trim to remove unwanted spaces or newlines


        // Check if the user exists
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
            .select("tittle description videos.tittle videos.videoFilePath");

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

export { enrollStudent, verifyPayment, getAllEnrolledCourses, getSingleEnrolledCourse }