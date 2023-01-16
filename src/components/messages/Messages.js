import React from "react";
import { useOutletContext } from "react-router-dom";
const Messages = () => {
  const { chatrooms } = useOutletContext();
  console.log(chatrooms);
  return (
    <div className="overflow-y-scroll h-screen pt-8 pb-44 px-4">
      <h1 className="text-xl mb-4 font-bold">Messages</h1>
      {chatrooms && (
        <div>
          {chatrooms.map((chatroom) => {
            return (
              <div
                className={`flex p-2 rounded ${
                  chatroom.hasUnread ? "bg-gray-400" : ""
                }`}
              >
                <img
                  src={chatroom.otherUserInfo.info.providerImage}
                  className="rounded-full h-12"
                />
                <div className="ml-2">
                  <div className="font-bold">
                    {chatroom.otherUserInfo.info.username}
                  </div>
                  <div className="text-gray-500 italic">
                    {chatroom.messages[0].content.substring(0, 10)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Messages;
