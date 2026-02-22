import { UserCheck2 } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { getInitialsOfName } from "../../utils/Helper";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";

const FollowButton = ({ onClick, isLoading = true }) => {
  return (
    <Button variant="outline" size="xs" onClick={onClick}>
      <UserCheck2 className="h-4 w-4" />
      Follow
    </Button>
  );
};

const UnfollowButton = ({ onClick, isLoading = true }) => {
  return (
    <Button variant="outline" size="xs" onClick={onClick}>
      <UserCheck2 className="h-4 w-4" />
      Following
    </Button>
  );
};

const AuthorDetailCard = ({
  profile = "",
  username = "username",
  name = "John Doe",
  status = "Hakuna Matata! This is my bio.",
  poems = "100",
  followers = "0",
  showFollowButton = true,
  isUserAuthor = false,
  isAuthenticated = false,
  onFollowUser = () => {},
  onUnfollowUser = () => {},
}) => {
  return (
    <div className="bg-card border border-border rounded-xl p-8 shadow-soft">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <Avatar className="w-24 h-24">
          <AvatarImage src={profile || getInitialsOfName(name)} alt={name} />
          <AvatarFallback className="bg-secondary text-secondary-foreground text-3xl">
            {name.charAt(0)}
          </AvatarFallback>
        </Avatar>

        {/* Profile Info */}
        <div className="flex-1">
          <div>
            <div className="flex items-center gap-2 ">
              <h1 className={"text-2xl"}>{name.toLocaleLowerCase()}</h1>
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
            <p className={"text-muted-foreground mt-1"}>@{username}</p>
          </div>

          {/* Bio */}
          <p className={"text-foreground text-sm my-3 italic"}>"{status}"</p>

          {/* Stats */}
          <div className="flex gap-6">
            <div className="text-center">
              <div className={"font-semibold text-foreground"}>{poems}</div>
              <div className={"text-muted-foreground text-sm font-light"}>
                poems
              </div>
            </div>
            <div className="text-center">
              <div className={"font-semibold text-foreground"}>
                {followers.toLocaleString()}
              </div>
              <div className={"text-muted-foreground text-sm font-light"}>
                followers
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorDetailCard;
