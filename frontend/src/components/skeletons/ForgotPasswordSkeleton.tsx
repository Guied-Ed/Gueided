import React from 'react'
import Logo from "../../assets/999.png"
const ForgotPasswordSkeleton = () => {
    return (
        <div className='bg-fuchsia-950 rounded-tr-[5rem] rounded-br-[20rem] w-[40%] h-screen'>
            <div className='flex flex-col items-center justify-center mt-4'>
                <div className='flex flex-col'>

                  
                    <h1 className='text-2xl text-white text-center font-sans'>GUIDED</h1>
                    {/* <h1 className=' text-white'> A SMART LEARNING PLARTFORM</h1> */}
                      <img src={Logo} 
                    className='w-80 h-60 object-cover  border-2 mt-4 rounded-tl-[5rem] rounded-br-[40rem]'
                    />
                </div>

        
            </div>
        </div>
    )
}

export default ForgotPasswordSkeleton
