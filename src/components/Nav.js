import React from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { MdOutlineSwipe } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { AiOutlineMessage } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";

const Nav = ({ notifications }) => {
  const unreadNotifications = () => {
    return notifications.filter(
      ({ notification }) => notification.read !== true
    );
  };

  const hasUnreadNotifications = () => {
    return unreadNotifications().length > 0;
  };

  return (
    <div>
      <div className="flex flex-row justify-center absolute w-full top-0 bg-gray-300 h-12 items-center">
        <span className="text-xl">PBJ</span>
      </div>
      <div className="flex flex-row absolute bottom-0 h-16 w-full justify-between px-4 bg-gray-300 items-center">
        <Link to="swipe">
          <span>
            <MdOutlineSwipe size={"2rem"} />
          </span>
        </Link>
        <Link to="messages">
          <span>
            <AiOutlineMessage size={"2rem"} />
          </span>
        </Link>
        <Link to="connections">
          <span>
            <FiUsers size={"2rem"} />
          </span>
        </Link>
        <Link to="notifications">
          <span className="relative">
            <IoNotificationsOutline size={"2rem"} />
            {hasUnreadNotifications() && (
              <div className="absolute -top-2 -right-2 bg-red-400 rounded-full text-sm px-1">
                {unreadNotifications().length}
              </div>
            )}
          </span>
        </Link>
        <span>
          <FiLogOut size={"2rem"} />
        </span>
      </div>
    </div>
  );
};

export default Nav;
