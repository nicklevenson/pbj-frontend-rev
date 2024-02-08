import React from "react";
import { useOutletContext } from "react-router-dom";

const LogoutModal = ({ setLogoutPrompt }) => {
  const { logoutUser } = useOutletContext();
  return (
    <div className="fixed top-40 left-10 bg-pink-300 z-10 w-[80%] h-80 text-center rounded p-4">
      <h1 className="mt-10 text-2xl">Are you sure you want to logout?</h1>
      <div className="absolute bottom-10 w-full -ml-4 flex justify-around">
        <button
          className="bg-blue-400 rounded p-4"
          onClick={() => setLogoutPrompt(false)}
        >
          Nevermind
        </button>
        <button className="bg-green-400 rounded p-4" onClick={logoutUser}>
          Yes Please
        </button>
      </div>
    </div>
  );
};

export default LogoutModal;
