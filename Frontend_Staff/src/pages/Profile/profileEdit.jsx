import React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const ProfileSetting = ({ userProfile }) => {
  console.log(userProfile);
  const form = useForm({
    defaultValues: {
      fname: userProfile?.firstName,
      lname: userProfile?.lastName,
      email: userProfile?.email,
      phone: userProfile?.phone,
      // userProfile.dateOfBirth: "2025-03-31T21:00:00.000Z" in this format, change in date format
      dob: userProfile?.dateOfBirth.split("T")[0],
      // dob: userProfile.dateOfBirth,
      address: userProfile?.address,
      salary: userProfile?.salary,
      role: userProfile?.role,
      employed_at: userProfile?.employedAt,
      status: userProfile?.status,
      picture: userProfile?.profilePic,
    },
  });
  const { register, handleSubmit, formState, reset } = form;
  const { errors } = formState;

  useEffect(() => {
    if (userProfile) {
      form.reset({
        fname: userProfile?.firstName,
        lname: userProfile?.lastName,
        email: userProfile?.email,
        phone: userProfile?.phone,
        dob: userProfile?.dateOfBirth.split("T")[0],
        address: userProfile?.address,
        salary: userProfile?.salary,
        role: userProfile?.role,
        employed_at: userProfile?.employedAt,
        status: userProfile?.status.toLowerCase(),
        picture: userProfile?.profilePic,
      });
    }
  }, [userProfile, reset]);

  const onSubmit = (data) => {
    console.log(data);
  };
  const [profileImage, setProfileImage] = useState(
    userProfile?.profilePic ? userProfile?.profilePic : null
  );

  const handleProfilePictureChange = (event) => {
    const file = event.target.files?.[0];
    console.log(file);

    if (file) {
      setProfileImage(file);
    }
  };
  return (
    <div className="flex flex-col font-serif px-6 pt-10 ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-row gap-10 text-sm w-full"
      >
        <div className="relative shrink-0 object-cover ">
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className="size-32 rounded-full"
            />
          ) : (
            <img src="/placePP.png" className="size-32" />
          )}
          <div className="bg-[#1814F3] size-8 flex justify-center items-center rounded-full absolute right-0 top-20 hover:brightness-200 transition duration-200">
            <label htmlFor="fileInput" className="cursor-pointer">
              <img src="/pencil.svg" />
            </label>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleProfilePictureChange}
              className="hidden"
            />
          </div>
        </div>
        <div className="flex flex-col gap-3 w-3/4">
          <div className="flex flex-col items-start justify-center gap-2 ">
            <label className="text-[#232323] font-semibold ">First Name</label>
            <input
              id="fname"
              {...register("fname", {
                required: {
                  value: true,
                  message: "First Name is required",
                },
              })}
              placeholder="First Name"
              className="rounded-xl p-3 border w-full"
            />
            {errors.fname && (
              <p className="text-red-500 text-xs">{errors.fname.message}</p>
            )}
          </div>
          <div className="flex flex-col items-start justify-center gap-2">
            <label className="text-[#232323] font-semibold">Last Name</label>
            <input
              id="lname"
              {...register("lname", {
                required: {
                  value: true,
                  message: "Last Name is required",
                },
              })}
              placeholder="Last Name"
              className="rounded-xl p-3 border w-full"
            />
            {errors.lname && (
              <p className="text-red-500 text-xs">{errors.lname.message}</p>
            )}
          </div>

          <div className="flex flex-col items-start justify-center gap-2">
            <label className="text-[#232323] font-semibold">Email</label>
            <input
              placeholder="Email"
              type="email"
              id="email"
              {...register("email", {
                required: {
                  value: true,
                  message: "Email is required",
                },
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid Email",
                },
              })}
              className="rounded-xl p-3 border w-full"
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>

          <div className="flex flex-col items-start justify-center gap-2">
            <label className="text-[#232323] font-semibold">
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              {...register("dob", {
                required: {
                  value: true,
                  message: "Date of Birth is required",
                },
              })}
              className="rounded-xl p-3 border w-full"
            />
            {errors.dob && (
              <p className="text-red-500 text-xs">{errors.dob.message}</p>
            )}
          </div>
          <div className="flex flex-col items-start justify-center gap-2">
            <label className="text-[#232323] font-semibold">Address</label>
            <input
              type="text"
              id="address"
              placeholder="Address"
              {...register("address", {
                required: {
                  value: true,
                  message: "Address is required",
                },
              })}
              className="rounded-xl p-3 border w-full"
            />
            {errors.address && (
              <p className="text-red-500 text-xs">{errors.address.message}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3 w-full">
          <div className="flex flex-col items-start justify-center gap-2">
            <label className="text-[#232323] font-semibold">Phone Number</label>
            <input
              type="tel"
              placeholder="Phone Number"
              id="phone"
              {...register("phone", {
                required: {
                  value: true,
                  message: "Phone Number is required",
                },
                pattern: {
                  value:
                    /^\+?\d{1,3}[-.\s]?\(?\d{1,4}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
                  message: "Invalid Phone Number",
                },
              })}
              className="rounded-xl p-3 border w-full"
            />
            {errors.phone && (
              <p className="text-red-500 text-xs">{errors.phone.message}</p>
            )}
          </div>
          <div className="flex flex-col items-start justify-center gap-2">
            <label className="text-[#232323] font-semibold">Salary</label>
            <input
              type="text"
              placeholder="Salary"
              id="salary"
              disabled={true}
              {...register("salary", {
                required: {
                  value: true,
                  message: "Salary is required",
                },
              })}
              className="rounded-xl p-3 border w-full"
            />
          </div>
          <div className="flex flex-col items-start justify-center gap-2">
            <label className="text-[#232323] font-semibold">Role</label>
            <input
              type="text"
              id="role"
              placeholder="Role"
              disabled={true}
              {...register("role", {
                required: {
                  value: true,
                  message: "Role is required",
                },
              })}
              className="rounded-xl p-3 border w-full"
            />
          </div>
          <div className="flex flex-col items-start justify-center gap-2">
            <label className="text-[#232323] font-semibold">Employed At</label>
            <input
              type="date"
              id="employed_at"
              disabled={true}
              {...register("employed_at", {
                required: {
                  value: true,
                  message: "Employed At is required",
                },
              })}
              className="rounded-xl p-3 border w-full"
            />
            {errors.employed_at && (
              <p className="text-red-500 text-xs">
                {errors.employed_at.message}
              </p>
            )}
          </div>
          <div className="flex flex-col items-start justify-center gap-2">
            <label className="text-[#232323] font-semibold">Status</label>
            <select
              id="status"
              disabled={true}
              {...register("status", {
                required: {
                  value: true,
                  message: "Status is required",
                },
              })}
              className="rounded-xl p-3 border w-full"
            >
              <option value="">Select Status</option>
              <option value="available">Active</option>
              <option value="inactive">Inactive</option>
              <option value="on Leave">On Leave</option>
            </select>
          </div>
          <div className="flex w-full justify-end ">
            <button
              type="submit"
              className="px-10 py-3 text-white rounded-xl bg-[#1814F3]"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileSetting;
