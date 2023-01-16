import React from "react";
import { useOutletContext, useParams, Link } from "react-router-dom";
import { BsChevronLeft } from "react-icons/bs";

const MessageRoom = () => {
  const { currentUser } = useOutletContext();
  const { chatrooms } = useOutletContext();
  const { roomId } = useParams();
  const chatroom = chatrooms.find(
    (chatroom) => chatroom.id === parseInt(roomId)
  );
  console.log(chatroom);
  return (
    <div className="px-4 h-full">
      {chatroom && (
        <div className="h-full">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/messages">
              <BsChevronLeft size={"2rem"} />
            </Link>
            <img
              src={chatroom.otherUserInfo.info.providerImage}
              className="rounded-full h-12"
            />

            <div className="font-bold">
              {chatroom.otherUserInfo.info.username}
            </div>
          </div>
          <hr />
          <div className="flex items-end h-[80%]">
            {chatroom.messages.map((message) => {
              if (message.userId === currentUser.id) {
                return (
                  <div className="ml-auto">
                    <div>You</div>
                    <div>{message.content}</div>
                  </div>
                );
              } else {
                return (
                  <div className="mr-auto">
                    <div>{chatroom.otherUserInfo.info.username}</div>
                    <div>{message.content}</div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageRoom;
