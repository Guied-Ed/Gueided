
import { Route, Routes } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
const App = () => {
  return (
    <div>

<Navbar/>
      <Routes >
        <Route path="/" element={<Home/>}/>
      </Routes>

      <Toaster position="top-right" reverseOrder={false}/>
    </div>

  )
}

export default App
