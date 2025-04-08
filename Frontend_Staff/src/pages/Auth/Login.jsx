import { useForm } from "react-hook-form";
import Button from "../../components/SignUp/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock, FaEnvelope, FaHome } from "react-icons/fa";
import { motion } from "framer-motion";
import ResetPassword from "../../components/login/ResetPassword.jsx";

const SimpleSubmissionStatus = ({ status, onClose }) => {
  if (!status) return null;

  const bgColor = status.type === 'success' ? 'bg-green-100 border-green-400 text-green-700' : 'bg-red-100 border-red-400 text-red-700';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`border px-4 py-3 rounded relative mt-4 ${bgColor}`}
      role="alert"
    >
      <span className="block sm:inline">{status.message}</span>
      <button
        onClick={onClose}
        className="absolute top-0 bottom-0 right-0 px-4 py-3"
      >
        <span className="text-2xl leading-none">×</span>
      </button>
    </motion.div>
  );
};


const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = "http://localhost:3000/api/v1";

  const onSubmit = async (data) => {
    setLoading(true);
    setSubmissionStatus(null);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/staff/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || `HTTP error! status: ${response.status}`);
      }

      if (responseData.success) {
        console.log(responseData);
        localStorage.setItem('authToken', responseData.token);

        setSubmissionStatus({
          type: "success",
          message: responseData.message || "Login successful! Redirecting...",
        });

        setTimeout(() => navigate("/dashboard"), 1500);

      } else {
        throw new Error(responseData.message || "Login failed. Please check your credentials.");
      }

    } catch (error) {
        console.error("Login Error:", error);
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
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-900 to-teal-500 relative">
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

      <div className="w-full md:w-1/2 bg-white py-12 px-6 flex items-center justify-center">
        <div className="w-full max-w-md">
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
            <motion.div variants={fadeInAnimation} initial="initial" animate="animate">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-3 py-2 sm:text-sm border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="you@example.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email address" },
                  })}
                  aria-invalid={errors.email ? "true" : "false"}
                />
              </div>
              {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
            </motion.div>

            <motion.div variants={fadeInAnimation} initial="initial" animate="animate">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  type="password"
                  id="password"
                  placeholder="********"
                  className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-3 py-2 sm:text-sm border rounded-md ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                  {...register("password", { required: "Password is required" })}
                  aria-invalid={errors.password ? "true" : "false"}
                />
              </div>
              {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>}
            </motion.div>

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

             <SimpleSubmissionStatus
               status={submissionStatus}
               onClose={() => setSubmissionStatus(null)}
             />


            <motion.div variants={fadeInAnimation} initial="initial" animate="animate">
              <Button
                type="submit"
                className="w-full flex justify-center items-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-md shadow-md transition duration-300 ease-in-out disabled:opacity-50"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </motion.div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;