import React from 'react'
import { useCourseStore } from '../../store/useCourseStore'
import { useAuthStore } from '../../store/useAuthStore';
import { useEffect } from 'react';
import { Loader } from 'lucide-react';
const Cart = () => {

  const { authUser } = useAuthStore() as unknown as { authUser: { user: any } };
  const { getCarts, courseCarts, isFetchingCarts } = useCourseStore();

  const userID = authUser?.user._id;
  console.log(userID)
  useEffect(() => {
    getCarts(userID);
  }, [])

const cartLenghts = courseCarts.length;

  
  if (isFetchingCarts) return (
    <div className='flex items-center justify-center h-screen '>
      <Loader size={64} className='animate-spin'/>
    </div>)
  return (
    <div className='flex flex-col justify-center items-center'>
      <h1 className='text-3xl font-bold text-center mt-5 mb-9'>Shopping Carts </h1>
      <hr className='w-3/4'/>
      <div className='grid sm:grid-cols-2 grid-cols-1 gap-12 py-8'>
        
        <div>
<p>{cartLenghts}</p>
        </div>

        <div>
        <h1>Hello Here</h1>
        </div>
      </div>
    </div>
  )
}

export default Cart
