import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Autoplay } from "swiper/modules";
import Image1 from "../assets/E1.jpg";
import Image2 from "../assets/E2.jpg";
import Image3 from "../assets/E3.jpg";
import Image4 from "../assets/E4.jpg";
import {motion} from 'framer-motion'

// Import Swiper styles (minimal, only needed parts for functionality)
import 'swiper/css';
import 'swiper/css/pagination';  // Only import pagination styles
import 'swiper/css/navigation';  // Only import navigation styles
import { Link } from "react-router-dom";

const Hero: React.FC = () => {
    const images: string[] = [Image1, Image2, Image3, Image4];

    return (

        <div className="bg-gray-100  mt-12 w-full  h-96  grid grid-cols-2 ">

             <motion.div 
             initial={{opacity:0, x:-20}}
             animate={{opacity:1, x:0}}
             exit={{opacity:0,x:-20}}
             transition={{duration:0.8, delay:0.3}}
             className="px-6 py-8">
                <div className="mb-4">
                    <p className="text-5xl font-serif">Master Any Course <br/> With Expert Guidance <br/> One Step At a Time </p>
                </div>

                <div className="mb-6 ">
                    <p className="text-[0.8rem]">Transfrom Your Learning experience with <br /> power of personal guidance</p>
                </div>

                <div className="flex gap-4 items-center">
                    <Link to="" className="bg-[#937ac6] p-3 border-2 border-emerald-950">Get Started</Link>
                    <Link to="" className="bg-white border-2 border-black p-3">Learn More</Link>
                </div>
            </motion.div>
            <motion.div
             initial={{opacity:0, y:30}}
             animate={{opacity:1, y:0}}
             exit={{opacity:0,y:30}}
             transition={{duration:0.8, delay:0.3}}
            className=" px-6 py-6">
                <Swiper
                    modules={[Autoplay, Pagination]}
                    autoplay={{ delay: 3000 }}  // Set autoplay to 5 minutes (300,000 ms)
                    pagination={{ clickable: true }}
                    loop={true}
                    className="w-full h-full"
                >
                    {images.map((image, index) => (
                        <SwiperSlide key={index}>
                            <div
                                className="w-full h-full bg-cover bg-center border-4 rounded-md border-black"
                                style={{ backgroundImage: `url(${image})` }}
                            ></div>
                        </SwiperSlide>
                    ))}
                </Swiper>

            </motion.div>
        </div>

    );
};

export default Hero;
