
import Course from "../models/courseSchema"
import { Request, Response } from "express"
import Enrollment from "../models/enrollMentSchema"
import axios from 'axios';
import dotenv from 'dotenv'
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
export const enrollStudent = async (req: Request<Params, ResBody, EnrollReq>, res: Response) => {
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
            reference: `enroll_${newEnrollment._id}`
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

        res.json({authorization_url})
    } catch (err) {
        console.log(err);
      res.status(500).json({error:err})
      return 
    }


}


export default enrollStudent