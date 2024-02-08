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
    <div className="px-4 h-full">
      {chatroom && (
        <div className="h-[95%]">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/messages">
              <BsChevronLeft size={"2rem"} />
            </Link>
            <img
              src={chatroom.otherUserInfo.info.photo || `${process.env.REACT_APP_BACKEND_URL}/userDefault.png`}
              className="rounded-full h-12"
            />

            <div className="font-bold">
              {chatroom.otherUserInfo.info.username}
            </div>
          </div>
          <hr />
          <div className="messages-container h-full overflow-y-scroll px-6">
            {chatroom.messages.map((message) => {
              if (message.userId === currentUser.id) {
                return (
                  <div className="w-full flex items-center justify-end">
                    <div>
                      <div className="bg-blue-200 p-2 rounded m-2 w-max ml-auto">
                        {message.content}
                      </div>
                      <div className="text-xs text-gray-400">
                        {message.createdAt}
                      </div>
                    </div>

                    <img
                      src={currentUser.photo || `${process.env.REACT_APP_BACKEND_URL}/userDefault.png`}
                      className="rounded-full h-12"
                    />
                  </div>
                );
              } else {
                return (
                  <div className="w-full flex items-center">
                    <img
                      src={chatroom.otherUserInfo.info.photo ||  `${process.env.REACT_APP_BACKEND_URL}/userDefault.png`}
                      className="rounded-full h-12"
                    />
                    <div>
                      <div className="bg-blue-200 p-2 rounded m-2 w-max">
                        {message.content}
                      </div>
                      <div className="text-xs text-gray-400">
                        {message.createdAt}
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
          <div className="flex justify-center bg-white w-full mt-1">
            <input
              placeholder="chat"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="border rounded p-2 bg-gray-200 h-10"
            />
            <button
              onClick={sendMessage}
              className="bg-blue-300 p-2 rounded ml-4 h-10"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageRoom;
