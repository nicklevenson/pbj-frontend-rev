import React, { useState, useEffect, useLayoutEffect } from "react";
import { Navigate, useOutletContext } from "react-router-dom";
import UserApi from "../../api/user-api";
import PreviewUserCard from "./PreviewUserCard";
import ConnectForm from "../user/ConnectForm";
import NextUserButton from "./NextUserButton";
import { Animated } from "react-animated-css";
import Filter from "./Filter";
import camelize from "camelize";
const Swipe = () => {
  const { currentUser } = useOutletContext();
  const [recs, setRecs] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [shownUser, setShownUser] = useState(null);
  const [cardInTransition, setCardInTransition] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showConnectForm, setShowConnectForm] = useState(true);
  const [outOfRecs, setOutOfRecs] = useState(false);

  const getRecentRange = () => {
    return localStorage.rangeFilter || 500;
  };

  useLayoutEffect(() => {
    fetchRecs({
      range: getRecentRange(),
    });
  }, []);

  useEffect(() => {
    fetchShownUser();
  }, [recs, activeIndex]);

  const fetchShownUser = async () => {
    const id = recs[activeIndex];
    if (id) {
      const response = await UserApi.fetchSupportingInfo(id);
      const info = camelize(response.supporting_user_info);
      setShownUser(info);
    }
  };

  const fetchRecs = async (params) => {
    if (!currentUser?.needsWelcomeStep) {
      setShownUser(null);
      setActiveIndex(0);
      setLoading(true);
      const recs = await UserApi.fetchUserRecs(params);
      setRecs(recs, setLoading(false));
    }
  };

  const handleMessageLink = () => {};

  const handleConnectionRequest = async () => {
    setShowConnectForm(false);
    await UserApi.requestConnection(shownUser.info.id);
    setShowConnectForm(true);
    nextCard();
  };

  const handleConnectionAccept = async () => {
    setShowConnectForm(false);
    await UserApi.acceptConnection(shownUser.info.id);
    setShowConnectForm(true);
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
      setOutOfRecs(true);
    } else {
      animateCardIn();
      setActiveIndex((prevState) => prevState + 1);
    }
  };


  if (currentUser && currentUser.needsWelcomeStep) {
    return (
      <Navigate to="/welcome" />
    )
  }

  if (loading) {
    return (
    <div className="absolute inset-0 bg-gray-200 bg-opacity-50 flex justify-center items-center">
      <div className="text-2xl text-gray-500">Loading...</div>
    </div>
    )
  }

  if (outOfRecs) {
    return (
      <div className="absolute inset-0 bg-gray-200 bg-opacity-50 flex justify-center items-center">
        <div className="text-2xl text-gray-500">That's it for now</div>
        <button
          onClick={() => {
            setOutOfRecs(false);
            fetchRecs({
              range: getRecentRange(),
            });
          }}
          className="ml-4 bg-blue-400 text-white p-2 rounded">
          Refresh?
          </button>
      </div>
    )
  }

  return (
    <div className="w-full overscroll-x-none">
      <Filter fetchRecs={fetchRecs} />
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
          <div className="fixed bottom-16 z-8 h-16 text-2xl w-full bg-gray-200 bg-opacity-50">
            <div className="mt-2 w-full flex flex-row justify-around">
              {showConnectForm && 
                <>
                  <ConnectForm
                    currentUser={currentUser}
                    shownUser={shownUser}
                    handleMessageLink={handleMessageLink}
                    handleConnectionRequest={handleConnectionRequest}
                    handleConnectionAccept={handleConnectionAccept}
                    handleConnectionReject={handleConnectionReject}
                  />
                  <NextUserButton nextCard={nextCard} />
                </>
              }
            </div>
          </div>
        </div>
      )}

      {recs.length === 0 && 
        <div className="absolute inset-0 bg-gray-200 bg-opacity-50 flex justify-center items-center">
            <div className="text-2xl text-gray-500">No users found</div>
        </div>
      }
    </div>
  );
};

export default Swipe;