
import ForgotPasswordSkeleton from "../components/skeletons/ForgotPasswordSkeleton"
import { MessageSquare, Mail, Loader } from "lucide-react"
import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"
import { useAuthStore } from "../../store/useAuthStore"
import { useState } from "react"
const ForgotPassword = () => {

    const [email, setEmail] = useState<string>("")

    const { forgotPassword,sendingEmailToUser } = useAuthStore();


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            forgotPassword(email)
        }

    }


    return (
        <main className="flex bg-gray-200  ">

            <ForgotPasswordSkeleton />
            <div className="flex flex-col items-center justify-center w-[60%]">


                <div className="mx-4 w-[35rem] my-7 px-8 rounded-md h-96 flex flex-col gap-5 items-center justify-center bg-white">
                    <div className="flex flex-col gap-2 items-center justify-center ">
                        <div className="w-12 h-12 rounded-xl bg-fuchsia-950 flex items-center justify-center">
                            <MessageSquare className="w-6 h-6 text-primary" color='white' />
                        </div>
                        <h1 className="font-bold text-2xl font-sans">Forgot Your Password</h1>
                        <p className="text-gray-400 text-sm font-sans">Enter Your Email To Reset</p>
                    </div>

                    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">


                        <div className="form-control ">
                            <label className="label">
                                <span className="label-text font-medium text-gray-700">Email</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <Mail className="w-5 h-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    placeholder="Enter your Email"
                                    className="input input-bordered w-full bg-white border border-gray-300 focus:ring-2 focus:ring-primary pl-10 py-3 rounded-md"
                                    value={email}
                                    onChange={handleChange}

                                // value={formData.email}
                                // onChange={handleChange}

                                />
                            </div>
                        </div>

                        <button type="submit" className= "flex items-center justify-center  bg-fuchsia-950 w-full rounded-md px-8 py-3 hover:bg-fuchsia-900 duration-300 transition-all  text-white">
                            {
                                sendingEmailToUser ? <Loader className="animate-spin"/> :"Continue"
                            }
                        </button>

                    </form>
                    <div className="flex gap-2 justify-start items-start">
                        <Link to="/signin">
                            <ArrowLeft className="text-gray-500" />
                        </Link>

                        <p className="text-gray-500">Return to Login Page</p>
                    </div>

                </div>
            </div>
        </main>
    )
}

export default ForgotPassword
