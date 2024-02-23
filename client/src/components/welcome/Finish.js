import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import camelize from "camelize";
import Div100vh from "react-div-100vh";
import PreviewUserCard from "../swipe/PreviewUserCard";
import UserApi from "../../api/user-api";

const Finish = () => {
  const navigate = useNavigate();
  const { currentUser } = useOutletContext();
  const [shownUser, setShownUser] = useState(null);

  useEffect(() => {
    fetchShownUser();
  }, [currentUser]);

  const fetchShownUser = async () => {
    const id = currentUser.id;
    if (id) {
      const response = await UserApi.fetchSupportingInfo(id);
      const info = camelize(response.supporting_user_info);
      setShownUser(info);
    }
  };

  if (!currentUser) return null;

  return (
    <Div100vh className="z-10 overflow-y-scroll fixed top-0 left-0 w-full bg-white">
      <div className="flex flex-col h-full">
        <div className="bg-gradient-animation text-white pt-12">
          <div className="inner-container flex items-end justify-start">
            <h1 className="text-xl font-bold">You're ready to get jamming!</h1>
          </div>
        </div>

        <div>
          <div className="inner-container">
            <p>
              This is how your profile will appear to others. You can always
              edit your profile later.
            </p>
          </div>
        </div>

        <div>
          {shownUser && (
            <PreviewUserCard
              shownUser={shownUser}
              currentUser={currentUser}
              showSimilar={false}
            />
          )}
        </div>

        <div className="sticky bottom-0 bg-white bg-opacity-90">
          <div className="inner-container">
            <div className="max-w-[350px] mx-auto flex gap-4">
              <button
                className="flex-1 button-outlined"
                onClick={() => {
                  navigate("/welcome/step3");
                }}
              >
                Go Back
              </button>
              <button
                className="flex-1 button-blue"
                onClick={() => {
                  navigate("/swipe");
                }}
              >
                Start Swiping
              </button>
            </div>
          </div>
        </div>
      </div>
    </Div100vh>
  );
};

export default Finish;
