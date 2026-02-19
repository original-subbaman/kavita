import { Bookmark, PenLine } from "lucide-react";
import { Link } from "react-router-dom";
import InfinitePostSection from "../components/PostSection/InfinitePostSection";
import UserDetailSection from "../components/ProfilePage/UserDetailSection";
import { Button } from "../components/ui/Button";
import useAuth from "../hooks/auth/useAuth";
import useGetQuotesCount from "../hooks/language/useGetLanguageCount";
import useGetInfinitePosts from "../hooks/post/useGetInfinitePosts";
import useGetPostCount from "../hooks/post/useGetPostCount";
import useFollowerCount from "../hooks/user/useFollowerCount";
import useGetLongestStreak from "../hooks/user/useGetLongestStreak";
import useGetTotalLikes from "../hooks/user/useGetTotalLikes";
import { PostActionsProvider } from "../context/PostActionContext";

function Profile() {
  const { user } = useAuth();

  const { data: postCount, isFetching: isFetchingPostCount } = useGetPostCount({
    userId: user.id,
  });

  const { data: likeCount, isFetching: isFetchingLikeCount } = useGetTotalLikes(
    { userId: user.id },
  );

  const { data: quoteCount, isFetching: isFetchingQuoteCount } =
    useGetQuotesCount({
      userId: user.id,
    });

  const { data: longestStreak, isFetching: isFetchingLongestStreak } =
    useGetLongestStreak({ userId: user.id });

  const { data: followerCount } = useFollowerCount({ userId: user.id });

  const {
    data: poems,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useGetInfinitePosts({
    userId: user?.id,
    theme: undefined,
  });

  const userStats = {
    postsCount: postCount ?? 0,
    likesReceived: likeCount ?? 0,
    savedQuotes: quoteCount ?? 0,
    followers: followerCount ?? 0,
    following: 89,
    weeklyPosts: [2, 1, 3, 0, 2, 1, 3],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden mb-8">
        <UserDetailSection userStats={userStats} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar */}
        <Sidebar userStats={userStats} />
        {/* Main content */}
        <main className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="font-display text-2xl font-bold text-foreground">
              My Poems
            </h2>
          </div>
          <div className="space-y-6">
            <PostActionsProvider onPostAction={() => {}}>
              <InfinitePostSection
                data={poems}
                hasNextPage={hasNextPage}
                fetchNextPage={fetchNextPage}
                isFetchingNextPage={isFetchingNextPage}
                status={status}
                showMenu={true}
                postGridStyles="grid grid-cols-1 gap-6"
              />
            </PostActionsProvider>
          </div>
        </main>
      </div>
    </div>
  );
}

function Sidebar({ userStats }) {
  const maxPosts = Math.max(...userStats.weeklyPosts);
  const weekDays = ["M", "T", "W", "T", "F", "S", "S"];
  return (
    <aside className="lg:col-span-1 space-y-6">
      {/* Activity chart */}
      <div className="bg-card border border-border rounded-lg p-5 shadow-card">
        <h3 className="font-semibold text-foreground mb-4">Weekly Activity</h3>
        <div className="flex items-end justify-between gap-2 h-20">
          {userStats.weeklyPosts.map((posts, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full bg-primary/20 rounded-t-sm transition-all"
                style={{
                  height: `${(posts / maxPosts) * 100}%`,
                  minHeight: posts > 0 ? "8px" : "4px",
                  backgroundColor:
                    posts > 0
                      ? `hsl(var(--primary) / ${0.3 + (posts / maxPosts) * 0.7})`
                      : undefined,
                }}
              />
              <span className="text-xs text-muted-foreground">
                {weekDays[i]}
              </span>
            </div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground mt-4 text-center">
          {userStats.weeklyPosts.reduce((a, b) => a + b, 0)} poems this week
        </p>
      </div>

      {/* Quick links */}
      <div className="bg-card border border-border rounded-lg p-5 shadow-card">
        <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
        <div className="space-y-2">
          <Link to="/posts/new">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <PenLine className="w-4 h-4" />
              Write New Poem
            </Button>
          </Link>
          <Link to="/inspiration">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Bookmark className="w-4 h-4" />
              Language Wall
            </Button>
          </Link>
        </div>
      </div>
    </aside>
  );
}

export default Profile;
