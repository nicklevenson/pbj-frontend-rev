import React from "react";
import { useOutletContext, Link } from "react-router-dom";
import UserPhoto from "../user/UserPhoto";
const Messages = () => {
  const { chatrooms } = useOutletContext();

  const orderedChatrooms = chatrooms.sort((a, b) => {
    // sort by most recent unread message
    if (a.hasUnread && b.hasUnread) {
      return (
        new Date(b.messages[b.messages.length - 1].createdAt) -
        new Date(a.messages[a.messages.length - 1].createdAt)
      );
    } else if (a.hasUnread) {
      return -1;
    } else if (b.hasUnread) {
      return 1;
    } else {
      return (
        new Date(b.messages[b.messages.length - 1]?.createdAt) -
        new Date(a.messages[a.messages.length - 1]?.createdAt)
      );
    }
  });

  return (
    <div className="px-4">
      <h1 className="py-4 text-xl mb-4 font-bold">Messages</h1>
      {chatrooms && (
        <div>
          {orderedChatrooms.map((chatroom) => {
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

          {chatrooms.length === 0 && (
            <div className="text-2xl text-gray-500 text-center">
              No messages yet
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Messages;
