import clsx from "clsx";
import Loading from "../components/Loading";
import useAuth from "../hooks/auth/useAuth";
import useGetNotificationForUser from "../hooks/notification/useGetNotificationForUser";

function Notification() {
  const { user } = useAuth();

  const {
    data: notifications,
    isFetching: isFetchingNotifications,
    isFetched: isNotificationsFetched,
  } = useGetNotificationForUser({
    userId: user.id,
  });

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-green-700 text-2xl font-semibold mb-6">
        Notifications
      </h1>
      {isFetchingNotifications && <Loading />}
      <ul className="space-y-4">
        {isNotificationsFetched && notifications.length === 0 && (
          <p className="text-gray-500">You're all caught up 🎉</p>
        )}
        {isNotificationsFetched &&
          notifications.length > 0 &&
          notifications.map((notification) => (
            <li
              key={notification.id}
              className={clsx(
                "p-4 rounded-lg shadow-sm border flex justify-between items-start transition",
                notification.read
                  ? "bg-gray-50 border-gray-200"
                  : "bg-blue-50 border-blue-300"
              )}
            >
              <div>
                <h2
                  className={clsx(
                    "font-medium",
                    notification.read ? "text-gray-700" : "text-blue-900"
                  )}
                >
                  {notification.title}
                </h2>
                <p className="text-sm text-gray-600">{notification.message}</p>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
export default Notification;
