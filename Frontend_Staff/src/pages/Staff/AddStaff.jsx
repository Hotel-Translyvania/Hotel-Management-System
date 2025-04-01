import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";

const AddStaff = ({onSuccess}) => {
  const form = useForm({
    defaultValues: {
      fname: "",
      lname: "",
      email: "",
      dob: "",
      address: "",
      phone: "",
      salary: "",
      role: "",
      employed_at: "",
      status: "",
    },
  });
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const onSubmit = (data) => {
    console.log(data);
    onSuccess();
    alert(`
      First Name: ${data.fname}
      Last Name: ${data.lname}
      Email: ${data.email}
      Date of Birth: ${data.dob}
      Address: ${data.address}
      Phone Number: ${data.phone}
      Salary: ${data.salary}
      Role: ${data.role}
      Employed At: ${data.employed_at}
      Status: ${data.status}
      `);
  };
  const [profileImage, setProfileImage] = useState(null);

  const handleProfilePictureChange = (event) => {
    const file = event.target.files?.[0];
    console.log(file);

    if (file) {
      setProfileImage(file);
    }
  };
  return (
    <div className="flex items-center flex-col justify-center font-serif p-4 gap-3">
      <h2 className="text-2xl font-semibold">Add Staff</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-row gap-10 text-sm w-full"
      >
        <div className="relative">
          {profileImage ? (
            <img
              src={URL.createObjectURL(profileImage)}
              alt="Profile"
              className="size-32 rounded-full"
            />
          ) : (
            <img src="/placePP.png" className="size-32" />
          )}
          <div className="bg-[#1814F3] h-8 w-8 flex justify-center items-center rounded-full absolute right-0 top-20 hover:brightness-200 transition duration-200">
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
        <div className="flex flex-row gap-6 w-3/4 justify-between">
          <div className="flex flex-col gap-3 w-1/2 ">
            <div className="flex flex-col items-start justify-center gap-2 ">
              <label className="text-[#232323] ">First Name</label>
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
            </div>
            <div className="flex flex-col items-start justify-center gap-2">
              <label className="text-[#232323] ">Last Name</label>
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
            </div>

            <div className="flex flex-col items-start justify-center gap-2">
              <label className="text-[#232323] ">Email</label>
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
            </div>

            <div className="flex flex-col items-start justify-center gap-2">
              <label className="text-[#232323] ">Date of Birth</label>
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
            </div>
            <div className="flex flex-col items-start justify-center gap-2">
              <label className="text-[#232323] ">Address</label>
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
            </div>
          </div>
          <div className="flex flex-col gap-3 w-1/2">
            <div className="flex flex-col items-start justify-center gap-2">
              <label className="text-[#232323] ">Phone Number</label>
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
                    value: /^\d{10}$/,
                    message: "Invalid Phone Number",
                  },
                })}
                className="rounded-xl p-3 border w-full"
              />
            </div>
            <div className="flex flex-col items-start justify-center gap-2">
              <label className="text-[#232323] ">Salary</label>
              <input
                type="text"
                placeholder="Salary"
                id="salary"
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
              <label className="text-[#232323] ">Role</label>
              <input
                type="text"
                id="role"
                placeholder="Role"
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
              <label className="text-[#232323] ">Employed At</label>
              <input
                type="date"
                id="employed_at"
                {...register("employed_at", {
                  required: {
                    value: true,
                    message: "Employed At is required",
                  },
                })}
                className="rounded-xl p-3 border w-full"
              />
            </div>
            <div className="flex flex-col items-start justify-center gap-2">
              <label className="text-[#232323] ">Status</label>
              <select
                id="status"
                {...register("status", {
                  required: {
                    value: true,
                    message: "Status is required",
                  },
                })}
                className="rounded-xl p-3 border w-full"
              >
                <option value="">Select Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="Oneave">On Leave</option>
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
        </div>
      </form>
    </div>
  );
};

export default AddStaff;
