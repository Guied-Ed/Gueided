import express from 'express';
import {addToCart, removeFromCart} from '../controllers/cartController';
import verifyToken from '../middleware/verifyToken';
const router = express.Router();
router.post('/add-cart/:courseId/:userId',verifyToken,addToCart);
router.delete('/remove-cart/:courseId/:userId',verifyToken,removeFromCart)
export default router;