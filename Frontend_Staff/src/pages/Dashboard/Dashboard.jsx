import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement, // Included for potential future use or if other charts depend on it
  Title,
  Tooltip,
  Legend,
  ArcElement, // Required for Doughnut charts
} from "chart.js";
import { Doughnut } from "react-chartjs-2"; // Specific chart type used
import {
  // Importing icons from react-icons library
  FaUser, // Example icon (currently unused but kept for potential future use)
  FaCalendarCheck, // Icon for Total Bookings card
  FaChartLine, // Icon for Total Revenue card
  FaGlobe, // Icon for Guests by Country section
  FaHome, // Icon for main dashboard heading
  FaVenusMars, // Icon for Gender Demographics section
} from "react-icons/fa";

// Register necessary Chart.js components
// Chart.js requires explicit registration of scales, elements, plugins, etc.
ChartJS.register(
  CategoryScale, // Scale for categorical data (like country names, gender)
  LinearScale,   // Scale for numerical data (like counts, revenue)
  BarElement,    // Element for drawing bars (kept for flexibility)
  Title,         // Plugin for displaying chart titles
  Tooltip,       // Plugin for displaying tooltips on hover
  Legend,        // Plugin for displaying the chart legend
  ArcElement     // Element for drawing arcs (used in Doughnut charts)
);

// Define the base URL for the backend API
const API_BASE_URL = "http://localhost:3000"; // Replace with your actual backend URL if different
// Define a default Hotel ID (consider making this dynamic, e.g., from URL params or user context)
const HOTEL_ID = 1;

