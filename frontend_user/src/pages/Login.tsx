import React from 'react';
import Logo from '@/components/Login/Logo';
import LoginForm from '@/components/Login/LoginForm';


const Login = () => {
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row">
      {/* Left side - Brand illustration (visible on md screens and up) */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-500 to-blue-600 p-8 items-center justify-center">
        <div className="max-w-md text-white">
          <Logo className="mb-6 text-white" />
          <h1 className="text-4xl font-bold mb-4">
            Welcome back to EzyStay
          </h1>
          <p className="text-blue-100 text-lg mb-8">
            Book your perfect stay with ease. Access your bookings, view your history, and find exclusive deals.
          </p>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-sm">
              <div className="font-bold text-2xl">500+</div>
              <div className="text-blue-200 text-sm">Premium Hotels</div>
            </div>
            <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-sm">
              <div className="font-bold text-2xl">100k+</div>
              <div className="text-blue-200 text-sm">Happy Guests</div>
            </div>
            <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-sm">
              <div className="font-bold text-2xl">50+</div>
              <div className="text-blue-200 text-sm">Countries</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 md:p-12 bg-white">
        <div className="w-full max-w-md">
          {/* Only show logo on mobile screens */}
          <div className="md:hidden mb-8 flex justify-center">
            <Logo />
          </div>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Login to your account</h2>
            <p className="text-gray-500 mt-2">
              Welcome back! Please enter your details.
            </p>
          </div>

          <LoginForm />

          <div className="mt-10 text-center text-xs text-gray-500">
            <p>By signing in, you agree to our Terms and Privacy Policy.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;