import React, { useState } from 'react';

const GettingStarted = () => {
    const [activeTab, setActiveTab] = useState(0);

    const steps = [
        {
            title: "Plan Your Curriculum",
            content: `
            Planning your curriculum is the foundation of a successful course. 
            - Start by identifying your target audience and their learning needs.
            - Break down the course into modules and lessons for a structured approach.
            - Include exercises, quizzes, or assignments to enhance engagement and retention.
            - Review and revise your plan to ensure it's concise and comprehensive.
            `,
        },
        {
            title: "Record Your Videos and Publish",
            content: `
            Creating high-quality videos is key to engaging your students.
            - Use professional equipment or even your smartphone with proper lighting and audio.
            - Record clear and concise lectures, avoiding unnecessary jargon.
            - Edit your videos to include visuals, slides, or animations for better understanding.
            - Upload your content to our platform and preview it before publishing.
            `,
        },
        {
            title: "Promote Your Course",
            content: `
            Promoting your course helps you reach a wider audience.
            - Share your course links on social media platforms like Facebook, Instagram, and LinkedIn.
            - Create short, engaging trailers to highlight key features of your course.
            - Encourage satisfied learners to leave positive reviews and testimonials.
            - Collaborate with influencers or blogs in your niche to boost visibility.
            `,
            
        },
    ];

    return (
        <div className="flex flex-col items-center gap-6 p-6 rounded-lg shadow-md mt-12">
            <p className="text-3xl font-bold mb-6">Tips For You</p>
            <div className="flex gap-8 justify-center">
                {steps.map((step, index) => (
                    <p
                        key={index}
                        className={`cursor-pointer text-2xl font-bold ${
                            activeTab === index ? 'border-b-4 border-black' : 'text-gray-500'
                        }`}
                        onClick={() => setActiveTab(index)}
                    >
                        {step.title}
                    </p>
                ))}
            </div>

            <div className="text-center mt-4 gap-4">
                <p className="  text-xl font-light text-gray-800 whitespace-pre-line mb-2">{steps[activeTab].content}</p>
            </div>
        </div>
    );
};

export default GettingStarted;
