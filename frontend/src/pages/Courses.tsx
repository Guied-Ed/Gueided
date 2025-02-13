import React, { useState, useEffect } from 'react';
import { useCourseStore } from '../../store/useCourseStore';
import { Loader, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';

const Courses = () => {
    const { getCourses, isFetchingData, courseContainer, addToCart, addingToCart } = useCourseStore();
    const { authUser } = useAuthStore() as unknown as { authUser: { user: any } };
    const [loadingCourseId, setLoadingCourseId] = useState<string | null>(null);
    const userID = authUser?.user._id;

    useEffect(() => {
        getCourses();
    }, []);

    const handleAddToCart = async (courseId: string) => {
        setLoadingCourseId(courseId);
        await addToCart(courseId, userID);
        setLoadingCourseId(null);
    };

    return (
        <div>
            <div className="p-6 bg-gray-100 min-h-screen">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Courses</h1>

                {/* Conditional Rendering */}
                {courseContainer.length === 0 ? (
                    <div className="text-center text-gray-600">
                        <p className="text-xl">Courses Not Found</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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