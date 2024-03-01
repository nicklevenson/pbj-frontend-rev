import { useOutletContext, Link } from "react-router-dom";

const Notifications = () => {
  const { notifications } = useOutletContext();
  const { notificationConnection } = useOutletContext();

  const renderNotifications = () => {
    return notifications.map(({ notification }) => {
      return renderNotification(notification);
    });
  };

  const markRead = (notificationId) => {
    notificationConnection.markRead(notificationId);
  };

  const renderNotification = (notification) => {
    if (notification.involvedUser) {
      return (
        <Link
          to={`/users/${notification.involvedUser.info.id}`}
          onClick={() => markRead(notification.id)}
        >
          <div
            className={`border-b border-slate-200 px-6 p-4 ${
              notification.read ? "" : "bg-slate-200"
            }`}
          >
            {notification.involvedUser.info.username} {notification.content}
          </div>
        </Link>
      );
    } else {
      return <div className="px-6 p-4">{notification.content}</div>;
    }
  };

  return (
    <div>
      <div className="inner-container py-3">
        <h1 className="text-xl font-bold">Notifications</h1>
      </div>

      <div className="inner-container">
        <div>{renderNotifications()}</div>
        {notifications.length === 0 && (
          <div className="text-2xl text-slate-500 text-center">
            No notifications yet
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
