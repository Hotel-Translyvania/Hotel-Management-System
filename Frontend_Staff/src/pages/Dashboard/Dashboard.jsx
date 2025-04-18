import React, { useState, useEffect } from "react";
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
import { FaHome } from "react-icons/fa";

import LoadingSpinner from "../../components/dashboard/LoadingSpinner";
import ErrorMessage from "../../components/dashboard/ErrorMessage";
import KeyMetrics from "../../components/dashboard/KeyMetrics";
import GuestCountryChart from "../../components/dashboard/GuestCountryChart";
import GenderDemographicsChart from "../../components/dashboard/GenderDemographicsChart";
import RoomTypeChart from "../../components/dashboard/RoomTypeChart";
import AssignmentsInsights from "../../components/dashboard/AssignmentsInsights";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const API_BASE_URL = "http://localhost:3000";
const HOTEL_ID = 1;

const Dashboard = () => {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalBookings, setTotalBookings] = useState(0);
  const [guestCountries, setGuestCountries] = useState([]);
  const [genderDemographics, setGenderDemographics] = useState({});
  const [roomTypeData, setRoomTypeData] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allFetchesFailed, setAllFetchesFailed] = useState(false);

  const headingStyle = "text-3xl font-extrabold text-gray-900 tracking-tight mb-4";

  const fetchData = async (endpoint) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`);
      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(
          `API request failed for ${endpoint}: ${response.status} - ${response.statusText}. Body: ${errorBody}`
        );
      }
      const data = await response.json();
      if (data && data.success === false) {
          throw new Error(`API returned error for ${endpoint}: ${data.message || 'Unknown API error'}`);
      }
      return data;
    } catch (err) {
      console.error(`Error fetching ${endpoint}:`, err);
      throw err;
    }
  };

  useEffect(() => {
    const loadDashboardData = async () => {
      setIsLoading(true);
      setError(null);
      setAllFetchesFailed(false);
      let fetchErrors = [];

      try {
        const results = await Promise.allSettled([
          fetchData(`/api/v1/hms/hotels/${HOTEL_ID}/dashboard/revenue`),
          fetchData(`/api/v1/hms/hotels/${HOTEL_ID}/dashboard/bookings`),
          fetchData(`/api/v1/hms/hotels/${HOTEL_ID}/dashboard/demographics`),
          fetchData(`/api/v1/hms/hotels/${HOTEL_ID}/dashboard/countries`),
          fetchData(`/api/v1/hms/hotels/${HOTEL_ID}/dashboard/room-types`),
          fetchData(`/api/v1/hms/hotels/${HOTEL_ID}/assignments`),
        ]);

        const allFailed = results.every(result => result.status === 'rejected');

        if (allFailed) {
          console.error("All dashboard fetches failed. First reason:", results[0]?.reason || "Unknown reason");
          setError("Failed to load dashboard data. Please check the connection or try again later.");
          setAllFetchesFailed(true);
          setTotalRevenue(0);
          setTotalBookings(0);
          setGenderDemographics({});
          setGuestCountries([]);
          setRoomTypeData([]);
          setAssignments([]);
        } else {
          const [
            revenueData,
            bookingsData,
            demographicsData,
            countriesData,
            roomTypesData,
            assignmentsData,
          ] = results;

          if (revenueData.status === 'fulfilled' && revenueData.value?.revenue !== undefined) {
             setTotalRevenue(parseFloat(revenueData.value.revenue) / 100 || 0);
          } else {
            console.error("Failed to fetch Revenue:", revenueData.reason || "Missing revenue data");
            fetchErrors.push("Revenue");
            setTotalRevenue(0);
          }

          if (bookingsData.status === 'fulfilled' && bookingsData.value?.booked !== undefined) {
            setTotalBookings(bookingsData.value.booked || 0);
          } else {
            console.error("Failed to fetch Bookings:", bookingsData.reason || "Missing booked data");
            fetchErrors.push("Bookings");
            setTotalBookings(0);
          }

          if (demographicsData.status === 'fulfilled' && demographicsData.value) {
            setGenderDemographics({
              Male: demographicsData.value.male || 0,
              Female: demographicsData.value.female || 0,
            });
          } else {
            console.error("Failed to fetch Demographics:", demographicsData.reason || "Invalid demographics data");
            fetchErrors.push("Demographics");
            setGenderDemographics({});
          }

          if (countriesData.status === 'fulfilled' && Array.isArray(countriesData.value?.country)) {
              const transformedCountries = countriesData.value.country.map(item => {
                  const entry = Object.entries(item)[0];
                  if (!entry) return null;
                  const [name, value] = entry;
                  const capitalizedName = name ? name.charAt(0).toUpperCase() + name.slice(1) : "Unknown";
                  return { name: capitalizedName, value: value || 0 };
              }).filter(Boolean)
                .sort((a, b) => b.value - a.value);
              setGuestCountries(transformedCountries);
          } else {
              console.error("Failed to fetch or process Countries:", countriesData.reason || "Missing or invalid 'country' array");
              fetchErrors.push("Country");
              setGuestCountries([]);
          }

          if (roomTypesData.status === 'fulfilled' && roomTypesData.value?.data && typeof roomTypesData.value.data === 'object') {
              const rawRoomData = roomTypesData.value.data;
              const transformedRoomTypes = Object.entries(rawRoomData)
                  .map(([type, rooms]) => ({
                      type: type || "Unknown",
                      count: Array.isArray(rooms) ? rooms.length : 0
                  }))
                  .filter(room => room.count > 0)
                  .sort((a, b) => b.count - a.count);
              setRoomTypeData(transformedRoomTypes);
           } else {
              console.error("Failed to fetch or process Room Types:", roomTypesData.reason || "Missing or invalid 'data' object");
              fetchErrors.push("Room Types");
              setRoomTypeData([]);
           }

          if (assignmentsData.status === 'fulfilled' && (assignmentsData.value?.success || Array.isArray(assignmentsData.value))) {
              const assignmentsArray = assignmentsData.value?.data || assignmentsData.value;
              if (Array.isArray(assignmentsArray)) {
                 setAssignments(assignmentsArray);
              } else {
                 console.error("Fetched Assignments data is not an array:", assignmentsData.value);
                 fetchErrors.push("Assignments (Invalid Format)");
                 setAssignments([]);
              }
          } else {
              console.error("Failed to fetch or process Assignments:", assignmentsData.reason || "Missing or invalid data structure");
              fetchErrors.push("Assignments");
              setAssignments([]);
          }

           if (fetchErrors.length > 0) {
             setError(`Failed to load some data: ${fetchErrors.join(', ')}. Displaying available data.`);
           } else {
             setError(null);
           }
        }

      } catch (err) {
         console.error("An unexpected error occurred during dashboard data loading:", err);
         setError("An unexpected error occurred while loading dashboard data.");
         setAllFetchesFailed(true);
         setTotalRevenue(0);
         setTotalBookings(0);
         setGenderDemographics({});
         setGuestCountries([]);
         setRoomTypeData([]);
         setAssignments([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isLoading && allFetchesFailed) {
      return (
          <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
              <div className="container mx-auto">
                 <h1 className={headingStyle}>
                    <div className="flex flex-row gap-2 items-center">
                       Dashboard <FaHome className="text-gray-500 ml-2" />
                    </div>
                 </h1>
                 <ErrorMessage message={error} />
              </div>
          </div>
      );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <ErrorMessage message={error} />

        <h1 className={headingStyle}>
          <div className="flex flex-row gap-2 items-center">
            Welcome to the Dashboard <FaHome className="text-gray-500 ml-2" />
          </div>
        </h1>

        <KeyMetrics
          totalRevenue={totalRevenue}
          totalBookings={totalBookings}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <GuestCountryChart guestCountries={guestCountries} />
          <GenderDemographicsChart genderDemographics={genderDemographics} />
          <RoomTypeChart roomTypeData={roomTypeData} />
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300 ease-in-out">
           <AssignmentsInsights assignments={assignments} />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;