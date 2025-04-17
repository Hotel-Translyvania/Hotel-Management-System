import React from "react";
import { Doughnut } from "react-chartjs-2";
import ChartCard from "./ChartCard";
import { FaVenusMars } from "react-icons/fa";

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
        borderRadius: 5
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

const GenderDemographicsChart = ({ genderDemographics }) => {
  const dataLabelStyle = "font-medium text-gray-700";
  const dataValueStyle = "text-gray-700";
  const isValidObject =
    genderDemographics && typeof genderDemographics === "object";
  const hasData =
    isValidObject && (genderDemographics.Male > 0 || genderDemographics.Female > 0);
  const demographicsEntries = isValidObject
    ? Object.entries(genderDemographics)
    : [];

  const chartColors = ["#54A2EB", "#F48FB1"]; // Blue and Pink colors

  const genderDemographicsChartData = {
    labels: isValidObject ? Object.keys(genderDemographics) : [],
    datasets: [
      {
        label: "Count",
        data: isValidObject ? Object.values(genderDemographics) : [],
        backgroundColor: chartColors,
        borderColor: "rgba(255, 255, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const genderDemographicsChartOptions = {
    ...commonChartOptions,
    cutout: "60%", // Doughnut hole
  };

  return (
    <ChartCard
      title="Gender Demographics"
      icon={FaVenusMars}
      iconClassName="text-pink-500"
      noDataMessage="No gender data available."
      hasData={hasData}
    >
      <div className="mb-4 h-80 relative">
        <Doughnut
          data={genderDemographicsChartData}
          options={genderDemographicsChartOptions}
        />
      </div>
      {hasData && (
        <ul className="mt-4 flex-grow flex-shrink-0">
          {demographicsEntries.map(([gender, count], index) => (
            <li
              key={gender}
              className="flex items-center justify-between py-2"
            >
              <div className="flex items-center">
                <span
                  className="inline-block w-3 h-3 mr-2 rounded-full"
                  style={{ backgroundColor: chartColors[index % chartColors.length] }}
                ></span>
                <span className={dataLabelStyle}>{gender}</span>
              </div>
              <span className={dataValueStyle}>{count}</span>
            </li>
          ))}
        </ul>
      )}
    </ChartCard>
  );
};

export default GenderDemographicsChart;