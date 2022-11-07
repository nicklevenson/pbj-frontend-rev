import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginCard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    grabTokenAndRedirect();
  }, []);

  const grabTokenAndRedirect = () => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("token")) {
      const jwt = urlParams.get("token");
      const id = parseInt(urlParams.get("id"));
      sessionStorage.setItem("jwt", jwt);
      sessionStorage.setItem("userId", id);
      if (urlParams.get("new")) {
        navigate("/new");
      } else {
        navigate("/swipe");
      }
    }
  };
  return (
    <div className="login-page">
      <div style={{ margin: "auto" }}>
        <h3>Login/Signup</h3>
        <i>
          (Use Spotify to instantly be matched with folks based on your music
          taste)
        </i>
        <br /> <br />
        <a href={`${process.env.REACT_APP_BACKEND_URL}/authenticate-spotify`}>
          <div className="login spotify">
            <div>
              Continue With Spotify <i>(Recommended)</i>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default LoginCard;
