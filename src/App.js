import { Outlet, Navigate } from "react-router-dom";
import Nav from "./components/Nav";
import { useState, useEffect } from "react";
import Authentication from "./authentication";
import ActionCable from "actioncable";
import camelize from "camelize";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [notificationCable, setNotificationCable] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [chatroomCable, setChatroomCable] = useState(null);
  const [chatrooms, setChatrooms] = useState([]);

  useEffect(() => {
    if (!currentUser && Authentication.loggedIn()) {
      attemptFetchUser();
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      setNotificationCable(
        ActionCable.createConsumer(
          `${process.env.REACT_APP_BACKEND_URL}/notification_stream`
        )
      );
      createNotificationSubscription();

      setChatroomCable(
        ActionCable.createConsumer(
          `${process.env.REACT_APP_BACKEND_URL}/chatroom_stream`
        )
      );
      createChatroomSubscription();
    }
  }, [currentUser]);

  const attemptFetchUser = async () => {
    const fetchedUser = await Authentication.fetchUser();

    if (fetchedUser) {
      setCurrentUser(fetchedUser);
    }
  };

  const handleNotificationReception = (notifications) => {
    setNotifications(notifications);
  };

  const createNotificationSubscription = () => {
    if (notificationCable) {
      notificationCable.subscriptions.create(
        { channel: "NotificationStreamChannel", id: `${currentUser.id}` },
        {
          received: (notifications) => {
            handleNotificationReception(notifications);
          },
        }
      );
    }
  };

  const handleChatroomReception = (chatrooms) => {
    console.log(camelize(chatrooms));
    setChatrooms(camelize(chatrooms));
  };

  const createChatroomSubscription = () => {
    if (chatroomCable) {
      chatroomCable.subscriptions.create(
        { channel: "ChatroomStreamChannel", id: `${currentUser.id}` },
        {
          received: (chatrooms) => {
            handleChatroomReception(chatrooms);
          },
        }
      );
    }
  };

  return (
    <div>
      <div className="mt-8 min-h-screen">
        {Authentication.loggedIn() && (
          <div className="overflow-y-scroll h-screen pt-8 pb-44">
            <Outlet context={{ currentUser, notifications, chatrooms }} />
          </div>
        )}
        {!Authentication.loggedIn() && <Navigate to="/login" />}
      </div>
      <Nav notifications={notifications} />
    </div>
  );
}

export default App;
