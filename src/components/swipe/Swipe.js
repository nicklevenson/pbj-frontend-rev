import React, { useState, useEffect, useLayoutEffect } from "react";
import { useOutletContext } from "react-router-dom";
import UserApi from "../../api/user-api";
import PreviewUserCard from "./PreviewUserCard";
import ConnectForm from "../user/ConnectForm";
import NextUserButton from "./NextUserButton";
import { Animated } from "react-animated-css";

const Swipe = () => {
  const [currentUser] = useOutletContext();
  const [recs, setRecs] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [shownUser, setShownUser] = useState(null);
  const [cardInTransition, setCardInTransition] = useState(false);

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

  const handleConnectionAccept = async () => {
    await UserApi.acceptConnection(shownUser.info.id);
    nextCard();
  };

  const animateCardIn = () => {
    setCardInTransition(true);
    setTimeout(() => {
      setCardInTransition(false);
    }, 200);
  };

  const handleConnectionReject = () => {};

  const nextCard = () => {
    if (activeIndex === recs.length - 1) {
      this.resetIndex();
    } else {
      animateCardIn();
      setActiveIndex((prevState) => prevState + 1);
    }
  };

  return (
    <div className="overflow-y-scroll h-screen pb-44">
      {currentUser && shownUser && (
        <div>
          <Animated
            animationIn="slideInRight"
            animationOut="slideOutLeft"
            isVisible={!cardInTransition}
            animationInDuration={200}
          >
            <PreviewUserCard shownUser={shownUser} currentUser={currentUser} />
          </Animated>
          <div className="fixed bottom-20 z-50 h-16 px-16 text-2xl w-full">
            <div className="mt-2 w-full flex flex-row justify-between">
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
          </div>
        </div>
      )}
    </div>
  );
};

export default Swipe;
