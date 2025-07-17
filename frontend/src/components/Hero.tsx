import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import Image1 from "../assets/E1.jpg";
import Image2 from "../assets/E2.jpg";
import Image3 from "../assets/E3.jpg";
import Image4 from "../assets/E4.jpg";
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";
import { ArrowRight, PlayCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useState } from "react";

const Hero: React.FC = () => {
    const images: string[] = [Image1, Image2, Image3, Image4];

    const [showModal, setShowModal] = useState(false);



    const navigate = useNavigate()
    return (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 w-full min-h-screen flex flex-col lg:flex-row items-center justify-center p-6 md:p-12 gap-8">
            {/* Text Content */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="max-w-2xl lg:mr-12"
            >
                <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-4">
                    Master Any Course With Expert Guidance
                </h1>

                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                    Transform your learning experience with the power of personal guidance.
                    Our platform connects you with expert tutors for a tailored educational journey.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 relative" >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all"
                        onClick={() => navigate("/all-courses")}
                    >
                        Get Started
                        <ArrowRight className="w-4 h-4 " />
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center justify-center gap-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-white px-6 py-3 rounded-lg font-medium border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                        onClick={() => setShowModal(!showModal)}
                    >
                        <PlayCircle className="w-5 h-5" />
                        Watch Demo
                    </motion.button>
                </div>
            </motion.div>


            {showModal && <motion.div className=" flex flex-col gap-3 justify-center items-center absolute top-10 rounded-md w-52 right-12 bg-white border-lime-800  p-4 h-44 z-50"
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 40 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                exit={{opacity:0, y:0}}
            >

                <X className="absolute top-2 right-3" onClick={()=> setShowModal(false)}/>

                <div className="flex flex-col items-center justify-center">
                    <p className="text-black font-sans font-semibold text-sm"> You will be redirected to </p>
                    <p className="text-black font-sans font-semibold text-sm"> Our Offical Page</p>
                    <p className="text-black font-sans font-semibold text-sm">To Get You Started</p>
                </div>
                <div className="flex justify-between gap-3">

                  
                    <button className="flex w-full items-center justify-center text-sm gap-2 bg-white dark:bg-green-800 text-green-800 dark:text-white px-2 py-1 rounded-lg  border border-gray-300 dark:border-green-600 hover:bg-green-100 dark:hover:bg-green-700 transition-all">
                   Go to Youtube
                    </button>
                </div>
            </motion.div>
            }


            {/* Image Slider */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="w-full max-w-2xl"
            >
                <Swiper
                    modules={[Autoplay, Pagination]}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false
                    }}
                    pagination={{
                        clickable: true,
                        bulletClass: 'swiper-pagination-bullet dark:!bg-white/50',
                        bulletActiveClass: '!bg-blue-600 dark:!bg-blue-400'
                    }}
                    loop={true}
                    className="w-full h-64 sm:h-96 rounded-2xl overflow-hidden shadow-xl border-4 border-white dark:border-gray-700"
                >
                    {images.map((image, index) => (
                        <SwiperSlide key={index}>
                            <div
                                className="w-full h-full bg-cover bg-center"
                                style={{ backgroundImage: `url(${image})` }}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </motion.div>
        </div>
    );
};

export default Hero;