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
    <div>
      {currentUser && (
        <div>
          <div className="flex">
            <h1 className="text-xl mb-4 font-bold px-4">Profile</h1>
            <span
              className="ml-auto px-4"
              onClick={() => setLogoutPrompt((prev) => !prev)}
            >
              <FiLogOut size={"2rem"} />
            </span>
          </div>
          <EditableUserCard user={currentUser} />
          {logoutPrompt && <LogoutModal setLogoutPrompt={setLogoutPrompt} />}
        </div>
      )}
    </div>
  );
};

export default Profile;
