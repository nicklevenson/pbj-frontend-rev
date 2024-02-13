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
    <div className="pb-36">
      {currentUser && (
        <div>
          <div className="flex p-4">
            <h1 className="text-xl font-bold">Profile</h1>
            <span
              className="ml-auto px-4"
              onClick={() => setLogoutPrompt((prev) => !prev)}
            >
              <FiLogOut size={"2rem"} />
            </span>
          </div>
          <EditableUserCard />
          {logoutPrompt && <LogoutModal setLogoutPrompt={setLogoutPrompt} />}
        </div>
      )}
    </div>
  );
};

export default Profile;
