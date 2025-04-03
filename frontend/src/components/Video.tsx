import React from 'react';
import Guided from '../../src/assets/GuidEd.mp4';

const Video = () => {
    return (
        <main className='w-full flex flex-col sm:flex-row justify-between gap-10 items-center p-4 sm:p-8 bg-white'>
            {/* Video Section */}
            <div className='w-full sm:w-1/2'>
                <video
                    autoPlay
                    muted
                    loop
                    src={Guided}
                    className='w-full rounded-t-3xl sm:rounded-l-full border-2 border-black shadow-lg'
                >
                    Your Browser does not support video
                </video>
            </div>

            {/* Text Section */}
            <div className="flex flex-col gap-4 sm:gap-8 w-full sm:w-1/2">
                <p className='text-2xl sm:text-3xl font-bold'>
                    📚 Master New Skills with Guided!
                </p>
                <p className='text-xl sm:text-2xl font-bold'>
                    🚀 Master Skills Hands-On
                </p>
                <p className='text-base sm:text-lg'>
                    🚀 <strong>Prove Mastery Through Hands-On Learning</strong> – Engage in interactive lessons and real-world projects that solidify your understanding.
                </p>
                <p className='text-base sm:text-lg'>
                    🎓 <strong>Gain In-Demand Skills from Industry Experts</strong> – Learn directly from professionals who bring years of experience and practical insights.
                </p>
                {/* Uncomment these if needed */}
                {/* <p className='text-base sm:text-lg'>
                    🤝 <strong>Collaborate and Grow with a Thriving Community</strong> – Join discussions, share ideas, and connect with like-minded learners and mentors.
                </p>
                <p className='text-base sm:text-lg'>
                    📚 <strong>Stay Ahead with Constantly Updated Content</strong> – Access the latest knowledge and evolving industry trends to keep your skills sharp.
                </p> */}
            </div>
        </main>
    );
};

export default Video;