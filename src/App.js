import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";
import { useState, useEffect } from "react";
import Authentication from "./authentication";
import LoginCard from "./components/LoginCard";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!user && Authentication.loggedIn()) {
      attemptFetchUser();
    }
  }, []);

  const attemptFetchUser = () => {
    const fetchedUser = Authentication.fetchUser();

    if (fetchedUser) {
      setUser(fetchedUser);
    }
  };

  return (
    <div>
      <Nav />
      {Authentication.loggedIn() && <Outlet />}
      {!Authentication.loggedIn() && <LoginCard />}
    </div>
  );
}

export default App;
