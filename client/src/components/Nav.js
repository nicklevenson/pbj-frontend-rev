import React from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { MdOutlineSwipe } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { AiOutlineMessage } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { Link } from "react-router-dom";

const Nav = ({ notifications, chatrooms, currentUser }) => {
  const unreadNotifications = () => {
    return notifications.filter(
      ({ notification }) => notification.read !== true
    );
  };

  const hasUnreadNotifications = () => {
    return unreadNotifications().length > 0;
  };

  const unreadMessages = () => {
    if (chatrooms.length === 0) return [];
  
    // sum up the unread messages from all chatrooms

    const allMessages = chatrooms.map((chatroom) => {
      return chatroom.messages
    }).flat()
  
    const unreadMessages = allMessages.filter((message) => {
        return message.readAt === null && message.userId !== currentUser.id
      }
    );
    
    return unreadMessages
  }
    

  const hasUnreadMessages = () => {
    return unreadMessages().length > 0;
  }
  

  return (
    <>
      <div className="flex flex-row sticky -bottom-1 h-16 w-full justify-between px-4 bg-gray-300 items-center">
        <Link to="swipe">
          <span>
            <MdOutlineSwipe size={"2rem"} />
          </span>
        </Link>
        <Link to="messages">
          <span className="relative">
            <AiOutlineMessage size={"2rem"} />
            {currentUser && hasUnreadMessages() && (
              <div className="absolute -top-2 -right-2 bg-red-400 rounded-full text-sm px-1">
                {unreadMessages().length}
              </div>
            )}
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
        <Link to="profile">
          <span>
            <FiSettings size={"2rem"} />
          </span>
        </Link>
      </div>
    </>
  );
};

export default Nav;
