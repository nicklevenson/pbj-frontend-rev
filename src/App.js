import { Outlet, Navigate } from "react-router-dom";
import Nav from "./components/Nav";
import { useState, useEffect } from "react";
import Authentication from "./authentication";
import ActionCable from "actioncable";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [cable, setCable] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!currentUser && Authentication.loggedIn()) {
      attemptFetchUser();
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      setCable(
        ActionCable.createConsumer(
          `${process.env.REACT_APP_BACKEND_URL}/notification_stream`
        )
      );
      createNotificationSubscription();
    }
  }, [currentUser]);

  const attemptFetchUser = async () => {
    const fetchedUser = await Authentication.fetchUser();

    if (fetchedUser) {
      setCurrentUser(fetchedUser);
    }
  };

  const handleConnection = (notifications) => {
    setNotifications(notifications);
  };

  const createNotificationSubscription = () => {
    if (cable) {
      cable.subscriptions.create(
        { channel: "NotificationStream", id: `${currentUser.id}` },
        {
          received: (notifications) => {
            handleConnection(notifications);
          },
        }
      );
    }
  };

  return (
    <div>
      <div className="mt-8 min-h-screen">
        {Authentication.loggedIn() && (
          <Outlet context={[currentUser, notifications]} />
        )}
        {!Authentication.loggedIn() && <Navigate to="/login" />}
      </div>
      <Nav notifications={notifications} />
    </div>
  );
}

export default App;
