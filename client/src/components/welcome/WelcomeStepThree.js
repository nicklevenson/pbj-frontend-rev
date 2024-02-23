import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Div100vh from "react-div-100vh";
import EditPhoto from "../profile/EditPhoto";
import UserPhoto from "../user/UserPhoto";

const WelcomeStepThree = () => {
  const navigate = useNavigate();
  const { currentUser, attemptFetchUser } = useOutletContext();
  const [canSubmit, setCanSubmit] = useState(false);

  useEffect(() => {
    if (currentUser) {
      if (currentUser.photo) {
        setCanSubmit(true);
      } else {
        setCanSubmit(false);
      }
    }
  }, [currentUser]);

  if (!currentUser) return null;

  return (
    <Div100vh className="z-10 overflow-y-scroll fixed top-0 left-0 w-full bg-white">
      <div className="flex flex-col h-full">
        <div className="bg-gradient-animation pt-12">
          <div className="inner-container flex items-end justify-start">
            <h1 className="text-white text-xl font-bold">
              Let's get some peanut butter on that sandwich
            </h1>
          </div>
        </div>

        <div>
          <div className="inner-container">
            <div className="flex flex-col gap-2">
              <p>
                Add a nice photo of yourself to help others get to know you
                better.
              </p>
              <EditPhoto />
            </div>
          </div>
          <div className="max-w-[600px] mx-auto">
            <UserPhoto userInfo={currentUser} />
          </div>
        </div>

        <div className="sticky bottom-0 bg-white bg-opacity-90">
          <div className="inner-container">
            <div className="max-w-[350px] mx-auto flex gap-4">
              <button
                className="flex-1 button-outlined"
                onClick={() => {
                  navigate("/welcome/step2");
                }}
              >
                Go Back
              </button>
              <button
                className={
                  canSubmit ? "flex-1 button-blue" : "flex-1 button-disabled"
                }
                onClick={() => {
                  attemptFetchUser();
                  navigate("/welcome/finish");
                }}
                disabled={!canSubmit}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </Div100vh>
  );
};

export default WelcomeStepThree;
