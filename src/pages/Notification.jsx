import { useState } from "react";
import Loading from "../components/Loading";
import NotificationSection from "../components/Notification/NotificationSection";
import useAuth from "../hooks/auth/useAuth";
import useGetRecentNotifications from "../hooks/notification/useGetRecentNotifications";
import useGetTodaysNotification from "../hooks/notification/useGetTodaysNotification";

const pageSize = 10;

function Notification() {
  const { user } = useAuth();
  const [pagination, setPagination] = useState({
    fromOffset: 0,
    toOffset: pageSize - 1,
  });
  const [paginationRecent, setPaginationRecent] = useState({
    fromOffset: 0,
    toOffset: pageSize - 1,
  });

  const { data: notifications, isFetching: isFetchingNotifications } =
    useGetTodaysNotification({
      userId: user.id,
      fromOffset: pagination.fromOffset,
      toOffset: pagination.toOffset,
    });

  const {
    data: recentNotifications,
    isFetching: isFetchingRecentNotifications,
  } = useGetRecentNotifications({
    userId: user.id,
    fromOffset: paginationRecent.fromOffset,
    toOffset: pagination.toOffset,
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
              pageSize={pageSize}
              pagination={pagination}
              setPagination={setPagination}
            />
            <NotificationSection
              title={"Recent"}
              notifications={recentNotifications || []}
              pageSize={pageSize}
              pagination={paginationRecent}
              setPagination={setPaginationRecent}
            />
          </>
        )}
      </div>
    </div>
  );
}
export default Notification;
