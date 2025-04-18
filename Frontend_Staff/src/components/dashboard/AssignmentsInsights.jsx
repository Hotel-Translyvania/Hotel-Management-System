import React, { useMemo, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";
import { FaTasks, FaChevronLeft, FaChevronRight } from "react-icons/fa";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const ITEMS_PER_PAGE = 5;

const AssignmentsInsights = ({ assignments = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { taskCounts, staffCounts, roomCounts } = useMemo(() => {
    if (!assignments || assignments.length === 0) {
      return { taskCounts: {}, staffCounts: {}, roomCounts: {} };
    }

    const tasks = assignments.reduce((acc, { task }) => {
      const key = task || "Unknown Task";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    const staff = assignments.reduce((acc, { staffName }) => {
      const key = staffName || "Unassigned";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    const rooms = assignments.reduce((acc, { roomNumber }) => {
      const key = roomNumber || "No Room";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    return { taskCounts: tasks, staffCounts: staff, roomCounts: rooms };
  }, [assignments]);

  const createChartData = (dataObject, label) => ({
    labels: Object.keys(dataObject),
    datasets: [{
      label,
      data: Object.values(dataObject),
      backgroundColor: [
        "rgba(75, 192, 192, 0.7)", "rgba(255, 99, 132, 0.7)", "rgba(54, 162, 235, 0.7)",
        "rgba(255, 206, 86, 0.7)", "rgba(153, 102, 255, 0.7)", "rgba(255, 159, 64, 0.7)",
        "rgba(199, 199, 199, 0.7)", "rgba(83, 102, 255, 0.7)"
      ],
      borderColor: "rgba(255, 255, 255, 0.3)",
      borderWidth: 1,
    }],
  });

  const taskChartData = createChartData(taskCounts, "Assignments by Task");
  const staffChartData = createChartData(staffCounts, "Assignments by Staff");
  const roomChartData = createChartData(roomCounts, "Assignments by Room");

   const commonChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false }
    }
  };

  const doughnutOptions = {
    ...commonChartOptions,
    cutout: '60%',
    plugins: {
      ...commonChartOptions.plugins,
      legend: {
        display: true,
        position: 'top',
        labels: {
          boxWidth: 12,
          padding: 10,
          font: { size: 10 }
        }
      }
    }
  };

  const barOptions = {
      ...commonChartOptions,
      scales: {
          y: {
              beginAtZero: true,
              ticks: { precision: 0 }
            }
        }
    };

  const totalPages = Math.ceil(assignments.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentAssignments = assignments.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const formatDateTime = (dateTimeString) => {
      try {
          if (!dateTimeString) return "N/A";
          if (dateTimeString.match(/^\d{4}-\d{2}-\d{2}$/)) {
              return new Date(dateTimeString).toLocaleDateString([], { dateStyle: 'short'});
          }
          return new Date(dateTimeString).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' });
      } catch {
          return "Invalid Date";
      }
  };

  const hasData = assignments && assignments.length > 0;

  return (
    <div className="bg-white rounded-2xl p-6 h-full flex flex-col">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center mb-6">
           <FaTasks className="text-cyan-500 mr-3" /> Task Assignments Overview
        </h2>

        {!hasData && (
            <div className="flex-grow flex items-center justify-center">
                <p className="text-center text-gray-500">No assignment data available.</p>
            </div>
        )}

        {hasData && (
            <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    <div className="p-4 border rounded-lg flex flex-col">
                        <h3 className="text-md font-semibold text-gray-700 mb-2 text-center">By Task Type</h3>
                        <div className="flex-grow relative h-48 sm:h-56">
                             <Doughnut data={taskChartData} options={doughnutOptions} />
                        </div>
                    </div>
                    <div className="p-4 border rounded-lg flex flex-col">
                        <h3 className="text-md font-semibold text-gray-700 mb-2 text-center">By Staff</h3>
                        <div className="flex-grow relative h-48 sm:h-56">
                            <Bar data={staffChartData} options={barOptions} />
                        </div>
                    </div>
                    <div className="p-4 border rounded-lg flex flex-col">
                        <h3 className="text-md font-semibold text-gray-700 mb-2 text-center">By Room</h3>
                        <div className="flex-grow relative h-48 sm:h-56">
                             <Doughnut data={roomChartData} options={doughnutOptions} />
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">All Assignments</h3>
                    <div className="overflow-x-auto border rounded-lg">
                        <table className="min-w-full text-sm text-left text-gray-600">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                                <tr>
                                    <th scope="col" className="px-4 py-3">Task</th>
                                    <th scope="col" className="px-4 py-3">Staff</th>
                                    <th scope="col" className="px-4 py-3">Room</th>
                                    <th scope="col" className="px-4 py-3">Description</th>
                                    <th scope="col" className="px-4 py-3">Start Time</th>
                                    <th scope="col" className="px-4 py-3">End Time</th>
                                    <th scope="col" className="px-4 py-3">Assigned At</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentAssignments.map((a, index) => (
                                    <tr key={a.assignmentId || `assign-${startIndex + index}`} className="bg-white border-b last:border-b-0 hover:bg-gray-50">
                                        <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">{a.task ?? 'N/A'}</td>
                                        <td className="px-4 py-2">{a.staffName ?? 'N/A'}</td>
                                        <td className="px-4 py-2">{a.roomNumber ?? 'N/A'}</td>
                                        <td className="px-4 py-2 truncate max-w-xs">{a.description ?? ''}</td>
                                        <td className="px-4 py-2 whitespace-nowrap">{formatDateTime(a.startTime)}</td>
                                        <td className="px-4 py-2 whitespace-nowrap">{formatDateTime(a.endTime)}</td>
                                        <td className="px-4 py-2 whitespace-nowrap">{formatDateTime(a.assignedAt)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {totalPages > 1 && (
                        <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
                            <button
                                onClick={handlePrevPage}
                                disabled={currentPage === 1}
                                className="flex items-center bg-blue-500 px-3 py-1 border rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <FaChevronLeft className="mr-1 h-3 w-3" /> Previous
                            </button>
                            <span>
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                                className="flex items-center px-3 py-1 border rounded-md bg-blue-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next <FaChevronRight className="ml-1 h-3 w-3" />
                            </button>
                        </div>
                    )}
                </div>
            </>
        )}
    </div>
  );
};

export default AssignmentsInsights;