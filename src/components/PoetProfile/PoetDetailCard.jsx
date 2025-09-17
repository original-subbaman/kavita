import { PlusIcon } from "@radix-ui/react-icons";
import { getInitialsOfName } from "../../utils/Helper";
import { Box, Avatar, Button } from "@radix-ui/themes";

const PoetDetailCard = ({
  profile = "",
  username = "username",
  name = "John Doe",
  bio = "Hakuna Matata! This is my bio.",
  poems = "100",
  followers = "0",
}) => {
  return (
    <Box className="bg-[#212327] rounded-xl p-8 mb-8 w-full">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Avatar */}
        <Avatar
          className="h-24 w-24"
          src={profile || getInitialsOfName(name)}
        />

        {/* Profile Info */}
        <div className="flex-1">
          <div>
            <div className="flex items-center gap-4 ">
              <h1 className="text-2xl text-white">{name}</h1>
              <Button variant="ghost" color="orange">
                <PlusIcon className="h-4 w-4" />
                Follow
              </Button>
            </div>
            <p className="text-gray-400">@{username}</p>
          </div>

          {/* Bio */}
          <p className="text-gray-300 mb-6 max-w-2xl leading-relaxed">{bio}</p>

          {/* Stats */}
          <div className="flex gap-6">
            <div className="text-center">
              <div className="text-xl text-white">{poems}</div>
              <div className="text-sm text-gray-400">Poems</div>
            </div>
            <div className="text-center">
              <div className="text-xl text-white">
                {followers.toLocaleString()}
              </div>
              <div className="text-sm text-gray-400">Followers</div>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default PoetDetailCard;
