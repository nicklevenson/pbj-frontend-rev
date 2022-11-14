import React, { useState, useEffect, useLayoutEffect } from "react";
import { useOutletContext } from "react-router-dom";
import UserApi from "../../api/user-api";
import PreviewUserCard from "./PreviewUserCard";
import ConnectForm from "../user/ConnectForm";
import NextUserButton from "./NextUserButton";

const Swipe = () => {
  const [currentUser] = useOutletContext();
  const [recs, setRecs] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [shownUser, setShownUser] = useState(null);

  useLayoutEffect(() => {
    fetchRecs();
  }, []);

  useEffect(() => {
    fetchShownUser();
  }, [recs, activeIndex]);

  const fetchShownUser = async () => {
    const id = recs[activeIndex];
    if (id) {
      const response = await UserApi.fetchSupportingInfo(id);
      const info = response.supporting_user_info;
      setShownUser(info);
    }
  };

  const fetchRecs = async () => {
    const recs = await UserApi.fetchUserRecs();
    setRecs(recs);
  };

  const handleMessageLink = () => {};

  const handleConnectionRequest = async () => {
    await UserApi.requestConnection(shownUser.info.id);
    nextCard();
  };

  const handleConnectionAccept = () => {};

  const handleConnectionReject = () => {};

  const nextCard = () => {
    const id = recs[activeIndex];

    if (activeIndex === recs.length - 1) {
      this.resetIndex();
    } else {
      setActiveIndex((prevState) => prevState + 1);
    }
  };

  return (
    <div>
      {currentUser && shownUser && (
        <div>
          <PreviewUserCard shownUser={shownUser} currentUser={currentUser} />
          <ConnectForm
            currentUser={currentUser}
            shownUser={shownUser}
            handleMessageLink={handleMessageLink}
            handleConnectionRequest={handleConnectionRequest}
            handleConnectionAccept={handleConnectionAccept}
            handleConnectionReject={handleConnectionReject}
          />
          <NextUserButton nextCard={nextCard} />
        </div>
      )}
    </div>
  );
};

export default Swipe;
