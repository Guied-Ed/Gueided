import React from "react";
import { motion } from "framer-motion";

const Banner = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative overflow-hidden rounded-lg p-8 mt-12 shadow-2xl -z-10"
            style={{
                background: "linear-gradient(135deg, #1c1c1c, #4a4a4a, #1c1c1c)",
                color: "white",
            }}
        >
            {/* Background Accent Design */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-blue-500 opacity-30 rounded-full blur-3xl transform -translate-x-12 -translate-y-12"></div>
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-pink-500 opacity-30 rounded-full blur-3xl transform translate-x-12 translate-y-12"></div>

            {/* Content */}
            <h2 className="text-4xl font-extrabold mb-4 text-center">
                Ready to Create Your First Course?
            </h2>
            <p className="text-lg text-center mb-8">
                Turn your passion into a successful course. Inspire learners across the globe with your knowledge and expertise.
            </p>
            <div className="flex justify-center">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-black py-3 px-8 rounded-lg font-medium shadow-lg hover:bg-gray-200 transition"
                >
                    Get Started
                </motion.button>
            </div>
        </motion.div>
    );
};

export default Banner;
