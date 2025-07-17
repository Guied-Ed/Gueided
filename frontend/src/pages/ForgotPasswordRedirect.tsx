import { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ForgotPasswordRedirect = () => {
  const { token } = useParams<{ token: string }>();
  const { resetPassword, resetingPassword } = useAuthStore();

  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  if (!token) return <Navigate to="/forgotPassword" />;

  const navigate = useNavigate()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password === confirmPassword) {
     const success = await resetPassword(password, token);
     if(success){
        navigate("/signin");
         toast.success("Password reset successfully, you can now login with your new password");
     }else{
       toast.error("Failed to reset password");
     }
    } else {
      console.log("Passwords do not match");
    }
  };

  // Animation variant for loader bars
  const bounceVariant = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className=" bg-fuchsia-950 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md text-white animate-fade-in">
        <h2 className="text-2xl font-semibold mb-6 text-center text-white">
          Reset Your Password
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium">New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-white/30 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
              placeholder="Enter new password"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-white/30 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
              placeholder="Confirm new password"
              required
            />
          </div>
          <button
            type="submit"
            disabled={resetingPassword}
            className="mt-4 bg-fuchsia-600 hover:bg-fuchsia-700 transition-all duration-300 text-white font-medium py-2 rounded-md disabled:opacity-50 flex items-center justify-center gap-2 h-11"
          >
            {resetingPassword ? (
              <div className="flex gap-1 items-center">
                <motion.div
                  className="w-1.5 h-5 bg-white rounded-sm"
                  variants={bounceVariant}
                  animate="animate"
                />
                <motion.div
                  className="w-1.5 h-5 bg-white rounded-sm"
                  variants={bounceVariant}
                  animate="animate"
                  transition={{ delay: 0.1 }}
                />
                <motion.div
                  className="w-1.5 h-5 bg-white rounded-sm"
                  variants={bounceVariant}
                  animate="animate"
                  transition={{ delay: 0.2 }}
                />
              </div>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      </div>
    </main>
  );
};

export default ForgotPasswordRedirect;
