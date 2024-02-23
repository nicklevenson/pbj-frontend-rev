import React, { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import LogoutModal from "../LogoutModal";
import PreviewUserCard from "../swipe/PreviewUserCard";
import { useOutletContext } from "react-router-dom";
import EditableUserCard from "./EditableUserCard";

const Profile = () => {
  const [logoutPrompt, setLogoutPrompt] = useState(false);
  const { currentUser } = useOutletContext();

  return (
    <div className="pb-36 relative">
      {currentUser && (
        <div>
          <div className="inner-container py-1">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold">Profile</h1>
              <span
                className="p-2"
                onClick={() => setLogoutPrompt((prev) => !prev)}
              >
                <FiLogOut size={"2rem"} />
              </span>
            </div>
          </div>

          <EditableUserCard />
          {logoutPrompt && <LogoutModal setLogoutPrompt={setLogoutPrompt} />}
        </div>
      )}

      <div className="absolute bottom-0 w-full text-center text-xs">
        <a href="https://www.termsfeed.com/live/d6ab7a46-b8e7-4d06-bcaa-d6e80093445c" target="_blank">
          View Privacy Policy
        </a>
        {" | "}
        <a href="https://www.termsfeed.com/live/d4646c97-ebd9-4a57-aa8a-aa133b450433" target="_blank">
          View Terms of Service
        </a>
      </div>
    </div>
  );
};

export default Profile;
