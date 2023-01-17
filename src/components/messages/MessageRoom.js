import React from "react";
import { useOutletContext, useParams, Link } from "react-router-dom";
import { BsChevronLeft } from "react-icons/bs";

const MessageRoom = () => {
  const { currentUser } = useOutletContext();
  const { chatrooms } = useOutletContext();
  const { chatroomConnection } = useOutletContext();
  const { roomId } = useParams();

  const chatroom = chatrooms.find(
    (chatroom) => chatroom.id === parseInt(roomId)
  );
  // console.log(chatroomConnection?.newMessage(roomId, "hello"));
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
          <div className="h-[90%] overflow-y-scroll mb-32 flex flex-row flex-wrap">
            {chatroom.messages.map((message) => {
              if (message.userId === currentUser.id) {
                return (
                  <div className="ml-auto flex items-center">
                    <div>
                      <div className="bg-blue-200 p-2 rounded m-2">
                        {message.content}
                      </div>
                      <div className="text-xs text-gray-400">
                        {message.createdAt}
                      </div>
                    </div>

                    <img
                      src={currentUser.providerImage}
                      className="rounded-full h-12"
                    />
                  </div>
                );
              } else {
                return (
                  <div className="mr-auto flex items-center w-full">
                    <img
                      src={chatroom.otherUserInfo.info.providerImage}
                      className="rounded-full h-12"
                    />
                    <div>
                      <div className="bg-blue-200 p-2 rounded m-2">
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
        </div>
      )}
    </div>
  );
};

export default MessageRoom;
