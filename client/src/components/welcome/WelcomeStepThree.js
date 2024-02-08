
import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
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
    <div className="absolute inset-0 bg-gray-200 w-full h-full z-10 overflow-y-scroll pb-28">
      <h1 className="mt-8 text-2xl font-bold mb-4 text-center">Let's get some peanut butter on that sandwich</h1>
      <div className="mt-8 max-w-[500px] mx-auto text-center">
        <p>
          Add a nice photo of yourself to help others get to know you better.
        </p>
        <div className="mt-8">
          <UserPhoto userInfo={currentUser} />
          <EditPhoto />
        </div>
      </div>

      <div className="fixed z-[10000] bottom-16 w-full flex">
        <button
          className="bg-green-500 text-white rounded p-2 w-[80%] mx-auto"
          onClick={() => {
            navigate("/welcome/step2");
          }}
        >
          Go Back
        </button>
      </div>

      <div className="fixed z-[10000] bottom-4 w-full flex">
        <button className={`${canSubmit ? 'bg-blue-500' : 'bg-gray-300'} text-white rounded p-2 w-[80%] mx-auto`}
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
  );
}

export default WelcomeStepThree;