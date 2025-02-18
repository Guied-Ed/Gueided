import React, { useEffect } from "react";
import { useCourseStore } from "../../store/useCourseStore";
import { useAuthStore } from "../../store/useAuthStore";
import { Loader, Trash2 } from "lucide-react";
import { ArrowRightIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { authUser } = useAuthStore() as unknown as { authUser: { user: any } };
  const { getCarts, courseCarts, isFetchingCarts, isRemovingFromCart, removeFromCart } = useCourseStore();
  const navigate = useNavigate();
  const userID = authUser?.user._id;

console.log(courseCarts)

  useEffect(() => {
    getCarts(userID);
  }, []);

  // Calculate total price of the cart
  let courseCartPrice = courseCarts.flatMap((c) => c.courses?.map((cd) => cd.price));
  const totalPrice = courseCartPrice?.reduce((sum, price) => sum + price, 0);

  console.log("Courses Data:", courseCarts.flatMap(cart => cart.courses));


  // Navigate and pass the course data to the payment page
  const handleCheckout = () => {
    const cartSummary = courseCarts.flatMap((cart) =>
      cart.courses?.map((course) => ({
        id: course.courseId, 
        title: course.tittle,
        price: course.price,
        duration: course.duration,
        level: course.level,
        thumbnail: course.thumbnail,
      }))
    );

    navigate("/payment", { state: { cartSummary, totalPrice } });
  };

  if (isFetchingCarts)
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <Loader size={64} className="animate-spin" />
      </div>
    );

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-center mt-5 mb-9">🛒 Shopping Cart</h1>

      {courseCarts.length === 0 ? (
        <div className="flex items-center justify-center mt-40">
          <p className="text-3xl font-bold">🚫 No Courses in Cart Yet</p>
        </div>
      ) : (
        <div className="w-full max-w-6xl grid md:grid-cols-3 gap-8">
          {/* Course List */}
          <div className="md:col-span-2 bg-gray-900 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Your Courses</h2>
            <div className="space-y-6">
              {courseCarts.map((cart) =>
                cart.courses?.map((course) => (
                  <div key={course.courseId} className="flex items-center gap-6 p-4 border-b border-gray-700">
                    <img className="w-24 h-24 rounded-lg object-cover" src={course.thumbnail} alt={course.tittle} />
                    <div className="flex flex-col flex-grow">
                      <p className="text-lg font-bold">{course.tittle}</p>
                      <p className="text-sm text-gray-400">
                        ⏳ {course.duration} Hrs | 📈 {course.level}
                      </p>
                      <p className="text-lg font-semibold text-green-400">#{course.price}</p>
                    </div>
                    <button
                      className="p-3 bg-red-600 hover:bg-red-500 rounded-lg transition duration-200"
                      onClick={() => removeFromCart(course.courseId, userID)}
                    >
                      {isRemovingFromCart ? <Loader size={16} className="animate-spin" /> : <Trash2 size={20} />}
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Checkout Summary */}
          <div className="bg-gray-900 p-6 rounded-lg h-64 shadow-lg flex flex-col justify-between">
            <h2 className="text-2xl font-semibold mb-4">🛍️ Order Summary</h2>
            <div className="text-lg font-medium flex justify-between">
              <p>Total:</p>
              <p className="text-green-400">#{totalPrice}</p>
            </div>
            <button
              onClick={handleCheckout}
              className="mt-6 w-full p-4 bg-blue-600 hover:bg-blue-500 transition duration-200 text-white flex items-center gap-4 justify-center rounded-lg"
            >
              Proceed to Checkout <ArrowRightIcon />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
