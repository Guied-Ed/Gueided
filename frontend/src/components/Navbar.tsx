import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Bell, Heart, ChevronRight, LogOut, Edit, CreditCard, Wallet, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/useAuthStore';
import { useCourseStore } from '../../store/useCourseStore';

type MyComponentProp = {
    authUser: { user: { email: string, firstName: string, lastName: string } } | null;
};

const Navbar = ({ authUser }: MyComponentProp) => {
    const { logout } = useAuthStore();
    const { getCoursesBySearch, getCategories, categoriesContainer } = useCourseStore();
    const { getCourses } = useCourseStore();

    const [dropDown, setDropDown] = useState(false);
    const [profileDropDown, setProfileDropDown] = useState(false);
    const [subCategory, setSetSubCategory] = useState<keyof typeof categoriesContainer | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [searchValue, setSearchValue] = useState<string>("");
    const dropdownRef = useRef<HTMLDivElement>(null); // Ref for the dropdown to detect clicks outside


    let timeoutId:any;

    const timeoutRef = useRef<number | undefined>(undefined);

    const handleMouseEnter = () => {
      clearTimeout(timeoutRef.current); // Prevent hiding if still hovering
      setProfileDropDown(true);
    };
  
    const handleMouseLeave = () => {
      timeoutRef.current = setTimeout(() => {
        setProfileDropDown(false);
      }, 500); // Adjust delay time (in ms)
    };

    useEffect(() => {
        getCategories();
    }, []);

    const navigate = useNavigate();

    const handleCategoryClick = (category: string) => {
        navigate(`/all-courses?category=${encodeURIComponent(category)}`);
    };

    const handleSubCategoryClick = (subCategory: string) => {
        navigate(`/all-courses?subcategory=${encodeURIComponent(subCategory)}`);
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchValue) {
                getCoursesBySearch({ tittle: searchValue });
            } else {
                getCourses();
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchValue, getCoursesBySearch]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") getCoursesBySearch({ tittle: searchValue });
    };

    const handleCategory = (category: string) => {
        setSetSubCategory(category as keyof typeof categoriesContainer);
    };

    const location = useLocation();

    return (
        <>
            <nav className='flex sm:justify-between items-center py-4 px-2 border-b-[1px] border-b-slate-400 w-full'>
                <div className='flex items-center gap-12'>
                    <Menu className='flex sm:hidden' size={32} onClick={() => setIsOpen(!isOpen)} />
                    <ul className='sm:flex hidden'>
                        <Link to="/">GuidEd</Link>
                    </ul>
                    <div className="cursor-pointer relative hidden hover:bg-[#b4ade1] sm:flex items-center justify-center p-2 rounded-md transition">
                        <p onClick={() => setDropDown(!dropDown)}>Explore</p>
                        {dropDown && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 20 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.6, ease: "easeInOut" }}
                                className="bg-[#ffffff] shadow-lg border-[1px] border-gray-300 rounded-md p-6 flex gap-6 absolute justify-center items-start top-16 z-40"
                                ref={dropdownRef}
                            >
                                {/* Close Button */}
                                <X
                                    className="absolute top-2 right-2 cursor-pointer hover:text-gray-700"
                                    onClick={() => setDropDown(false)}
                                />

                                {/* Categories */}
                                <ul className="flex flex-col gap-4 w-48">
                                    <p className="border-b-2 border-b-black">Course Category</p>
                                    {Object.keys(categoriesContainer).map((category) => (
                                        <li
                                            key={category}
                                            className="cursor-pointer flex justify-between hover:bg-[#b4ade1] transition-all duration-300 px-4 py-2"
                                            onClick={() => handleCategory(category)}
                                        >
                                            <p className="text-left">{category}</p>
                                            <ChevronRight />
                                        </li>
                                    ))}
                                </ul>

                                {/* Subcategories (Side by Side) */}
                                {subCategory && (
                                    <motion.ul
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.6, ease: "easeInOut" }}
                                        className="px-8 py-6 flex flex-col gap-4 items-center w-48 bg-[#ae99d8] rounded-md"
                                    >
                                        <p className="border-b-2 border-b-black">{subCategory}</p>
                                        {categoriesContainer[subCategory].map((sub) => (
                                            <motion.li
                                                initial={{ opacity: 0, y: -20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                transition={{ duration: 0.6, ease: "easeInOut" }}
                                                key={sub}
                                                className="cursor-pointer w-full"
                                                onClick={() => handleSubCategoryClick(sub)}
                                            >
                                                <p className='hover:bg-[#b4ade1] transition-all duration-300 px-4 py-2 whitespace-pre'>{sub}</p>
                                            </motion.li>
                                        ))}
                                    </motion.ul>
                                )}
                            </motion.div>
                        )}
                    </div>
                    <div className='relative flex gap-6 w-full'>
                        <input
                            type="text"
                            className='sm:px-8 py-2 border-2 border-black outline-none w-44 px-6 sm:full rounded-full'
                            placeholder='Search Here'
                            onChange={(e) => setSearchValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <Search className='absolute top-0 transform translate-y-1/2 sm:block hidden right-3 ' size={23} />
                        <ul className='flex sm:hidden'>
                            <Link to="/" className='font-bold text-[1.3rem]'>GuidEd</Link>
                        </ul>
                    </div>
                </div>
                {location.pathname !== "/instructor" && (
                    <div className="cursor-pointer sm:flex md:flex hidden hover:bg-[#b4ade1] items-center justify-center p-2 rounded-md transition">
                        <Link to="instructor">Become an Instructor</Link>
                    </div>
                )}
                {authUser ? (
                    <div className='sm:flex hidden items-center gap-3'>
                        <div className="cursor-pointer hover:bg-[#b4ade1] flex items-center justify-center p-2 rounded-md transition">
                            <Link to="all-courses">All Courses</Link>
                        </div>
                        <div className="cursor-pointer hover:bg-[#b4ade1] flex items-center justify-center p-2 rounded-md transition">
                            <Heart className='hover:text-[#2e2472]' />
                        </div>
                        <div className="cursor-pointer hover:bg-[#b4ade1] flex items-center justify-center p-2 rounded-md transition">
                            <Bell className='hover:text-[#2e2472]' />
                        </div>
                        <div className="cursor-pointer hover:bg-[#b4ade1] flex items-center justify-center p-2 rounded-md transition">
                            <Link to="/cart"><ShoppingCart className="hover:text-[#2e2472]" /></Link>
                        </div>
                        <div
                            className='cursor-pointer relative bg-black flex items-center justify-center p-2 rounded-full transition'
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <p className='text-white'>
                                {authUser.user.firstName[0].toUpperCase()} {authUser.user.lastName[0].toUpperCase()}
                            </p>
                            <div className='bg-[#9185de] w-2 h-2 rounded-full absolute top-0 right-[4px]'></div>
                        </div>
                        {profileDropDown && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.6, ease: "easeInOut" }}
                                className='absolute top-16 right-9 px-5 py-8 text-black w-80 rounded-md bg-[#ffffff] shadow-lg border-[1px] border-gray-300 z-20'
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                <div className='flex gap-5'>
                                    <div className='cursor-pointer relative bg-black flex items-center justify-center p-4 rounded-full transition'>
                                        <p className='text-white'>{authUser.user.firstName[0].toUpperCase()} {authUser.user.lastName[0].toUpperCase()}</p>
                                        <div className='bg-[#9185de] w-2 h-2 rounded-full absolute top-0 right-[4px]'></div>
                                    </div>
                                    <div className='mt-3'>
                                        <p className='text-[1.2rem]'>{authUser.user.firstName} {authUser.user.lastName}</p>
                                        <p className='text-[0.8rem]'>{authUser.user.email}</p>
                                    </div>
                                </div>
                                <hr className='my-4 h-2 w-full' />
                                <motion.div
                                    initial={{ opacity: 1, x: 0 }}
                                    whileHover={{ scale: 1.05, x: 10 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    className='flex justify-between'
                                >
                                    <p onClick={logout}>Log Out</p>
                                    <LogOut />
                                </motion.div>
                                <hr className='my-4 h-2 w-full' />
                                <Link to="/edit-profile">
                                    <motion.div
                                        initial={{ opacity: 1, x: 0 }}
                                        whileHover={{ scale: 1.05, x: 10 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                        className='flex justify-between'
                                    >
                                        <p>Edit Profile</p>
                                        <Edit />
                                    </motion.div>
                                </Link>
                                <hr className='my-4 h-2 w-full' />
                                <motion.div
                                    initial={{ opacity: 1, x: 0 }}
                                    whileHover={{ scale: 1.05, x: 10 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    className='flex justify-between'
                                >
                                    <p>Order History</p>
                                    <CreditCard />
                                </motion.div>
                                <hr className='my-4 h-2 w-full' />
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
                        )}
                    </div>
                ) : (
                    <div className='sm:flex hidden gap-5'>
                        <Link to="signin" className='hover:bg-[#d4d1e9] px-8 py-2 border-2 rounded-md text-[#9185de] bg-white border-[#9185de] transform duration-300'>Login</Link>
                        <Link to="signup" className='bg-[#9185de] px-8 py-2 border-2 border-[#9185de] hover:bg-[#7e6ee9] rounded-md transform duration-300'>Signup</Link>
                    </div>
                )}
            </nav>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ x: "-100%", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: "-100%", opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className='bg-[#2e2472] shadow-lg p-8 h-screen flex flex-col sm:hidden fixed top-0 left-0 w-72 z-50'
                    >
                        <div className="cursor-pointer hover:bg-[#b4ade1] flex items-center justify-center p-2 rounded-md transition">
                            <Link to="all-courses">All Courses</Link>
                        </div>
                        <div className="cursor-pointer hover:bg-[#b4ade1] flex items-center justify-center p-2 rounded-md transition">
                            <Heart className='hover:text-[#2e2472]' />
                        </div>
                        <div className="cursor-pointer hover:bg-[#b4ade1] flex items-center justify-center p-2 rounded-md transition">
                            <Bell className='hover:text-[#2e2472]' />
                        </div>
                        <div className="cursor-pointer hover:bg-[#b4ade1] flex items-center justify-center p-2 rounded-md transition">
                            <Link to="/cart"><ShoppingCart className="hover:text-[#2e2472]" /></Link>
                        </div>
                        {/* Explore Component in Sidebar */}
                        <div className="relative">
                            <div className="cursor-pointer hover:bg-[#b4ade1] flex items-center justify-center p-2 rounded-md transition">
                                <p onClick={() => setDropDown(!dropDown)}>Explore</p>
                            </div>
                            {dropDown && (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.6, ease: "easeInOut" }}
                                    className="fixed top-0 left-0 h-full w-64 bg-[#ffffff] shadow-lg border-r-[1px] border-gray-300 overflow-y-auto z-50"
                                >
                                    <div className="p-6 flex flex-col gap-6">
                                        {/* Close Button */}
                                        <X
                                            className="absolute top-2 right-2 cursor-pointer hover:text-gray-700"
                                            onClick={() => setDropDown(false)}
                                        />

                                        {/* Categories */}
                                        <ul className="flex flex-col gap-4">
                                            <p className="border-b-2 border-b-black">Course Category</p>
                                            {Object.keys(categoriesContainer).map((category) => (
                                                <li
                                                    key={category}
                                                    className="cursor-pointer flex justify-between hover:bg-[#b4ade1] transition-all duration-300 px-4 py-2"
                                                    onClick={() => handleCategory(category)}
                                                >
                                                    <p className="text-left">{category}</p>
                                                    <ChevronRight />
                                                </li>
                                            ))}
                                        </ul>

                                        {/* Subcategories (Side by Side) */}
                                        {subCategory && (
                                            <motion.ul
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                transition={{ duration: 0.6, ease: "easeInOut" }}
                                                className="px-8 py-6 flex flex-col gap-4 items-center bg-[#ae99d8] rounded-md"
                                            >
                                                <p className="border-b-2 border-b-black">{subCategory}</p>
                                                {categoriesContainer[subCategory].map((sub) => (
                                                    <motion.li
                                                        initial={{ opacity: 0, y: -20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -20 }}
                                                        transition={{ duration: 0.6, ease: "easeInOut" }}
                                                        key={sub}
                                                        className="cursor-pointer w-full"
                                                        onClick={() => handleSubCategoryClick(sub)}
                                                    >
                                                        <p className='hover:bg-[#b4ade1] transition-all duration-300 px-4 py-2 whitespace-pre'>{sub}</p>
                                                    </motion.li>
                                                ))}
                                            </motion.ul>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </div>
                        {authUser ? (
                            <>
                                <div className="cursor-pointer hover:bg-[#b4ade1] flex items-center justify-center p-2 rounded-md transition">
                                    <Link to="/edit-profile">Edit Profile</Link>
                                </div>
                                <div className="cursor-pointer hover:bg-[#b4ade1] flex items-center justify-center p-2 rounded-md transition">
                                    <p onClick={logout}>Log Out</p>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="cursor-pointer hover:bg-[#b4ade1] flex items-center justify-center p-2 rounded-md transition">
                                    <Link to="signin">Login</Link>
                                </div>
                                <div className="cursor-pointer hover:bg-[#b4ade1] flex items-center justify-center p-2 rounded-md transition">
                                    <Link to="signup">Signup</Link>
                                </div>
                            </>
                        )}
                    </motion.div>
                    <div className='right-10 top-5 z-50 h-10 w-10 bg-[#2e2472] flex items-center justify-center rounded-full sm:hidden fixed'>
                        <X color='white' onClick={() => setIsOpen(false)} />
                    </div>
                </>
            )}
        </>
    );
};

export default Navbar;