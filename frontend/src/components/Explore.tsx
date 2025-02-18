import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';
import CourseCategories from './Category';

const Explore = () => {
    const [isScrollingDown, setIsScrollingDown] = useState(false);
    const checkpointRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const checkpoint = checkpointRef.current ? checkpointRef.current.getBoundingClientRect().top + window.scrollY : 0;

            if (currentScrollY > lastScrollY && currentScrollY >= checkpoint) {
                setIsScrollingDown(true);
            } else if (currentScrollY < lastScrollY && currentScrollY < checkpoint) {
                setIsScrollingDown(false);
            }

            lastScrollY = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className='mt-12 bg-[#121212] text-white py-10'>
            <div className='flex flex-col gap-4 z-30'>
                <motion.div
                    initial={{ opacity: 0, y: -60 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -60 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <p className='text-center text-4xl font-bold text-gray-200'>
                        Explore Courses in Your Field of Interest
                    </p>
                </motion.div>

                <motion.div
                    ref={checkpointRef}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 40 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className='px-4 py-3 flex gap-2 w-full items-center justify-center '
                >
                    <motion.div className='bg-[#1e1e1e] flex gap-6 px-5 py-4 rounded-lg shadow-lg border border-gray-600 text-gray-300'>
                        <p className='text-lg font-semibold'>All Categories</p>
                        {isScrollingDown ? <ArrowUp className='text-gray-400' /> : <ArrowDown className='text-gray-400' />}
                    </motion.div>
                </motion.div>
            </div>

            <CourseCategories />
        </div>
    );
};

export default Explore;