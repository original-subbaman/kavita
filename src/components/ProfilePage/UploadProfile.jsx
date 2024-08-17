import { Box } from "@radix-ui/themes";
const UploadProfile = ({ profile, handleOnClick, onImgSelect }) => {
  return (
    <Box className="rounded-full w-40 h-40 bg-white" onClick={handleOnClick}>
      <input
        type="file"
        name="profile_img"
        id="upload_profile"
        accept="image"
        style={{ display: "none" }}
        onChange={onImgSelect}
      />
      {profile && (
        <img
          src={profile}
          alt="Profile Image"
          className="object-cover w-40 h-40 rounded-full"
        />
      )}
    </Box>
  );
};

export default UploadProfile;
