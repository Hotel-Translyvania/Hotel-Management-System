import React from "react";
import MetricCard from "./MetricCard";
import { FaChartLine, FaCalendarCheck } from "react-icons/fa";

const KeyMetrics = ({ totalRevenue, totalBookings }) => {

  const formattedRevenue = (totalRevenue / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
      <MetricCard
        title="Total Revenue"
        value={formattedRevenue} 
        icon={FaChartLine}
        label="All Time"
        valueClassName="text-blue-600"
        iconClassName="text-blue-500"
      />
      <MetricCard
        title="Total Bookings"
        value={totalBookings}
        icon={FaCalendarCheck}
        label="All Time"
        valueClassName="text-purple-600"
        iconClassName="text-purple-500"
      />
    </div>
  );
};

export default KeyMetrics;