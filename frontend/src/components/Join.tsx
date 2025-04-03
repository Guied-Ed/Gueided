import React from "react";
import { motion } from "framer-motion";
import Banner from "../assets/still-life-books-versus-technology (1).jpg";

const Join = () => {
  return (
    <main className="relative w-full mt-8">
      {/* Background Image */}
      <div className="relative w-full">
        <img src={Banner} className="w-full sm:h-auto h-screen rounded-e-full rounded-t-md" alt="Join Guided" />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 p-6 text-white space-y-8">
          
          {/* Title */}
          <motion.h1 
            className="sm:text-4xl text-2xl font-bold"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Why Join <span className="text-yellow-400">Guided?</span>
          </motion.h1>

          {/* Funny & Catchy Reasons */}
          <div className="max-w-2xl text-center space-y-6">
            <motion.p 
              className="sm:text-3xl text-xl"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              🚀 **Boost Your Brainpower!** Learn skills that make you say, *"Why didn't they teach me this in school?"*
            </motion.p>

            <motion.p 
              className="sm:text-lg text-sm"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.2 }}
            >
              🎯 **Courses That Don’t Bore You!** Our lessons are like a good movie—exciting, engaging, and no falling asleep!
            </motion.p>

            <motion.p 
              className="sm:text-lg text-sm"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.4 }}
            >
              💡 **Learn from the Best!** Our instructors are so smart, even Google asks them questions.
            </motion.p>

            <motion.p 
              className="sm:text-lg text-sm"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.6 }}
            >
              🎓 **Get Certified & Show Off!** Earn certificates that make your LinkedIn profile *scream* success!
            </motion.p>
          </div>

          {/* Subscription Form */}
          <motion.div 
            className="bg-white text-black p-6 rounded-lg shadow-lg w-full max-w-md"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.8 }}
          >
            <h3 className="text-xl font-semibold mb-4 text-center">🚀 Join Our Learning Revolution!</h3>
            <form className="space-y-4">
              <input 
                type="text" 
                placeholder="Your Name" 
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <input 
                type="email" 
                placeholder="Your Email" 
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button 
                type="submit" 
                className="w-full bg-yellow-400 text-black py-2 rounded-md font-bold hover:bg-yellow-500 transition-all"
              >
                📩 Subscribe Now
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default Join;
