import { PlusIcon } from "@radix-ui/react-icons";
import { Avatar, Box, Button } from "@radix-ui/themes";
import { getInitialsOfName } from "../../utils/Helper";
import { useAppTheme } from "../../hooks/useAppTheme";

const FollowButton = ({ onClick, isLoading = true }) => {
  return (
    <Button variant="ghost" color="orange" onClick={onClick}>
      <PlusIcon className="h-4 w-4" />
      Follow
    </Button>
  );
};

const UnfollowButton = ({ onClick, isLoading = true }) => {
  return (
    <Button variant="ghost" color="orange" onClick={onClick}>
      Unfollow
    </Button>
  );
};

const AuthorDetailCard = ({
  profile = "",
  username = "username",
  name = "John Doe",
  bio = "Hakuna Matata! This is my bio.",
  poems = "100",
  followers = "0",
  showFollowButton = true,
  isUserAuthor = false,
  isAuthenticated = false,
  onFollowUser = () => {},
  onUnfollowUser = () => {},
}) => {
  const { mode } = useAppTheme();
  const isDark = mode === "dark";
  return (
    <Box
      className={`${
        mode === "dark" ? "bg-[#212327]" : "bg-white"
      } rounded-xl p-8 border w-full`}
    >
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
              <h1
                className={`text-2xl ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                {name.toLocaleLowerCase()}
              </h1>
              {!isUserAuthor && isAuthenticated && (
                <div>
                  {showFollowButton ? (
                    <FollowButton onClick={onFollowUser} />
                  ) : (
                    <UnfollowButton onClick={onUnfollowUser} />
                  )}
                </div>
              )}
            </div>
            <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
              @{username}
            </p>
          </div>

          {/* Bio */}
          <p
            className={`${
              isDark ? "text-gray-300" : "text-gray-600"
            } mb-6 text-sm italic max-w-2xl leading-relaxed`}
          >
            {bio}
          </p>

          {/* Stats */}
          <div className="flex gap-6">
            <div className="text-center">
              <div
                className={`${isDark ? "text-white" : "text-gray-900"} text-lg`}
              >
                {poems}
              </div>
              <div
                className={`${
                  isDark ? "text-gray-400" : "text-gray-600"
                } text-sm font-light`}
              >
                poems
              </div>
            </div>
            <div className="text-center">
              <div
                className={`${isDark ? "text-white" : "text-gray-900"} text-lg`}
              >
                {followers.toLocaleString()}
              </div>
              <div
                className={`${
                  isDark ? "text-gray-400" : "text-gray-600"
                } text-sm font-light`}
              >
                followers
              </div>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default AuthorDetailCard;
