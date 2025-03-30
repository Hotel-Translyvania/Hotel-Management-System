import React from 'react';

const AddGuest = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-md">
      <h1 className="text-2xl font-bold mb-6">Guest Profile</h1>
      <form className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium text-gray-700 mb-1">First Name</label>
            <input
              type="text"
              placeholder="Natan"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-1">Last Name</label>
            <input
              type="text"
              placeholder="Samuel"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-1">Date of Birth</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-1">Gender</label>
            <select
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
            >
              <option>Select gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="nathan@gmail.com"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              placeholder="+251912334567"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block font-medium text-gray-700 mb-1">Address</label>
            <input
              type="text"
              placeholder="5kilo,Addis Ababa"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-1">Nationality</label>
            <input
              type="text"
              placeholder="Ethiopian"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-1">Identification Type</label>
            <select
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
            >
              <option>Select ID type</option>
              <option>Passport</option>
              <option>Driver's License</option>
              <option>National ID</option>
            </select>
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-1">Identification Number</label>
            <input
              type="text"
              placeholder="123456789"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-6 px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default AddGuest;