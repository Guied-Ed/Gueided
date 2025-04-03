import React from 'react'
import { FacebookIcon, TwitterIcon, InstagramIcon, GithubIcon } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full mt-14">
      <main className="w-full flex flex-col rounded-md h-screen items-center justify-between bg-gray-900">
        {/* Social Media Section */}
        <section className="w-full py-4 h-[20%] px-4 md:px-8 bg-[#937ac6] rounded-t-md flex flex-col md:flex-row justify-between items-center gap-4">
          <p className='text-white text-sm md:text-[1.1rem] font-bold text-center md:text-left'>
            Get connected with us on Social Media
          </p>

          <div className='flex gap-4'>
            <FacebookIcon className="text-white" size={24} />
            <TwitterIcon className="text-white" size={24} />
            <InstagramIcon className="text-white" size={24} />
            <GithubIcon className="text-white" size={24} />
          </div>
        </section>

        {/* Links Section */}
        <section className="w-full h-70% bg-gray-900 px-4 md:px-6 pt-8 pb-4 flex flex-col md:flex-row justify-between items-start">
          <div className='flex flex-col gap-2 p-2 md:p-4 text-white items-center md:items-start w-full md:w-auto mb-6 md:mb-0'>
            <h1 className='text-white text-xl md:text-[1.5rem] font-bold'>GuidEd</h1>
            <hr className="w-full border-gray-400" />

            <p className="text-sm md:text-base text-center md:text-left">We are Guided, Your success is our priority</p>
            <p className="text-sm md:text-base text-center md:text-left">Lets Explore the world of education together</p>
            <p className="text-sm md:text-base text-center md:text-left">Join us in our mission to make learning</p>
            <p className="text-sm md:text-base text-center md:text-left">accessible to all</p>
          </div>
          
          <div className='flex flex-col gap-2 p-2 md:p-4 text-white items-center md:items-start w-full md:w-auto mb-6 md:mb-0'>
            <h1 className='text-white text-xl md:text-[1.5rem] font-bold'>About</h1>
            <hr className="w-full border-gray-400" />

            <p className="text-sm md:text-base">About Us</p>
            <p className="text-sm md:text-base">Careers</p>
            <p className="text-sm md:text-base">Contact us</p>
            <p className="text-sm md:text-base">Blogs</p>
          </div>
          
          <div className='flex flex-col gap-2 p-2 md:p-4 text-white items-center md:items-start w-full md:w-auto mb-6 md:mb-0'>
            <h1 className='text-white text-xl md:text-[1.5rem] font-bold'>Affiliates</h1>
            <hr className="w-full border-gray-400" />

            <p className="text-sm md:text-base">Next Gen Medics</p>
          </div>

          <div className='flex flex-col gap-2 p-2 md:p-4 text-white items-center md:items-start w-full md:w-auto'>
            <h1 className='text-white text-xl md:text-[1.5rem] font-bold'>Support</h1>
            <hr className="w-full border-gray-400" />

            <p className="text-sm md:text-base">FAQs</p>
            <p className="text-sm md:text-base">Terms and Conditions</p>
            <p className="text-sm md:text-base">Privacy Policy</p>
          </div>
        </section>

        {/* Copyright Section */}
        <section className="w-full py-4 h-[10%] bg-gray-950 flex justify-center items-center">
          <p className="text-white text-xs md:text-sm text-center">
            © {new Date().getFullYear()} Guided.com. All rights reserved.
          </p>
        </section>
      </main>
    </footer>
  )
}

export default Footer