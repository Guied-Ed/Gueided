
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
    courseId: string
}

const PAYSTACK_KEY = process.env.PAYSTACK_API_KEY
const enrollStudent = async (req: Request<Params, ResBody, EnrollReq>, res: Response) => {
    try {

        const { email, amount } = req.body;
        const { userId, courseId } = req.params

        if (!userId || !courseId) {
            res.status(404).json({ message: "userId | courseId is required" });
            return;
        }
        const course = await Course.findById(courseId);
        if (!course) {
            res.status(404).json({ message: "course is not found" });
            return;
        }


        const existingEnrollment = await Enrollment.findOne({ courseId, userId });
        if (existingEnrollment) {
            res.status(404).json({ message: "User Enrolled Already" });
            return;
        }

        const newEnrollment = new Enrollment({ courseId, userId });
        await newEnrollment.save();

        const data = {
            email,
            amount: amount * 100,
            reference: `enroll_${newEnrollment._id}`,
            callback_url: 'http://localhost:5000/api/enroll/payment-success'
        }

        const response = await axios.post(
            "https://api.paystack.co/transaction/initialize",
            data,
            {
                headers: {
                    Authorization: `Bearer ${PAYSTACK_KEY}`
                }
            }

        )

        const authorization_url = response.data.data.authorization_url;

        newEnrollment.paymentReference = response.data.data.reference;
        await newEnrollment.save();


        await User.findByIdAndUpdate(userId,{
            $addToSet:{enrolledCourses:courseId}
        })

        res.json({ authorization_url })
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err })
        return
    }


}


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

                await User.findByIdAndUpdate(enrollment.userId,{
                    $addToSet:{enrolledCourses:enrollment.courseId}
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


export { enrollStudent, verifyPayment }