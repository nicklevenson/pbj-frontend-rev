import App from "./App";
import LoginCard from "./components/LoginCard";
import Swipe from "./components/swipe/Swipe";
import Messages from "./components/messages/Messages";
import MessageRoom from "./components/messages/MessageRoom";

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
    ],
  },
  {
    path: "/login",
    element: <LoginCard />,
  },
];

export default routes;
