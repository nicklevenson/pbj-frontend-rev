import React from "react";
import { Navigate } from "react-router-dom";

class LoginCard extends React.Component {
  state = {
    redirect_swipe: false,
    redirect_new: false,
  };
  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("token")) {
      const jwt = urlParams.get("token");
      const id = parseInt(urlParams.get("id"));
      sessionStorage.setItem("jwt", jwt);
      sessionStorage.setItem("userId", id);
      if (urlParams.get("new")) {
        this.setState({ redirect_new: true });
      } else {
        this.setState({ redirect_swipe: true });
      }
    }
  }
  render() {
    return (
      <div className="login-page">
        <div style={{ margin: "auto" }}>
          <h3>Login/Signup</h3>
          {this.props.heading ? (
            <h5>
              <i>{this.props.heading}</i>
            </h5>
          ) : null}
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
          {this.state.redirect_swipe ? <Navigate to="/swipe" /> : null}
          {this.state.redirect_new ? <Navigate to="/welcome" /> : null}
        </div>
      </div>
    );
  }
}

export default LoginCard;
