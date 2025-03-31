import React, { useState, useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
    LineController,
    BarController,
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { FaCog, FaUser, FaCalendarAlt, FaChartLine, FaBed, FaGlobe, FaTasks, FaMoneyBillAlt } from 'react-icons/fa';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
    LineController,
    BarController
);

// Mock data fallbacks
const MOCK_DATA = {
    revenue: { totalRevenue: 125000 },
    occupancy: { occupancyRate: 78.5 },
    bookings: [
        { month: 'Jan', bookings: 120 },
        { month: 'Feb', bookings: 150 },
        { month: 'Mar', bookings: 180 },
        { month: 'Apr', bookings: 210 },
        { month: 'May', bookings: 240 },
        { month: 'Jun', bookings: 270 },
    ],
    roomTypes: {
        'Standard': 45,
        'Deluxe': 30,
        'Suite': 15,
        'Executive': 10
    },
    demographics: [
        { country: 'USA', guests: 120, adults: 100, children: 20 },
        { country: 'UK', guests: 80, adults: 70, children: 10 },
        { country: 'Germany', guests: 60, adults: 50, children: 10 },
        { country: 'France', guests: 40, adults: 35, children: 5 }
    ],
    assignments: [
        { type: 'Cleaning', count: 25 },
        { type: 'Maintenance', count: 12 },
        { type: 'Room Service', count: 18 }
    ],
    availability: {
        'Standard': { available: 20, rented: 25, outOfOrder: 0, total: 45 },
        'Deluxe': { available: 10, rented: 18, outOfOrder: 2, total: 30 },
        'Suite': { available: 5, rented: 8, outOfOrder: 2, total: 15 },
        'Executive': { available: 3, rented: 6, outOfOrder: 1, total: 10 }
    },
    satisfaction: { customerSatisfaction: 4.5 },
    revenueTrend: [
        { month: 'Jan', revenue: 100000 },
        { month: 'Feb', revenue: 110000 },
        { month: 'Mar', revenue: 120000 },
        { month: 'Apr', revenue: 130000 },
        { month: 'May', revenue: 140000 },
        { month: 'Jun', revenue: 150000 }
    ],
    transactionAvg: { averageTransactionAmount: 250.75 },
    newBookings: { newBookings: 42 }
};

const API_BASE_URL = 'https://api.mockfly.dev/mocks/9ca538d3-0aee-4b52-9a2c-1eda2c988c83';

