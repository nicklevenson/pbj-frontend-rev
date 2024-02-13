import { Outlet, Navigate } from "react-router-dom";
import Nav from "./components/Nav";
import { useState, useEffect } from "react";
import Authentication from "./authentication";
import ActionCable from "actioncable";
import camelize from "camelize";
import { withCookies } from "react-cookie";
import Div100vh from "react-div-100vh";
import { PbjLogo } from "./components/shared/PbjLogo";

function App({ cookies }) {
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
    if (!Authentication.loggedIn()) {
      setCurrentUser(null);
    }
  }, [cookies]);

  useEffect(() => {
    if (notificationCable) {
      createNotificationSubscription();
    }
  }, [notificationCable]);

  useEffect(() => {
    if (chatroomCable) {
      createChatroomSubscription();
    }
  }, [chatroomCable]);

  useEffect(() => {
    if (currentUser) {
      setNotificationCable(
        ActionCable.createConsumer(
          `${process.env.REACT_APP_BACKEND_URL}/notification_stream?token=${sessionStorage.jwt}`
        )
      );

      setChatroomCable(
        ActionCable.createConsumer(
          `${process.env.REACT_APP_BACKEND_URL}/chatroom_stream?token=${sessionStorage.jwt}`
        )
      );
    }
  }, [currentUser]);

  const attemptFetchUser = async () => {
    const fetchedUser = await Authentication.fetchUser();

    if (fetchedUser) {
      setCurrentUser(camelize(fetchedUser));
    }
  };

  const logoutUser = () => {
    Authentication.logout();
    setCurrentUser(null);
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
    <Div100vh className="overflow-y-scroll pb-48 pt-12">
      <div className="z-10 fixed top-0 left-0 w-full">
        <div className="flex flex-row justify-center w-full bg-gray-300 h-12 items-center">
          <button className="relative">
            <div className="h-auto w-6">
              <PbjLogo />
            </div>
          </button>
        </div>
      </div>

      {Authentication.loggedIn() && (
        <Outlet
          context={{
            currentUser,
            attemptFetchUser,
            logoutUser,
            notifications,
            notificationConnection,
            chatrooms,
            chatroomConnection,
          }}
        />
      )}
      {!Authentication.loggedIn() && <Navigate to="/login" />}
      <div className="z-0 fixed bottom-0 left-0 w-full">
        <Nav
          notifications={notifications}
          chatrooms={chatrooms}
          currentUser={currentUser}
        />
      </div>
    </Div100vh>
  );
}

export default withCookies(App);
