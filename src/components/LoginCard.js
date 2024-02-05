import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogoSvg } from "./shared/LogoSvg";

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
        navigate("/welcome");
      } else {
        navigate("/swipe");
      }
    }
  };
  return (
    <div>
      <div className="flex flex-row justify-center absolute w-full top-0 bg-gray-300 h-12 items-center">
        <button className="relative">
          <LogoSvg />
        </button>
      </div>
      <div className="mt-20 max-w-[600px] mx-auto">
        <div className="mx-auto">
          <h1 className="text-2xl font-bold text-center">
            Welcome to Peanut Butter & Jam!
          </h1>

          <p className="text-center mt-4">
            We are a music-based social networking app. We match you with folks who have similar music taste to you.
          </p>

          <div className="mt-4 text-center text-gray-700">
            <b>How it works</b>
            <ol className="text-gray-700 italic text-sm">
              <li className="my-2">Create an account with Spotify. It gives us a sense of your music taste</li>
              <li className="my-2">Swipe on folks with similar music taste</li>
              <li className="my-2">Filter based on distance, what instruments people play, and genres they enjoy</li>
              <li className="my-2">Request to Jam with folks you think you'd vibe with</li>
              <li className="my-2">Chat with your matches and form a musical connection</li>
            </ol>
          </div>
        

          <div className="max-w-[350px] mx-auto text-center">
            <div className="mt-8 text-xs">
              <i>
                Use Spotify to instantly be matched with folks based on your music
                taste
              </i>
            </div>
            <div className="my-2">
              <a
                href={`${process.env.REACT_APP_BACKEND_URL}/authenticate-spotify`}
              >
                <div className="p-4 bg-green-300 border rounded">
                  <div>
                    Continue With Spotify
                  </div>
                </div>
                </a>
            </div>
            <div className="my-2">
              <a href={`${process.env.REACT_APP_BACKEND_URL}/authenticate-google`}>
                <div className="p-4 bg-blue-300 border rounded">
                  <div>Continue With Google</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginCard;
