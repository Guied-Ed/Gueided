import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Autoplay } from "swiper/modules";
import Image1 from "../assets/E1.jpg";
import Image2 from "../assets/E2.jpg";
import Image3 from "../assets/E3.jpg";
import Image4 from "../assets/E4.jpg";

// Import Swiper styles (minimal, only needed parts for functionality)
import 'swiper/css';
import 'swiper/css/pagination';  // Only import pagination styles
import 'swiper/css/navigation';  // Only import navigation styles

const Hero: React.FC = () => {
    const images: string[] = [Image1, Image2, Image3, Image4];

    return (

        <div className="bg-slate-400  my-8 w-full h-64 ">
            <div>
                <p>Hello World</p>
            </div>
            <div className="w-36 h-36">
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
                                className="w-full h-full bg-cover bg-center"
                                style={{ backgroundImage: `url(${image})` }}
                            ></div>
                        </SwiperSlide>
                    ))}
                </Swiper>

            </div>
        </div>

    );
};

export default Hero;
