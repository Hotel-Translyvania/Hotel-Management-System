import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement, // Required for Doughnut charts
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import {
  FaUser,
  FaCalendarCheck,
  FaChartLine,
  FaGlobe,
  FaHome,
  FaVenusMars,
  FaBed, // Icon for Room Type Distribution section
} from "react-icons/fa";

// Register necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Define the base URL for the backend API
const API_BASE_URL = "http://localhost:3000"; // Replace if needed
const HOTEL_ID = 1; // Replace if needed

// Define the main Dashboard functional component
const Dashboard = () => {
  // --- State Variables ---
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalBookings, setTotalBookings] = useState(0);
  const [guestCountries, setGuestCountries] = useState([]);
  const [genderDemographics, setGenderDemographics] = useState({});
  const [roomTypeData, setRoomTypeData] = useState([]); // Holds [{ type: "Type", count: X }]
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Styling Variables ---
  const headingStyle = "text-3xl font-extrabold text-gray-900 tracking-tight mb-4";
  const subHeadingStyle = "text-xl font-semibold text-gray-800";
  const metricValueStyle = "text-4xl font-bold text-gray-900";
  const metricLabelStyle = "text-sm text-gray-600 uppercase tracking-wider";
  const sectionTitleStyle = "text-2xl font-semibold text-gray-800 flex items-center justify-between mb-4";
  const dataLabelStyle = "font-medium text-gray-700";
  const dataValueStyle = "text-gray-700";

  // --- Data Fetching Function ---
  const fetchData = async (endpoint) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`);
      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(
          `API request failed: ${response.status} - ${response.statusText}. Body: ${errorBody}`
        );
      }
      const data = await response.json();
      if (data.success === false) {
        throw new Error(`API returned success: false for ${endpoint}`);
      }
      return data;
    } catch (err) {
      console.error(`Error fetching ${endpoint}:`, err);
      throw err;
    }
  };

  // --- useEffect Hook for Data Loading ---
  useEffect(() => {
    const loadDashboardData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const [
          revenueData,
          bookingsData,
          demographicsData,
          countriesData,
          roomTypesData,
        ] = await Promise.allSettled([
          fetchData(`/api/v1/hms/hotels/${HOTEL_ID}/dashboard/revenue`),
          fetchData(`/api/v1/hms/hotels/${HOTEL_ID}/dashboard/bookings`),
          fetchData(`/api/v1/hms/hotels/${HOTEL_ID}/dashboard/demographics`),
          fetchData(`/api/v1/hms/hotels/${HOTEL_ID}/dashboard/countries`),
          fetchData(`/api/v1/hms/hotels/${HOTEL_ID}/dashboard/room-types`),
        ]);

        let fetchError = null;

        // Process Revenue
        if (revenueData.status === 'fulfilled' && revenueData.value) {
           setTotalRevenue(parseFloat(revenueData.value.revenue)/100 || 0);
        } else {
            console.error("Failed to fetch Revenue:", revenueData.reason);
            fetchError = fetchError || new Error("Failed to load Revenue data.");
        }

        // Process Bookings
        if (bookingsData.status === 'fulfilled' && bookingsData.value) {
            setTotalBookings(bookingsData.value.booked || 0);
        } else {
            console.error("Failed to fetch Bookings:", bookingsData.reason);
            fetchError = fetchError || new Error("Failed to load Bookings data.");
        }

        // Process Demographics
        if (demographicsData.status === 'fulfilled' && demographicsData.value) {
            setGenderDemographics({
                Male: demographicsData.value.male || 0,
                Female: demographicsData.value.female || 0,
            });
        } else {
            console.error("Failed to fetch Demographics:", demographicsData.reason);
            fetchError = fetchError || new Error("Failed to load Demographics data.");
        }

        // Process Countries
        if (countriesData.status === 'fulfilled' && countriesData.value?.country) {
            const transformedCountries = (countriesData.value.country).map(item => {
                const [name, value] = Object.entries(item)[0];
                const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
                return { name: capitalizedName, value };
            }).sort((a, b) => b.value - a.value);
            setGuestCountries(transformedCountries);
        } else {
            console.error("Failed to fetch or process Countries:", countriesData.reason || "Missing 'country' data");
            fetchError = fetchError || new Error("Failed to load Country data.");
            setGuestCountries([]);
        }

        // Process Room Types
        if (roomTypesData.status === 'fulfilled' && roomTypesData.value?.data) {
            const rawRoomData = roomTypesData.value.data;
            const transformedRoomTypes = Object.entries(rawRoomData)
                .map(([type, rooms]) => ({
                    type: type,
                    count: rooms.length
                }))
                .filter(room => room.count > 0) // Ensure only types with rooms are included
                .sort((a, b) => b.count - a.count);
            setRoomTypeData(transformedRoomTypes);
        } else {
            console.error("Failed to fetch or process Room Types:", roomTypesData.reason || "Missing 'data' field");
            fetchError = fetchError || new Error("Failed to load Room Types data.");
            setRoomTypeData([]);
        }

        // Final Error Handling
        if (fetchError) {
            setError(fetchError.message + " Some data might be missing.");
        }

      } catch (err) {
        console.error("Dashboard data loading error:", err);
        setError("Failed to load dashboard data. Please try again later.");
        setTotalRevenue(0);
        setTotalBookings(0);
        setGenderDemographics({});
        setGuestCountries([]);
        setRoomTypeData([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  // --- Chart Data Preparation ---

  // Data for Guests by Country Chart
  const guestCountriesChartData = {
    labels: guestCountries.map((country) => country.name),
    datasets: [
      {
        label: "Guests", // Shortened label for tooltip clarity
        data: guestCountries.map((country) => country.value),
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(153, 102, 255, 0.8)",
          "rgba(255, 159, 64, 0.8)",
          "rgba(199, 199, 199, 0.8)",
          "rgba(83, 102, 255, 0.8)",
        ],
        borderColor: "rgba(255, 255, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Data for Gender Demographics Chart
  const genderDemographicsChartData = {
    labels: Object.keys(genderDemographics || {}),
    datasets: [
      {
        label: "Count", // Shortened label for tooltip clarity
        data: Object.values(genderDemographics || {}),
        backgroundColor: [
          "rgba(54, 162, 235, 0.8)", // Blue for Male
          "rgba(255, 99, 132, 0.8)", // Pink/Red for Female
        ],
        borderColor: "rgba(255, 255, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Data for Room Type Distribution Chart (NEW)
  const roomTypesChartData = {
    labels: roomTypeData.map((room) => room.type), // e.g., ['Penthouse', 'Suite', 'Standard']
    datasets: [
      {
        label: "Rooms", // Label for tooltip
        data: roomTypeData.map((room) => room.count), // e.g., [1, 1, 1]
        backgroundColor: [ // Use a distinct color palette
          "rgba(75, 192, 192, 0.8)", // Teal
          "rgba(153, 102, 255, 0.8)", // Purple
          "rgba(255, 159, 64, 0.8)", // Orange
          "rgba(255, 99, 132, 0.8)",  // Pink
          "rgba(54, 162, 235, 0.8)",  // Blue
          "rgba(255, 206, 86, 0.8)",  // Yellow
          "rgba(100, 220, 150, 0.8)", // Light Green
          "rgba(200, 200, 200, 0.8)", // Grey
        ],
        borderColor: "rgba(255, 255, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  // --- Chart Options ---

  // Common options applicable to Doughnut charts
  const commonChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          font: { size: 14 },
          color: "#555",
        },
      },
      title: {
        display: true,
        font: { size: 18 },
        color: "#333",
      },
      tooltip: {
          callbacks: {
              // Customize tooltip to show: "DatasetLabel: ItemLabel: Value"
              label: function(context) {
                  let datasetLabel = context.dataset.label || '';
                  let dataLabel = context.label || ''; // Label from the 'labels' array
                  let value = context.parsed || 0;

                  // Handle cases where dataset label might be redundant or missing
                  let finalLabel = datasetLabel ? `${datasetLabel}: ` : '';
                  finalLabel += `${dataLabel}: ${value}`;
                  return finalLabel;
              }
          }
      }
    },
  };

  // Specific options for Guests by Country Chart
  const guestCountriesChartOptions = {
    ...commonChartOptions,
    plugins: {
      ...commonChartOptions.plugins,
      title: {
        ...commonChartOptions.plugins.title,
        text: "Guests by Country",
      },
    },
  };

  // Specific options for Gender Demographics Chart
  const genderDemographicsChartOptions = {
    ...commonChartOptions,
    cutout: '60%',
    plugins: {
      ...commonChartOptions.plugins,
      title: {
        ...commonChartOptions.plugins.title,
        text: "Gender Demographics (Count)",
      },
    },
  };

   // Specific options for Room Type Distribution Chart (NEW)
   const roomTypesChartOptions = {
    ...commonChartOptions,
    cutout: '60%', // Make it a Doughnut
    plugins: {
      ...commonChartOptions.plugins,
      title: {
        ...commonChartOptions.plugins.title,
        text: "Room Type Distribution (Count)", // Specific title
      },
    },
  };


  // --- Loading State UI ---
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-lg text-gray-700">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  // --- Render Dashboard ---
  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">

        {/* Error Message */}
        {error && (
          <div
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded"
            role="alert"
          >
            <p className="font-bold">Data Loading Error</p>
            <p>{error}</p>
          </div>
        )}

        {/* Dashboard Header */}
        <h1 className={headingStyle}>
          <div className="flex flex-row gap-2 items-center">
            Welcome to the Dashboard <FaHome className="text-gray-500 ml-2" />
          </div>
        </h1>

        {/* Key Metrics Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          {/* Total Revenue Card */}
          <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between h-40">
            <div>
              <h2 className={`${subHeadingStyle} flex items-center justify-between mb-3`}>
                Total Revenue <FaChartLine className="text-blue-500 ml-2" />
              </h2>
              <p className={`${metricValueStyle} text-blue-600`}>
                {totalRevenue.toLocaleString("en-US", { style: "currency", currency: "USD" })}
              </p>
            </div>
            <p className={metricLabelStyle}>All Time</p>
          </div>

          {/* Total Bookings Card */}
          <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between h-40">
            <div>
              <h2 className={`${subHeadingStyle} flex items-center justify-between mb-3`}>
                Total Bookings <FaCalendarCheck className="text-purple-500 ml-2" />
              </h2>
              <p className={`${metricValueStyle} text-purple-600`}>{totalBookings}</p>
            </div>
            <p className={metricLabelStyle}>All Time</p>
          </div>
        </div>

        {/* Charts & Detailed Info Section - Now using a 3-column layout on large screens */}
        {/* Consider adjusting grid-cols if 3 charts feel too cramped */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Guests by Country Section */}
          <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300">
            <h2 className={`${sectionTitleStyle}`}>
              Guests by Country <FaGlobe className="text-indigo-500 ml-2" />
            </h2>
            {/* Chart Container */}
            <div className="mb-4 h-80">
              {guestCountries.length > 0 ? (
                <Doughnut data={guestCountriesChartData} options={guestCountriesChartOptions} />
              ) : (
                 <p className="text-center text-gray-500 mt-10">No country data available.</p>
              )}
            </div>
            {/* List Container */}
            {guestCountries.length > 0 && (
                <ul className="max-h-48 overflow-y-auto mt-4 border-t pt-2">
                {guestCountries.map((country) => (
                    <li key={country.name} className="py-2 border-b border-gray-100 last:border-b-0">
                    <div className="flex justify-between items-center">
                        <span className={dataLabelStyle}>{country.name}</span>
                        <span className={dataValueStyle}>{country.value} Guest{country.value !== 1 ? 's' : ''}</span>
                    </div>
                    </li>
                ))}
                </ul>
            )}
          </div>

          {/* Gender Demographics Section */}
          <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300">
            <h2 className={`${sectionTitleStyle}`}>
              Gender Demographics <FaVenusMars className="text-pink-500 ml-2" />
            </h2>
             {/* Chart Container */}
            <div className="mb-4 h-80">
              {(genderDemographics.Male > 0 || genderDemographics.Female > 0) ? (
                <Doughnut data={genderDemographicsChartData} options={genderDemographicsChartOptions} />
               ) : (
                 <p className="text-center text-gray-500 mt-10">No gender data available.</p>
               )}
            </div>
             {/* List Container */}
            {(genderDemographics.Male > 0 || genderDemographics.Female > 0) && (
                <ul className="mt-4 border-t pt-2">
                {Object.entries(genderDemographics).map(([gender, count]) => (
                    <li key={gender} className="py-2 border-b border-gray-100 last:border-b-0">
                    <div className="flex justify-between items-center">
                        <span className={dataLabelStyle}>{gender}</span>
                        <span className={dataValueStyle}>{count}</span>
                    </div>
                    </li>
                ))}
                </ul>
            )}
          </div>

           {/* Room Type Distribution Section (NOW INCLUDES CHART) */}
           <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300">
            <h2 className={`${sectionTitleStyle}`}>
              Room Types <FaBed className="text-green-500 ml-2" /> {/* Shortened title slightly */}
            </h2>
             {/* Chart Container */}
            <div className="mb-4 h-80">
              {roomTypeData.length > 0 ? (
                <Doughnut data={roomTypesChartData} options={roomTypesChartOptions} />
               ) : (
                 <p className="text-center text-gray-500 mt-10">No room type data available.</p>
               )}
            </div>
             {/* List Container */}
            {roomTypeData.length > 0 && (
                <ul className="max-h-48 overflow-y-auto mt-4 border-t pt-2">
                {roomTypeData.map((room) => (
                    <li key={room.type} className="py-2 border-b border-gray-100 last:border-b-0">
                    <div className="flex justify-between items-center">
                        <span className={dataLabelStyle}>{room.type}</span>
                        <span className={dataValueStyle}>{room.count} Room{room.count !== 1 ? 's' : ''}</span>
                    </div>
                    </li>
                ))}
                </ul>
            )}
          </div>

        </div> {/* End of charts grid */}
      </div> {/* End of container */}
    </div> // End of main div
  );
};

export default Dashboard;