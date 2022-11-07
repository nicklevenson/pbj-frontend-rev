import App from "./App";
import LoginCard from "./components/LoginCard";
import Swipe from "./components/swipe/Swipe";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/swipe",
        element: <Swipe />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginCard />,
  },
];

export default routes;
