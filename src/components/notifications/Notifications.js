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
            className={`border-b border-black p-4 ${
              notification.read ? "" : "bg-gray-200"
            }`}
          >
            {notification.involvedUser.info.username} {notification.content}
          </div>
        </Link>
      );
    } else {
      return <div>{notification.content}</div>;
    }
  };

  return (
    <div>
      <h1 className="text-xl mb-4 font-bold px-4">Notifications</h1>
      <div>{renderNotifications()}</div>
    </div>
  );
};

export default Notifications;
