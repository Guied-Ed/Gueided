
import { Navigate, Route, Routes } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import { useAuthStore } from '../store/useAuthStore';
import { useEffect } from "react";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import InstructorHome from "./InstructorPages/InstructorHome";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import { Loader } from "lucide-react";
import CourseSetup from "./InstructorPages/CourseSetup";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";
import EditPage from "./pages/EditPage";
import PaymentSuccess from "./pages/PaymentSuccess";
import { useLocation } from "react-router-dom";
import VerifyEmail from "./pages/VerifyEmail";
import Footer from "./components/Footer";
import MyLearning from "./pages/MyLearning";
import { useNavigate } from "react-router-dom";
import ForgotPassword from "./pages/ForgotPassword";
import ForgotPasswordRedirect from "./pages/ForgotPasswordRedirect";
import { useMatch } from "react-router-dom";
const App = () => {

  const navigate = useNavigate();

  const { authUser, checkAuth, isCheckingAuth } = useAuthStore() as { authUser: { user: { _id: string, email: string, firstName: string, lastName: string, biography: string } } | null, checkAuth: () => void, isCheckingAuth: boolean };

  useEffect(() => {
    checkAuth()
  }, [checkAuth])


  //  const matchCourseDetail = useMatch("/course/:courseId");
  const matchResetPassword = useMatch("/reset-password/:token");

  const location = useLocation();
  const path = ["/payment-success", "/verify-email", "/signup", "/signin", "/course/:courseId", "/instructor", "/course/set-up", "/cart", "/payment", "/edit-profile", "/forgotPassword", "/reset-password/:token"]




  const shouldHideLayout = path.includes(location.pathname) || matchResetPassword;


  if (isCheckingAuth && !authUser) {
    navigate("/signin");
    return
  }
  return (
    <div >

      {
        !shouldHideLayout && <Navbar authUser={authUser} />
      }


      {/* {
        !shouldHideLayout && <Footer />
      } */}
      <Routes >
        <Route path="/course/:courseId" element={<CourseDetail />} />
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={!authUser ? <SignUp /> : <Navigate to="/" />} />
        <Route path="/signin" element={!authUser ? <SignIn /> : <Navigate to="/" />} />
        <Route path="/instructor" element={<InstructorHome />} />
        <Route path="/all-courses" element={<Courses />} />
        <Route path="/course/set-up" element={authUser && <CourseSetup />} />
        <Route path="/my-learning" element={authUser && <MyLearning />} />
        <Route path="/cart" element={authUser && <Cart />} />
        <Route path="/payment" element={authUser && <Payment />} />
        <Route path="/edit-profile" element={authUser && <EditPage
          authUser={authUser}
        />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ForgotPasswordRedirect />} />

        <Route path="/verify-email" element={<VerifyEmail />} />
      </Routes>

       {
        !shouldHideLayout && <Footer />
      }
      <Toaster position="top-right" reverseOrder={false} />
    </div>

  )
}

export default App
