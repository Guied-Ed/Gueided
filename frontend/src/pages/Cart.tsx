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


  console.log(courseCarts)
  const cartLenghts = courseCarts.length;


  if (isFetchingCarts) return (
    <div className='flex items-center justify-center h-screen '>
      <Loader size={64} className='animate-spin' />
    </div>)
  return (
    <div className='flex flex-col'>

      <h1 className='text-3xl font-bold text-center mt-5 mb-9'>Shopping Carts </h1>


      {
        courseCarts.length === 0 ? (
          <div className='flex items-end justify-center mt-40'>
            <p className='text-4xl font-bold'> No Course In Cart Yet </p>
          </div>
        ) :

          <div className='flex justify-between items-center gap-12 py-8 px-8'>


            {
              courseCarts.map((cart) => (
                <div className='w-full'>

                  <div className=''>
                    <hr className='w-full' />
                  </div>
                  {
                    cart.courses?.map((course) => (

                      <div className='flex items-center mt-4 gap-6 '>
                        <img
                          className='w-20'
                          src={course.thumbnail}
                        />
                        <div className='flex flex-col gap-3'>
                        <p className='text-[1.2rem] font-bold'>{course.tittle}</p>
                        <p></p>
                        </div>

                      </div>))
                  }
                </div>
              ))
            }
            <div>

            </div>

            <div className='w-full'>
              <h1>Hello Here</h1>
            </div>
          </div>
      }
    </div>
  )
}

export default Cart





