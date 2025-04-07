import { useForm } from "react-hook-form";
import InputField from "../../components/SignUp/InputField";
import Button from "../../components/SignUp/Button";
import SubmissionStatus from "../../components/SignUp/SubmissionStatus";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock, FaEnvelope, FaHome } from "react-icons/fa";
import { motion } from "framer-motion";
import ResetPassword from "../../components/login/ResetPassword.jsx";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      console.log(data);
      setSubmissionStatus({
        type: "success",
        message: "Login successful! Redirecting...",
      });
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (error) {
      setSubmissionStatus({
        type: "error",
        message: error.message || "Login failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const fadeInAnimation = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeInOut", delay: 0.2 },
  };

  const slideInLeft = {
    initial: { x: -100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.8, ease: "easeInOut" },
  };

  return (
    <div className="flex min-h-screen w-full bg-gray-100 overflow-hidden">
      {/* Left Side - Background Color & Content */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-900 to-teal-500 relative">
        {/* Content Over Gradient */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center p-10 text-center"
          variants={slideInLeft}
          initial="initial"
          animate="animate"
        >
          <div className="text-white max-w-md">
            <motion.div
              className="mb-4"
              variants={{
                animate: {
                  scale: [1, 1.2, 1, 1.2, 1],
                  rotate: [0, 10, 0, -10, 0],
                  transition: { duration: 2, repeat: Infinity },
                },
              }}
              animate="animate"
            >
              <FaHome className="mx-auto text-5xl text-white" />
            </motion.div>
            <motion.h2
              className="text-4xl font-extrabold mb-4 tracking-tight"
              variants={{
                animate: {
                  y: [0, -10, 0],
                  opacity: 1,
                  transition: { duration: 1, repeat: Infinity, repeatType: "reverse" },
                },
              }}
              animate="animate"
            >
              "Effortless Hotel Management Starts Here!"
            </motion.h2>
            <motion.p
              className="text-xl leading-relaxed"
              variants={{
                animate: {
                  opacity: 1,
                  transition: { duration: 1.5 },
                },
              }}
              animate="animate"
            >
              Simplify your operations, enhance guest experiences, and drive
              profitability with our intuitive dashboard.
            </motion.p>
            <motion.div
              className="mt-8"
              variants={{
                animate: {
                  opacity: 1,
                  transition: { duration: 2 },
                },
              }}
              animate="animate"
            >
              <p className="text-gray-200 italic">
                "The key is not to prioritize what's on your schedule, but to
                schedule your priorities."
              </p>
              <span className="block mt-2 text-sm text-gray-300">- Mahder Tesfaye</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full md:w-1/2 bg-white py-12 px-6 flex items-center justify-center">
        {/* Form Container */}
        <div className="w-full max-w-md">
          {/* Logo - Using hotelicon.svg from public folder */}
          <div className="flex justify-center mb-8">
            <img src="/hotelicon.svg" alt="Hotel Logo" className="h-16" />
          </div>

          <motion.h1
            className="text-center mb-8 text-3xl font-extrabold text-gray-800"
            variants={fadeInAnimation}
            initial="initial"
            animate="animate"
          >
            Welcome Back!
          </motion.h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Input with Icon */}
            <motion.div variants={fadeInAnimation} initial="initial" animate="animate">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-3 py-2 sm:text-sm border-gray-300 rounded-md"
                  placeholder="you@example.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </motion.div>

            {/* Password Input with Icon */}
            <motion.div variants={fadeInAnimation} initial="initial" animate="animate">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  type="password"
                  id="password"
                  placeholder="********"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-3 py-2 sm:text-sm border-gray-300 rounded-md"
                  {...register("password", { required: "Password is required" })}
                />
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </motion.div>

            {/* Remember Me & Forgot Password */}
            <motion.div variants={fadeInAnimation} initial="initial" animate="animate">
              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm text-gray-700">
                  <input
                    type="checkbox"
                    {...register("remember")}
                    className="mr-2 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  Remember me
                </label>
                <ResetPassword />
              </div>
            </motion.div>

            {/* Login Button */}
            <motion.div variants={fadeInAnimation} initial="initial" animate="animate">
              <Button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-md shadow-md transition duration-300 ease-in-out"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </motion.div>

            {/* Wrap adjacent elements */}
            <>
              <SubmissionStatus
                status={submissionStatus}
                onClose={() => setSubmissionStatus(null)}
              />
            </>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;