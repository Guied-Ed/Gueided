import React, { useEffect, useState } from 'react'
import { useAuthStore } from '../../../store/useAuthStore';
import toast from 'react-hot-toast';
import { useCourseStore } from '../../../store/useCourseStore';
const CreateCourse = () => {

  
  const [step, setStep] = useState(1);
  const [tittle, setTittle] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory,setSubCategory] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [level, setLevel] = useState("");
  const [price, setPrice] = useState(0);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [videos, setVideos] = useState<File[] | null>([]);
  const [videoDetails, setVideosDetails] = useState<{ title: string, duration: number, description: string }[]>([]);


const { authUser } = useAuthStore() as unknown as { authUser: { user: any } };
const {creatingCourse,createCourses,getCategories,categoriesContainer} = useCourseStore();

let userId = authUser?.user._id;

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
    const updatedDetails = [...videoDetails];
    updatedDetails[index] = { ...updatedDetails[index], [field]: value };
    setVideosDetails(updatedDetails);
  }


const validatDetails = () =>{
  if(!tittle) return toast.error("Course Title is Required");
  if(!category) return toast.error("Course Category is Required");
  if(!description) return toast.error("Course Description is Required");
  if(!duration) return toast.error("Course Duration is Required");
  if(!level) return toast.error("Course Level is Required");  
  if(!price) return toast.error("Course Price is Required");
  if(!thumbnail) return toast.error("Course Thumbnail is Required");
  if(videos?.length === 0) return toast.error("Course videos is Required");


  return true;

}


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();


    const success = validatDetails();

    if(success === true){
      const formData = new FormData();

      formData.append("tittle", tittle);
      formData.append("description", description);
      formData.append("duration", duration.toString());
      formData.append("category", category);
      formData.append("price", price.toString());
      formData.append("level", level);

      if(thumbnail) formData.append("thumbnail", thumbnail);

      videos?.forEach(videos => formData.append("videos", videos));
      formData.append("videoDetails", JSON.stringify(videoDetails));

      createCourses(formData,userId)
    }


    
    // Submit logic here
  }

  const nextStep = () => {
    setStep((prev) => prev + 1);
  }

  const prevStep = () => {
    setStep((prev) => prev - 1);
  }
  useEffect(()=>{
    getCategories();
  },[])

  console.log(categoriesContainer)

  return (
    <div className='w-full '>
      <h1 className='text-center text-2xl mb-10'>Create Your Course</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        {step === 1 && (
          <>
          <label htmlFor='tittle'>Course Tittle</label>
            <input
            id='tittle'
              placeholder='What is Your Course Tittle'
              value={tittle}
              onChange={(evt) => setTittle(evt.target.value)}
              className='border-2 w-full p-4'
            />
            <label htmlFor='description'>Course Description</label>
            <textarea
            id='description'
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
              {Object.keys(categoriesContainer).map((cat)=> (
                <option key={cat} value={cat}>{cat}</option>
              ))}
           
            </select>

            {category && categoriesContainer[category].length > 0 && (
                <div>
                <label htmlFor="subCategory" className="block font-medium">Subcategory</label>
                <select
                  id="subCategory"
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                  className="border-2 w-full p-3 rounded"
                >
                  <option value="">Select a Subcategory</option>
                  {categoriesContainer[category].map((subCat) => (
                    <option key={subCat} value={subCat}>
                      {subCat}
                    </option>
                  ))}
                </select>
              </div>
            )}
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
              <option value="Beginner">Beginner</option>
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
            {videoDetails.length > 0 && (
              <div className='mb-4'>
                <h1 className='text-center text-2xl'>Videos Details</h1>
                {videoDetails.map((video, index) => (
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

        {step === 3 && (
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
          {step < 3 && (
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
