import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import axios from "axios";
import SpinPage from "@/components/Spin/Spin";

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

const Security = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError(null);

    const { currentPassword, newPassword } = data;
    console.log(currentPassword, newPassword);

    try {
      const response = await api.patch("/auth/staff/change-password", {
        oldPassword: currentPassword,
        newPassword: newPassword,
      });

      if (response.data.success) {
        alert("Password changed successfully!");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      setError("Failed to change password. Please try again.");
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center flex-col items-center p-10">
        <div className="text-center text-gray-500">Loading..</div>
        <SpinPage />
      </div>
    );
  }

  return (
    <div className="px-2 py-4 bg-white font-serif space-y-4">
      <h2 className="text-2xl font-bold ">Change Password</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div className="flex flex-col gap-2">
          <label className=" text-sm font-medium text-gray-700">
            Current Password
          </label>
          <input
            id="currentPassword"
            type="password"
            className="w-1/2 p-2 border border-gray-300 rounded-md"
            {...register("currentPassword", {
              required: "Current password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.currentPassword && (
            <p className="mt-1 text-sm text-red-600">
              {errors.currentPassword.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            id="newPassword"
            type="password"
            className="w-1/2 p-2 border border-gray-300 rounded-md"
            {...register("newPassword", {
              required: "New password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
              validate: (value) =>
                value !== watch("currentPassword") ||
                "New password must be different from current password",
            })}
          />
          {errors.newPassword && (
            <p className="mt-1 text-sm text-red-600">
              {errors.newPassword.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium ">Confirm New Password</label>
          <input
            id="confirmPassword"
            type="password"
            className="w-1/2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("confirmPassword", {
              required: "Please confirm your new password",
              validate: (value) =>
                value === watch("newPassword") || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className="pt-4 flex justify-end">
          <Button
            type="submit"
            className="w-1/5 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full"
          >
            Update
          </Button>
        </div>
        {error && <p className="mt-1 text-sm text-red-600 text-center">{error}</p>}
      </form>
    </div>
  );
};

export default Security;
