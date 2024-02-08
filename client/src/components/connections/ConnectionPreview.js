import React from "react";
import UserPhoto from "../user/UserPhoto";
import { Link } from "react-router-dom";

const ConnectionPreview = ({ user }) => {
  const { username } = user.info;
  return (
    <div className="bg-gray-100 rounded p-2 m-2 w-32 h-32">
      <div className="rounded-full h-20 w-20 overflow-hidden mx-auto">
        <Link to={`/users/${user.info.id}`}>
          <UserPhoto userInfo={user.info} />
        </Link>
      </div>
      <div className="whitespace-nowrap">
        {username.substring(0, 13)}
        {username.length > 16 && "..."}
      </div>
    </div>
  );
};

export default ConnectionPreview;
