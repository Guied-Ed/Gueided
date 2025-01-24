
import { Navigate, Route, Routes } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import {useAuthStore}  from '../store/useAuthStore';
import { useEffect } from "react";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
const App = () => {


  const { authUser, checkAuth } = useAuthStore() as { authUser: { user: { email: string,firstName:string,lastName:string } } | null, checkAuth: () => void };

  useEffect(()=>{
    checkAuth()
  },[checkAuth])
  return (
    <div>

<Navbar
authUser ={ authUser}
/>
      <Routes >
        <Route path="/" element={authUser ? <Home/> : <Navigate to="/signin"/>}/>
        <Route path="/signup" element={!authUser ? <SignUp/>: <Navigate to = "/"/>}/>
        <Route path="/signin" element={!authUser ? <SignIn/> : <Navigate to="/"/>}/>
      </Routes>

      <Toaster position="top-right" reverseOrder={false}/>
    </div>

  )
}

export default App
