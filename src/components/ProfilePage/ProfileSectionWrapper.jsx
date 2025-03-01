import React from "react";

function ProfileSectionWrapper({ height, children }) {
  return (
    <div
      className={`w-[100%] bg-[#212327] text-white rounded-lg h-[${height}] p-6 drop-shadow-md`}
    >
      {children}
    </div>
  );
}

export default ProfileSectionWrapper;
