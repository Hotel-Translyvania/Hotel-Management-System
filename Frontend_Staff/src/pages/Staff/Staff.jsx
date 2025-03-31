import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa'; 
const dummyStaffData = [
  { id: 'staff-1', hotelId: 'hotel-1', firstName: 'Alice', lastName: 'Smith', email: 'alice.smith@example.com', age: 28, hireDate: '2022-05-15', salary: 45000, role: 'Front Desk', status: 'Free' },
  { id: 'staff-2', hotelId: 'hotel-1', firstName: 'Bob', lastName: 'Johnson', email: 'bob.johnson@example.com', age: 35, hireDate: '2021-11-01', salary: 52000, role: 'Housekeeping', status: 'Free' },
  { id: 'staff-3', hotelId: 'hotel-1', firstName: 'Charlie', lastName: 'Brown', email: 'charlie.brown@example.com', age: 24, hireDate: '2023-01-10', salary: 40000, role: 'Maintenance', status: 'Free' },
  { id: 'staff-4', hotelId: 'hotel-1', firstName: 'Diana', lastName: 'Garcia', email: 'diana.garcia@example.com', age: 30, hireDate: '2022-08-20', salary: 48000, role: 'Chef', status: 'Free' },
  { id: 'staff-5', hotelId: 'hotel-1', firstName: 'Eve', lastName: 'Davis', email: 'eve.davis@example.com', age: 26, hireDate: '2023-03-05', salary: 42000, role: 'Front Desk', status: 'Free' },
];

