import React from "react";
import { Doughnut } from "react-chartjs-2";
import ChartCard from "./ChartCard";
import { FaBed } from "react-icons/fa";

const commonChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
      align: "start",
      labels: {
        font: { size: 14 },
        color: "#555",
        boxWidth: 12,
        useBorderRadius: true,
        borderRadius: 5,
      },
    },
    title: { display: false },
    tooltip: {
      callbacks: {
        label: function (context) {
          let datasetLabel = context.dataset.label || "";
          let dataLabel = context.label || "";
          let value = context.parsed || 0;
          let finalLabel = datasetLabel ? `${datasetLabel}: ` : "";
          finalLabel += `${dataLabel}: ${value}`;
          return finalLabel;
        },
      },
    },
  },
};

const RoomTypeChart = ({ roomTypeData }) => {
  const dataLabelStyle = "font-medium text-gray-700";
  const dataValueStyle = "text-gray-700";
  const hasData = Array.isArray(roomTypeData) && roomTypeData.length > 0;

  const chartColors = [
    "rgba(75, 192, 192, 0.8)",
    "rgba(153, 102, 255, 0.8)",
    "rgba(255, 159, 64, 0.8)",
    "rgba(255, 99, 132, 0.8)",
    "rgba(54, 162, 235, 0.8)",
    "rgba(255, 206, 86, 0.8)",
    "rgba(100, 220, 150, 0.8)",
    "rgba(200, 200, 200, 0.8)",
  ];

  const roomTypesChartData = {
    labels: hasData ? roomTypeData.map((room) => room.type) : [],
    datasets: [
      {
        label: "Rooms",
        data: hasData ? roomTypeData.map((room) => room.count) : [],
        backgroundColor: chartColors,
        borderColor: "rgba(255, 255, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const roomTypesChartOptions = {
    ...commonChartOptions,
    cutout: "60%",
  };

  return (
    <ChartCard
      title="Room Types"
      icon={FaBed}
      iconClassName="text-green-500"
      noDataMessage="No room type data available."
      hasData={hasData}
    >
      <div className="mb-4 h-80 relative">
        <Doughnut
          data={roomTypesChartData}
          options={roomTypesChartOptions}
        />
      </div>
      {hasData && (
        <ul className="mt-4 flex-grow flex-shrink-0">
          {roomTypeData.map((room, index) => (
            <li
              key={room.type}
              className="flex items-center justify-between py-2"
            >
              <div className="flex items-center">
                <span
                  className="inline-block w-3 h-3 mr-2 rounded-full"
                  style={{ backgroundColor: chartColors[index % chartColors.length] }}
                ></span>
                <span className={dataLabelStyle}>{room.type}</span>
              </div>
              <span className={dataValueStyle}>
                {room.count} Room{room.count !== 1 ? "s" : ""}
              </span>
            </li>
          ))}
        </ul>
      )}
    </ChartCard>
  );
};

export default RoomTypeChart;