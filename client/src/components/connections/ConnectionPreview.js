import React from "react";
import UserPhoto from "../user/UserPhoto";
import { Link } from "react-router-dom";

const ConnectionPreview = ({ user }) => {
  const { username } = user.info;
  return (
    <div className="bg-slate-100 rounded-lg p-4 m-2 w-32 h-32 flex flex-col gap-2 items-center justify-center">
      <div className="rounded-full h-20 w-16 overflow-hidden">
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
