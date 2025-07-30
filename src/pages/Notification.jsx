import { useState } from "react";
import Loading from "../components/Loading";
import NotificationSection from "../components/Notification/NotificationSection";
import useAuth from "../hooks/auth/useAuth";
import useGetRecentNotifications from "../hooks/notification/useGetRecentNotifications";
import useGetTodaysNotification from "../hooks/notification/useGetTodaysNotification";

function Notification() {
  const { user } = useAuth();
  const [range, setRange] = useState({
    fromOffset: 0,
    toOffset: 10,
  });
  const [recentRange, setRecentRange] = useState({
    fromOffset: 0,
    toOffset: 10,
  });

  const { data: notifications, isFetching: isFetchingNotifications } =
    useGetTodaysNotification({
      userId: user.id,
      fromOffset: range.fromOffset,
      toOffset: range.toOffset,
    });

  const {
    data: recentNotifications,
    isFetching: isFetchingRecentNotifications,
  } = useGetRecentNotifications({
    userId: user.id,
    fromOffset: recentRange.fromOffset,
    toOffset: range.toOffset,
  });

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-green-700 text-2xl font-semibold mb-6">
        Notifications
      </h1>
      <div className="flex flex-col gap-8">
        {isFetchingNotifications || isFetchingRecentNotifications ? (
          <Loading />
        ) : (
          <>
            <NotificationSection
              title={"Today"}
              notifications={notifications || []}
            />
            <NotificationSection
              title={"Recent"}
              notifications={recentNotifications}
            />
          </>
        )}
      </div>
    </div>
  );
}
export default Notification;
