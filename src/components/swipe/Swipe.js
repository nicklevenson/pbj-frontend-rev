import React, { useState, useEffect, useLayoutEffect } from "react";
import { useOutletContext } from "react-router-dom";
import UserApi from "../../api/user-api";
import PreviewUserCard from "./PreviewUserCard";

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
  }, [recs]);

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

  return (
    <div>
      {shownUser && (
        <PreviewUserCard shownUser={shownUser} currentUser={currentUser} />
      )}
    </div>
  );
};

export default Swipe;
