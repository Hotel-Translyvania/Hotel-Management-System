const SidebarHeader = ({ isOpen, appName }) => (
  <div className="p-4 flex items-center justify-center border-b">
    {isOpen ? (
      <div className="flex items-center flex-row gap-4">
        {appName !== "Administration" && (
          <img src="hotel.png" alt="hotel" className="w-12 h-12" />
        )}
        <div className="flex items-center">
          <h1 className="text-xl font-bold font-serif text-blue-500">
            {appName}
          </h1>
        </div>
      </div>
    ) : (
      <div className="w-12 h-12 bg-blue-500 flex justify-center rounded-full text-white font-serif items-center">
        {appName[0]}
        {/* <img src="hotel.png" alt="hotel" className="w-12 h-12" />/ */}
      </div>
    )}
  </div>
);

export default SidebarHeader;
