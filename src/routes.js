import App from "./App";
import LoginCard from "./components/LoginCard";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [],
  },
  {
    path: "/login",
    element: <LoginCard />,
  },
];

export default routes;
