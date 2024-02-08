import App from "./App";
import LoginCard from "./components/LoginCard";
import Swipe from "./components/swipe/Swipe";
import Messages from "./components/messages/Messages";
import MessageRoom from "./components/messages/MessageRoom";
import Notifications from "./components/notifications/Notifications";
import ShowUser from "./components/user/ShowUser";
import Connections from "./components/connections/Connections";
import Profile from "./components/profile/Profile";
import Welcome from "./components/welcome/Welcome";
import WelcomeStepOne from "./components/welcome/WelcomeStepOne";
import WelcomeStepTwo from "./components/welcome/WelcomeStepTwo";
import WelcomeStepThree from "./components/welcome/WelcomeStepThree";
import Finish from "./components/welcome/Finish";

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
      {
        path: "/users/:shownUserId",
        element: <ShowUser />,
      },
      {
        path: "/connections",
        element: <Connections />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/welcome",
        element: <Welcome />
      },
      {
        path: "/welcome/step1",
        element: <WelcomeStepOne />
      },
      {
        path: "/welcome/step2",
        element: <WelcomeStepTwo />
      },
      {
        path: "/welcome/step3",
        element: <WelcomeStepThree />
      },
      {
        path: "/welcome/finish",
        element: <Finish />
      }
    ],
  },
  {
    path: "/login",
    element: <LoginCard />,
  },
];

export default routes;
