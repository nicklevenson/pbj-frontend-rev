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
    <div>
      <div className="inner-container py-3">
        <h1 className="text-xl font-bold">Messages</h1>
      </div>

      {chatrooms && (
        <div className="inner-container">
          {orderedChatrooms.map((chatroom) => {
            return (
              <Link to={`${chatroom.id}`}>
                <div
                  className={`flex p-2 rounded ${
                    chatroom.hasUnread ? "bg-slate-400" : ""
                  }`}
                >
                  <div className="rounded-full h-12 w-12 overflow-hidden">
                    <UserPhoto userInfo={chatroom.otherUserInfo.info} />
                  </div>

                  <div className="ml-2">
                    <div className="font-bold">
                      {chatroom.otherUserInfo.info.username}
                    </div>
                    <div className="text-slate-500 italic">
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
            <div className="text-2xl text-slate-500 text-center">
              No messages yet
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Messages;
