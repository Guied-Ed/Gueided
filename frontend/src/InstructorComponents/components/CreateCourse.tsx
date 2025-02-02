import React, { useState } from 'react'

const CreateCourse = () => {
  const [step, setStep] = useState(1);
  const [tittle, setTittle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [level, setLevel] = useState("");
  const [price, setPrice] = useState(0);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [videos, setVideos] = useState<File[] | null>([]);
  const [videosDetails, setVideosDetails] = useState<{ title: string, duration: number, description: string }[]>([]);

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setThumbnail(e.target.files[0]);
    }
  }

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedVideos = Array.from(e.target.files);
      setVideos(selectedVideos);

      const videoDetails = selectedVideos.map(video => ({
        title: video.name,
        duration: 0,
        description: ""
      }));

      setVideosDetails(videoDetails);
    }
  }

  const handleVideosTittleChange = (index: number, field: "title" | "duration" | "description", value: string | number) => {
    const updatedDetails = [...videosDetails];
    updatedDetails[index] = { ...updatedDetails[index], [field]: value };
    setVideosDetails(updatedDetails);
  }


  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit logic here
  }

  const nextStep = () => {
    setStep((prev) => prev + 1);
  }

  const prevStep = () => {
    setStep((prev) => prev - 1);
  }

  return (
    <div className='w-full '>
      <h1>Create Your Course</h1>
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <>
            <input
              placeholder='What is Your Course Tittle'
              value={tittle}
              onChange={(evt) => setTittle(evt.target.value)}
              className='border-2 w-full p-4'
            />
            <textarea
              placeholder='What is your Course description?'
              value={description}
              onChange={(evt) => setDescription(evt.target.value)}
              className='border-2 w-full p-4'
            />
            <label htmlFor='category'>Category</label>
            <select
              id='category'
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              className='border-2 w-full p-4'
            >
              <option value="">Select a Category</option>
              <option value="web-development">Web Development</option>
              <option value="mobile-development">Mobile Development</option>
              <option value="data-science">Data Science</option>
              <option value="design">Design</option>
              <option value="marketing">Marketing</option>
            </select>
          </>
        )}

        {step === 2 && (
          <>
            <label htmlFor='duration'>Course Duration</label>
            <input
              id='duration'
              placeholder='How long will the course take?'
              type='number'
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className='border-2 w-full p-4'
            />
            <label htmlFor='price'>Course Price</label>
            <input
              id='price'
              placeholder='What is Your Course Price'
              type='number'
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className='border-2 w-full p-4'
            />
            <label htmlFor='level'>Who is Your Course For</label>
            <select
              id='level'
              className='border-2 w-full p-4'
              onChange={(e) => setLevel(e.target.value)}
              value={level}
            >
              <option value="">Select Level</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </>
        )}

        {step === 3 && (
          <>
            <label htmlFor='thumbnail'>Course Thumbnail</label>
            <input
              type='file'
              accept='image/*'
              onChange={handleThumbnailChange}
              className='border-2 w-full p-4'
            />
            <label htmlFor='videos'>Course Videos</label>
            <input
              className='border-2 w-full p-4'
              type='file'
              accept='video/*'
              onChange={handleVideoChange}
              multiple
            />
            {videosDetails.length > 0 && (
              <div className='mb-4'>
                <h1 className='text-center text-2xl'>Videos Details</h1>
                {videosDetails.map((video, index) => (
                  <div key={index}>
                    <label>Tittle:</label>
                    <input
                     className="border p-2 w-full"
                      type='text'
                      value={video.title}
                      onChange={(e) => handleVideosTittleChange(index, "title", e.target.value)}
                    />
                    <label className="block mt-2">Duration (minutes):</label>
                    <input
                      type="number"
                      value={video.duration}
                      onChange={(e) => handleVideosTittleChange(index, "duration", Number(e.target.value))}
                      className="border p-2 w-full"
                    />
                    <label className="block mt-2">Description:</label>
                    <textarea
                      value={video.description}
                      onChange={(e) => handleVideosTittleChange(index, "description", e.target.value)}
                      className="border p-2 w-full"
                    />
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {step === 4 && (
          <div>
            {/* Final review or submit step */}
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
              Submit Course
            </button>
          </div>
        )}

        <div className='flex items-center justify-center mt-4'>
          {step > 1 && (
            <button onClick={prevStep} className="w-32 bg-gray-500 text-white p-2 rounded mr-2">
              Prev
            </button>
          )}
          {step < 4 && (
            <button onClick={nextStep} className="w-32 bg-gray-500 text-white p-2 rounded mr-2">
              Next
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default CreateCourse;
