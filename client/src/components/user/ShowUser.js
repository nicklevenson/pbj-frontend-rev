import React, { useEffect, useState } from "react";
import PreviewUserCard from "../swipe/PreviewUserCard";
import ConnectForm from "./ConnectForm";
import { useOutletContext, useParams, useNavigate } from "react-router-dom";
import Div100vh from "react-div-100vh";
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
          <Div100vh className="overflow-y-scroll pb-48">
            <PreviewUserCard shownUser={shownUser} />
          </Div100vh>
          <div className="sticky bottom-0 bg-white bg-opacity-90">
            <div className="inner-container">
              <div className="flex flex-row justify-around flex-nowrap">
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
        </div>
      )}
    </div>
  );
};

export default ShowUser;
