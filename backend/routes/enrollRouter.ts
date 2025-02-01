import express from 'express';
const router = express.Router();
import {enrollStudent,verifyPayment,getAllEnrolledCourses,getSingleEnrolledCourse} from '../controllers/enrollmentController';


router.post("/enroll-student/:userId/:courseId",enrollStudent);
router.get("/payment-success",verifyPayment);
router.get("/enrolled-courses/:userId",getAllEnrolledCourses);
router.get("/enrolled-single-course/:userId/:courseId",getSingleEnrolledCourse)
export default router;