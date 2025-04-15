import React, { useState } from "react";
import ProfileSettings from "../Profile/profileEdit";
import Security from "@/components/Security/Security";
import { useAuthStore } from "@/components/Auth/authStore";

const Setting = () => {
  const [activeButton, setActiveButton] = useState("profile");
  const { user } = useAuthStore();

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
        <ProfileSettings userProfile={user} />
      )}
      {activeButton === "security" && <Security/>}
    </div>
  );
};

export default Setting;
