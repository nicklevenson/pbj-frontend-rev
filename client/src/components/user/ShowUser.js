import React, { useEffect, useState } from "react";
import PreviewUserCard from "../swipe/PreviewUserCard";
import ConnectForm from "./ConnectForm";
import { useOutletContext, useParams, useNavigate } from "react-router-dom";
import UserApi from "../../api/user-api";
import camelize from "camelize";

const ShowUser = () => {
  const { currentUser } = useOutletContext();
  const [shownUser, setShownUser] = useState(null);
  const { shownUserId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchShownUser();
  }, []);

  const fetchShownUser = async () => {
    if (shownUserId) {
      const response = await UserApi.fetchSupportingInfo(shownUserId);
      const info = camelize(response.supporting_user_info);
      setShownUser(info);
    }
  };

  const handleMessageLink = () => {
    navigate(`/messages/${shownUser.chatroomId}`);
  };

  const handleConnectionRequest = async () => {
    await UserApi.requestConnection(shownUser.info.id);
    fetchShownUser();
  };

  const handleConnectionAccept = async () => {
    await UserApi.acceptConnection(shownUser.info.id);
    fetchShownUser();
  };

  const handleConnectionReject = () => {};

  return (
    <div>
      {currentUser && shownUser && (
        <div>
          <PreviewUserCard shownUser={shownUser} />
          <div className="absolute bottom-16 z-8 h-16 text-2xl w-full bg-gray-200 bg-opacity-50">
            <div className="mt-2 w-full flex flex-row justify-around flex-nowrap">
              <ConnectForm
                currentUser={currentUser}
                shownUser={shownUser}
                handleMessageLink={handleMessageLink}
                handleConnectionRequest={handleConnectionRequest}
                handleConnectionAccept={handleConnectionAccept}
                handleConnectionReject={handleConnectionReject}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowUser;
