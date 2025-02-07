
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
const App = () => {


  const { authUser, checkAuth ,  isCheckingAuth} = useAuthStore() as { authUser: { user: { email: string, firstName: string, lastName: string } } | null, checkAuth: () => void , isCheckingAuth:boolean};

  useEffect(() => {
    checkAuth()
  }, [checkAuth])




  if(isCheckingAuth && !authUser){
    return (
      <div className="flex justify-center items-center h-screen">
      <Loader className="size-10 animate-spin"/>
      </div>
    )
  } 
  return (
    <div >

      <Navbar
        authUser={authUser}
      />
      <Routes >
        <Route path="/course/:courseId" element={<CourseDetail />} />
        <Route path="/" element={authUser ? <Home /> : <Navigate to="/signin" />} />
        <Route path="/signup" element={!authUser ? <SignUp /> : <Navigate to="/" />} />
        <Route path="/signin" element={!authUser ? <SignIn /> : <Navigate to="/" />} />
        <Route path="/instructor" element={ <InstructorHome /> } />
        <Route path="/all-courses" element={<Courses />} />
        <Route path="/course/set-up" element={authUser && <CourseSetup />}/>
        <Route path="/cart" element={authUser && <Cart/>}/>
      </Routes>

      <Toaster position="top-right" reverseOrder={false} />
    </div>

  )
}

export default App
