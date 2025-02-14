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

        if(category || subCategory) {
            getCoursesBySearch({category,subCategory})
        }else{
            getCourses();
        }
    
    }, [location.search]);

    const handleAddToCart = async (courseId: string) => {
        setLoadingCourseId(courseId);
        await addToCart(courseId, userID);
        setLoadingCourseId(null);
    };

    return (
        <div>
            <div className="p-6 bg-gray-100 min-h-screen">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Courses</h1>

                {/* Fixed Div Below the Title */}
                <div
                    className="w-1/2 mx-auto bg-white/30 backdrop-blur-md shadow-xl text-black py-4 rounded-full flex items-center justify-center border border-white/10 space-x-4"
                >
                    <button className="text-lg font-semibold px-6 py-2 rounded-full hover:bg-black hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105" onClick={getCourses}>
                        All
                    </button>
                    <div >
                        <select className="text-lg font-semibold px-6 py-2 rounded-full hover:bg-black hover:text-white transition-all duration-300 ease-in-out transform " onChange={(e) => {
                            const selectedValue = e.target.value;
                            setSelectedPrice(selectedValue);
                            getCoursesBySearch({sort:selectedValue})

                        }}>
                            <option value="">Select Price</option>
                            <option value="-price">High to Low</option>
                            <option value="price">Low to High</option>

                        </select>
                    </div>
                    <div >
                        <select className="text-lg font-semibold px-6 flex items-center justify-center py-2 rounded-full hover:bg-black hover:text-white transition-all duration-300 ease-in-out transform ">
                            <option value="" >Select Ratings</option>
                            <option value="Highest Rated">Highest Rated</option>
                            <option value="Lowest Rated">Lowest Rated</option>
                        </select>
                    </div>
                </div>
                {/* Conditional Rendering */}
                {courseContainer.length === 0 ? (
                    <div className="text-center text-gray-600">
                        <p className="text-xl">Courses Not Found</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-20">
                        {courseContainer.map((course, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                            >
                                <img
                                    src={course.thumbnail}
                                    alt={course.tittle}
                                    className="w-full h-40 object-cover"
                                />
                                <div className="p-4">
                                    <Link to={`/course/${course._id}`}>
                                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                            {course.tittle}
                                        </h2>
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
                                            Instructor: {course.instructor.firstName}{" "}
                                            {course.instructor.lastName}
                                        </p>
                                    </Link>
                                    <div className="w-full flex items-center justify-center">
                                        <button
                                            className="mx-auto bg-black text-white w-80 flex items-center justify-center px-4 py-3 rounded-md hover:bg-neutral-800"
                                            onClick={() => handleAddToCart(course._id)}
                                            disabled={loadingCourseId === course._id}
                                        >
                                            {loadingCourseId === course._id ? (
                                                <Loader2 className="animate-spin" />
                                            ) : (
                                                'Add to Cart'
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Loading Overlay */}
            {isFetchingData && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                    <Loader size={64} className="animate-spin relative" />
                </div>
            )}
        </div>
    );
};

export default Courses;