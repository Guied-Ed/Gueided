import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';
import CourseCategories from './Category';

const Explore = () => {
    const [isScrollingDown, setIsScrollingDown] = useState(false);
    const checkpointRef = useRef<HTMLDivElement>(null); // Reference to the checkpoint element

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Get the position of the checkpoint element
            const checkpoint = checkpointRef.current ? checkpointRef.current.getBoundingClientRect().top + window.scrollY : 0;

            // Determine if the scroll has passed the checkpoint
            if (currentScrollY > lastScrollY && currentScrollY >= checkpoint) {
                setIsScrollingDown(true);
            } else if (currentScrollY < lastScrollY && currentScrollY < checkpoint) {
                setIsScrollingDown(false);
            }

            lastScrollY = currentScrollY; // Update the last scroll position
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className='mt-12'>
            <div className='flex flex-col gap-4 z-30'>
                <motion.div
                    initial={{ opacity: 0, y: -60 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -60 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <p className='text-center text-4xl font-bold '>
                        Explore Courses in Your Field of Interest
                    </p>
                </motion.div>

                <motion.div
                    ref={checkpointRef} // Assign ref to this element
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 40 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className='px-4 py-3 flex gap-2  w-full items-center justify-center '
                >
                    <motion.div className='bg-gray-200 flex gap-6 px-5 py-4'>
                        <p>All Categories</p>
                        {isScrollingDown ? <ArrowUp /> : <ArrowDown />}
                    </motion.div>
                </motion.div>
            </div>

            <CourseCategories />
        </div>
    );
};

export default Explore;
