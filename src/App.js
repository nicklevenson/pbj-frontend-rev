import { Outlet, Navigate } from "react-router-dom";
import Nav from "./components/Nav";
import { useState, useEffect } from "react";
import Authentication from "./authentication";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!user && Authentication.loggedIn()) {
      attemptFetchUser();
    }
  }, []);

  const attemptFetchUser = async () => {
    const fetchedUser = await Authentication.fetchUser();

    if (fetchedUser) {
      setUser(fetchedUser);
    }
  };

  return (
    <div>
      <Nav />
      {Authentication.loggedIn() && <Outlet context={[user]} />}
      {!Authentication.loggedIn() && <Navigate to="/login" />}
    </div>
  );
}

export default App;
