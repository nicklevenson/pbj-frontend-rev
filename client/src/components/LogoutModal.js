import React from "react";
import { useOutletContext } from "react-router-dom";
import Div100vh from "react-div-100vh";

const LogoutModal = ({ setLogoutPrompt }) => {
  const { logoutUser } = useOutletContext();
  return (
    <Div100vh className="z-10 fixed top-0 left-0 w-full bg-white">
      <div className="h-full flex items-center justify-center">
        <div className="inner-container text-center flex flex-col gap-8">
          <div className="flex-1">
            <h1 className="text-2xl">Are you sure you want to logout?</h1>
          </div>

          <div className="flex gap-4 items-center justify-center">
            <button
              className="button-outlined px-5"
              onClick={() => setLogoutPrompt(false)}
            >
              Nevermind
            </button>
            <button className="button-blue px-5" onClick={logoutUser}>
              Yes Please
            </button>
          </div>
        </div>
      </div>
    </Div100vh>
  );
};

export default LogoutModal;
