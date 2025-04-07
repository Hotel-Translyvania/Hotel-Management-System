import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function ResetPassLink() {
  const { token } = useParams(); // Extract token from URL
  const navigate = useNavigate();
  const [resetSuccess, setResetSuccess] = useState(false);
  const [resetError, setResetError] = useState('');

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      password: '',
      confirmPassword: ''
    }
  });

  const password = watch("password"); // To compare password and confirmPassword

  const onSubmit = async (data) => {
    try {
      // **IMPORTANT: Replace with your actual API endpoint**
      const response = await fetch('/api/reset-password', { // Example API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Send the token for verification
        },
        body: JSON.stringify({
          password: data.password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setResetSuccess(true);
        setResetError('');
        // Optionally redirect to login page after successful reset
        setTimeout(() => {
          navigate('/login'); // Replace '/login' with your actual login route
        }, 3000); // Redirect after 3 seconds
      } else {
        setResetError(result.message || 'Password reset failed.  Please try again.'); // Or result.error, depending on your API response
        setResetSuccess(false);
      }
    } catch (error) {
      console.error('Reset password error:', error);
      setResetError('An unexpected error occurred. Please try again later.');
      setResetSuccess(false);
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 w-full h-screen">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Reset Your Password</h2>

        {resetSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline">Password reset successfully. Redirecting to login...</span>
          </div>
        )}

        {resetError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline">{resetError}</span>
          </div>
        )}


        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              New Password:
            </label>
            <input
              type="password"
              id="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long"
                },
              })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter new password"
            />
            {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) => value === password || "Passwords do not match"
              })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Confirm new password"
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs italic">{errors.confirmPassword.message}</p>}
          </div>

          <div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassLink;