import React, { useEffect, useState } from "react";
import PreviewUserCard from "../swipe/PreviewUserCard";
import { useNavigate, useOutletContext } from "react-router-dom";
import UserApi from "../../api/user-api";
import camelize from "camelize";

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
    <div className="absolute inset-0 bg-gray-200 w-full z-10 overflow-y-scroll pb-28">
      <div className="mt-8">
        <h1 className="text-2xl font-bold mb-4 text-center">You're ready to get jamming!</h1>
        <p className="text-gray-700 text-center">
          This is how your profile will appear to others. You can always edit your profile later.
        </p>

        <hr className="my-8" />

        {shownUser && <PreviewUserCard shownUser={shownUser} currentUser={currentUser} showSimilar={false} />}
      </div>

      <div className="fixed z-[10000] bottom-16 w-full flex">
        <button
          className="bg-green-500 text-white rounded p-2 w-[80%] mx-auto"
          onClick={() => {
            navigate("/welcome/step3");
          }}
        >
          Go Back
        </button>
      </div>

      <div className="fixed z-[10000] bottom-4 w-full flex">
        <button
          className="bg-blue-500 text-white rounded p-2 w-[80%] mx-auto"
          onClick={() => {
            navigate("/swipe");
          }}
        >
          Start Swiping
        </button>
      </div>
    </div>
  );
};

export default Finish;