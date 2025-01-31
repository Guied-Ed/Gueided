import express from 'express';
const router = express.Router();
import enrollStudent from '../controllers/enrollmentController';

router.post("/enroll-student/:userId/:courseId",enrollStudent);

export default router;