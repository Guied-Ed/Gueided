import React, { useState, useEffect } from 'react';
import { useCourseStore } from '../../store/useCourseStore';
import { Loader, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';

const Courses = () => {
    const { getCourses, isFetchingData, getCoursesBySearch, courseContainer, addToCart, addingToCart } = useCourseStore();
    const { authUser } = useAuthStore() as unknown as { authUser: { user: any } };
    const [loadingCourseId, setLoadingCourseId] = useState<string | null>(null);
    const userID = authUser?.user._id;
    const [selectedPrice, setSelectedPrice] = useState("");

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const category = queryParams.get("category");
        const subCategory = queryParams.get("subcategory");

        if (category || subCategory) {
            getCoursesBySearch({ category, subCategory });
        } else {
            getCourses();
        }
    }, [location.search]);

    const handleAddToCart = async (courseId: string) => {
        setLoadingCourseId(courseId);
        await addToCart(courseId, userID);
        setLoadingCourseId(null);
    };

    return (
        <div className="p-8 bg-white min-h-screen text-gray-900">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Explore Courses</h1>

            <div className="flex justify-center  mb-10">
                <div className="w-full sm:w-2/3 md:w-1/2 bg-white shadow-xl rounded-xl sm:flex flex-col gap-4 items-center sm:justify-between justify-center  px-6 py-4 border border-gray-200">
                    <button className="text-lg font-semibold  sm:mb-0 mb-5 px-6 py-2 rounded-xl bg-gray-100 hover:bg-primary transition-all duration-300 text-gray-900" onClick={getCourses}>
                        All Courses
                    </button>
                    <select className="text-lg font-semibold px-6 py-2 sm:mb-0 mb-5 rounded-xl bg-gray-100 hover:bg-primary transition-all duration-300 text-gray-900" onChange={(e) => {
                        const selectedValue = e.target.value;
                        setSelectedPrice(selectedValue);
                        getCoursesBySearch({ sort: selectedValue })
                    }}>
                        <option value="">Sort by Price</option>
                        <option value="-price">High to Low</option>
                        <option value="price">Low to High</option>
                    </select>
                    <select className="text-lg font-semibold px-6 py-2 sm:mb-0 mb-5 rounded-xl bg-gray-100 hover:bg-primary transition-all duration-300 text-gray-900">
                        <option value="">Sort by Rating</option>
                        <option value="Highest Rated">Highest Rated</option>
                        <option value="Lowest Rated">Lowest Rated</option>
                    </select>
                </div>
            </div>

            {courseContainer.length === 0 ? (
                <div className="text-center text-gray-500 mt-10">
                    <p className="text-xl">No courses available at the moment.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-16">
                    {courseContainer.map((course, index) => (
                        <div key={index} className="bg-white rounded-xl  shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                            <img src={course.thumbnail} alt={course.tittle} className="w-full h-44 object-cover" />
                            <div className="p-6">
                                <Link to={`/course/${course._id}`}>
                                    <h2 className="text-2xl font-semibold text-gray-900 mb-3">{course.tittle}</h2>
                                    <p className="text-gray-600 mb-4">{course.description}</p>
                                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                        <span>Category: {course.category}</span>
                                        <span>Level: {course.level}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                        <span>Duration: {course.duration} hours</span>
                                        <span>Price: ${course.price}</span>
                                    </div>
                                    <p className="text-sm text-gray-500 mb-4">
                                        Instructor: {course.instructor?.firstName} {course.instructor?.lastName}
                                    </p>
                                </Link>
                                <div className="w-full flex items-center justify-center">
                                    <button
                                        className="bg-primary text-white bg-black w-full py-3 rounded-md transition-all duration-300 flex items-center justify-center hover:bg-zinc-950 hover:text-white"
                                        onClick={() => handleAddToCart(course._id)}
                                        disabled={loadingCourseId === course._id}
                                    >
                                        {loadingCourseId === course._id ? <Loader2 className="animate-spin" /> : 'Add to Cart'}
                                    </button>
                                   
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {isFetchingData && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                    <Loader size={64} className="animate-spin text-primary" />
                </div>
            )}
        </div>
    );
};

export default Courses;
