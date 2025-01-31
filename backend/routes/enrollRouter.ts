import express from 'express';
const router = express.Router();
import {enrollStudent,verifyPayment} from '../controllers/enrollmentController';


router.post("/enroll-student/:userId/:courseId",enrollStudent);
router.get("/payment-success",verifyPayment)
export default router;