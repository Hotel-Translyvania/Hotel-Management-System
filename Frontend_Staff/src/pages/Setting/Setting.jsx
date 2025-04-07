import React from "react";
import ProfileSettings from "../Profile/profileEdit";
import { userProfile } from "@/TestData/HotelConfig";
import Security from "@/components/Security/Security";

const Setting = () => {
  const [activeButton, setActiveButton] = React.useState("profile");

  return (
    <div className="flex flex-col flex-1 p-6 bg-white  rounded-lg">
      <div className="flex flex-row border-b w-fill text-[#718EBF] gap-12 font-serif text-lg">
        <button
          className={`items-center ${
            activeButton === "profile"
              ? "border-b-2 text-[#1814F3] border-[#1814F3]"
              : ""
          }`}
          onClick={() => setActiveButton("profile")}
        >
          Edit Profile
        </button>
        <button
          className={`items-center ${
            activeButton === "security"
              ? "border-b-2 text-[#1814F3] border-[#1814F3]"
              : ""
          }`}
          onClick={() => setActiveButton("security")}
        >
          Security
        </button>
      </div>
      {activeButton === "profile" && (
        <ProfileSettings userProfile={userProfile} />
      )}
      {activeButton === "security" && <Security/>}
    </div>
  );
};

export default Setting;
