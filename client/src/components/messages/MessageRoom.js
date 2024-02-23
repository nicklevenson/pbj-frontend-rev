import React, { useState, useEffect } from "react";
import { useOutletContext, useParams, Link } from "react-router-dom";
import { BsChevronLeft } from "react-icons/bs";

const MessageRoom = () => {
  const { currentUser } = useOutletContext();
  const { chatrooms } = useOutletContext();
  const { chatroomConnection } = useOutletContext();
  const { roomId } = useParams();
  const [newMessage, setNewMessage] = useState("");

  const chatroom = chatrooms.find(
    (chatroom) => chatroom.id === parseInt(roomId)
  );

  useEffect(() => {
    const container = document.getElementsByClassName("messages-container")[0];
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [chatrooms]);

  useEffect(() => {
    if (chatroom && chatroom?.hasUnread) {
      setTimeout(() => {
        chatroomConnection.markRead(roomId);
      }, 500);
    }
  }, [chatroom]);

  const sendMessage = () => {
    chatroomConnection?.newMessage(roomId, newMessage);
    setNewMessage("");
  };

  return (
    <div className="h-full">
      {chatroom && (
        <div className="flex flex-col relative h-full">
          <div className="p-4 flex items-center gap-4 border-b border-b-slate-200">
            <Link to="/messages">
              <BsChevronLeft size={"2rem"} />
            </Link>
            <img
              src={
                chatroom.otherUserInfo.info.photo ||
                `${process.env.REACT_APP_BACKEND_URL}/userDefault.png`
              }
              className="rounded-full h-12"
            />

            <div className="font-bold">
              {chatroom.otherUserInfo.info.username}
            </div>
          </div>
          <div className="p-4 flex-1 messages-container overflow-y-scroll px-6">
            {chatroom.messages.map((message) => {
              if (message.userId === currentUser.id) {
                return (
                  <div className="w-full flex items-center justify-end">
                    <div>
                      <div className="bg-blue-200 p-2 rounded m-2 max-w-full ml-auto">
                        {message.content}
                      </div>
                      <div className="text-xs text-slate-400">
                        {message.createdAt}
                      </div>
                    </div>

                    <img
                      src={
                        currentUser.photo ||
                        `${process.env.REACT_APP_BACKEND_URL}/userDefault.png`
                      }
                      className="rounded-full h-12"
                    />
                  </div>
                );
              } else {
                return (
                  <div className="w-full flex items-center">
                    <img
                      src={
                        chatroom.otherUserInfo.info.photo ||
                        `${process.env.REACT_APP_BACKEND_URL}/userDefault.png`
                      }
                      className="rounded-full h-12"
                    />
                    <div>
                      <div className="bg-blue-200 p-2 rounded m-2 max-w-full">
                        {message.content}
                      </div>
                      <div className="text-xs text-slate-400">
                        {message.createdAt}
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>

          <div className="p-4 flex gap-4 justify-center items-stretch bg-white w-full">
            <input
              placeholder="chat"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="border rounded p-2 bg-slate-200"
            />
            <button onClick={sendMessage} className="button-blue px-5">
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageRoom;
