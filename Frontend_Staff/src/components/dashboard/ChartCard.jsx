import React from "react";

const ChartCard = ({ title, icon: Icon, iconClassName, children, noDataMessage, hasData }) => {
  const sectionTitleStyle = "text-2xl font-semibold text-gray-800 flex items-center justify-between mb-4";

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
      <h2 className={`${sectionTitleStyle}`}>
        {title}
        {Icon && <Icon className={`${iconClassName} ml-2`} />}
      </h2>
      <div className="flex-grow flex flex-col"> 
        {hasData ? (
          children 
        ) : (
          <div className="flex-grow flex items-center justify-center"> 
            <p className="text-center text-gray-500">{noDataMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChartCard;