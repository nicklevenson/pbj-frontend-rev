import { Outlet, Navigate } from "react-router-dom";
import Nav from "./components/Nav";
import { useState, useEffect } from "react";
import Authentication from "./authentication";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (!currentUser && Authentication.loggedIn()) {
      attemptFetchUser();
    }
  }, []);

  const attemptFetchUser = async () => {
    const fetchedUser = await Authentication.fetchUser();

    if (fetchedUser) {
      setCurrentUser(fetchedUser);
    }
  };

  return (
    <div>
      <Nav />
      {Authentication.loggedIn() && <Outlet context={[currentUser]} />}
      {!Authentication.loggedIn() && <Navigate to="/login" />}
    </div>
  );
}

export default App;
