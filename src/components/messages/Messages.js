import React from "react";
import { useOutletContext, Link } from "react-router-dom";
import UserPhoto from "../user/UserPhoto";
const Messages = () => {
  const { chatrooms } = useOutletContext();

  return (
    <div className="px-4">
      <h1 className="text-xl mb-4 font-bold">Messages</h1>
      {chatrooms && (
        <div>
          {chatrooms.map((chatroom) => {
            return (
              <Link to={`${chatroom.id}`}>
                <div
                  className={`flex p-2 rounded ${
                    chatroom.hasUnread ? "bg-gray-400" : ""
                  }`}
                >
                  <div className="rounded-full h-12 w-12 overflow-hidden">
                    <UserPhoto userInfo={chatroom.otherUserInfo.info} />
                  </div>

                  <div className="ml-2">
                    <div className="font-bold">
                      {chatroom.otherUserInfo.info.username}
                    </div>
                    <div className="text-gray-500 italic">
                      {chatroom.messages[
                        chatroom.messages.length - 1
                      ]?.content.substring(0, 10)}
                    </div>
                  </div>
                </div>
                <hr />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Messages;
