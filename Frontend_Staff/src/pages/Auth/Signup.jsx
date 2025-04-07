import { useForm } from "react-hook-form";
import Button from "../../components/SignUp/Button";
import SubmissionStatus from "../../components/SignUp/SubmissionStatus";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserPlus, FaIdBadge, FaEnvelope, FaLock, FaHotel } from "react-icons/fa";
import { motion } from "framer-motion";

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
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
        message: "Staff account created successfully!",
      });
      setTimeout(() => navigate("/admin"), 3000);
    } catch (error) {
      setSubmissionStatus({
        type: "error",
        message: error.message || "Staff account creation failed",
      });
    } finally {
      setLoading(false);
    }
  };

  const validatePasswordMatch = (value) => {
    return value === watch("password") || "Passwords don't match";
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
    <div className="flex flex-col md:flex-row min-h-screen w-full bg-gray-100 overflow-hidden">
      {/* Left Side - Background Color & Content */}
      <div className="hidden md:flex w-full md:w-1/2 bg-gradient-to-br from-indigo-900 to-teal-500 relative">
        {/* Content */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center p-10 text-center"
          variants={slideInLeft}
          initial="initial"
          animate="animate"
        >
          <div className="text-white max-w-md">
            <motion.div
              className="mb-4"
              animate={{
                scale: [1, 1.2, 1, 1.2, 1],
                rotate: [0, 10, 0, -10, 0],
                transition: { duration: 2, repeat: Infinity },
              }}
            >
              <FaHotel className="mx-auto text-5xl text-white" />
            </motion.div>
            <motion.h2
              className="text-4xl font-extrabold mb-4 tracking-tight"
              animate={{
                y: [0, -10, 0],
                opacity: 1,
                transition: { duration: 1, repeat: Infinity, repeatType: "reverse" },
              }}
            >
              "Empower Your Team, Elevate Your Service!"
            </motion.h2>
            <motion.p
              className="text-xl leading-relaxed"
              animate={{
                opacity: 1,
                transition: { duration: 1.5 },
              }}
            >
              Effortlessly add new staff members and manage your team with ease.
            </motion.p>
            <motion.div
              className="mt-8"
              animate={{
                opacity: 1,
                transition: { duration: 2 },
              }}
            >
              <p className="text-gray-200 italic">
                "The strength of the team is each individual member. The
                strength of each member is the team."
              </p>
              <span className="block mt-2 text-sm text-gray-300">- Mahder Tesfaye</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="w-full md:w-1/2  bg-white py-12 px-6 flex items-center justify-center">
        {/* Form Container */}
        <div className="w-full max-w-md ">
          <motion.h1
            className="text-center mb-20 text-3xl font-extrabold text-gray-800"
            variants={fadeInAnimation}
            initial="initial"
            animate="animate"
          >
            Create Admin Account
          </motion.h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
         

            {/* First Name and Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* First Name */}
              <motion.div variants={fadeInAnimation} initial="initial" animate="animate">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaIdBadge className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="firstName"
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-3 py-1 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Enter first name"
                    {...register("firstName", { required: "First name is required" })}
                  />
                </div>
                {errors.firstName && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.firstName.message}
                  </p>
                )}
              </motion.div>

              {/* Last Name */}
              <motion.div variants={fadeInAnimation} initial="initial" animate="animate">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaIdBadge className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="lastName"
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-3 py-1 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Enter last name"
                    {...register("lastName", { required: "Last name is required" })}
                  />
                </div>
                {errors.lastName && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.lastName.message}
                  </p>
                )}
              </motion.div>
            </div>

            {/* Email */}
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
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-3 py-1 sm:text-sm border-gray-300 rounded-md"
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

            {/* Password */}
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
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-3 py-1 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Enter password (min. 8 characters)"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                />
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </motion.div>

            {/* Confirm Password */}
            <motion.div variants={fadeInAnimation} initial="initial" animate="animate">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  type="password"
                  id="confirmPassword"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-3 py-1 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Confirm password"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: validatePasswordMatch,
                  })}
                />
              </div>
              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.confirmPassword.message}
                </p>
              )}
            </motion.div>

            {/* Create Account Button */}
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
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </motion.div>
          </form>

          {/* Submission Status Message */}
          <SubmissionStatus
            status={submissionStatus}
            onClose={() => setSubmissionStatus(null)}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;