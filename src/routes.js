import App from "./App";
import LoginCard from "./components/LoginCard";
import Swipe from "./components/swipe/Swipe";
import Messages from "./components/messages/Messages";

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
    ],
  },
  {
    path: "/login",
    element: <LoginCard />,
  },
];

export default routes;
