
import React from "react";
import Logo from "@/components/SignUp/Logo";
import SignupForm from "@/components/SignUp/SignupForm";
import { useIsMobile } from "@/hooks/use-mobile";

const SignUp = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Left Panel - Hidden on mobile */}
      {!isMobile && (
        <div className="hidden md:flex md:w-1/2 lg:w-5/12 bg-primary/5 relative">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=2787&auto=format&fit=crop')] bg-cover bg-center opacity-90"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5"></div>
          <div className="relative z-10 flex flex-col justify-center items-center w-full p-12">
            <div className="max-w-md text-center">
              <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-md">Welcome to EzyStay</h2>
              <p className="text-lg text-white mb-8 drop-shadow-md">
                Your home away from home. Sign up to discover the perfect stays for your next trip.
              </p>
              <div className="bg-white/95 p-6 rounded-2xl shadow-lg">
                <h3 className="font-medium text-gray-800 mb-3">Why join EzyStay?</h3>
                <ul className="text-left text-gray-700 space-y-2">
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary mt-1 mr-2"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <span>Exclusive member discounts on bookings</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary mt-1 mr-2"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <span>Early access to special promotions</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary mt-1 mr-2"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <span>Fast booking with saved payment methods</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary mt-1 mr-2"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <span>Personalized travel recommendations</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Right Panel - Form */}
      <div className="flex-1 flex flex-col">
        <div className="p-6 sm:p-10 lg:px-16 xl:px-20 flex-1 max-w-3xl mx-auto w-full">
          <div className="mb-6 flex justify-center md:justify-start">
            <Logo />
          </div>
          
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Create your account</h1>
            <p className="text-gray-500 mt-2">Join EzyStay to start booking your perfect stays</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-form-card p-6 sm:p-8">
            <SignupForm />
          </div>
        </div>
        
        <footer className="py-6 text-center text-gray-500 text-sm border-t">
          © 2025 EzyStay. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default SignUp;
