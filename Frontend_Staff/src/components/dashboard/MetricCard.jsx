import React from "react";

const MetricCard = ({ title, value, icon: Icon, label, valueClassName, iconClassName }) => {
  const subHeadingStyle = "text-xl font-semibold text-gray-800";
  const metricValueStyle = "text-4xl font-bold text-gray-900";
  const metricLabelStyle = "text-sm text-gray-600 uppercase tracking-wider";

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between h-40">
      <div>
        <h2 className={`${subHeadingStyle} flex items-center justify-between mb-3`}>
          {title}
          {Icon && <Icon className={`${iconClassName} ml-2`} />}
        </h2>
        <p className={`${metricValueStyle} ${valueClassName}`}>{value}</p>
      </div>
      <p className={metricLabelStyle}>{label}</p>
    </div>
  );
};

export default MetricCard;