const Staff = () => {
  const [staff, setStaff] = useState(dummyStaffData);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc'); 
  const [isAddingStaff, setIsAddingStaff] = useState(false); 

 

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedStaff = [...staff].sort((a, b) => {
    if (sortColumn) {
      const valueA = a[sortColumn];
      const valueB = b[sortColumn];

      if (typeof valueA === 'string') {
        return sortDirection === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      } else if (typeof valueA === 'number') {
        return sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
      } else if (valueA instanceof Date) {
        return sortDirection === 'asc' ? valueA.getTime() - valueB.getTime() : valueB.getTime() - valueA.getTime();
      }
       return 0;
    }
    return 0;
  });


  const filteredStaff = sortedStaff.filter((staffMember) => {
    const fullName = `${staffMember.firstName} ${staffMember.lastName}`.toLowerCase();
    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      staffMember.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staffMember.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleAddStaffClick = () => {
    setIsAddingStaff(true);
  };

  const handleCancelAddStaff = () => {
    setIsAddingStaff(false); 
  };

  const handleSaveNewStaff = (newStaffData) => {

    setStaff([...staff, newStaffData]);
    setIsAddingStaff(false); // Hide the form after saving
  };


  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Staff Management</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
          onClick={handleAddStaffClick}
        >
          <FaPlus className="mr-2" />
          Add Staff
        </button>
      </div>

      {/* Add Staff Form (Conditionally Rendered) */}
      {isAddingStaff && (
        <AddStaffForm onSave={handleSaveNewStaff} onCancel={handleCancelAddStaff} />
      )}

      {/* Search and Filter */}
      <div className="mb-4 flex items-center space-x-2">
        <label htmlFor="search" className="mr-2">Search:</label>
        <input
          type="text"
          id="search"
          className="border border-gray-300 rounded px-2 py-1"
          placeholder="Search by name, email, role..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* Staff Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border cursor-pointer" onClick={() => handleSort('firstName')}>
                First Name {sortColumn === 'firstName' && (sortDirection === 'asc' ? '▲' : '▼')}
              </th>
              <th className="px-4 py-2 border cursor-pointer" onClick={() => handleSort('lastName')}>
                Last Name {sortColumn === 'lastName' && (sortDirection === 'asc' ? '▲' : '▼')}
              </th>
              <th className="px-4 py-2 border cursor-pointer" onClick={() => handleSort('email')}>
                Email {sortColumn === 'email' && (sortDirection === 'asc' ? '▲' : '▼')}
              </th>
              <th className="px-4 py-2 border cursor-pointer" onClick={() => handleSort('age')}>
                Age {sortColumn === 'age' && (sortDirection === 'asc' ? '▲' : '▼')}
              </th>
              <th className="px-4 py-2 border cursor-pointer" onClick={() => handleSort('hireDate')}>
                Hire Date {sortColumn === 'hireDate' && (sortDirection === 'asc' ? '▲' : '▼')}
              </th>
              <th className="px-4 py-2 border cursor-pointer" onClick={() => handleSort('salary')}>
                Salary {sortColumn === 'salary' && (sortDirection === 'asc' ? '▲' : '▼')}
              </th>
              <th className="px-4 py-2 border cursor-pointer" onClick={() => handleSort('role')}>
                Role {sortColumn === 'role' && (sortDirection === 'asc' ? '▲' : '▼')}
              </th>
              <th className="px-4 py-2 border cursor-pointer" onClick={() => handleSort('status')}>
                Status {sortColumn === 'status' && (sortDirection === 'asc' ? '▲' : '▼')}
              </th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStaff.map((staffMember) => (
              <tr key={staffMember.id}>
                <td className="px-4 py-2 border">{staffMember.firstName}</td>
                <td className="px-4 py-2 border">{staffMember.lastName}</td>
                <td className="px-4 py-2 border">{staffMember.email}</td>
                <td className="px-4 py-2 border">{staffMember.age}</td>
                <td className="px-4 py-2 border">{staffMember.hireDate}</td>
                <td className="px-4 py-2 border">{staffMember.salary}</td>
                <td className="px-4 py-2 border">{staffMember.role}</td>
                <td className="px-4 py-2 border">{staffMember.status}</td>
                <td className="px-4 py-2 border">
                  {/* Edit and Delete buttons (implement functionality) */}
                  <div className="flex items-center space-x-2">
                    <button className="bg-blue-300 hover:bg-blue-500 text-white font-bold py-1 px-2 rounded flex items-center">
                      <FaEdit className="mr-1" />
                    </button>
                    <button className="bg-red-300 hover:bg-red-500 text-white font-bold py-1 px-2 rounded flex items-center">
                      <FaTrash className="mr-1" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// AddStaffForm Component (Separate Component)
const AddStaffForm = ({ onSave, onCancel }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [hireDate, setHireDate] = useState('');
  const [salary, setSalary] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('Free'); // Default value

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (!firstName || !lastName || !email || !age || !hireDate || !salary || !role) {
      alert('Please fill in all fields.');
      return;
    }

    const newStaffData = {
      id: `staff-${Date.now()}`, 
      hotelId: 'hotel-1', 
      firstName,
      lastName,
      email,
      age: parseInt(age),
      hireDate,
      salary: parseFloat(salary),
      role,
      status,
    };

    onSave(newStaffData);
  };

  return (
    <div className="mb-4 p-4 border rounded bg-gray-50">
      <h2 className="text-lg font-semibold mb-2">Add New Staff</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">First Name:</label>
          <input
            type="text"
            id="firstName"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">Last Name:</label>
          <input
            type="text"
            id="lastName"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
          <input
            type="email"
            id="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="age" className="block text-gray-700 text-sm font-bold mb-2">Age:</label>
          <input
            type="number"
            id="age"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="hireDate" className="block text-gray-700 text-sm font-bold mb-2">Hire Date:</label>
          <input
            type="date"
            id="hireDate"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={hireDate}
            onChange={(e) => setHireDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="salary" className="block text-gray-700 text-sm font-bold mb-2">Salary:</label>
          <input
            type="number"
            id="salary"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="role" className="block text-gray-700 text-sm font-bold mb-2">Role:</label>
          <input
            type="text"
            id="role"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="status" className="block text-gray-700 text-sm font-bold mb-2">Status:</label>
          <select
            id="status"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Free">Free</option>
            <option value="Occupied">Occupied</option>
            <option value="Not Available">Not Available</option>
          </select>
        </div>
        <div className="col-span-2 flex justify-end">
          <button
            type="button"
            className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Staff;