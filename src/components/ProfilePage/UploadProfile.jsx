import { UploadIcon } from "@radix-ui/react-icons";
import { Box, Text } from "@radix-ui/themes";
import { useRef, useState } from "react";
const UploadProfile = ({ preview, setPreview, setProfile }) => {
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    setProfile(file);
    setPreview(URL.createObjectURL(file));
  };

  const openFilePicker = () => {
    fileInputRef.current.click();
  };

  return (
    <Box>
      <Box
        className="flex items-center justify-center 
        mb-2 cursor-pointer 
        rounded-full w-24 h-24 
        bg-white border-4 border-radix-green
        hover:drop-shadow-lg hover:bg-radix-green/50 
        transition-colors duration-150
        overflow-hidden relative"
        onClick={openFilePicker}
      >
        <input
          ref={fileInputRef}
          type="file"
          name="profile_img"
          id="upload_profile"
          accept="image"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        {preview ? (
          <img
            src={preview}
            alt="Profile Image"
            className="object-cover w-full h-full"
          />
        ) : (
          <UploadIcon className="text-radix-green font-bold w-8 h-8" />
        )}
      </Box>
      <Text>Upload Profile</Text>
    </Box>
  );
};

export default UploadProfile;