const Dashboard = () => {
    // State variables
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [occupancyRate, setOccupancyRate] = useState(0);
    const [bookingsPerMonth, setBookingsPerMonth] = useState([]);
    const [roomTypeBreakdown, setRoomTypeBreakdown] = useState({});
    const [guestDemographics, setGuestDemographics] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [roomAvailability, setRoomAvailability] = useState({});
    const [customerSatisfaction, setCustomerSatisfaction] = useState(0);
    const [revenueTrend, setRevenueTrend] = useState([]);
    const [averageTransactionAmount, setAverageTransactionAmount] = useState(0);
    const [newBookings, setNewBookings] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Text styles
    const headingStyle = 'text-3xl font-extrabold text-gray-900 tracking-tight mb-4';
    const subHeadingStyle = 'text-xl font-semibold text-gray-800';
    const metricValueStyle = 'text-4xl font-bold text-gray-900';
    const metricLabelStyle = 'text-sm text-gray-600 uppercase tracking-wider';
    const sectionTitleStyle = 'text-2xl font-semibold text-gray-800 flex items-center justify-between mb-4';
    const dataLabelStyle = 'font-medium text-gray-700';
    const dataValueStyle = 'text-gray-700';

    // Enhanced fetch function with error handling and mock fallback
    const fetchData = async (endpoint, mockData) => {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`);
            if (!response.ok) throw new Error(`API request failed: ${response.status}`);
            return await response.json();
        } catch (err) {
            console.error(`Error fetching ${endpoint}:`, err);
            console.warn(`Using mock data for ${endpoint}`);
            return mockData;
        }
    };

    // Fetch all dashboard data
    useEffect(() => {
        const loadDashboardData = async () => {
            setIsLoading(true);
            setError(null);
            
            try {
                // Fetch all data in parallel
                const [
                    revenueData,
                    occupancyData,
                    bookingsData,
                    roomBreakdownData,
                    demographicsData,
                    assignmentsData,
                    availabilityData,
                    satisfactionData,
                    revenueTrendData,
                    transactionAvgData,
                    newBookingsData
                ] = await Promise.all([
                    fetchData('/api/dashboard/revenue', MOCK_DATA.revenue),
                    fetchData('/api/dashboard/occupancy', MOCK_DATA.occupancy),
                    fetchData('/api/dashboard/bookings', MOCK_DATA.bookings),
                    fetchData('/api/dashboard/rooms/breakdown', MOCK_DATA.roomTypes),
                    fetchData('/api/dashboard/guests/demographics', MOCK_DATA.demographics),
                    fetchData('/api/dashboard/assignments', MOCK_DATA.assignments),
                    fetchData('/api/dashboard/rooms/availability', MOCK_DATA.availability),
                    fetchData('/api/dashboard/satisfaction', MOCK_DATA.satisfaction),
                    fetchData('/api/dashboard/revenue/trend', MOCK_DATA.revenueTrend),
                    fetchData('/api/dashboard/transactions/average', MOCK_DATA.transactionAvg),
                    fetchData('/api/dashboard/bookings/new', MOCK_DATA.newBookings)
                ]);

                // Update state
                setTotalRevenue(revenueData.totalRevenue || 0);
                setOccupancyRate(occupancyData.occupancyRate || 0);
                setBookingsPerMonth(bookingsData || []);
                setRoomTypeBreakdown(roomBreakdownData || {});
                setGuestDemographics(demographicsData || []);
                setAssignments(assignmentsData || []);
                setRoomAvailability(availabilityData || {});
                setCustomerSatisfaction(satisfactionData.customerSatisfaction || 0);
                setRevenueTrend(revenueTrendData || []);
                setAverageTransactionAmount(transactionAvgData.averageTransactionAmount || 0);
                setNewBookings(newBookingsData.newBookings || 0);
                
            } catch (err) {
                console.error('Dashboard data loading error:', err);
                setError('Failed to load dashboard data. Using mock data instead.');
            } finally {
                setIsLoading(false);
            }
        };

        loadDashboardData();
    }, []);

    // Chart data preparation
    const bookingChartData = {
        labels: bookingsPerMonth.map((item) => item.month),
        datasets: [
            {
                label: 'Bookings per Month',
                data: bookingsPerMonth.map((item) => item.bookings),
                backgroundColor: 'rgba(54, 162, 235, 0.8)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2,
            },
        ],
    };

    const roomTypeChartData = {
        labels: Object.keys(roomTypeBreakdown),
        datasets: [
            {
                label: 'Room Type Breakdown',
                data: Object.values(roomTypeBreakdown),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(153, 102, 255, 0.8)',
                ],
                borderColor: 'rgba(255, 255, 255, 1)',
                borderWidth: 1,
            },
        ],
    };

    const assignmentChartData = {
        labels: assignments.map(request => request.type),
        datasets: [
            {
                label: "Assignments",
                data: assignments.map(request => request.count),
                backgroundColor: [
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 99, 132, 0.8)'
                ],
                borderColor: 'rgba(255, 255, 255, 1)',
                borderWidth: 1,
            }
        ]
    };

    const revenueTrendData = {
        labels: revenueTrend.map((item) => item.month),
        datasets: [
            {
                label: 'Monthly Revenue Trend',
                data: revenueTrend.map((item) => item.revenue),
                fill: true,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.3,
                pointRadius: 5,
                pointBackgroundColor: 'rgba(75, 192, 192, 0.8)',
                pointBorderColor: '#fff'
            },
        ],
    };

    const guestDemographicsChartData = {
        labels: guestDemographics.map(geo => geo.country),
        datasets: [
            {
                label: 'Number of Guests',
                data: guestDemographics.map(geo => geo.guests),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    // Common chart options
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    font: {
                        size: 14
                    },
                    color: '#555'
                }
            },
            title: {
                display: true,
                font: {
                    size: 18
                },
                color: '#333'
            },
        },
        scales: {
            y: {
                ticks: {
                    color: '#555'
                },
                grid: {
                    color: '#eee'
                }
            },
            x: {
                ticks: {
                    color: '#555'
                },
                grid: {
                    color: '#eee'
                }
            }
        },
    };

    // Specific chart options
    const bookingChartOptions = {
        ...chartOptions,
        plugins: {
            ...chartOptions.plugins,
            title: {
                ...chartOptions.plugins.title,
                text: 'Monthly Bookings',
            }
        }
    };

    const roomTypeChartOptions = {
        ...chartOptions,
        plugins: {
            ...chartOptions.plugins,
            title: {
                ...chartOptions.plugins.title,
                text: 'Room Type Distribution',
            }
        }
    };

    const assignmentChartOptions = {
        ...chartOptions,
        cutout: "70%",
        plugins: {
            ...chartOptions.plugins,
            title: {
                ...chartOptions.plugins.title,
                text: 'Assignments',
            }
        }
    };

    const revenueTrendOptions = {
        ...chartOptions,
        plugins: {
            ...chartOptions.plugins,
            title: {
                ...chartOptions.plugins.title,
                text: 'Revenue Trend (Last 12 Months)',
            }
        }
    };

    const guestDemographicsChartOptions = {
        ...chartOptions,
        plugins: {
            ...chartOptions.plugins,
            title: {
                ...chartOptions.plugins.title,
                text: 'Guest Demographics',
            }
        }
    };

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

    return (
        <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto">
                {error && (
                    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 rounded">
                        <p>{error}</p>
                    </div>
                )}

                <h1 className={headingStyle}>
                    Hotel Admin Dashboard
                </h1>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
                    <div className="bg-white shadow-xl rounded-2xl p-6 hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between h-48">
                        <div>
                            <h2 className={`${subHeadingStyle} flex items-center justify-between mb-3`}>
                                Total Revenue <FaChartLine className="text-blue-500 ml-2" />
                            </h2>
                            <p className={`${metricValueStyle} text-blue-600`}>${totalRevenue.toLocaleString()}</p>
                        </div>
                        <p className={metricLabelStyle}>Year-to-date</p>
                    </div>

                    <div className="bg-white shadow-xl rounded-2xl p-6 hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between h-48">
                        <div>
                            <h2 className={`${subHeadingStyle} flex items-center justify-between mb-3`}>
                                Occupancy Rate <FaBed className="text-green-500 ml-2" />
                            </h2>
                            <p className={`${metricValueStyle} text-green-600`}>{occupancyRate.toFixed(1)}%</p>
                        </div>
                        <p className={metricLabelStyle}>Current Month</p>
                    </div>

                    <div className="bg-white shadow-xl rounded-2xl p-6 hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between h-48">
                        <div>
                            <h2 className={`${subHeadingStyle} flex items-center justify-between mb-3`}>
                                Customer Satisfaction <FaUser className="text-yellow-500 ml-2" />
                            </h2>
                            <div className="flex items-center">
                                <p className={`${metricValueStyle} text-yellow-600`}>{customerSatisfaction.toFixed(1)}</p>
                                <span className="text-xl text-gray-500 ml-1">/5</span>
                            </div>
                        </div>
                        <p className={metricLabelStyle}>Average Rating</p>
                    </div>

                    <div className="bg-white shadow-xl rounded-2xl p-6 hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between h-48">
                        <div>
                            <h2 className={`${subHeadingStyle} flex items-center justify-between mb-3`}>
                                New Bookings <FaCalendarAlt className="text-purple-500 ml-2" />
                            </h2>
                            <p className={`${metricValueStyle} text-purple-600`}>{newBookings}</p>
                        </div>
                        <p className={metricLabelStyle}>Last 30 Days</p>
                    </div>

                    <div className="bg-white shadow-xl rounded-2xl p-6 hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between h-48">
                        <div>
                            <h2 className={`${subHeadingStyle} flex items-center justify-between mb-3`}>
                                Average Transaction Amount <FaMoneyBillAlt className="text-indigo-500 ml-2" />
                            </h2>
                            <p className={`${metricValueStyle} text-indigo-600`}>${averageTransactionAmount.toFixed(2)}</p>
                        </div>
                        <p className={metricLabelStyle}>Average per booking</p>
                    </div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white shadow-xl rounded-2xl p-6 hover:shadow-2xl transition-shadow duration-300">
                        <Bar options={bookingChartOptions} data={bookingChartData} height={300} />
                    </div>

                    <div className="bg-white shadow-xl rounded-2xl p-6 hover:shadow-2xl transition-shadow duration-300">
                        <Doughnut options={roomTypeChartOptions} data={roomTypeChartData} height={300} />
                    </div>

                    <div className="bg-white shadow-xl rounded-2xl p-6 hover:shadow-2xl transition-shadow duration-300">
                        <Line options={revenueTrendOptions} data={revenueTrendData} height={300} />
                    </div>
                </div>

                {/* Additional Sections */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Guest Demographics */}
                    <div className="bg-white shadow-xl rounded-2xl p-6 hover:shadow-2xl transition-shadow duration-300">
                        <h2 className={`${sectionTitleStyle}`}>
                            Guest Demographics <FaGlobe className="text-indigo-500 ml-2" />
                        </h2>

                        <div className="mb-4">
                            <Doughnut data={guestDemographicsChartData} options={guestDemographicsChartOptions} height={300} />
                        </div>

                        <ul>
                            {guestDemographics.map((geo) => (
                                <li key={geo.country} className="py-4 border-b border-gray-200 last:border-b-0">
                                    <div className="flex justify-between items-center">
                                        <span className={dataLabelStyle}>{geo.country}</span>
                                        <div>
                                            <span className={dataValueStyle}>{geo.guests} Guests</span>
                                            <span className="text-sm text-gray-500 ml-2">({geo.adults} Adults, {geo.children} Children)</span>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Room Availability and Assignments */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Room Availability */}
                        <div className="bg-white shadow-xl rounded-2xl p-6 hover:shadow-2xl transition-shadow duration-300">
                            <h2 className={`${sectionTitleStyle}`}>
                                Room Availability <FaBed className="text-teal-500 ml-2" />
                            </h2>
                            {Object.keys(roomAvailability).map((roomType) => (
                                <div key={roomType} className="py-4 border-b border-gray-200 last:border-b-0">
                                    <h3 className={dataLabelStyle}>{roomType}</h3>
                                    <p className="text-sm text-gray-600">
                                        Available: <span className="text-green-500">{roomAvailability[roomType].available}</span>,
                                        Rented: <span className="text-red-500">{roomAvailability[roomType].rented}</span>,
                                        Out of Order: <span className="text-yellow-500">{roomAvailability[roomType].outOfOrder}</span>
                                        <span className="text-gray-500"> / Total: {roomAvailability[roomType].total}</span>
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Assignments */}
                        <div className="bg-white shadow-xl rounded-2xl p-6 hover:shadow-2xl transition-shadow duration-300">
                            <h2 className={`${sectionTitleStyle}`}>
                                Assignments <FaTasks className="text-orange-500 ml-2" />
                            </h2>
                            <div className="h-64">
                                <Doughnut options={assignmentChartOptions} data={assignmentChartData} height={250} />
                            </div>
                            <ul className="mt-4">
                                {assignments.map((request) => (
                                    <li key={request.type} className="py-2 border-b border-gray-200 last:border-b-0">
                                        <div className="flex justify-between items-center">
                                            <span className={dataLabelStyle}>{request.type}</span>
                                            <span className={dataValueStyle}>{request.count}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;