import React from 'react';

const StatsBanner = () => {
    const stats = [
        { label: "Enrolled Students", value: "12,000+" },
        { label: "Courses Available", value: "500+" },
        { label: "Certificates Issued", value: "8,000+" },
    ];

    return (
        <div className="relative bg-cover bg-center text-white p-12 rounded-lg shadow-md mt-8 -z-10" style={{ backgroundImage: 'url("/path-to-your-blur-bg.jpg")' }}>
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>
            <div className="relative z-10 flex flex-col items-center">
                <p className="text-3xl font-bold mb-4">Join Our Growing Community</p>
                <div className="flex gap-12">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <p className="text-4xl font-extrabold">{stat.value}</p>
                            <p className="text-lg">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StatsBanner;
