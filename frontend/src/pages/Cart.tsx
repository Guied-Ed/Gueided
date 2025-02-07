import React from 'react'
import { useCourseStore } from '../../store/useCourseStore'
import { useAuthStore } from '../../store/useAuthStore';
import { useEffect } from 'react';
const Cart = () => {

  const {authUser} = useAuthStore()as unknown as {authUser: {user:any}};
  const {getCarts} = useCourseStore();
  
  const userID =  authUser?.user._id;
  console.log(userID)
  useEffect(()=>{
    getCarts(userID);
  },[])
  return (
    <div>
      <h1 className='text-3xl font-bold text-center mt-5 mb-9'>Shopping Carts </h1>
    </div>
  )
}

export default Cart
