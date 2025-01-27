import Cart from "../models/courseCartSchema";
import Course from "../models/courseSchema";
import { Request, Response } from "express";
import mongoose from "mongoose";

const addToCart = async (req:Request,res:Response) =>{
    const {userId,courseId} = req.params;
    try {
        const course = await Course.findById(courseId);
        if(!course){
            res.status(404).json({message:"Course not found"});
            return;
        }

        const cart = await Cart.findOne({userId});
        if(cart){
            const existingCourse = cart.courses.find(c => c.courseId.toString() === courseId);
            if(existingCourse){
                res.status(400).json({message:"Course already exists"});
                return;
            }
            cart.courses.push({
                courseId:course._id as mongoose.Types.ObjectId,
                tittle: course.tittle,
                price: course.price,
                thumbnail: course.thumbnail,
            })

            await cart.save();
        }else{
            const newCart = new Cart({
                userId,
                courses:[
                    {
                        courseId: course._id,
                        tittle: course.tittle,
                        price: course.price,
                        thumbnail: course.thumbnail,
                    }
                ]
            })
            await newCart.save();
        }

    res.status(200).json({ message: 'Course added to cart' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding course to cart', error });
    }
}

const removeFromCart = async (req: Request, res: Response) => {
    const { courseId, userId } = req.params;

    try {
        const result = await Cart.deleteOne({
            userId,
            "courses.courseId": courseId, // Match a specific course in the cart
        });

        if (result.deletedCount === 0) {
            res.status(404).json({ message: "Cart or course not found" });
            return;
        }
        res.status(200).json({ message: "Cart and course removed successfully" });
    } catch (error) {
        console.error("Error removing course from cart:", error);
        res.status(500).json({ message: "Error removing course from cart", error });
    }
};


export {addToCart, removeFromCart};