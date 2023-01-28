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
  const [notificationConnection, setNotificationConnection] = useState(null);
  const [chatroomCable, setChatroomCable] = useState(null);
  const [chatroomConnection, setChatroomConnection] = useState(null);
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
      setCurrentUser(camelize(fetchedUser));
    }
  };

  const handleNotificationReception = (notifications) => {
    setNotifications(camelize(notifications));
  };

  const createNotificationSubscription = () => {
    if (notificationCable) {
      const sub = notificationCable.subscriptions.create(
        { channel: "NotificationStreamChannel", id: `${currentUser.id}` },
        {
          received: (notifications) => {
            handleNotificationReception(notifications);
          },
          markRead(notificationId) {
            return this.perform("mark_read", {
              id: `${currentUser.id}`,
              notification_id: notificationId,
            });
          },
        }
      );
      setNotificationConnection(sub);
    }
  };

  const handleChatroomReception = (chatrooms) => {
    setChatrooms(camelize(chatrooms));
  };

  const createChatroomSubscription = () => {
    if (chatroomCable) {
      const sub = chatroomCable.subscriptions.create(
        { channel: "ChatroomStreamChannel", id: `${currentUser.id}` },
        {
          received: (chatrooms) => {
            handleChatroomReception(chatrooms);
          },
          newMessage(chatroomId, content) {
            return this.perform("new_message", {
              id: `${currentUser.id}`,
              chatroom_id: chatroomId,
              content: content,
            });
          },
          markRead(chatroomId) {
            return this.perform("mark_read", {
              id: `${currentUser.id}`,
              chatroom_id: chatroomId,
            });
          },
        }
      );
      setChatroomConnection(sub);
    }
  };

  return (
    <div>
      <div className="mt-8 min-h-screen">
        {Authentication.loggedIn() && (
          <div className="overflow-y-scroll h-screen pt-8 pb-44">
            <Outlet
              context={{
                currentUser,
                notifications,
                notificationConnection,
                chatrooms,
                chatroomConnection,
              }}
            />
          </div>
        )}
        {!Authentication.loggedIn() && <Navigate to="/login" />}
      </div>
      <Nav notifications={notifications} />
    </div>
  );
}

export default App;
