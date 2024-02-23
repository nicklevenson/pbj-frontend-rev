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
      <div className="sticky bottom-0 bg-white border-t border-slate-200">
        <div className="max-w-[600px] mx-auto p-4 flex justify-between items-center text-slate-900">
        <Link to="swipe">
          <span>
            <MdOutlineSwipe size={"2rem"} />
          </span>
        </Link>
        <Link to="messages">
            <div className="relative">
            <AiOutlineMessage size={"2rem"} />
            {currentUser && hasUnreadMessages() && (
                <div className="absolute -top-2 -right-2 leading-none pt-1 pb-px font-semibold bg-red-500 text-white rounded-full text-sm px-1 w-6 h-6 text-center">
                {unreadMessages().length}
              </div>
            )}
            </div>
        </Link>
        <Link to="connections">
          <span>
            <FiUsers size={"2rem"} />
          </span>
        </Link>
        <Link to="notifications">
            <div className="relative">
            <IoNotificationsOutline size={"2rem"} />
            {hasUnreadNotifications() && (
                <div className="absolute -top-2 -right-2 leading-none pt-1 pb-px font-semibold bg-red-500 text-white rounded-full text-sm px-1 w-6 h-6 text-center">
                {unreadNotifications().length}
              </div>
            )}
            </div>
        </Link>
        <Link to="profile">
          <span>
            <FiSettings size={"2rem"} />
          </span>
        </Link>
      </div>
      </div>
    </>
  );
};

export default Nav;
