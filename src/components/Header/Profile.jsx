import { useState } from "react";
function Profile({ name }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const open = Boolean(anchorEl);
  return (
    <div className="flex items-center gap-2 rounded cursor-pointer p-2">
      <p className="text-3xl">{name}</p>
      <button
        className="rounded-full border-4 border-white w-12 h-12"
        onClick={handleClick}
      ></button>
    </div>
  );
}

export default Profile;
