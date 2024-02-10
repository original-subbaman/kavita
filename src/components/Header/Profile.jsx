import React from "react";

function Profile({ name }) {
  return (
    <div className="flex items-center gap-2 rounded cursor-pointer p-2">
      <p className="text-3xl">{name}</p>
      <button
        className="rounded-full border-4 border-white bg-white w-12 h-12"
        onClick={() => {}}
      ></button>
    </div>
  );
}

export default Profile;
