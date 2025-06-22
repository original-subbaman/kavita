import React from "react";
import { MdClose } from "react-icons/md";
import clsx from "clsx";

function Notification() {
  const [notifications, setNotifications] = React.useState([
    {
      id: 1,
      title: "Welcome!",
      message: "Thanks for signing up.",
      read: false,
    },
    {
      id: 2,
      title: "Update Available",
      message: "Version 2.0 has been released.",
      read: true,
    },
    {
      id: 3,
      title: "Weekly Summary",
      message: "You logged 18 hours this week.",
      read: false,
    },
  ]);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Notifications</h1>
      <ul className="space-y-4">
        {notifications.length === 0 && (
          <p className="text-gray-500">You're all caught up 🎉</p>
        )}
        {notifications.map((notification) => (
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
              {!notification.read && (
                <button
                  className="mt-2 text-xs text-blue-600 hover:underline"
                  onClick={() => markAsRead(notification.id)}
                >
                  Mark as read
                </button>
              )}
            </div>
            <button
              onClick={() => removeNotification(notification.id)}
              className="ml-4 text-gray-400 hover:text-red-500 transition"
              aria-label="Dismiss notification"
            >
              <MdClose />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Notification;
