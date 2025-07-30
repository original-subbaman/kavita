import clsx from "clsx";

function NotificationSection({ title, notifications }) {
  return (
    <ul className="space-y-4">
      <p className="text-gray-500 text-xl font-bold">{title}</p>
      {notifications && notifications.length === 0 && (
        <p className="text-gray-500">You're all caught up 🎉</p>
      )}
      {notifications &&
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
  );
}

export default NotificationSection;
