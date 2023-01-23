import App from "./App";
import LoginCard from "./components/LoginCard";
import Swipe from "./components/swipe/Swipe";
import Messages from "./components/messages/Messages";
import MessageRoom from "./components/messages/MessageRoom";
import Notifications from "./components/notifications/Notifications";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/swipe",
        element: <Swipe />,
      },
      {
        path: "/messages",
        element: <Messages />,
      },
      {
        path: "/messages/:roomId",
        element: <MessageRoom />,
      },
      {
        path: "/notifications",
        element: <Notifications />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginCard />,
  },
];

export default routes;
