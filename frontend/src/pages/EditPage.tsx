import React, { FormEvent, useEffect } from 'react'
import { useState } from 'react'
import { useAuthStore } from '../../store/useAuthStore'


type authProp ={
    authUser: { user: { _id:string  , email: string, firstName: string, lastName: string,biography:string } } | null
}

interface ChangeEvent {
    target:{
        name:string,
        value:string
    }
}
const EditPage = ({authUser}:authProp) => {


const {editProfile, editingProfile} = useAuthStore()
const userId = authUser?.user._id || '';

// fetching UserProfile Automatically //


// State variables for user Information //
const [formData,setFormData] = useState({firstName:"", lastName:"",biography:""});

useEffect(()=>{
    if(authUser){
       setFormData({
           firstName: authUser.user.firstName,
           lastName: authUser.user.lastName,
           biography:authUser.user.biography
       });
    }   
   },[authUser])

const handleChange = (evt:ChangeEvent) =>{
    const {name, value } = evt.target;
    setFormData((prev) => ({
        ...prev,
        [name]: value,
    }));
}


const handleSubmit = (e: FormEvent) =>{
    e.preventDefault();
    editProfile(userId,formData);
}




    return (
        <main className='flex flex-col items-center justify-center w-full h-screen'>
            <h1 className="text-3xl font-bold text-black">Edit My Profile</h1>
            <form className='w-full px-8 flex flex-col gap-4' onSubmit={handleSubmit}>
                <label htmlFor='firstName'>First Name </label>
                <input
                    id='firstName'
                    placeholder='First Name'
                    type='text'
                    className=' w-full p-4 border-[1px] border-gray-400'
                    value={formData.firstName}
                    onChange={handleChange}
                    name='firstName'
                />

                <label htmlFor='lastName'>Last Name</label>
                <input
                    id='lastName'
                    placeholder='Last Name'
                    type='text'
                    className=' w-full p-4 border-[1px] border-gray-400'
                    value={formData.lastName}
                    onChange={handleChange}
                    name='lastName'
                />

                <textarea
                    className=' w-full h-56 p-4 border-[1px] border-gray-400'
                    placeholder='Biography'
                    value={formData.biography}
                    onChange={handleChange}
                    name='biography'
                />

                <div className='flex items-center justify-center '>
                    <button type='submit' className='bg-black w-36 px-4 py-4 text-white transition duration-300 hover:bg-neutral-900' >
                        Edit Profile
                    </button>
                </div>
            </form>
        </main>
    )
}

export default EditPage
