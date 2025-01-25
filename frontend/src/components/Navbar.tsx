import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { Search, Bell, Heart, ChevronRight, LogOut, Edit, CreditCard, Wallet } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAuthStore } from '../../store/useAuthStore'
import { useLocation } from 'react-router-dom'

const categories = {
    Engineering: ['Civil', 'Mechanical', 'Electrical', 'Computer'],
    'Vocational Skills': ['Carpentry', 'Plumbing', 'Tailoring', 'Cooking'],
    'Basic Medical': ['Nursing', 'Pharmacy', 'Lab Science'],
    Agriculture: ['Crop Science', 'Animal Science', 'Agri-Tech'],
    Education: ['Teaching', 'Educational Technology', 'Special Needs Education'],
};


type myComponentProp = {
    authUser: { user: { email: string, firstName: string, lastName: string } } | null
}
const Navbar = ({ authUser }: myComponentProp) => {
    const { logout } = useAuthStore();
    console.log(authUser);


    const [dropDown, setDropDown] = useState(false);
    const [profileDropDown, setProfileDropDown] = useState(false);
    const [subCategory, setSetSubCategory] = useState<keyof typeof categories | null>(null);
    const timeRefProfile = useRef<number | undefined>();
    const timeRef = useRef<number | undefined>();

    const handelMouseEnter = () => {
        clearTimeout(timeRef.current);
        setDropDown(true)
    }

    const handelMouseLeave = () => {
        timeRef.current = setTimeout(() => {
            setDropDown(false)
            setSetSubCategory(null);
        }, 300)
    }


    const handleProfileOpen = () => {
        clearTimeout(timeRefProfile.current);
        setProfileDropDown(true);
    }

    const handleProfileClose = () => {
        timeRefProfile.current = setTimeout(() => {
            setProfileDropDown(false)
        }, 300)
    }

    const truncateText = (text: string, maxLength: number) => {
        return text.length > maxLength ? text.slice(0, maxLength) + "...." : text;
    }

    const handleCategory = (category: string) => {
        setSetSubCategory(category as keyof typeof categories);
    }


    const location = useLocation();
    return (
        <nav className='flex justify-between items-center py-4 px-2 border-b-[1px]  border-b-slate-400 w-full'>

            <div className='flex items-center gap-12'>
                <ul>
                    <Link to="/">GuidEd</Link>
                </ul>

                <div className="cursor-pointer relative hover:bg-[#b4ade1] flex items-center justify-center p-2 rounded-md transition">
                    <p
                        onMouseEnter={handelMouseEnter}
                        onMouseLeave={handelMouseLeave}
                    >Explore
                        {dropDown && (
                            <motion.div

                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 20 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.6, ease: "easeInOut" }}
                                className="bg-[#ffffff] shadow-lg border-[1px] border-gray-300 rounded-md p-6 flex gap-6 absolute justify-center items-start top-16 z-40 "
                                onMouseLeave={handelMouseLeave}
                            >
                                <ul className="flex flex-col gap-4 w-48">
                                    <p className="border-b-2 border-b-black">Course Category</p>
                                    {Object.keys(categories).map((category) => (
                                        <li
                                            key={category}
                                            className="cursor-pointer flex justify-between hover:bg-[#b4ade1] transition-all duration-300 px-4 py-2"
                                            onMouseEnter={() => handleCategory(category)}
                                        >
                                            <p className="text-left">{category}</p>
                                            <ChevronRight />
                                        </li>
                                    ))}
                                </ul>

                                {subCategory && (
                                    <motion.ul
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.6, ease: "easeInOut" }}
                                        className="px-8 py-6 flex flex-col gap-4 items-center w-48 bg-[#ae99d8] rounded-md">
                                        <p className="border-b-2 border-b-black">{subCategory}</p>
                                        {categories[subCategory].map((sub) => (
                                            <motion.li
                                                initial={{ opacity: 0, y: -20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                transition={{ duration: 0.6, ease: "easeInOut" }}
                                                key={sub} className="cursor-pointer">
                                                <Link to="" className='hover:bg-[#b4ade1] transition-all duration-300 px-4 py-2 whitespace-pre'>{sub}</Link>
                                            </motion.li>
                                        ))}
                                    </motion.ul>
                                )}
                            </motion.div>
                        )}

                    </p>
                </div>

                <div className='relative'>
                    <input type="text" className='px-8 py-2 border-2 border-black outline-none  rounded-full' placeholder='Search Here' />
                    <Search className='absolute top-0 transform translate-y-1/2 right-3' size={23} />
                </div>


            </div>


            {

                authUser ? (

                    <div className='flex items-center gap-3'>


                        {
                            location.pathname !== "/instructor" && (

                                <div className="cursor-pointer hover:bg-[#b4ade1] flex items-center justify-center p-2 rounded-md transition">
                                    <Link to="instructor">Become an Instructor</Link>
                                </div>
                            )
                        }



                        <div className="cursor-pointer hover:bg-[#b4ade1] flex items-center justify-center p-2 rounded-md transition">
                            <p>All Courses</p>
                        </div>

                        <div className="cursor-pointer hover:bg-[#b4ade1] flex items-center justify-center p-2 rounded-md transition">
                            <Heart className='hover:text-[#2e2472]' />
                        </div>

                        <div className="cursor-pointer hover:bg-[#b4ade1] flex items-center justify-center p-2 rounded-md transition">
                            <Bell className='hover:text-[#2e2472]' />
                        </div>

                        <div className=" cursor-pointer hover:bg-[#b4ade1] flex items-center justify-center p-2 rounded-md transition">
                            <ShoppingCart className=" hover:text-[#2e2472]" />
                        </div>

                        <div className='cursor-pointer relative bg-black flex items-center justify-center p-2 rounded-full transition'
                            onMouseEnter={handleProfileOpen}
                            onMouseLeave={handleProfileClose}
                        >
                            <p className='text-white'>
                                {
                                    profileDropDown && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.6, ease: "easeInOut" }}
                                            className='absolute top-16 right-9 px-5 py-8 text-black  w-80 rounded-md bg-[#ffffff] shadow-lg border-[1px] border-gray-300  z-20'>
                                            <div className='flex gap-5 '>
                                                <div className='cursor-pointer relative bg-black flex items-center justify-center p-4 rounded-full transition '>
                                                    <p className='text-white'>{authUser.user.firstName[0].toUpperCase()} {authUser.user.lastName[0].toUpperCase()}</p>
                                                    <div className='bg-[#9185de] w-2 h-2 rounded-full absolute top-0 right-[4px]'>
                                                    </div>
                                                </div>

                                                <div className='mt-3'>
                                                    <p className='text-[1.2rem]'>{authUser.user.firstName} {authUser.user.lastName}</p>
                                                    <p className='text-[0.8rem]'>{truncateText(authUser?.user.email ?? '', 15)}</p>
                                                </div>

                                            </div>

                                            <hr className='my-4 h-2 w-full ' />



                                            <motion.div
                                                initial={{ opacity: 1, x: 0 }}
                                                whileHover={{ scale: 1.05, x: 10 }}
                                                transition={{ type: "spring", stiffness: 300 }}
                                                className='flex justify-between'
                                            >
                                                <p onClick={logout}>Log Out</p>
                                                <LogOut />
                                            </motion.div>

                                            <hr className='my-4 h-2 w-full ' />

                                            <motion.div
                                                initial={{ opacity: 1, x: 0 }}
                                                whileHover={{ scale: 1.05, x: 10 }}
                                                transition={{ type: "spring", stiffness: 300 }}
                                                className='flex justify-between'
                                            >
                                                <p>Edit Profile</p>
                                                <Edit />
                                            </motion.div>

                                            <hr className='my-4 h-2 w-full ' />

                                            <motion.div
                                                initial={{ opacity: 1, x: 0 }}
                                                whileHover={{ scale: 1.05, x: 10 }}
                                                transition={{ type: "spring", stiffness: 300 }}
                                                className='flex justify-between'
                                            >
                                                <p>Order History</p>
                                                <CreditCard />
                                            </motion.div>

                                            <hr className='my-4 h-2 w-full ' />

                                            <motion.div
                                                initial={{ opacity: 1, x: 0 }}
                                                whileHover={{ scale: 1.05, x: 10 }}
                                                transition={{ type: "spring", stiffness: 300 }}
                                                className='flex justify-between'
                                            >
                                                <p>Wallet</p>
                                                <Wallet />
                                            </motion.div>

                                        </motion.div>
                                    )
                                }
                                {authUser.user.firstName[0].toUpperCase()} {authUser.user.lastName[0].toUpperCase()}</p>
                            <div className='bg-[#9185de] w-2 h-2 rounded-full absolute top-0 right-[4px]'>

                            </div>
                        </div>



                    </div>
                ) : <div className='flex gap-5 '>
                    <Link to="signin" className='hover:bg-[#d4d1e9] px-8 py-2 border-2 rounded-md text-[#9185de] bg-white border-[#9185de]  transform duration-300'>Login</Link>
                    <Link to="signup" className='bg-[#9185de] px-8 py-2 border-2 border-[#9185de] hover:bg-[#7e6ee9] rounded-md transform duration-300'>Signup</Link>

                </div>}
        </nav>
    )
}

export default Navbar