// Define the main Dashboard functional component
const Dashboard = () => {
  // --- State Variables ---
  // useState hooks to manage component state

  // Holds the total revenue fetched from the API
  const [totalRevenue, setTotalRevenue] = useState(0);
  // Holds the total number of bookings fetched from the API
  const [totalBookings, setTotalBookings] = useState(0);
  // Holds the list of guest counts per country, transformed for chart/list display
  const [guestCountries, setGuestCountries] = useState([]);
  // Holds the male/female counts fetched from the API
  const [genderDemographics, setGenderDemographics] = useState({});
  // Tracks whether the data is currently being loaded
  const [isLoading, setIsLoading] = useState(true);
  // Stores any error message encountered during data fetching
  const [error, setError] = useState(null);

  // --- Styling Variables ---
  // Reusable Tailwind CSS class strings for consistent styling

  const headingStyle =
    "text-3xl font-extrabold text-gray-900 tracking-tight mb-4";
  const subHeadingStyle = "text-xl font-semibold text-gray-800";
  const metricValueStyle = "text-4xl font-bold text-gray-900";
  const metricLabelStyle = "text-sm text-gray-600 uppercase tracking-wider";
  const sectionTitleStyle =
    "text-2xl font-semibold text-gray-800 flex items-center justify-between mb-4";
  const dataLabelStyle = "font-medium text-gray-700";
  const dataValueStyle = "text-gray-700";

  // --- Data Fetching Function ---
  // Asynchronous function to fetch data from a given API endpoint
  const fetchData = async (endpoint) => {
    try {
      // Make the fetch request to the constructed URL
      const response = await fetch(`${API_BASE_URL}${endpoint}`);
      // Check if the response status code indicates success (e.g., 200 OK)
      if (!response.ok) {
        // If not OK, try to read the error body and throw a detailed error
        const errorBody = await response.text();
        throw new Error(
          `API request failed: ${response.status} - ${response.statusText}. Body: ${errorBody}`
        );
      }
      // Parse the JSON response body
      const data = await response.json();
      // Check the 'success' flag within the API response data structure
      if (!data.success) {
        // If the API indicates failure internally, throw an error
        throw new Error(`API returned success: false for ${endpoint}`);
      }
      // Return the successfully fetched and parsed data
      return data;
    } catch (err) {
      // Log any error that occurred during the fetch process
      console.error(`Error fetching ${endpoint}:`, err);
      // Re-throw the error to be handled by the calling code (in useEffect)
      throw err;
    }
  };

  // --- useEffect Hook for Data Loading ---
  // Runs once after the component mounts, thanks to the empty dependency array []
  useEffect(() => {
    // Define an async function to load all necessary dashboard data
    const loadDashboardData = async () => {
      setIsLoading(true); // Set loading state to true before starting fetches
      setError(null);     // Clear any previous errors

      try {
        // Use Promise.allSettled to fetch all data concurrently
        // allSettled waits for all promises to settle (either resolve or reject)
        // This allows partial data loading if some endpoints fail
        const [
          revenueData,
          bookingsData,
          demographicsData,
          countriesData,
        ] = await Promise.allSettled([
          fetchData(`/api/v1/hms/hotels/${HOTEL_ID}/dashboard/revenue`),
          fetchData(`/api/v1/hms/hotels/${HOTEL_ID}/dashboard/bookings`),
          fetchData(`/api/v1/hms/hotels/${HOTEL_ID}/dashboard/demographics`),
          fetchData(`/api/v1/hms/hotels/${HOTEL_ID}/dashboard/countries`),
        ]);

        // Variable to accumulate error messages if any fetch fails
        let fetchError = null;

        // --- Process Revenue Data ---
        if (revenueData.status === 'fulfilled' && revenueData.value) {
           // Parse the revenue string to a number, default to 0 if parsing fails
           setTotalRevenue(parseFloat(revenueData.value.revenue) || 0);
        } else {
            // Log error if fetch failed or data is missing, record the error
            console.error("Failed to fetch Revenue:", revenueData.reason);
            fetchError = fetchError || new Error("Failed to load Revenue data.");
        }

        // --- Process Bookings Data ---
        if (bookingsData.status === 'fulfilled' && bookingsData.value) {
            // Set total bookings, default to 0 if missing
            setTotalBookings(bookingsData.value.booked || 0);
        } else {
            console.error("Failed to fetch Bookings:", bookingsData.reason);
            fetchError = fetchError || new Error("Failed to load Bookings data.");
        }

        // --- Process Demographics Data ---
        if (demographicsData.status === 'fulfilled' && demographicsData.value) {
            // Set gender demographics state, default counts to 0
            setGenderDemographics({
                Male: demographicsData.value.male || 0,
                Female: demographicsData.value.female || 0,
            });
        } else {
            console.error("Failed to fetch Demographics:", demographicsData.reason);
            fetchError = fetchError || new Error("Failed to load Demographics data.");
        }

        // --- Process Countries Data ---
        if (countriesData.status === 'fulfilled' && countriesData.value) {
            // Transform the country data format: [{"country": count}] -> [{name: "Country", value: count}]
            const transformedCountries = (countriesData.value.country || []).map(item => {
                // Extract the key (country name) and value (count) from each object
                const [name, value] = Object.entries(item)[0];
                // Capitalize the first letter of the country name for display
                const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
                return { name: capitalizedName, value };
            }).sort((a, b) => b.value - a.value); // Sort countries by guest count descending
            // Update the guestCountries state
            setGuestCountries(transformedCountries);
        } else {
            console.error("Failed to fetch Countries:", countriesData.reason);
            fetchError = fetchError || new Error("Failed to load Country data.");
        }

        // --- Final Error Handling ---
        // If any fetch resulted in an error, set the error state for the UI
        if (fetchError) {
            setError(fetchError.message + " Some data might be missing.");
        }

      } catch (err) {
        // Catch any unexpected errors during the promise handling or state updates
        console.error("Dashboard data loading error:", err);
        setError("Failed to load dashboard data. Please try again later.");
        // Reset state to default values in case of a catastrophic error
        setTotalRevenue(0);
        setTotalBookings(0);
        setGenderDemographics({});
        setGuestCountries([]);
      } finally {
        // This block always runs, regardless of success or failure
        setIsLoading(false); // Set loading state to false once all processing is done
      }
    };

    // Call the data loading function when the component mounts
    loadDashboardData();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  // --- Chart Data Preparation ---
  // Prepare data in the format required by Chart.js

  // Data for the "Guests by Country" Doughnut chart
  const guestCountriesChartData = {
    labels: guestCountries.map((country) => country.name), // Country names as labels
    datasets: [
      {
        label: "Guests by Country", // Dataset label
        data: guestCountries.map((country) => country.value), // Guest counts as data points
        backgroundColor: [ // Array of colors for chart segments
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(153, 102, 255, 0.8)",
          "rgba(255, 159, 64, 0.8)",
          "rgba(199, 199, 199, 0.8)",
          "rgba(83, 102, 255, 0.8)",
          // Add more colors if expecting more countries
        ],
        borderColor: "rgba(255, 255, 255, 1)", // Border color for segments
        borderWidth: 1, // Border width for segments
      },
    ],
  };

  // Data for the "Gender Demographics" Doughnut chart
  const genderDemographicsChartData = {
    labels: Object.keys(genderDemographics || {}), // Gender labels ('Male', 'Female')
    datasets: [
      {
        label: "Gender Distribution", // Dataset label
        data: Object.values(genderDemographics || {}), // Gender counts
        backgroundColor: [ // Colors for Male/Female segments
          "rgba(54, 162, 235, 0.8)", // Typically Blue for Male
          "rgba(255, 99, 132, 0.8)", // Typically Pink/Red for Female
        ],
        borderColor: "rgba(255, 255, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  // --- Chart Options ---
  // Configure options for the charts

  // Common options applicable to both Doughnut charts
  const commonChartOptions = {
    responsive: true, // Make charts responsive to container size
    maintainAspectRatio: false, // Allow chart height to be controlled by CSS/container height
    plugins: {
      legend: {
        position: "bottom", // Position the legend below the chart
        labels: {
          font: { size: 14 }, // Font size for legend items
          color: "#555",      // Font color for legend items
        },
      },
      title: {
        display: true, // Display the chart title
        font: { size: 18 }, // Font size for the title
        color: "#333",      // Font color for the title
      },
      tooltip: { // Configure tooltips shown on hover
          callbacks: {
              // Customize the label shown in the tooltip
              label: function(context) {
                  let label = context.dataset.label || ''; // Get dataset label (e.g., "Guests by Country")
                  if (label) {
                      label += ': ';
                  }
                  if (context.parsed !== null) {
                      // Add the raw data value (count) to the tooltip
                      label += context.parsed;
                  }
                  return label;
              }
          }
      }
    },
  };

  // Specific options for the "Guests by Country" chart (inherits common options)
  const guestCountriesChartOptions = {
    ...commonChartOptions, // Spread common options
    plugins: {
      ...commonChartOptions.plugins, // Spread common plugin options
      title: {
        ...commonChartOptions.plugins.title, // Spread common title options
        text: "Guests by Country", // Set the specific title text
      },
    },
  };

  // Specific options for the "Gender Demographics" chart (inherits common options)
  const genderDemographicsChartOptions = {
    ...commonChartOptions, // Spread common options
    cutout: '60%', // Make the Doughnut chart have a hole in the middle (percentage of radius)
    plugins: {
      ...commonChartOptions.plugins, // Spread common plugin options
      title: {
        ...commonChartOptions.plugins.title, // Spread common title options
        text: "Gender Demographics (Count)", // Set the specific title text, indicating it shows counts
      },
    },
  };

  // --- Loading State UI ---
  // Display a loading indicator while data is being fetched
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          {/* Simple spinner animation */}
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-lg text-gray-700">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  // --- Render Dashboard ---
  // Render the main dashboard UI once data is loaded (or if an error occurred)
  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto"> {/* Main content container */}

        {/* Display Error Message if fetch failed */}
        {error && (
          <div
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded"
            role="alert" // Accessibility attribute
          >
            <p className="font-bold">Data Loading Error</p>
            <p>{error}</p> {/* Display the specific error message */}
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
              <h2
                className={`${subHeadingStyle} flex items-center justify-between mb-3`}
              >
                Total Revenue <FaChartLine className="text-blue-500 ml-2" />
              </h2>
              <p className={`${metricValueStyle} text-blue-600`}>
                {/* Format revenue as currency (e.g., $1,234.56) */}
                {totalRevenue.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD", // Adjust currency code as needed
                })}
              </p>
            </div>
            <p className={metricLabelStyle}>All Time</p> {/* Label for the metric time frame */}
          </div>

          {/* Total Bookings Card */}
          <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between h-40">
            <div>
              <h2
                className={`${subHeadingStyle} flex items-center justify-between mb-3`}
              >
                Total Bookings <FaCalendarCheck className="text-purple-500 ml-2" />
              </h2>
              <p className={`${metricValueStyle} text-purple-600`}>
                {totalBookings} {/* Display raw booking count */}
              </p>
            </div>
            <p className={metricLabelStyle}>All Time</p> {/* Label for the metric time frame */}
          </div>
        </div>

        {/* Charts & Detailed Info Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Guests by Country Section */}
          <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300">
            <h2 className={`${sectionTitleStyle}`}>
              Guests by Country <FaGlobe className="text-indigo-500 ml-2" />
            </h2>
            {/* Container for the chart with fixed height */}
            <div className="mb-4 h-80">
              {/* Conditionally render the chart only if there is data */}
              {guestCountries.length > 0 ? (
                <Doughnut
                  data={guestCountriesChartData}
                  options={guestCountriesChartOptions}
                />
              ) : (
                 // Display message if no country data is available
                 <p className="text-center text-gray-500 mt-10">No country data available.</p>
              )}
            </div>
            {/* Conditionally render the list below the chart */}
            {guestCountries.length > 0 && (
                // Scrollable list container with max height
                <ul className="max-h-48 overflow-y-auto mt-4 border-t pt-2">
                {/* Map through the country data to create list items */}
                {guestCountries.map((country) => (
                    <li
                    key={country.name} // Use country name as unique key
                    className="py-2 border-b border-gray-100 last:border-b-0"
                    >
                    <div className="flex justify-between items-center">
                        <span className={dataLabelStyle}>{country.name}</span>
                        <span className={dataValueStyle}>{country.value} Guests</span>
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
            {/* Container for the chart with fixed height */}
            <div className="mb-4 h-80">
              {/* Conditionally render the chart if there's male or female data */}
              {(genderDemographics.Male > 0 || genderDemographics.Female > 0) ? (
                <Doughnut
                  data={genderDemographicsChartData}
                  options={genderDemographicsChartOptions}
                />
               ) : (
                 // Display message if no gender data is available
                 <p className="text-center text-gray-500 mt-10">No gender data available.</p>
               )}
            </div>
            {/* Conditionally render the list below the chart */}
            {(genderDemographics.Male > 0 || genderDemographics.Female > 0) && (
                <ul className="mt-4 border-t pt-2">
                {/* Map through the gender data (Male, Female) to create list items */}
                {Object.entries(genderDemographics).map(([gender, count]) => (
                    <li
                    key={gender} // Use gender ('Male'/'Female') as unique key
                    className="py-2 border-b border-gray-100 last:border-b-0"
                    >
                    <div className="flex justify-between items-center">
                        <span className={dataLabelStyle}>{gender}</span>
                        <span className={dataValueStyle}>{count}</span>
                    </div>
                    </li>
                ))}
                </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Export the Dashboard component for use in other parts of the application
export default Dashboard;