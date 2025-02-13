import React from 'react'
import { useCourseStore } from '../../store/useCourseStore'
import { useAuthStore } from '../../store/useAuthStore';
import { useEffect } from 'react';
import { Loader } from 'lucide-react';
import { ArrowRightIcon } from 'lucide-react';
const Cart = () => {
  const { authUser } = useAuthStore() as unknown as { authUser: { user: any } };
  const { getCarts, courseCarts, isFetchingCarts, isRemovingFromCart, removeFromCart, courseContainer } = useCourseStore();
  const userID = authUser?.user._id;
  console.log(userID);
  const courseId = courseContainer.map((c) => c._id);
  useEffect(() => {
    getCarts(userID);
  }, [])

  // console.log(courseCarts)
  // const cartLenghts = courseCarts.length;

console.log(courseCarts)

  let courseCartPrice = courseCarts.flatMap(c=> c.courses?.map(cd=> cd.price));
  const totalPrice = courseCartPrice?.reduce((sum,price)=> sum + price , 0) ;

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

          <div className='flex justify-between items-start gap-12 py-8 px-8'>
            {
              courseCarts.map((cart) => (
                <div className='w-full flex flex-col gap-8 '>


                  {
                    cart.courses?.map((course) => (
                      <>



                        <div className='flex items-center mt-4 gap-14  '>

                          <img
                            className='w-20'
                            src={course.thumbnail}
                          />
                          <div className='flex flex-col gap-1'>
                            <div className='flex justify-between gap-1 items-end'>
                              <p className='text-[1.2rem] font-bold'>{course.tittle}</p>
                              <p className='text-[1.2rem] '>Price: <span className='font-bold'>#{course.price}</span></p>

                            </div>

                            <div className='flex mt-4 gap-2'>
                              <p>Course Duration:   <span className='font-bold'>{course.duration}Hrs</span></p>
                              <p>Level:   <span className='font-bold'>{course.level}</span></p>
                            </div>
                          </div>
                          <button className='bg-red-800 border-2 border-red-800 hover:bg-white transition duration-300 hover:text-black w-28 rounded-md text-white p-2 flex items-center justify-center' onClick={() => removeFromCart(course.courseId, userID)}>
                            {
                              isRemovingFromCart ? <Loader size={8} className='animate-spin' /> : "Remove"
                            }
                          </button>

                        </div>
                        <hr className='w-full' />
                      </>
                    ))

                  }


                </div>

              ))
            }
            <div>
            </div>
            <div className='w-[40%] flex gap-5 flex-col'>
              <h1 className='text-2xl'>Total:</h1>
              <p className='text-2xl font-bold'>#{totalPrice}</p>
              <button className='w-full p-4 bg-sky-800 hover:bg-sky-700 transition duration-200 text-white flex items-center gap-4 justify-center'>
                <p>Proceed To Check out</p>
                <ArrowRightIcon/>
              </button>
            </div>
          </div>
      }
    </div>
  )
}

export default Cart





