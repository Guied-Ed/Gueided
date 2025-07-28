import express from 'express';
const router = express.Router();
import {enrollStudent,verifyPayment,getAllEnrolledCourses,getSingleEnrolledCourse, getStudentCountForSingleInstructor, getStudentsPerInstructors} from '../controllers/enrollmentController';
import verifyToken from '../middleware/verifyToken';
import isInstructor from '../middleware/roleMiddleWare';

router.post("/enroll-student/:userId/:courseIds" ,enrollStudent);
router.get("/payment-success",verifyPayment);
router.get("/enrolled-courses/:userId",getAllEnrolledCourses);
router.get("/student-count-single-instructor/:instructorId", verifyToken, isInstructor,getStudentCountForSingleInstructor)
router.get("/students-enrolled-courses", getStudentsPerInstructors)
router.get("/enrolled-single-course/:userId/:courseId",getSingleEnrolledCourse)
export default router;