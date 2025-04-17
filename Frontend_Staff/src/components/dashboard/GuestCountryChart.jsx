import React from "react";
import { Doughnut } from "react-chartjs-2";
import ChartCard from "./ChartCard";
import { FaGlobe } from "react-icons/fa";

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

const GuestCountryChart = ({ guestCountries }) => {
  const dataLabelStyle = "font-medium text-gray-700";
  const dataValueStyle = "text-gray-700";

  const hasData = Array.isArray(guestCountries) && guestCountries.length > 0;

  const chartColors = [
    "#F48FB1", // Pink - Belgium
    "#90CAF9", // Light Blue - Ethiopian
    "#FFE082", // Light Yellow - Canada
    "#80CBC4", // Light Teal - Switzerland
  ];

  const guestCountriesChartData = {
    labels: hasData ? guestCountries.map((country) => country.name) : [],
    datasets: [
      {
        label: "Guests",
        data: hasData ? guestCountries.map((country) => country.value) : [],
        backgroundColor: chartColors,
        borderColor: "rgba(255, 255, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const guestCountriesChartOptions = {
    ...commonChartOptions,
    cutout: "60%", 
  };

  return (
    <ChartCard
      title="Guests by Country"
      icon={FaGlobe}
      iconClassName="text-indigo-500"
      noDataMessage="No country data available."
      hasData={hasData}
    >
      <div className="mb-4 h-80 relative">
        <Doughnut
          data={guestCountriesChartData}
          options={guestCountriesChartOptions}
        />
      </div>
      {hasData && (
        <ul className="mt-4 flex-grow flex-shrink-0">
          {guestCountries.map((country, index) => (
            <li
              key={country.name}
              className="flex items-center justify-between py-2"
            >
              <div className="flex items-center">
                <span
                  className="inline-block w-3 h-3 mr-2 rounded-full"
                  style={{ backgroundColor: chartColors[index % chartColors.length] }}
                ></span>
                <span className={dataLabelStyle}>{country.name}</span>
              </div>
              <span className={dataValueStyle}>
                {country.value} Guest{country.value !== 1 ? "s" : ""}
              </span>
            </li>
          ))}
        </ul>
      )}
    </ChartCard>
  );
};

export default GuestCountryChart;